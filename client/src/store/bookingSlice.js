import { createSlice } from "@reduxjs/toolkit";

const initialBookingState = { maxPeopel: 0, numberOfPeople: 0, bookingInformation: {} };

const bookingSlice = createSlice({
    name: "booking",
    initialState: initialBookingState,
    reducers: {
        setMaxPeople(state, action) {
            state.maxPeopel = action.payload.maxPeopel;
        },
        setNumberOfPeople(state, action) {
            state.numberOfPeople = action.payload.numberOfPeople;
        },
        setBookingInformation(state, action) {
            state.bookingInformation = action.payload.bookingInformation;
        },
    },
});

export default bookingSlice
