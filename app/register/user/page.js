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
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // console.log(name, email, password);
  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(
        `https://gachpala-server.onrender.com/api/v1/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      // Handle non-JSON responses
      const contentType = res.headers.get("content-type");
      let data;
      if (contentType?.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        console.error("Non-JSON response:", text);
        throw new Error(`Server responded with ${res.status}: ${text}`);
      }

      if (res.ok) {
        router.push("/login/user");
      } else {
        console.error("Registration failed with status", res.status, data);
        alert(`Registration failed: ${data.msg || res.statusText}`);
      }
    } catch (error) {
      console.error("Full error details:", error);
      alert(`Error: ${error.message || "Check console for details"}`);
    }
  };
  // console.log(name, email, password);

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4 text-gray-200 min-h-screen">
      <h2 className="text-xl font-bold">User Register</h2>
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
        Register as User
      </Button>
    </div>
  );
}
