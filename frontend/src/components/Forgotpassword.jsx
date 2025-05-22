import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  sendOtp,
  verifyOtp,
  resetPassword,
} from "../redux/State/forgotpassword"; // adjust path
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, success, error } = useSelector(
    (state) => state.forgotPassword
  );

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    dispatch(sendOtp(email)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("OTP sent!");
        setStep(2);
      } else {
        toast.error(res.payload || "Error sending OTP");
      }
    });
  };

  const handleOtpChange = (value, index) => {
    if (value.length > 1) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    const res = await dispatch(verifyOtp({ email, otp: fullOtp }));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("OTP verified!");
      setStep(3);
    } else {
      toast.error("Invalid OTP");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    const res = await dispatch(
      resetPassword({ email, newPassword, confirmPassword })
    );

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Password reset successfully!");
      setTimeout(() => {
        navigate("/login"); // ✅ This should now work
      }, 2000);
    } else {
      toast.error(res.payload || "Reset failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {step === 1
            ? "Forgot Password"
            : step === 2
            ? "Verify OTP"
            : "Reset Password"}
        </h2>

        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpSubmit}>
            <label className="block mb-2 font-medium">Enter OTP</label>
            <div className="flex justify-between gap-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  className="w-10 h-10 text-center border rounded-md text-lg focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Verify OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordReset}>
            <label className="block mb-2 font-medium">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
            <label className="block mb-2 font-medium">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
            <button
              type="submit"
              className="w-full mt-6 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
