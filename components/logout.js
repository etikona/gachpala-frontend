"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux"; // if using Redux
import { logout } from "../app/store/authSlice.js"; // optional if Redux

export default function LogoutButton() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Clear cookies
    document.cookie = "token=; Max-Age=0; path=/";
    document.cookie = "loginType=; Max-Age=0; path=/";

    // Optional: clear Redux and localStorage
    localStorage.removeItem("user");
    dispatch(logout());

    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded bg-red-500 text-white"
    >
      Logout
    </button>
  );
}
