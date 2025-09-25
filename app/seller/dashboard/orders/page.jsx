// app/seller/orders/page.jsx
"use client";

import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Filter,
  MoreHorizontal,
  CheckCircle,
  Truck,
  XCircle,
  ArrowUpDown,
  Search,
  Eye,
  Printer,
  Download,
  Loader,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "created_at",
    direction: "desc",
  });
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  // Fetch seller orders
  const fetchSellerOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://gachpala-server.onrender.com/api/v1/orders/seller/orders",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders", {
        style: {
          background: "#1f2937",
          color: "white",
          border: "1px solid #374151",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // Cancel order
  const cancelOrder = async (orderId) => {
    try {
      setCancellingOrderId(orderId);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://gachpala-server.onrender.com/api/v1/orders/${orderId}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel order");
      }

      const updatedOrder = await response.json();

      // Update the order in the local state
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? updatedOrder : order))
      );

      toast.success("Order cancelled successfully", {
        style: {
          background: "#065f46",
          color: "white",
          border: "1px solid #047857",
        },
      });
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel order", {
        style: {
          background: "#7f1d1d",
          color: "white",
          border: "1px solid #991b1b",
        },
      });
    } finally {
      setCancellingOrderId(null);
    }
  };

  // Filter and sort orders
  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user_email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortConfig.key) {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
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
    const statusConfig = {
      pending: {
        variant: "secondary",
        label: "Pending",
        className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      },
      processing: {
        variant: "default",
        label: "Processing",
        className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      },
      shipped: {
        variant: "default",
        label: "Shipped",
        className: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      },
      completed: {
        variant: "success",
        label: "Completed",
        className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      },
      cancelled: {
        variant: "destructive",
        label: "Cancelled",
        className: "bg-rose-500/20 text-rose-400 border-rose-500/30",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Print invoice
  const printInvoice = () => {
    window.print();
  };

  // Download invoice
  const downloadInvoice = () => {
    alert("Invoice download functionality would be implemented here");
  };

  useEffect(() => {
    fetchSellerOrders();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Order Management</h1>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search orders..."
                className="pl-10 bg-gray-700/50 border-gray-600 text-white w-64"
                disabled
              />
            </div>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700/50 flex items-center gap-2"
              disabled
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-4 bg-gray-800/30 border border-gray-700 rounded-lg"
                >
                  <div className="space-y-2">
                    <div className="h-4 w-40 bg-gray-700 rounded"></div>
                    <div className="h-3 w-32 bg-gray-700 rounded"></div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="h-4 w-20 bg-gray-700 rounded"></div>
                    <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Order Management</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search orders..."
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
                All Orders
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-amber-400 hover:bg-amber-500/10"
                onClick={() => setStatusFilter("pending")}
              >
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-blue-400 hover:bg-blue-500/10"
                onClick={() => setStatusFilter("processing")}
              >
                Processing
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-purple-400 hover:bg-purple-500/10"
                onClick={() => setStatusFilter("shipped")}
              >
                Shipped
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-emerald-400 hover:bg-emerald-500/10"
                onClick={() => setStatusFilter("completed")}
              >
                Completed
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-rose-400 hover:bg-rose-500/10"
                onClick={() => setStatusFilter("cancelled")}
              >
                Cancelled
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-gray-400">
                  <button
                    onClick={() => requestSort("id")}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    Order ID
                    <ArrowUpDown className="h-3 w-3 ml-1" />
                  </button>
                </TableHead>
                <TableHead className="text-gray-400">
                  <button
                    onClick={() => requestSort("user_name")}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    Customer
                    <ArrowUpDown className="h-3 w-3 ml-1" />
                  </button>
                </TableHead>
                <TableHead className="text-gray-400">
                  <button
                    onClick={() => requestSort("created_at")}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    Date
                    <ArrowUpDown className="h-3 w-3 ml-1" />
                  </button>
                </TableHead>
                <TableHead className="text-gray-400">
                  <button
                    onClick={() => requestSort("total")}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    Amount
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
              {filteredOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className="border-gray-700 hover:bg-gray-700/30"
                >
                  <TableCell className="font-medium text-emerald-400">
                    #{order.id}
                  </TableCell>
                  <TableCell className="text-white">
                    <div>
                      <div className="font-medium">{order.user_name}</div>
                      <div className="text-sm text-gray-400">
                        {order.user_email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {formatDate(order.created_at)}
                  </TableCell>
                  <TableCell className="text-emerald-400 font-medium">
                    {formatCurrency(order.total)}
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-800 border-gray-700">
                        <DropdownMenuItem
                          className="text-gray-300 hover:bg-gray-700/50 flex items-center gap-2"
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {order.status === "pending" && (
                          <DropdownMenuItem
                            className="text-rose-400 hover:bg-rose-500/10 flex items-center gap-2"
                            onClick={() => cancelOrder(order.id)}
                            disabled={cancellingOrderId === order.id}
                          >
                            {cancellingOrderId === order.id ? (
                              <Loader className="h-4 w-4 animate-spin" />
                            ) : (
                              <XCircle className="h-4 w-4" />
                            )}
                            {cancellingOrderId === order.id
                              ? "Cancelling..."
                              : "Cancel Order"}
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No orders found</p>
              {searchTerm || statusFilter !== "all" ? (
                <p className="text-sm text-gray-500 mt-2">
                  Try adjusting your search or filter criteria
                </p>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 max-w-3xl">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="text-white">
                  Order Details: #{selectedOrder.id}
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Placed on {formatDate(selectedOrder.created_at)}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div>
                  <h3 className="font-semibold text-white mb-3">
                    Customer Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-400">Name:</span>{" "}
                      {selectedOrder.user_name}
                    </p>
                    <p>
                      <span className="text-gray-400">Email:</span>{" "}
                      {selectedOrder.user_email}
                    </p>
                    {selectedOrder.user_phone && (
                      <p>
                        <span className="text-gray-400">Phone:</span>{" "}
                        {selectedOrder.user_phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-3">
                    Order Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-400">Status:</span>{" "}
                      {getStatusBadge(selectedOrder.status)}
                    </p>
                    <p>
                      <span className="text-gray-400">Total:</span>{" "}
                      {formatCurrency(selectedOrder.total)}
                    </p>
                    <p>
                      <span className="text-gray-400">Payment Method:</span>{" "}
                      {selectedOrder.payment_method || "N/A"}
                    </p>
                    {selectedOrder.shipping_address && (
                      <p>
                        <span className="text-gray-400">Shipping Address:</span>{" "}
                        {selectedOrder.shipping_address}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <DialogFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700/50 flex items-center gap-2"
                    onClick={printInvoice}
                  >
                    <Printer className="h-4 w-4" />
                    Print Invoice
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700/50 flex items-center gap-2"
                    onClick={downloadInvoice}
                  >
                    <Download className="h-4 w-4" />
                    Download Invoice
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    className={`${
                      selectedOrder.status === "Processing"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : selectedOrder.status === "Shipped"
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-amber-600 hover:bg-amber-700"
                    }`}
                  >
                    {selectedOrder.status === "Processing"
                      ? "Process Order"
                      : selectedOrder.status === "Shipped"
                      ? "Mark as Delivered"
                      : "Update Status"}
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
