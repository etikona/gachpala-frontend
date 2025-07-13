"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SellerLayout({ children }) {
  const pathname = usePathname();

  // Helper to determine active tab
  const isActive = (path) => pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800/50 backdrop-blur-lg border-r border-gray-700 p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-emerald-600 w-10 h-10 rounded-lg flex items-center justify-center">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">PlantCare AI</h1>
        </div>

        <nav className="flex-1">
          <div className="space-y-1">
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
                  pathname.startsWith("/seller/dashboard/products")
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
                  pathname.startsWith("/seller/dashboard/orders")
                    ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                    : "text-gray-300 hover:bg-gray-700/50"
                }`}
              >
                <Package className="h-5 w-5" />
                <span>Orders</span>
              </div>
            </Link>

            {/* Other navigation links... */}
          </div>
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-700">
          <button className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700/50">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700 p-4 flex justify-between items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 bg-gray-700/50 border-gray-600 text-white w-80"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-700/50 text-gray-300">
              <Bell className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">S</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Seller Account</p>
                <p className="text-xs text-gray-400">Premium Plan</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
