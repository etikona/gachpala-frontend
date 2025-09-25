// app/admin/dashboard/users/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Filter,
  MoreHorizontal,
  User,
  Mail,
  Calendar,
  Loader,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function UsersPage() {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [userUpdates, setUserUpdates] = useState({
    name: "",
    email: "",
    status: "",
    role: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  // Fetch user data
  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      let url = `https://gachpala-server.onrender.com/api/v1/admin/users?page=${page}&limit=10`;

      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }

      if (filter !== "all") {
        url += `&status=${filter}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch users");

      setUsers(data.users);
      setCurrentPage(data.pagination.currentPage);
      setTotalPages(data.pagination.totalPages);
      setTotalUsers(data.pagination.totalUsers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      const res = await fetch(
        "https://gachpala-server.onrender.com/api/v1/admin/users/stats"
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch stats");

      setStats({
        total_users: parseInt(data.total_users),
        active_users: parseInt(data.active_users),
        vip_users: parseInt(data.vip_users),
        avg_orders_per_active: parseFloat(data.avg_orders_per_active),
      });
    } catch (err) {
      console.error("Failed to load stats:", err.message);
    }
  };

  // Handle user actions
  const handleUserAction = async (action, userId) => {
    try {
      let url = "";
      let method = "PATCH";
      let body = null;

      switch (action) {
        case "suspend":
          url = `https://gachpala-server.onrender.com/api/v1/admin/users/${userId}/suspend`;
          break;
        case "activate":
          url = `https://gachpala-server.onrender.com/api/v1/admin/users/${userId}/activate`;
          break;
        case "delete":
          url = `https://gachpala-server.onrender.com/api/v1/admin/users/${userId}`;
          method = "DELETE";
          break;
        case "promote":
          url = `https://gachpala-server.onrender.com/api/v1/admin/users/${userId}`;
          method = "PUT";
          body = JSON.stringify({ role: "VIP" });
          break;
        case "demote":
          url = `https://gachpala-server.onrender.com/api/v1/admin/users/${userId}`;
          method = "PUT";
          body = JSON.stringify({ role: "user" });
          break;
        default:
          return;
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Action failed");

      toast({
        title: "Success",
        description: result.msg || "Action completed successfully",
      });

      // Refresh data
      fetchUsers(currentPage);
      fetchStats();
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to perform action",
        variant: "destructive",
      });
    } finally {
      setSuspendDialogOpen(false);
      setDeleteDialogOpen(false);
    }
  };

  // Open edit modal
  const openEditModal = (user) => {
    setSelectedUser(user);
    setUserUpdates({
      name: user.name,
      email: user.email,
      status: user.status,
      role: user.role,
    });
    setEditModalOpen(true);
  };

  // Save user updates
  const saveUserUpdates = async () => {
    if (!selectedUser) return;

    try {
      setIsSaving(true);
      const res = await fetch(
        `https://gachpala-server.onrender.com/api/v1/admin/users/${selectedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userUpdates),
        }
      );

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Update failed");

      toast({
        title: "Success",
        description: "User updated successfully",
      });

      fetchUsers(currentPage);
      setEditModalOpen(false);
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to update user",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // View user profile
  const viewProfile = (userId) => {
    router.push(`/admin/dashboard/users/${userId}`);
  };

  // View order history
  const viewOrderHistory = (userId) => {
    router.push(`/admin/dashboard/users/${userId}/orders`);
  };

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  // Handle search and filter changes
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchUsers(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery, filter]);

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    fetchUsers(page);
  };

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

  if (loading && !users.length) {
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
          onClick={() => {
            fetchUsers();
            fetchStats();
          }}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
          User Management
        </h1>
        <p className="text-gray-400 mt-1">
          Manage and monitor all user accounts
        </p>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-indigo-900/40 to-indigo-800/20 backdrop-blur-md border border-indigo-800/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Total Users
            </CardTitle>
            <User className="h-5 w-5 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {stats?.total_users || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 backdrop-blur-md border border-emerald-800/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Active Users
            </CardTitle>
            <span className="h-5 w-5 text-emerald-400">✅</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {stats?.active_users || 0}
            </div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span>
                {stats && stats.total_users > 0
                  ? `${Math.round(
                      (stats.active_users / stats.total_users) * 100
                    )}% active`
                  : "0% active"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-900/40 to-amber-800/20 backdrop-blur-md border border-amber-800/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              VIP Members
            </CardTitle>
            <span className="h-5 w-5 text-amber-400">⭐</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {stats?.vip_users || 0}
            </div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span>
                {stats && stats.total_users > 0
                  ? `${Math.round(
                      (stats.vip_users / stats.total_users) * 100
                    )}% of total`
                  : "0% of total"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-md border border-purple-800/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Avg. Orders
            </CardTitle>
            <span className="h-5 w-5 text-purple-400">📦</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {stats?.avg_orders_per_active
                ? parseFloat(stats.avg_orders_per_active).toFixed(1)
                : "0.0"}
            </div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span>Per active user</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700">
        <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-800/50 border border-gray-700 text-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">All Users</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="inactive">Inactive</option>
            </select>

            <Button
              variant="outline"
              className="bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
              onClick={() => {
                setSearchQuery("");
                setFilter("all");
                fetchUsers(1);
              }}
            >
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-800/60">
            <TableRow>
              <TableHead className="text-gray-300">User</TableHead>
              <TableHead className="text-gray-300">Email</TableHead>
              <TableHead className="text-gray-300">Joined</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              <TableHead className="text-gray-300">Role</TableHead>
              <TableHead className="text-gray-300">Orders</TableHead>
              <TableHead className="text-right text-gray-300">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 && !loading ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-gray-400"
                >
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-gray-700 hover:bg-gray-800/50"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarFallback className="bg-gradient-to-r from-indigo-600 to-purple-600">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-200">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {formatDate(user.joining_date)}
                    </div>
                  </TableCell>
                  <TableCell>{statusBadge(user.status)}</TableCell>
                  <TableCell>{roleBadge(user.role)}</TableCell>
                  <TableCell className="text-gray-200 font-semibold">
                    {user.orders}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-gray-800/80 backdrop-blur-md border border-gray-700"
                      >
                        <DropdownMenuItem
                          className="text-gray-200 hover:bg-gray-700/50 focus:bg-gray-700/50"
                          onClick={() => viewProfile(user.id)}
                        >
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-gray-200 hover:bg-gray-700/50 focus:bg-gray-700/50"
                          onClick={() => openEditModal(user)}
                        >
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-gray-200 hover:bg-gray-700/50 focus:bg-gray-700/50"
                          onClick={() => viewOrderHistory(user.id)}
                        >
                          Order History
                        </DropdownMenuItem>

                        {user.role === "VIP" ? (
                          <DropdownMenuItem
                            className="text-blue-400 hover:bg-blue-500/20 focus:bg-blue-500/20"
                            onClick={() => handleUserAction("demote", user.id)}
                          >
                            Demote to User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            className="text-purple-400 hover:bg-purple-500/20 focus:bg-purple-500/20"
                            onClick={() => handleUserAction("promote", user.id)}
                          >
                            Promote to VIP
                          </DropdownMenuItem>
                        )}

                        {user.status === "suspended" ? (
                          <DropdownMenuItem
                            className="text-emerald-400 hover:bg-emerald-500/20 focus:bg-emerald-500/20"
                            onClick={() =>
                              handleUserAction("activate", user.id)
                            }
                          >
                            Activate Account
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            className="text-amber-400 hover:bg-amber-500/20 focus:bg-amber-500/20"
                            onClick={() => {
                              setSelectedUser(user);
                              setSuspendDialogOpen(true);
                            }}
                          >
                            Suspend Account
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuItem
                          className="text-red-400 hover:bg-red-500/20 focus:bg-red-500/20"
                          onClick={() => {
                            setSelectedUser(user);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Showing {(currentPage - 1) * 10 + 1} to{" "}
          {Math.min(currentPage * 10, totalUsers)} of {totalUsers} users
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                className={`${
                  currentPage === pageNum
                    ? "bg-indigo-600"
                    : "bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
                }`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </Button>
            );
          })}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <span className="px-3 py-1 text-gray-400">...</span>
          )}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <Button
              variant="outline"
              className="bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </Button>
          )}

          <Button
            variant="outline"
            className="bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Edit User Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user details below</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input
                id="name"
                value={userUpdates.name}
                onChange={(e) =>
                  setUserUpdates({ ...userUpdates, name: e.target.value })
                }
                className="col-span-3 bg-gray-700 border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <Input
                id="email"
                value={userUpdates.email}
                onChange={(e) =>
                  setUserUpdates({ ...userUpdates, email: e.target.value })
                }
                className="col-span-3 bg-gray-700 border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right">
                Status
              </label>
              <select
                id="status"
                value={userUpdates.status}
                onChange={(e) =>
                  setUserUpdates({ ...userUpdates, status: e.target.value })
                }
                className="col-span-3 bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="role" className="text-right">
                Role
              </label>
              <select
                id="role"
                value={userUpdates.role}
                onChange={(e) =>
                  setUserUpdates({ ...userUpdates, role: e.target.value })
                }
                className="col-span-3 bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2"
              >
                <option value="user">User</option>
                <option value="VIP">VIP</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditModalOpen(false)}
              className="bg-gray-700 border-gray-600"
            >
              Cancel
            </Button>
            <Button
              onClick={saveUserUpdates}
              disabled={isSaving}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isSaving ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              {selectedUser?.name} is account and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-700 border-gray-600 hover:bg-gray-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleUserAction("delete", selectedUser?.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Suspend Confirmation Dialog */}
      <AlertDialog open={suspendDialogOpen} onOpenChange={setSuspendDialogOpen}>
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Suspend User Account?</AlertDialogTitle>
            <AlertDialogDescription>
              Suspending {selectedUser?.name}is account will restrict their
              access to the platform. You can reactivate their account at any
              time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-700 border-gray-600 hover:bg-gray-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleUserAction("suspend", selectedUser?.id)}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Suspend Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
