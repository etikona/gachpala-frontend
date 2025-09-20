// app/login/user/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";

import { setAuth } from "@/app/store/authSlice";
import toast from "react-hot-toast";

export default function UserLoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUserLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/v1/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok && data.token) {
        // Save to Redux store
        dispatch(
          setAuth({
            user: data.user,
            token: data.token,
            loginType: "user",
          })
        );

        toast.success("Login successful!");
        router.push("/user/dashboard");
      } else {
        toast.error(data.msg || "Login failed");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="max-w-md w-full space-y-6 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-100 text-center">
          User Login
        </h2>
        <form onSubmit={handleUserLogin} className="space-y-4">
          <div>
            <Label className="text-gray-300">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 border-gray-600 text-gray-100"
              type="email"
              required
            />
          </div>
          <div>
            <Label className="text-gray-300">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 border-gray-600 text-gray-100"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800"
          >
            {isLoading ? "Logging in..." : "Login as User"}
          </Button>
        </form>
      </div>
    </div>
  );
}
