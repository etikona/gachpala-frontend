"use client";

import { SellerForm } from "@/components/SellerForm";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddSellerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://gachpala-server.onrender.com/api/v1/admin/sellers",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add seller");
      }

      toast.success("Seller added successfully");
      router.push("/admin/dashboard/sellers");
    } catch (error) {
      toast.error(error.message || "Failed to add seller");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Add New Seller</h1>
          <p className="text-gray-400">
            Register a new seller to your platform
          </p>
        </div>

        <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <SellerForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
}
