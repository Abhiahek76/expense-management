import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducer/Reducer"; // Adjust the path if necessary

const store = configureStore({
  reducer: rootReducer,
  // You can add middleware or other configurations here if needed
});

export default store;
