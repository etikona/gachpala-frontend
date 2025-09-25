"use client";

import { SellerForm } from "@/components/SellerForm";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditSellerPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [seller, setSeller] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const res = await fetch(
          `https://gachpala-server.onrender.com/api/v1/admin/sellers/${id}`
        );
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch seller");
        }
        const data = await res.json();
        setSeller(data);
      } catch (error) {
        toast.error(error.message);
        router.push("/admin/dashboard/sellers");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchSeller();
  }, [id]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://gachpala-server.onrender.com/api/v1/admin/sellers/${id}`,
        {
          method: "PUT",
          headers: {},
          body: formData, // FormData will automatically set Content-Type to multipart/form-data
        }
      );
      console.log(response);
      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to update seller");
      }

      toast.success("Seller updated successfully");
      router.push("/admin/dashboard/sellers");
    } catch (error) {
      console.error("Update error:", error);
      toast.error(
        error.message || "Failed to update seller. Check console for details."
      );
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-gray-300">Seller not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Edit Seller</h1>
          <p className="text-gray-400">Update seller information</p>
        </div>

        <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <SellerForm
            onSubmit={handleSubmit}
            loading={loading}
            defaultValues={seller}
            isEdit={true}
          />
        </div>
      </div>
    </div>
  );
}
