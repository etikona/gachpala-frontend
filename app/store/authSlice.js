// store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Helper function to safely get data from localStorage
const getSafeLocalStorage = (key) => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const item = localStorage.getItem(key);
    if (key === "user" && item) {
      return JSON.parse(item);
    }
    return item; // For token and loginType, return as string
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    localStorage.removeItem(key);
    return null;
  }
};

// Get initial state safely
const getInitialState = () => {
  return {
    user: getSafeLocalStorage("user"),
    token: getSafeLocalStorage("token"),
    loginType: getSafeLocalStorage("loginType"),
    isLoggedIn: !!getSafeLocalStorage("token"),
  };
};

const initialState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user, token, loginType } = action.payload;
      state.user = user;
      state.token = token;
      state.loginType = loginType;
      state.isLoggedIn = true;

      // Safely save to localStorage
      if (typeof window !== "undefined") {
        try {
          if (user) localStorage.setItem("user", JSON.stringify(user));
          if (token) localStorage.setItem("token", token);
          if (loginType) localStorage.setItem("loginType", loginType);
        } catch (error) {
          console.error("Error saving to localStorage:", error);
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loginType = null;
      state.isLoggedIn = false;

      // Clear localStorage safely
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("loginType");
          localStorage.removeItem("admin");
          localStorage.removeItem("seller");
        } catch (error) {
          console.error("Error clearing localStorage:", error);
        }
      }
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("user", JSON.stringify(action.payload));
        } catch (error) {
          console.error("Error updating user in localStorage:", error);
        }
      }
    },
  },
});

export const { setAuth, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
