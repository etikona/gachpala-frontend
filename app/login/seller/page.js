// app/login/seller/page.js
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuth } from "@/app/store/authSlice";

export default function SellerLogin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!email || !password) {
        toast.error("Email and password are required");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/v1/seller/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok && data.token) {
        // Save to Redux store
        dispatch(
          setAuth({
            user: data.seller,
            token: data.token,
            loginType: "seller",
          })
        );

        toast.success("Login successful!");
        router.push("/seller/dashboard");
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
      <Card className="bg-gray-800 border-gray-700 shadow-lg w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-100 text-center">
            Seller Login
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
                  placeholder="your@email.com"
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
              {isLoading ? "Logging in..." : "Login as Seller"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
