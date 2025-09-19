// components/LogoutButton.js
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

export default function LogoutButton({ className = "" }) {
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!user) return null;

  return (
    <button
      onClick={handleLogout}
      className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors ${className}`}
    >
      Logout
    </button>
  );
}
