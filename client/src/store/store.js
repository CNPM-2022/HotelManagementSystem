import counterReducer from './counterSlice';
import authReducer from './authSlice';
import roomsReducer from './roomsSlice';
import roomReducer from './roomSlice';
import { configureStore } from '@reduxjs/toolkit';
const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        rooms: roomsReducer,
        room: roomReducer,
    },
});

export default store;
