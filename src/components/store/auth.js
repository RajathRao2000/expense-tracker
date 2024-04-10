import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: !!localStorage.getItem("token") ? true : false,
  idtoken: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token")).token
    : "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.idtoken = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.idtoken = "";
      localStorage.removeItem("token")
    },
  },
});
export const authActions = authSlice.actions;

export default authSlice.reducer;
