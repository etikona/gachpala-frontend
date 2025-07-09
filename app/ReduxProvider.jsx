// app/ReduxProvider.jsx
"use client"; // Must be first line

import { Provider } from "react-redux";
import { store } from "../app/store/store.js"; // Adjust import path

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
