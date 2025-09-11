"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Loader2,
  X,
  Edit,
  Trash2,
  Save,
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
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isNotesEditMode, setIsNotesEditMode] = useState(false);
  const [notesContent, setNotesContent] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "created_at",
    direction: "desc",
  });

  // Fetch orders data
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/v1/orders/admin/all");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      console.log(data);
      setOrders(data);
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.error("Fetch orders error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats data
  const fetchStats = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/orders/admin/stats"
      );
      if (!res.ok) throw new Error("Failed to fetch stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      toast.error("Failed to fetch stats");
      console.error("Fetch stats error:", error);
    }
  };

  // Update order status
  const updateStatus = async (orderId, status) => {
    try {
      setUpdating(orderId);
      const res = await fetch(
        `http://localhost:5000/api/v1/orders/admin/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success(`Order status updated to ${status}`);
        fetchOrders();
        fetchStats(); // Refresh stats after status change
      } else {
        throw new Error(data.msg || "Failed to update status");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdating(null);
    }
  };

  // Update order notes
  const updateNotes = async (orderId, notes) => {
    try {
      setUpdating(orderId);
      const res = await fetch(
        `http://localhost:5000/api/v1/orders/admin/${orderId}/notes`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ notes }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Order notes updated successfully");
        setIsNotesEditMode(false);
        // Update the selected order with new notes
        setSelectedOrder((prev) => ({ ...prev, notes: notes }));
        // Also update the order in the main list
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, notes: notes } : order
          )
        );
      } else {
        throw new Error(data.msg || "Failed to update notes");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdating(null);
    }
  };

  // Cancel order
  const cancelOrder = async (orderId) => {
    try {
      setUpdating(orderId);
      const res = await fetch(
        `http://localhost:5000/api/v1/orders/admin/${orderId}/cancel`,
        {
          method: "PUT",
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Order cancelled successfully");
        fetchOrders();
        fetchStats();
      } else {
        throw new Error(data.msg || "Failed to cancel order");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdating(null);
    }
  };

  // Delete order
  const deleteOrder = async (orderId) => {
    try {
      setUpdating(orderId);
      const res = await fetch(
        `http://localhost:5000/api/v1/orders/admin/${orderId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Order deleted successfully");
        setIsDeleteDialogOpen(false);
        fetchOrders();
        fetchStats();
      } else {
        throw new Error(data.msg || "Failed to delete order");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdating(null);
      setOrderToDelete(null);
    }
  };

  // View order details
  const viewDetails = async (orderId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/orders/admin/${orderId}`
      );
      const data = await res.json();
      if (res.ok) {
        setSelectedOrder(data);
        setNotesContent(data.notes || "");
        setIsModalOpen(true);
      } else {
        throw new Error(data.msg || "Failed to fetch details");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Sort orders
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter orders based on search and status
  const filteredOrders = orders.filter((order) => {
    // Safely handle search matching
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      order.id ||
      (order.customer_name &&
        order.customer_name.toLowerCase().includes(searchLower)) ||
      (order.customer_email &&
        order.customer_email.toLowerCase().includes(searchLower)) ||
      searchQuery === "";

    // Status matching
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // Sort filtered orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  // Initial data fetch
  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, []);

  if (loading && orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Order Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Order Details - {selectedOrder?.id}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsModalOpen(false);
                  setIsNotesEditMode(false);
                }}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Order Information
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-400">Order ID:</span>{" "}
                      {selectedOrder.id}
                    </p>
                    <p>
                      <span className="text-gray-400">Status:</span>{" "}
                      {statusBadge(selectedOrder.status)}
                    </p>
                    <p>
                      <span className="text-gray-400">Date:</span>{" "}
                      {new Date(selectedOrder.created_at).toLocaleString()}
                    </p>
                    <p>
                      <span className="text-gray-400">Total:</span> $
                      {selectedOrder.total?.toFixed(2)}
                    </p>
                    <p>
                      <span className="text-gray-400">Payment Method:</span>{" "}
                      {selectedOrder.payment_method?.replace("_", " ")}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Customer Information
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-400">Name:</span>{" "}
                      {selectedOrder.customer_name}
                    </p>
                    <p>
                      <span className="text-gray-400">Email:</span>{" "}
                      {selectedOrder.customer_email}
                    </p>
                    <p>
                      <span className="text-gray-400">Phone:</span>{" "}
                      {selectedOrder.customer_phone || "N/A"}
                    </p>
                    <p>
                      <span className="text-gray-400">Shipping Address:</span>{" "}
                      {selectedOrder.shipping_address}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Order Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items?.map((item, index) => (
                      <TableRow key={`${item.product_id}-${index}`}>
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.price?.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          $
                          {((item.price || 0) * (item.quantity || 0)).toFixed(
                            2
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Order Notes</h3>
                  {!isNotesEditMode ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsNotesEditMode(true)}
                      className="flex items-center gap-1"
                    >
                      <Edit className="h-3 w-3" /> Edit Notes
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsNotesEditMode(false);
                          setNotesContent(selectedOrder.notes || "");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          updateNotes(selectedOrder.id, notesContent)
                        }
                        disabled={updating === selectedOrder.id}
                        className="flex items-center gap-1"
                      >
                        {updating === selectedOrder.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Save className="h-3 w-3" />
                        )}
                        Save
                      </Button>
                    </div>
                  )}
                </div>
                {isNotesEditMode ? (
                  <Textarea
                    value={notesContent}
                    onChange={(e) => setNotesContent(e.target.value)}
                    placeholder="Add order notes..."
                    className="bg-gray-700 border-gray-600 text-white min-h-32"
                  />
                ) : (
                  <div className="bg-gray-700 p-4 rounded-md min-h-32">
                    {selectedOrder.notes ? (
                      <p className="text-gray-200 whitespace-pre-wrap">
                        {selectedOrder.notes}
                      </p>
                    ) : (
                      <p className="text-gray-400 italic">No notes added</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Order Deletion</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete order {orderToDelete}? This action
            cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteOrder(orderToDelete)}
              disabled={updating === orderToDelete}
            >
              {updating === orderToDelete ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              Delete Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
            <div className="text-2xl font-bold text-white">
              {stats?.total_orders || "0"}
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
            <div className="text-2xl font-bold text-white">
              {stats?.completed_orders || "0"}
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
            <div className="text-2xl font-bold text-white">
              {stats?.processing_orders || "0"}
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
            <div className="text-2xl font-bold text-white">
              {stats?.cancelled_orders || "0"}
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
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px] bg-gray-800/50 border-gray-700 text-gray-300">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                <SelectItem value="all" className="hover:bg-gray-700">
                  All Statuses
                </SelectItem>
                <SelectItem value="pending" className="hover:bg-gray-700">
                  Pending
                </SelectItem>
                <SelectItem value="processing" className="hover:bg-gray-700">
                  Processing
                </SelectItem>
                <SelectItem value="shipped" className="hover:bg-gray-700">
                  Shipped
                </SelectItem>
                <SelectItem value="completed" className="hover:bg-gray-700">
                  Completed
                </SelectItem>
                <SelectItem value="cancelled" className="hover:bg-gray-700">
                  Cancelled
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
              onClick={() => handleSort("created_at")}
            >
              Date: {sortConfig.direction === "desc" ? "Newest" : "Oldest"}
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
            {currentItems.length > 0 ? (
              currentItems.map((order) => (
                <TableRow
                  key={order.id}
                  className="border-gray-700 hover:bg-gray-800/50"
                >
                  <TableCell className="font-medium text-indigo-300">
                    {order.id}
                  </TableCell>
                  <TableCell className="text-gray-200">
                    <div>{order.customer_name}</div>
                    <div className="text-xs text-gray-400">
                      {order.customer_email}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {order.items?.length || 0}
                  </TableCell>
                  <TableCell className="text-gray-200 font-semibold">
                    ${order.total}
                  </TableCell>
                  <TableCell className="text-gray-400 flex items-center">
                    {paymentIcon(order.payment_method)}
                    <span className="ml-2 capitalize">
                      {order.payment_method?.replace("_", " ")}
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
                        <DropdownMenuItem
                          className="text-gray-200 hover:bg-gray-700/50 focus:bg-gray-700/50"
                          onClick={() => viewDetails(order.id)}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-gray-200 hover:bg-gray-700/50 focus:bg-gray-700/50"
                          onClick={() => updateStatus(order.id, "shipped")}
                          disabled={
                            updating === order.id ||
                            order.status === "shipped" ||
                            order.status === "completed" ||
                            order.status === "cancelled"
                          }
                        >
                          {updating === order.id ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : null}
                          Mark as Shipped
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-gray-200 hover:bg-gray-700/50 focus:bg-gray-700/50"
                          onClick={() => updateStatus(order.id, "completed")}
                          disabled={
                            updating === order.id ||
                            order.status === "completed" ||
                            order.status === "cancelled"
                          }
                        >
                          {updating === order.id ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : null}
                          Mark as Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-400 hover:bg-red-500/20 focus:bg-red-500/20"
                          onClick={() => cancelOrder(order.id)}
                          disabled={
                            updating === order.id ||
                            order.status === "cancelled"
                          }
                        >
                          {updating === order.id ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : null}
                          Cancel Order
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-400 hover:bg-red-500/20 focus:bg-red-500/20"
                          onClick={() => {
                            setOrderToDelete(order.id);
                            setIsDeleteDialogOpen(true);
                          }}
                          disabled={updating === order.id}
                        >
                          {updating === order.id ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <Trash2 className="h-4 w-4 mr-2" />
                          )}
                          Delete Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-24 text-center text-gray-400"
                >
                  {orders.length === 0
                    ? "No orders found"
                    : "No orders match your search criteria"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, sortedOrders.length)} of{" "}
          {sortedOrders.length} orders
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              className={
                currentPage === page
                  ? ""
                  : "bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
              }
              onClick={() => paginate(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            className="bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
