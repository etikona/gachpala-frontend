// app/admin/dashboard/orders/page.jsx
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
  ShoppingCart,
  CheckCircle,
  XCircle,
  Truck,
  CreditCard,
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

export default function OrdersPage() {
  // Sample order data
  const orders = [
    {
      id: "ORD-001",
      customer: "John Smith",
      date: "2023-06-15",
      status: "completed",
      amount: "$128.50",
      payment: "credit_card",
      items: 3,
    },
    {
      id: "ORD-002",
      customer: "Sarah Johnson",
      date: "2023-06-16",
      status: "processing",
      amount: "$89.99",
      payment: "paypal",
      items: 2,
    },
    {
      id: "ORD-003",
      customer: "Michael Brown",
      date: "2023-06-16",
      status: "shipped",
      amount: "$245.75",
      payment: "credit_card",
      items: 5,
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      date: "2023-06-17",
      status: "pending",
      amount: "$54.30",
      payment: "stripe",
      items: 1,
    },
    {
      id: "ORD-005",
      customer: "David Wilson",
      date: "2023-06-18",
      status: "cancelled",
      amount: "$199.99",
      payment: "credit_card",
      items: 4,
    },
    {
      id: "ORD-006",
      customer: "Jennifer Lee",
      date: "2023-06-18",
      status: "completed",
      amount: "$76.45",
      payment: "paypal",
      items: 2,
    },
    {
      id: "ORD-007",
      customer: "Robert Garcia",
      date: "2023-06-19",
      status: "shipped",
      amount: "$320.00",
      payment: "credit_card",
      items: 6,
    },
  ];

  const statusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <CheckCircle className="h-3 w-3 mr-1" /> Completed
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            Processing
          </Badge>
        );
      case "shipped":
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Truck className="h-3 w-3 mr-1" /> Shipped
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
            Pending
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <XCircle className="h-3 w-3 mr-1" /> Cancelled
          </Badge>
        );
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const paymentIcon = (method) => {
    switch (method) {
      case "credit_card":
        return <CreditCard className="h-4 w-4 text-indigo-400" />;
      case "paypal":
        return <span className="text-blue-500 font-bold text-xs">PP</span>;
      case "stripe":
        return <span className="text-purple-500 font-bold text-xs">S</span>;
      default:
        return <span>💰</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
          Order Management
        </h1>
        <p className="text-gray-400 mt-1">Manage and track customer orders</p>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-indigo-900/40 to-indigo-800/20 backdrop-blur-md border border-indigo-800/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Total Orders
            </CardTitle>
            <ShoppingCart className="h-5 w-5 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1,892</div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span>+12.3% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 backdrop-blur-md border border-emerald-800/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Completed
            </CardTitle>
            <CheckCircle className="h-5 w-5 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1,245</div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span>65.7% success rate</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-900/40 to-amber-800/20 backdrop-blur-md border border-amber-800/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Processing
            </CardTitle>
            <span className="h-5 w-5 text-amber-400">🔄</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">328</div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span>Avg. 2 days to ship</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-900/40 to-red-800/20 backdrop-blur-md border border-red-800/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Cancelled
            </CardTitle>
            <XCircle className="h-5 w-5 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">87</div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span>4.6% cancellation rate</span>
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
              placeholder="Search orders..."
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
              Date: Newest
              <ArrowUpDown className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-800/60">
            <TableRow>
              <TableHead className="text-gray-300">Order ID</TableHead>
              <TableHead className="text-gray-300">Customer</TableHead>
              <TableHead className="text-gray-300">Date</TableHead>
              <TableHead className="text-gray-300">Items</TableHead>
              <TableHead className="text-gray-300">Amount</TableHead>
              <TableHead className="text-gray-300">Payment</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              <TableHead className="text-right text-gray-300">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                className="border-gray-700 hover:bg-gray-800/50"
              >
                <TableCell className="font-medium text-indigo-300">
                  {order.id}
                </TableCell>
                <TableCell className="text-gray-200">
                  {order.customer}
                </TableCell>
                <TableCell className="text-gray-400">{order.date}</TableCell>
                <TableCell className="text-gray-400">{order.items}</TableCell>
                <TableCell className="text-gray-200 font-semibold">
                  {order.amount}
                </TableCell>
                <TableCell className="text-gray-400 flex items-center">
                  {paymentIcon(order.payment)}
                  <span className="ml-2 capitalize">
                    {order.payment.replace("_", " ")}
                  </span>
                </TableCell>
                <TableCell>{statusBadge(order.status)}</TableCell>
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
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-200 hover:bg-gray-700/50 focus:bg-gray-700/50">
                        Edit Status
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-200 hover:bg-gray-700/50 focus:bg-gray-700/50">
                        Contact Customer
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400 hover:bg-red-500/20 focus:bg-red-500/20">
                        Cancel Order
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
          Showing 1 to 7 of 1,892 orders
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
