// app/admin/dashboard/billing/page.jsx
"use client";

import { useState } from "react";
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
  ChevronDown,
  CreditCard,
  DollarSign,
  Receipt,
  Download,
  TrendingUp,
  FileText,
  Plus,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState("invoices");

  // Sample billing data
  const invoices = [
    {
      id: "INV-2023-001",
      date: "2023-06-01",
      dueDate: "2023-06-15",
      amount: "$1,245.00",
      status: "paid",
      method: "credit_card",
    },
    {
      id: "INV-2023-002",
      date: "2023-06-15",
      dueDate: "2023-06-30",
      amount: "$2,890.50",
      status: "pending",
      method: "bank_transfer",
    },
    {
      id: "INV-2023-003",
      date: "2023-05-15",
      dueDate: "2023-05-30",
      amount: "$1,780.25",
      status: "paid",
      method: "credit_card",
    },
    {
      id: "INV-2023-004",
      date: "2023-05-01",
      dueDate: "2023-05-15",
      amount: "$980.75",
      status: "paid",
      method: "paypal",
    },
    {
      id: "INV-2023-005",
      date: "2023-04-15",
      dueDate: "2023-04-30",
      amount: "$3,245.30",
      status: "overdue",
      method: "bank_transfer",
    },
  ];

  const payments = [
    {
      id: "PAY-2023-006",
      date: "2023-06-10",
      amount: "$1,245.00",
      method: "credit_card",
      invoice: "INV-2023-001",
    },
    {
      id: "PAY-2023-007",
      date: "2023-05-25",
      amount: "$1,780.25",
      method: "credit_card",
      invoice: "INV-2023-003",
    },
    {
      id: "PAY-2023-008",
      date: "2023-05-10",
      amount: "$980.75",
      method: "paypal",
      invoice: "INV-2023-004",
    },
    {
      id: "PAY-2023-009",
      date: "2023-04-20",
      amount: "$2,500.00",
      method: "bank_transfer",
      invoice: "INV-2023-005",
    },
  ];

  const statusBadge = (status) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            Pending
          </Badge>
        );
      case "overdue":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            Overdue
          </Badge>
        );
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const methodBadge = (method) => {
    switch (method) {
      case "credit_card":
        return (
          <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30">
            Credit Card
          </Badge>
        );
      case "paypal":
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            PayPal
          </Badge>
        );
      case "bank_transfer":
        return (
          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
            Bank Transfer
          </Badge>
        );
      default:
        return <Badge>Other</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
          Billing & Payments
        </h1>
        <p className="text-gray-400 mt-1">
          Manage invoices, payments, and billing information
        </p>
      </div>

      {/* Billing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-indigo-900/40 to-indigo-800/20 backdrop-blur-md border border-indigo-800/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-5 w-5 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$89,240</div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 backdrop-blur-md border border-emerald-800/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Outstanding Balance
            </CardTitle>
            <Receipt className="h-5 w-5 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$4,890.50</div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span>Due within 30 days</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-900/40 to-amber-800/20 backdrop-blur-md border border-amber-800/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Avg. Payment Time
            </CardTitle>
            <span className="h-5 w-5 text-amber-400">⏱️</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">7.2 days</div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span>Down from 9.1 last quarter</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-800/30 backdrop-blur-md border border-gray-700">
          <TabsTrigger
            value="invoices"
            className="data-[state=active]:bg-gray-700/50 data-[state=active]:text-white"
          >
            <FileText className="h-4 w-4 mr-2" />
            Invoices
          </TabsTrigger>
          <TabsTrigger
            value="payments"
            className="data-[state=active]:bg-gray-700/50 data-[state=active]:text-white"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Payments
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="data-[state=active]:bg-gray-700/50 data-[state=active]:text-white"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Financial Reports
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filters and Search */}
      <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700">
        <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={
                activeTab === "invoices"
                  ? "Search invoices..."
                  : "Search payments..."
              }
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
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
            >
              Date: Newest
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              {activeTab === "invoices" ? "Create Invoice" : "Record Payment"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      {activeTab === "invoices" && (
        <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-800/60">
              <TableRow>
                <TableHead className="text-gray-300">Invoice ID</TableHead>
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Due Date</TableHead>
                <TableHead className="text-gray-300">Amount</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Payment Method</TableHead>
                <TableHead className="text-right text-gray-300">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow
                  key={invoice.id}
                  className="border-gray-700 hover:bg-gray-800/50"
                >
                  <TableCell className="font-medium text-indigo-300">
                    {invoice.id}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {invoice.date}
                  </TableCell>
                  <TableCell className="text-gray-200">
                    {invoice.dueDate}
                  </TableCell>
                  <TableCell className="text-gray-200 font-semibold">
                    {invoice.amount}
                  </TableCell>
                  <TableCell>{statusBadge(invoice.status)}</TableCell>
                  <TableCell>{methodBadge(invoice.method)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-gray-800/80 backdrop-blur-md border border-gray-700"
                      >
                        <DropdownMenuItem className="text-gray-200 hover:bg-gray-700/50 focus:bg-gray-700/50">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-200 hover:bg-gray-700/50 focus:bg-gray-700/50">
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-200 hover:bg-gray-700/50 focus:bg-gray-700/50">
                          Send Reminder
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-amber-400 hover:bg-amber-500/20 focus:bg-amber-500/20">
                          Edit Invoice
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400 hover:bg-red-500/20 focus:bg-red-500/20">
                          Delete Invoice
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Payments Table */}
      {activeTab === "payments" && (
        <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-800/60">
              <TableRow>
                <TableHead className="text-gray-300">Payment ID</TableHead>
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Amount</TableHead>
                <TableHead className="text-gray-300">Method</TableHead>
                <TableHead className="text-gray-300">Invoice</TableHead>
                <TableHead className="text-right text-gray-300">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow
                  key={payment.id}
                  className="border-gray-700 hover:bg-gray-800/50"
                >
                  <TableCell className="font-medium text-indigo-300">
                    {payment.id}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {payment.date}
                  </TableCell>
                  <TableCell className="text-gray-200 font-semibold">
                    {payment.amount}
                  </TableCell>
                  <TableCell>{methodBadge(payment.method)}</TableCell>
                  <TableCell className="text-gray-400">
                    {payment.invoice}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-gray-800/80 backdrop-blur-md border border-gray-700"
                      >
                        <DropdownMenuItem className="text-gray-200 hover:bg-gray-700/50 focus:bg-gray-700/50">
                          <Download className="h-4 w-4 mr-2" />
                          Download Receipt
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-200 hover:bg-gray-700/50 focus:bg-gray-700/50">
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-amber-400 hover:bg-amber-500/20 focus:bg-amber-500/20">
                          Issue Refund
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400 hover:bg-red-500/20 focus:bg-red-500/20">
                          Void Payment
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Financial Reports */}
      {activeTab === "reports" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Revenue Report</CardTitle>
              <CardDescription className="text-gray-400">
                Monthly revenue performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <div className="h-full w-full flex items-end justify-between pt-8">
                  {[50, 70, 60, 90, 85, 95, 100].map((value, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-1"
                    >
                      <div className="text-xs text-gray-500 mb-1">
                        M{index + 1}
                      </div>
                      <div
                        className="w-4/5 bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-t"
                        style={{ height: `${value}%` }}
                      ></div>
                      <div className="text-xs mt-1">
                        ${(value * 100).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Payment Methods</CardTitle>
              <CardDescription className="text-gray-400">
                Distribution of payment methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-80">
                <div className="relative w-64 h-64">
                  {/* Pie chart would go here */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        $89,240
                      </div>
                      <div className="text-gray-400">Total Revenue</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-indigo-500 rounded-full mr-2"></div>
                  <div>
                    <div className="text-gray-300">Credit Card</div>
                    <div className="text-gray-400">62%</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                  <div>
                    <div className="text-gray-300">PayPal</div>
                    <div className="text-gray-400">23%</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-500 rounded-full mr-2"></div>
                  <div>
                    <div className="text-gray-300">Bank Transfer</div>
                    <div className="text-gray-400">15%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-white">Outstanding Invoices</CardTitle>
              <CardDescription className="text-gray-400">
                Invoices due in the next 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <div className="overflow-y-auto max-h-72">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices
                        .filter((i) => i.status !== "paid")
                        .map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell className="font-medium">
                              {invoice.id}
                            </TableCell>
                            <TableCell>Green Thumb Nursery</TableCell>
                            <TableCell>{invoice.dueDate}</TableCell>
                            <TableCell>{invoice.amount}</TableCell>
                            <TableCell>{statusBadge(invoice.status)}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          {activeTab === "invoices" && "Showing 1 to 5 of 42 invoices"}
          {activeTab === "payments" && "Showing 1 to 4 of 28 payments"}
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
