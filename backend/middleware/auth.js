import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized, no token provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.error("Token verification failed:", err.message);
        return res.status(401).json({ message: "Unauthorized, invalid token" });
      }

      if (!decoded.id) {
        return res.status(401).json({ message: "Invalid token payload" });
      }

      req.user = { _id: decoded.id }; // Attach user object to request
      next();
    });
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export default authenticateUser;
