import counterReducer from "./counterSlice";
import authReducer from "./authSlice";
import roomReducer from "./roomsSlice";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    rooms: roomReducer,
  },
});

export default store;
