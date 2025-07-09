import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  loginType: null, // 'user' | 'seller' | 'admin'
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loginType = action.payload.loginType;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loginType = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
