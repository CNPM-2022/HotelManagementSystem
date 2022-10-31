import { createSlice } from "@reduxjs/toolkit";

const initialRoomState = {
  isLoading: false,
  error: null,
  rooms: [],
};

const roomSlice = createSlice({
  name: "rooms",
  initialState: initialRoomState,
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

export default roomSlice.reducer;
export const roomActions = roomSlice.actions;
