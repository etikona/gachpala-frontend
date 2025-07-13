// app/seller/customers/page.jsx
"use client";

import { useState } from "react";
import {
  User,
  Search,
  Filter,
  Mail,
  Phone,
  ShoppingCart,
  DollarSign,
  Calendar,
  MapPin,
  ArrowUpDown,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

export default function CustomersPage() {
  const [customers, setCustomers] = useState([
    {
      id: "CUST-001",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      orders: 12,
      spent: 1842.5,
      lastOrder: "2023-11-18",
      status: "Active",
    },
    {
      id: "CUST-002",
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      phone: "+1 (555) 987-6543",
      location: "Boston, MA",
      orders: 8,
      spent: 987.25,
      lastOrder: "2023-11-17",
      status: "Active",
    },
    {
      id: "CUST-003",
      name: "Michael Brown",
      email: "m.brown@example.com",
      phone: "+1 (555) 456-7890",
      location: "Chicago, IL",
      orders: 5,
      spent: 745.75,
      lastOrder: "2023-11-16",
      status: "Active",
    },
    {
      id: "CUST-004",
      name: "Emily Davis",
      email: "emily.d@example.com",
      phone: "+1 (555) 234-5678",
      location: "Seattle, WA",
      orders: 15,
      spent: 2450.99,
      lastOrder: "2023-11-15",
      status: "VIP",
    },
    {
      id: "CUST-005",
      name: "James Wilson",
      email: "james.w@example.com",
      phone: "+1 (555) 876-5432",
      location: "Austin, TX",
      orders: 3,
      spent: 420.5,
      lastOrder: "2023-11-14",
      status: "New",
    },
    {
      id: "CUST-006",
      name: "Olivia Martinez",
      email: "olivia.m@example.com",
      phone: "+1 (555) 345-6789",
      location: "San Francisco, CA",
      orders: 22,
      spent: 3840.25,
      lastOrder: "2023-11-12",
      status: "VIP",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  // Filter and sort customers
  const filteredCustomers = customers
    .filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || customer.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortConfig.key) {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
      }
      return 0;
    });

  // Handle sorting
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Status badge styling
  const getStatusBadge = (status) => {
    const baseClass = "px-2 py-1 rounded-full text-xs";
    switch (status) {
      case "VIP":
        return `${baseClass} bg-purple-500/20 text-purple-400`;
      case "Active":
        return `${baseClass} bg-emerald-500/20 text-emerald-400`;
      case "New":
        return `${baseClass} bg-blue-500/20 text-blue-400`;
      case "Inactive":
        return `${baseClass} bg-gray-500/20 text-gray-400`;
      default:
        return `${baseClass} bg-gray-500/20 text-gray-400`;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Customer Management</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-700/50 border-gray-600 text-white w-64"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700/50 flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                {statusFilter === "all" ? "Filter" : statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 border-gray-700">
              <DropdownMenuItem
                className="text-gray-300 hover:bg-gray-700/50"
                onClick={() => setStatusFilter("all")}
              >
                All Customers
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-purple-400 hover:bg-purple-500/10"
                onClick={() => setStatusFilter("VIP")}
              >
                VIP
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-emerald-400 hover:bg-emerald-500/10"
                onClick={() => setStatusFilter("Active")}
              >
                Active
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-blue-400 hover:bg-blue-500/10"
                onClick={() => setStatusFilter("New")}
              >
                New
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-gray-400 hover:bg-gray-500/10"
                onClick={() => setStatusFilter("Inactive")}
              >
                Inactive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Customers
            </CardTitle>
            <User className="h-5 w-5 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {customers.length}
            </div>
            <p className="text-xs text-gray-400 mt-1">Registered customers</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-400">
              Active Customers
            </CardTitle>
            <User className="h-5 w-5 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {
                customers.filter(
                  (c) => c.status === "Active" || c.status === "VIP"
                ).length
              }
            </div>
            <p className="text-xs text-gray-400 mt-1">Currently active</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-400">
              Repeat Rate
            </CardTitle>
            <ShoppingCart className="h-5 w-5 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">68%</div>
            <p className="text-xs text-gray-400 mt-1">
              Customers with multiple orders
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-gray-400">Customer</TableHead>
                <TableHead className="text-gray-400">Contact</TableHead>
                <TableHead className="text-gray-400">
                  <button
                    onClick={() => requestSort("location")}
                    className="flex items-center gap-1"
                  >
                    Location
                    <ArrowUpDown className="h-3 w-3 ml-1" />
                  </button>
                </TableHead>
                <TableHead className="text-gray-400">
                  <button
                    onClick={() => requestSort("orders")}
                    className="flex items-center gap-1"
                  >
                    Orders
                    <ArrowUpDown className="h-3 w-3 ml-1" />
                  </button>
                </TableHead>
                <TableHead className="text-gray-400">
                  <button
                    onClick={() => requestSort("spent")}
                    className="flex items-center gap-1"
                  >
                    Total Spent
                    <ArrowUpDown className="h-3 w-3 ml-1" />
                  </button>
                </TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-right text-gray-400">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow
                  key={customer.id}
                  className="border-gray-700 hover:bg-gray-700/30"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={`https://i.pravatar.cc/150?u=${customer.email}`}
                        />
                        <AvatarFallback className="bg-gray-700">
                          {customer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-white">
                          {customer.name}
                        </p>
                        <p className="text-xs text-gray-400">{customer.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Phone className="h-4 w-4" />
                        <span className="text-sm">{customer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {customer.location}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {customer.orders}
                  </TableCell>
                  <TableCell className="text-emerald-400">
                    ${customer.spent.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(customer.status)}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-800 border-gray-700">
                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-700/50 flex items-center gap-2">
                          <User className="h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-700/50 flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-700/50 flex items-center gap-2">
                          <ShoppingCart className="h-4 w-4" />
                          View Orders
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Top Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers
                .sort((a, b) => b.spent - a.spent)
                .slice(0, 5)
                .map((customer) => (
                  <div
                    key={customer.id}
                    className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg border border-gray-600"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={`https://i.pravatar.cc/150?u=${customer.email}`}
                        />
                        <AvatarFallback className="bg-gray-700">
                          {customer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-white">
                          {customer.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 font-bold">
                        ${customer.spent.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {customer.orders} orders
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Customer Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400">New Customers (30d)</p>
                  <p className="text-white text-2xl font-bold">24</p>
                </div>
                <div className="bg-emerald-900/20 border border-emerald-500/30 w-10 h-10 rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5 text-emerald-400" />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <div>
                  <p className="text-gray-400">Repeat Purchase Rate</p>
                  <p className="text-white text-2xl font-bold">68%</p>
                </div>
                <div className="bg-purple-900/20 border border-purple-500/30 w-10 h-10 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-purple-400" />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <div>
                  <p className="text-gray-400">Avg. Order Value</p>
                  <p className="text-white text-2xl font-bold">$124.50</p>
                </div>
                <div className="bg-blue-900/20 border border-blue-500/30 w-10 h-10 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-blue-400" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
