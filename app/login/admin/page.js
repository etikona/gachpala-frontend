"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import Link from "next/link";

export default function AdminLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check if user is already logged in
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const loginType = localStorage.getItem("loginType");

      if (token && loginType === "admin") {
        router.push("/admin/dashboard");
      }
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!email || !password) {
        toast.error("Email and password are required");
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address");
        return;
      }

      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(
        "http://localhost:5000/api/v1/auth/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.token) {
        // ✅ Save to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("loginType", "admin");

        // Check if the API returns 'admin' or 'user' property
        const adminData = data.admin || data.user;
        if (adminData) {
          localStorage.setItem("admin", JSON.stringify(adminData));
        }

        toast.success("Login successful!");
        router.push("/admin/dashboard");
      } else {
        toast.error(
          data.msg || data.message || "Login failed. Invalid credentials."
        );
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.name === "AbortError") {
        toast.error("Request timeout. Server is taking too long to respond.");
      } else if (error.message.includes("HTTP error")) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error(
          "Network error. Please check your connection and try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Test server connection
  const testServerConnection = async () => {
    try {
      toast.loading("Testing server connection...");
      const response = await fetch(
        "https://gachpala-server.onrender.com/api/v1/health",
        {
          method: "GET",
        }
      );

      if (response.ok) {
        toast.dismiss();
        toast.success("Server is online and responsive!");
      } else {
        toast.dismiss();
        toast.error("Server responded with an error");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Cannot connect to server. Please try again later.");
      console.error("Server connection test failed:", error);
    }
  };

  // Prevent rendering on server to avoid hydration issues
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
        <Card className="bg-gray-800 border-gray-700 shadow-lg w-full max-w-md">
          <CardContent className="flex justify-center items-center h-64">
            <p className="text-gray-300">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <Card className="bg-gray-800 border-gray-700 shadow-lg w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-100 text-center">
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <div>
                <Label className="text-gray-300">Email *</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-gray-100"
                  placeholder="admin@example.com"
                  disabled={isLoading}
                  required
                />
              </div>
              <div>
                <Label className="text-gray-300">Password *</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-gray-100"
                  placeholder="••••••••"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full py-6 text-lg font-semibold ${
                isLoading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800"
              }`}
            >
              {isLoading ? "Logging in..." : "Login as Admin"}
            </Button>

            <div className="text-center text-sm text-gray-400">
              <p>
                Forgot your password?{" "}
                <Link
                  href="/admin/forgot-password"
                  className="text-emerald-400 hover:underline"
                >
                  Reset it here
                </Link>
              </p>
            </div>
          </form>

          {/* Debug section */}
          <div className="mt-6 p-3 bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-300 mb-2">Server Status:</p>
            <Button
              onClick={testServerConnection}
              variant="outline"
              className="w-full text-xs text-gray-300 border-gray-600"
              size="sm"
            >
              Test Server Connection
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
