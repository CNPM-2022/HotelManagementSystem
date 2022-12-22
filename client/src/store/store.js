import counterReducer from "./counterSlice";
import authReducer from "./authSlice";
import roomsReducer from "./roomsSlice";
import roomReducer from "./roomSlice";
import bookingSlice from './bookingSlice'
import searchSlice from './searchSlice'
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    rooms: roomsReducer,
    room: roomReducer,
    booking: bookingSlice.reducer,
    search: searchSlice.reducer,
  },
});

export default store;
