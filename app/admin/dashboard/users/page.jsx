// app/admin/dashboard/users/page.jsx
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  User,
  Mail,
  Calendar,
  Shield,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UsersPage() {
  // Sample user data
  const users = [
    {
      id: "USR-001",
      name: "John Smith",
      email: "john@example.com",
      joined: "2023-01-15",
      status: "active",
      orders: 12,
      role: "user",
    },
    {
      id: "USR-002",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      joined: "2023-02-22",
      status: "active",
      orders: 5,
      role: "user",
    },
    {
      id: "USR-003",
      name: "Michael Brown",
      email: "michael@example.com",
      joined: "2023-03-10",
      status: "inactive",
      orders: 0,
      role: "user",
    },
    {
      id: "USR-004",
      name: "Emily Davis",
      email: "emily@example.com",
      joined: "2023-04-05",
      status: "active",
      orders: 8,
      role: "vip",
    },
    {
      id: "USR-005",
      name: "David Wilson",
      email: "david@example.com",
      joined: "2023-05-18",
      status: "suspended",
      orders: 3,
      role: "user",
    },
    {
      id: "USR-006",
      name: "Jennifer Lee",
      email: "jennifer@example.com",
      joined: "2023-06-01",
      status: "active",
      orders: 15,
      role: "vip",
    },
    {
      id: "USR-007",
      name: "Robert Garcia",
      email: "robert@example.com",
      joined: "2023-06-12",
      status: "active",
      orders: 7,
      role: "user",
    },
  ];

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
    switch (role) {
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
            <div className="text-2xl font-bold text-white">12,387</div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span>+180 in last 24h</span>
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
            <div className="text-2xl font-bold text-white">10,245</div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span>82.7% activity rate</span>
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
            <div className="text-2xl font-bold text-white">1,432</div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span>11.6% of total</span>
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
            <div className="text-2xl font-bold text-white">5.2</div>
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
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              className="bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button
              variant="outline"
              className="bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
            >
              Newest
              <ArrowUpDown className="h-4 w-4 ml-2" />
            </Button>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              + Add User
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
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="border-gray-700 hover:bg-gray-800/50"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src="" alt={user.name} />
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
                    {user.joined}
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
                      <DropdownMenuItem className="text-gray-200 hover:bg-gray-700/50 focus:bg-gray-700/50">
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-200 hover:bg-gray-700/50 focus:bg-gray-700/50">
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-200 hover:bg-gray-700/50 focus:bg-gray-700/50">
                        Order History
                      </DropdownMenuItem>
                      {user.status === "suspended" ? (
                        <DropdownMenuItem className="text-emerald-400 hover:bg-emerald-500/20 focus:bg-emerald-500/20">
                          Activate Account
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-amber-400 hover:bg-amber-500/20 focus:bg-amber-500/20">
                          Suspend Account
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-400 hover:bg-red-500/20 focus:bg-red-500/20">
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Showing 1 to 7 of 12,387 users
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            className="bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
