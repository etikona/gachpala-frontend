// app/admin/dashboard/users/[userId]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { User, Mail, Calendar, Shield, Loader } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function UserProfilePage({ params }) {
  const { userId } = params;
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5000/api/v1/admin/users/${userId}`
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch user");
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, toast]);
  const statusBadge = (status) => {
    switch (status) {
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
    switch (role.toLowerCase()) {
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
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleBack = () => {
    router.push("/admin/dashboard/users");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
        <p className="text-red-400">Error: {error}</p>
        <Button
          className="mt-3 bg-red-700 hover:bg-red-600"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

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
        <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-gradient-to-r from-indigo-600 to-purple-600 text-xl">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl text-white">
                  {user.name}
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
                    <p className="text-white">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-indigo-400 mr-3" />
                  <div>
                    <p className="text-gray-400 text-sm">Email Address</p>
                    <p className="text-white">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-indigo-400 mr-3" />
                  <div>
                    <p className="text-gray-400 text-sm">Joined Date</p>
                    <p className="text-white">
                      {formatDate(user.joining_date)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-indigo-400 mr-3" />
                  <div>
                    <p className="text-gray-400 text-sm">Account Status</p>
                    <p className="text-white capitalize">{user.status}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-indigo-400 mr-3" />
                  <div>
                    <p className="text-gray-400 text-sm">User Role</p>
                    <p className="text-white capitalize">{user.role}</p>
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
                onClick={() =>
                  router.push(`/admin/dashboard/users?edit=${userId}`)
                }
              >
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-8 text-center">
          <p className="text-gray-400">User not found</p>
        </div>
      )}
    </div>
  );
}
