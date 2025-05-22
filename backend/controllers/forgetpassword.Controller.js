import User from "../models/User.js"; // ✅user database
import bcrypt from "bcrypt"; // ✅access Env file
import dotenv from "dotenv";
dotenv.config(); // ✅Load .env variables
import sendEmail from "../config/sentEmail.js"; // ✅Use only one import sendemail
import resetverifyTemplate from "../util.js/resetVarifyTemplate.js"; // ✅resent otp email tamplte
import validator from "validator"; // ✅Email validatar
//import validator from "validator"...;
export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    // Input validation
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    console.log("Received password reset request for:", email);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set OTP and expiry time (valid for 15 minutes)
    user.forgot_password_otp = otp;
    user.forgot_password_expiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    // Send OTP via email
    await sendEmail({
      sendTo: email,
      subject: "your forget password",
      html: resetverifyTemplate({
        name: user.name,
        otp: otp,
      }),
    });

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// verify and forget passwort...
export const verifyForgotPasswordOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check if email and OTP are provided
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP is correct and not expired
    if (
      user.forgot_password_otp !== otp ||
      !user.forgot_password_expiry ||
      user.forgot_password_expiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // OTP is valid, return success response
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// reset passwort....
export const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    // Validate required fields
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Save updated password
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
