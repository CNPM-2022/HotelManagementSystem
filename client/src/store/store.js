import counterReducer from "./counterSlice";
import authReducer from "./authSlice";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});

export default store;
