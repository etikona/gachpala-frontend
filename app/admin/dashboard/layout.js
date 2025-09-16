// app/admin/dashboard/layout.jsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart,
  Settings,
  LogOut,
  Package,
  Bell,
  UserCircle,
  Menu,
  MessageSquare,
  CreditCard,
  HelpCircle,
  BookOpen, // Added for Blog icon
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Users", path: "/admin/dashboard/users", icon: Users },
  { label: "Sellers", path: "/admin/dashboard/sellers", icon: Package },
  // Added Blog menu item
  { label: "Blog", path: "/admin/dashboard/blogs", icon: BookOpen },
  { label: "Orders", path: "/admin/dashboard/orders", icon: ShoppingCart },
  {
    label: "Subscribers",
    path: "/admin/dashboard/subscribers",
    icon: UserCircle,
  },
  // { label: "Messages", path: "/admin/dashboard/messages", icon: MessageSquare },
  // { label: "Billing", path: "/admin/dashboard/billing", icon: CreditCard },
  // { label: "Analytics", path: "/admin/dashboard/analytics", icon: BarChart },
  // { label: "Settings", path: "/admin/dashboard/settings", icon: Settings },
  // { label: "Support", path: "/admin/dashboard/support", icon: HelpCircle },
];

export default function AdminDashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef(null);

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/";
    document.cookie = "loginType=; Max-Age=0; path=/";
    localStorage.removeItem("admin");
    router.push("/login/admin");
  };

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-gray-800/70 backdrop-blur-md border-gray-700 text-white"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-gray-900/80 backdrop-blur-lg border-r border-gray-800 text-white p-5 space-y-8 z-40 transition-transform md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-1.5 rounded-lg">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
              Admin Panel
            </span>
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="sr-only">Close sidebar</span>
            <span className="text-xl">×</span>
          </Button>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                  pathname === item.path
                    ? "bg-gradient-to-r from-indigo-600/30 to-purple-600/30 text-white shadow-lg border border-indigo-500/30"
                    : "text-gray-300 hover:bg-gray-800/50"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-5 border-t border-gray-800">
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full flex items-center bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 shadow-lg">
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="text-lg font-semibold hidden md:block bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
              {navItems.find((item) => item.path === pathname)?.label ||
                "Dashboard"}
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-300 hover:text-white"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full h-4 w-4 text-xs flex items-center justify-center">
                  5
                </span>
              </Button>

              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <div className="font-medium text-white">Admin User</div>
                  <div className="text-xs text-gray-400">admin@example.com</div>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl w-10 h-10 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Notification Dropdown */}
        {notificationsOpen && (
          <div
            ref={notificationsRef}
            className="absolute right-6 top-16 z-50 w-80 bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700"
          >
            <div className="p-4 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-white">Notifications</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-indigo-400"
                  onClick={() => setNotificationsOpen(false)}
                >
                  Clear All
                </Button>
              </div>
            </div>
            <div className="max-h-96 overflow-auto">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="p-4 border-b border-gray-700 hover:bg-gray-700/50 transition-all duration-200"
                >
                  <div className="flex items-start">
                    <div className="bg-indigo-500/20 p-2 rounded-lg mr-3">
                      <Bell className="h-4 w-4 text-indigo-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">
                        New order received
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        Order #ORD-00{item} has been placed
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        10 minutes ago
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 text-center border-t border-gray-700">
              <Button variant="ghost" size="sm" className="text-indigo-400">
                View all notifications
              </Button>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 bg-gradient-to-br from-gray-900/50 to-gray-950/50">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900/80 backdrop-blur-md border-t border-gray-800 py-3 px-6">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              © {new Date().getFullYear()} Gachpala. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>v2.1.0</span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white w-8 h-8"
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white w-8 h-8"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
