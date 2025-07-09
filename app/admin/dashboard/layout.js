"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Users", path: "/admin/dashboard/users" },
  { label: "Sellers", path: "/admin/dashboard/sellers" },
  { label: "Orders", path: "/admin/dashboard/orders" },
  { label: "Analytics", path: "/admin/dashboard/analytics" },
];

export default function AdminDashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/";
    document.cookie = "loginType=; Max-Age=0; path=/";
    localStorage.removeItem("admin");
    router.push("/login/admin");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5 space-y-6">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <nav className="space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                pathname === item.path ? "bg-gray-800 font-semibold" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button
          variant="destructive"
          onClick={handleLogout}
          className="w-full mt-10"
        >
          Logout
        </Button>
      </aside>

      {/* Page Content */}
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
