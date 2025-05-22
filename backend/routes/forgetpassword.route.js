// routes/auth.routes.js
import express from "express";
import {
  forgotPasswordController,
  verifyForgotPasswordOtpController,
  resetPasswordController,
} from "../controllers/forgetpassword.Controller.js"; // Update with your actual file path

const router = express.Router();

// Forgot Password - Step 1: Request OTP
router.post("/forgot-password", forgotPasswordController);

// Forgot Password - Step 2: Verify OTP
router.post("/verify-forgot-password-otp", verifyForgotPasswordOtpController);

// Forgot Password - Step 3: Reset Password
router.post("/reset-password", resetPasswordController);

export default router;
