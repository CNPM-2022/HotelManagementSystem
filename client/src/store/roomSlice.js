import { createSlice } from "@reduxjs/toolkit";

const initialRoomState = {
  isLoading: false,
  error: null,
  room: {},
};

const roomSlice = createSlice({
  name: "room",
  initialState: initialRoomState,
  reducers: {
    RoomByIdRequest(state) {
      state.isLoading = true;
    },
    RoomByIdSuccess(state, action) {
      state.isLoading = false;
      state.room = action.payload;
    },
    RoomByIdFail(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default roomSlice.reducer;
export const roomActions = roomSlice.actions;
