// src/State/Action/forgotPasswordActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

export const sendOtp = createAsyncThunk(
  "forgotPassword/sendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to send OTP.");
      }

      return data.message || "OTP sent successfully!";
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong.");
    }
  }
);
export const verifyOtp = createAsyncThunk(
  "forgotPassword/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/verify-forgot-password-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }), // your backend should expect these
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "OTP verification failed.");
      }

      return data.message || "OTP verified successfully!";
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong.");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "forgotPassword/resetPassword",
  async ({ email, newPassword, confirmPassword }, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/reset-password", {
        email,
        newPassword,
        confirmPassword,
      });

      return res.data;
    } catch (err) {
      console.error("Reset Password Error:", err.response || err.message);
      return rejectWithValue(
        err.response?.data?.message || err.message || "Reset failed"
      );
    }
  }
);

// src/State/Slices/forgotPasswordSlice.js
import { createSlice } from "@reduxjs/toolkit";
const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    step: 1,
    loading: false,
    error: null,
    verified: false,
  },
  reducers: {
    resetFlow: (state) => {
      state.step = 1;
      state.verified = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
        state.step = 2;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.step = 3;
        state.verified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.step = 1;
        state.verified = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetFlow } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
