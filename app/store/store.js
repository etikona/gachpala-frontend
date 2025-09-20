// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// Create a function to safely initialize the store
const initializeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ["persist/PERSIST"],
        },
      }),
  });
};

// Export the store instance
export const store = initializeStore();
