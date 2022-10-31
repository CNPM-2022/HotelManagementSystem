import { createSlice } from "@reduxjs/toolkit";

const initialRoomsState = {
  isLoading: false,
  error: null,
  rooms: [],
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState: initialRoomsState,
  reducers: {
    allRoomsRequest(state) {
      state.isLoading = true;
    },
    allRoomsSuccess(state, action) {
      state.isLoading = false;
      state.rooms = action.payload;
    },
    allRoomsFail(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default roomsSlice.reducer;
export const roomsActions = roomsSlice.actions;
