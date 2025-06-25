"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function UserRegister() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      }
    );

    if (res.ok) {
      router.push("/login/seller");
    } else {
      alert("User registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4 text-gray-200 min-h-screen">
      <h2 className="text-xl font-bold">Seller Register</h2>
      <Label>Name</Label>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Label>Email</Label>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      <Label>Password</Label>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={handleRegister}
        className="w-full   hover:bg-gray-200 hover:text-gray-800"
        variant="outline"
      >
        Register as Seller
      </Button>
    </div>
  );
}
