// app/seller/payments/page.jsx
"use client";

import { useState } from "react";
import {
  CreditCard,
  DollarSign,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  ArrowUpDown,
  Search,
  FileText,
  Banknote,
  ArrowRight,
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
import { format } from "date-fns";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([
    {
      id: "#PAY-001",
      date: "2023-11-18",
      amount: 1842.5,
      method: "Stripe",
      status: "Completed",
      orderId: "#ORD-001",
    },
    {
      id: "#PAY-002",
      date: "2023-11-15",
      amount: 987.25,
      method: "PayPal",
      status: "Completed",
      orderId: "#ORD-002",
    },
    {
      id: "#PAY-003",
      date: "2023-11-10",
      amount: 1245.75,
      method: "Bank Transfer",
      status: "Pending",
      orderId: "#ORD-003",
    },
    {
      id: "#PAY-004",
      date: "2023-11-05",
      amount: 754.99,
      method: "Stripe",
      status: "Completed",
      orderId: "#ORD-004",
    },
    {
      id: "#PAY-005",
      date: "2023-11-02",
      amount: 420.69,
      method: "PayPal",
      status: "Completed",
      orderId: "#ORD-005",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  // Filter and sort payments
  const filteredPayments = payments
    .filter((payment) => {
      const matchesSearch =
        payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.orderId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || payment.status === statusFilter;
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
      case "Completed":
        return `${baseClass} bg-emerald-500/20 text-emerald-400`;
      case "Pending":
        return `${baseClass} bg-amber-500/20 text-amber-400`;
      case "Failed":
        return `${baseClass} bg-rose-500/20 text-rose-400`;
      default:
        return `${baseClass} bg-gray-500/20 text-gray-400`;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  // Download statement
  const downloadStatement = () => {
    alert("Payment statement download would be implemented here");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Payment History</h1>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700/50 flex items-center gap-2"
            onClick={downloadStatement}
          >
            <Download className="h-4 w-4" />
            Export Statement
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Request Payout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Balance
            </CardTitle>
            <DollarSign className="h-5 w-5 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$8,450.75</div>
            <p className="text-xs text-gray-400 mt-1">Available for payout</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-400">
              Next Payout
            </CardTitle>
            <CreditCard className="h-5 w-5 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">Dec 15, 2023</div>
            <p className="text-xs text-gray-400 mt-1">Estimated payout date</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-400">
              Last Payout
            </CardTitle>
            <Banknote className="h-5 w-5 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$5,842.60</div>
            <p className="text-xs text-gray-400 mt-1">Nov 15, 2023</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white">Payment Transactions</CardTitle>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search payments..."
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
                    All Payments
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-emerald-400 hover:bg-emerald-500/10"
                    onClick={() => setStatusFilter("Completed")}
                  >
                    Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-amber-400 hover:bg-amber-500/10"
                    onClick={() => setStatusFilter("Pending")}
                  >
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-rose-400 hover:bg-rose-500/10"
                    onClick={() => setStatusFilter("Failed")}
                  >
                    Failed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-gray-400">
                  <button
                    onClick={() => requestSort("id")}
                    className="flex items-center gap-1"
                  >
                    Payment ID
                    <ArrowUpDown className="h-3 w-3 ml-1" />
                  </button>
                </TableHead>
                <TableHead className="text-gray-400">
                  <button
                    onClick={() => requestSort("date")}
                    className="flex items-center gap-1"
                  >
                    Date
                    <ArrowUpDown className="h-3 w-3 ml-1" />
                  </button>
                </TableHead>
                <TableHead className="text-gray-400">Order ID</TableHead>
                <TableHead className="text-gray-400">Amount</TableHead>
                <TableHead className="text-gray-400">Method</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-right text-gray-400">
                  Invoice
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow
                  key={payment.id}
                  className="border-gray-700 hover:bg-gray-700/30"
                >
                  <TableCell className="font-medium text-emerald-400">
                    {payment.id}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {formatDate(payment.date)}
                  </TableCell>
                  <TableCell className="text-white">
                    {payment.orderId}
                  </TableCell>
                  <TableCell className="text-emerald-400">
                    ${payment.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {payment.method}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(payment.status)}>
                      {payment.status}
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
                          <FileText className="h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-700/50 flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download Invoice
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-500 hover:bg-rose-500/10 flex items-center gap-2">
                          <ArrowRight className="h-4 w-4" />
                          Dispute Payment
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
            <CardTitle className="text-white">Payout Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg border border-gray-600">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-900/20 border border-emerald-500/30 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Banknote className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white">Chase Bank</p>
                  <p className="text-sm text-gray-400">•••• 4672</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
              >
                Change
              </Button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-sm">Next Payout Date</p>
                  <p className="text-white">Dec 15, 2023</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Payout Amount</p>
                  <p className="text-emerald-400">$8,450.75</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <div>
                  <p className="text-gray-400 text-sm">Payout Frequency</p>
                  <p className="text-white">Bi-Weekly</p>
                </div>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
                >
                  Edit Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-900/20 border border-emerald-500/30 w-12 h-12 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white">Stripe</p>
                    <p className="text-sm text-gray-400">Connected</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
                >
                  Manage
                </Button>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-900/20 border border-blue-500/30 w-12 h-12 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white">PayPal</p>
                    <p className="text-sm text-gray-400">Connected</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
                >
                  Manage
                </Button>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-900/20 border border-amber-500/30 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Banknote className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white">Bank Transfer</p>
                    <p className="text-sm text-gray-400">Connected</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
                >
                  Manage
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
