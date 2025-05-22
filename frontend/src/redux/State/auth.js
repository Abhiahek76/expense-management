import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//import { useDispatch } from "react-redux";

axios.defaults.withCredentials = true;

//✅ Get token from localStorage on app start
const token = localStorage.getItem("accessToken");
// ✅ Initial state
const initialState = {
  user: null,
  status: "idle",
  error: null,
  isLoggedIn: !!token, // true if token exists
};
// ✅ Register user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        userData
      );

      const token = response.data.token;
      if (token) {
        localStorage.setItem("accessToken", token);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        userData
      );
      const { token } = response.data;

      localStorage.setItem("accessToken", token);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ✅ Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("accessToken");
      state.user = null;
      state.status = "idle";
      state.error = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message;
      });
    // Load User From Token
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
