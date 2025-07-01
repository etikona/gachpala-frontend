"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function UserLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSellerLogin = async () => {
    const res = await fetch("/api/seller/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      // Store token in localStorage or cookie
      localStorage.setItem("sellerToken", data.token);
      router.push("/seller/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen  mt-20 space-y-4 text-gray-200">
      <h2 className="text-xl font-bold">User Login</h2>
      <Label>Email</Label>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      <Label>Password</Label>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={handleSellerLogin}
        className="w-full   hover:bg-gray-200 hover:text-gray-800"
        variant="outline"
      >
        Login as User
      </Button>
    </div>
  );
}
