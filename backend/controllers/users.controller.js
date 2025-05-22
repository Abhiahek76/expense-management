import User from "../models/User.js"; // ✅user database
import bcrypt from "bcrypt"; // ✅access Env file
import dotenv from "dotenv";
dotenv.config(); // ✅Load .env variables
import jwt from "jsonwebtoken"; // ✅add jwt token
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role }, //🔄 Changed `userId` to `id`
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
};
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if user exists
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res
        .status(400)
        .json({ error: `User already exists with email: ${email}` });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isVerified: false, //optional field for tracking verification
    });
    await newUser.save(); // Save to DB
    // Generate access token
    const accessToken = generateAccessToken(newUser);
    return res.status(201).json({
      message: "User registered successfully!.",
      token: accessToken,
    });
  } catch (error) {
    console.error("❌ Error in Register:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// ✅login....
export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 🔍 Find user directly from DB
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: `User not found with email ${email}` });
    }

    // 🔐 Check password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 🎫 Generate JWT
    const accessToken = generateAccessToken(user);
    return res
      .status(200)
      .json({ message: "Login successful", token: accessToken });
  } catch (error) {
    console.error("❌ Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
