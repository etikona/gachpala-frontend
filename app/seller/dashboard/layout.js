// app/seller/layout.jsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Package,
  ShoppingCart,
  Leaf,
  BarChart,
  DollarSign,
  Users,
  Settings,
  Bell,
  Search,
  CreditCard,
  User,
  FileText,
  HelpCircle,
  LogOut, // Added logout icon
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { logout } from "@/app/store/authSlice";
import { authAPI } from "@/app/services/api";
import { toast } from "react-hot-toast";

export default function SellerLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const isActive = (path) => pathname === path;
  const isActiveGroup = (path) => pathname.startsWith(path);

  // Enhanced logout function for seller dashboard
  const handleLogout = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      if (token) {
        try {
          // Try to call the logout API
          await authAPI.logout(token);
          toast.success("Logged out successfully");
        } catch (apiError) {
          console.warn(
            "Logout API call failed, but continuing with client-side logout:",
            apiError
          );
          toast.success("Logged out locally");
        }
      }
    } catch (error) {
      console.error("Unexpected logout error:", error);
      toast.error("Logout error");
    } finally {
      // Always clear client-side data regardless of API success
      if (typeof window !== "undefined") {
        // Clear cookies
        document.cookie = "token=; Max-Age=0; path=/";
        document.cookie = "loginType=; Max-Age=0; path=/";

        // Clear localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("loginType");
        localStorage.removeItem("admin");
        localStorage.removeItem("seller");
      }

      // Clear Redux state
      dispatch(logout());

      // Redirect to home
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-900 to-gray-950 flex">
      {/* Sidebar */}
      <div className="w-64  bg-gray-800/50 backdrop-blur-lg border-r border-gray-700 p-4 flex flex-col">
        <nav className="flex-1">
          <div className="space-y-1 mt-12">
            <Link href="/seller/dashboard">
              <div
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                  isActive("/seller/dashboard")
                    ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                    : "text-gray-300 hover:bg-gray-700/50"
                }`}
              >
                <BarChart className="h-5 w-5" />
                <span>Overview</span>
              </div>
            </Link>

            <Link href="/seller/dashboard/products">
              <div
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                  isActiveGroup("/seller/dashboard/products")
                    ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                    : "text-gray-300 hover:bg-gray-700/50"
                }`}
              >
                <Package className="h-5 w-5" />
                <span>Products</span>
              </div>
            </Link>

            <Link href="/seller/dashboard/orders">
              <div
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                  isActiveGroup("/seller/dashboard/orders")
                    ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                    : "text-gray-300 hover:bg-gray-700/50"
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Orders</span>
              </div>
            </Link>

            <Link href="/seller/dashboard/payments">
              <div
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                  isActiveGroup("/seller/dashboard/payments")
                    ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                    : "text-gray-300 hover:bg-gray-700/50"
                }`}
              >
                <CreditCard className="h-5 w-5" />
                <span>Payments</span>
              </div>
            </Link>

            <Link href="/seller/dashboard/customers">
              <div
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                  isActiveGroup("/seller/dashboard/customers")
                    ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                    : "text-gray-300 hover:bg-gray-700/50"
                }`}
              >
                <User className="h-5 w-5" />
                <span>Customers</span>
              </div>
            </Link>
          </div>
        </nav>

        {/* Logout Button in Sidebar */}
        <div className="absolute bottom-0 left-0 w-full p-5 border-t border-gray-800  text-gray-200 items-center ">
          <button
            onClick={handleLogout}
            variant="destructive"
            className="w-full flex items-center p-1
             rounded text-center  bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800"
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
    </div>
  );
}
