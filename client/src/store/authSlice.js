import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
  createAt: null,
};

const localStorageUser = JSON.parse(localStorage.getItem("user"));

if (localStorageUser !== null) {
  initialAuthState.isAuthenticated = true;
  initialAuthState.user = localStorageUser.username;
  initialAuthState.token = localStorageUser.accessToken;
  initialAuthState.createAt = localStorageUser.createdAt;
} else {
  initialAuthState.isAuthenticated = false;
  initialAuthState.user = null;
  initialAuthState.token = null;
  initialAuthState.createAt = null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, actions) {
      state.isAuthenticated = true;
      state.token = actions.payload.token;
      state.user = actions.payload.user;
    },
    register(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
