// app/ReduxProvider.jsx
"use client";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";

export default function ReduxProvider({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything until the component is mounted on the client
  if (!isMounted) {
    return null;
  }

  return <Provider store={store}>{children}</Provider>;
}
