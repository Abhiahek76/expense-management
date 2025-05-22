import { combineReducers } from "@reduxjs/toolkit";
import transactionReducer from "../State/tentriestabel.js";
import authReducer from "../State/auth.js";
import dashboardReducer from "../State/summary.js"; // ✅ Import your dashboard reducer
import fargot from "../State/forgotpassword.js";

const rootReducer = combineReducers({
  auth: authReducer,
  transaction: transactionReducer,
  dashboard: dashboardReducer, // ✅ Add dashboard reducer here
  forgotPassword: fargot,
});

export default rootReducer;
