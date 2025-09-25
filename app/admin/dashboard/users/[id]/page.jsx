// app/admin/dashboard/users/[userId]/page.jsx
"use client";

import { use, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { User, Mail, Calendar, Shield, Loader } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function UserProfilePage() {
  const { id } = useParams();
  console.log(id);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  console.log(id);
  useEffect(() => {
    // If no id, show error immediately
    if (!id) {
      setError("Invalid user ID");
      setLoading(false);
      setShowModal(false); // Ensure modal is closed if no ID
      return;
    }

    const abortController = new AbortController();

    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://gachpala-server.onrender.com/api/v1/admin/users/${id}`
        );

        console.log(response);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `HTTP error! Status: ${response.status}`
          );
        }

        const data = await response.json();
        console.log(data);
        setUser(data);
        setShowModal(false); // Success, no need for modal
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message || "Failed to load user data");
          toast.error(error.message || "Failed to load user data");
          setShowModal(true); // Show modal on error
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    return () => abortController.abort();
  }, [id]);

  const statusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
            Inactive
          </Badge>
        );
      case "suspended":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            Suspended
          </Badge>
        );
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const roleBadge = (role) => {
    switch (role?.toLowerCase()) {
      case "vip":
        return (
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
            VIP
          </Badge>
        );
      case "admin":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            Admin
          </Badge>
        );
      default:
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            User
          </Badge>
        );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  const handleBack = () => {
    router.push("/admin/dashboard/users");
  };

  if (loading && !user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-2">
        <Loader className="h-8 w-8 animate-spin text-indigo-500" />
        <p className="text-gray-400">Loading user data...</p>
      </div>
    );
  }

  // Modal fallback for when the page fails but we have user data
  const renderUserProfile = () => (
    <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-gradient-to-r from-indigo-600 to-purple-600 text-xl">
              {user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl text-white">
              {user.name || "Unknown User"}
            </CardTitle>
            <div className="flex items-center space-x-3 mt-2">
              {statusBadge(user.status)}
              {roleBadge(user.role)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <User className="h-5 w-5 text-indigo-400 mr-3" />
              <div>
                <p className="text-gray-400 text-sm">Full Name</p>
                <p className="text-white">{user.name || "Not available"}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Mail className="h-5 w-5 text-indigo-400 mr-3" />
              <div>
                <p className="text-gray-400 text-sm">Email Address</p>
                <p className="text-white">{user.email || "Not available"}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-indigo-400 mr-3" />
              <div>
                <p className="text-gray-400 text-sm">Joined Date</p>
                <p className="text-white">{formatDate(user.joining_date)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-indigo-400 mr-3" />
              <div>
                <p className="text-gray-400 text-sm">Account Status</p>
                <p className="text-white capitalize">
                  {user.status || "unknown"}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Shield className="h-5 w-5 text-indigo-400 mr-3" />
              <div>
                <p className="text-gray-400 text-sm">User Role</p>
                <p className="text-white capitalize">{user.role || "user"}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="h-5 w-5 text-indigo-400 mr-3">📦</div>
              <div>
                <p className="text-gray-400 text-sm">Total Orders</p>
                <p className="text-white">{user.orders || 0}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex space-x-4">
          <Button
            variant="outline"
            className="bg-indigo-600/20 hover:bg-indigo-700/30 text-indigo-400 border-indigo-500/30"
            onClick={() =>
              router.push(`/admin/dashboard/users/${userId}/orders`)
            }
          >
            View Order History
          </Button>
          <Button
            variant="outline"
            className="bg-amber-600/20 hover:bg-amber-700/30 text-amber-400 border-amber-500/30"
            onClick={() => router.push(`/admin/dashboard/users?edit=${userId}`)}
          >
            Edit Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
            User Profile
          </h1>
          <p className="text-gray-400 mt-1">
            Detailed information about the user
          </p>
        </div>
        <Button variant="outline" onClick={handleBack}>
          Back to Users
        </Button>
      </div>

      {user ? (
        renderUserProfile()
      ) : (
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-8 text-center">
          <p className="text-gray-400">User not found</p>
        </div>
      )}

      {/* Fallback Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Error Loading User Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-300">
              {error || "Failed to load user profile"}
            </p>
            {user && (
              <div className="border-t border-gray-700 pt-4">
                {renderUserProfile()}
              </div>
            )}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleBack}>
                Back to Users
              </Button>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
