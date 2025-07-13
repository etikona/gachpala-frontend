// app/seller/orders/page.jsx
"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Filter,
  Search,
  MoreHorizontal,
  CheckCircle,
  Truck,
  XCircle,
  ArrowUpDown,
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

export default function OrdersPage() {
  const [orders, setOrders] = useState([
    {
      id: "#ORD-001",
      customer: "Alex Johnson",
      date: "2023-11-18",
      amount: 142.5,
      status: "Delivered",
      items: [
        { name: "Monstera Deliciosa", quantity: 1, price: 49.99 },
        { name: "Plant Pot", quantity: 1, price: 24.99 },
      ],
      shipping: {
        address: "123 Main St, New York, NY 10001",
        carrier: "UPS",
        tracking: "1Z999AA10123456784",
      },
    },
    {
      id: "#ORD-002",
      customer: "Sarah Williams",
      date: "2023-11-17",
      amount: 89.99,
      status: "Shipped",
      items: [{ name: "Snake Plant", quantity: 1, price: 29.99 }],
      shipping: {
        address: "456 Park Ave, Boston, MA 02108",
        carrier: "FedEx",
        tracking: "789012345678",
      },
    },
    {
      id: "#ORD-003",
      customer: "Michael Brown",
      date: "2023-11-16",
      amount: 245.75,
      status: "Processing",
      items: [
        { name: "Fiddle Leaf Fig", quantity: 1, price: 79.99 },
        { name: "Plant Food", quantity: 2, price: 12.99 },
      ],
      shipping: {
        address: "789 Oak St, Chicago, IL 60601",
        carrier: "",
        tracking: "",
      },
    },
    {
      id: "#ORD-004",
      customer: "Emily Davis",
      date: "2023-11-15",
      amount: 54.99,
      status: "Delivered",
      items: [{ name: "Pothos Golden", quantity: 1, price: 24.99 }],
      shipping: {
        address: "321 Pine Rd, Seattle, WA 98101",
        carrier: "USPS",
        tracking: "94001118992213456784",
      },
    },
    {
      id: "#ORD-005",
      customer: "James Wilson",
      date: "2023-11-14",
      amount: 189.5,
      status: "Shipped",
      items: [
        { name: "ZZ Plant", quantity: 1, price: 39.99 },
        { name: "Decorative Pot", quantity: 1, price: 34.99 },
      ],
      shipping: {
        address: "555 Cedar Ln, Austin, TX 78701",
        carrier: "DHL",
        tracking: "JD1234567890",
      },
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  // Filter and sort orders
  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
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

  // Handle status update
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

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
      case "Delivered":
        return `${baseClass} bg-emerald-500/20 text-emerald-400`;
      case "Shipped":
        return `${baseClass} bg-blue-500/20 text-blue-400`;
      case "Processing":
        return `${baseClass} bg-amber-500/20 text-amber-400`;
      case "Cancelled":
        return `${baseClass} bg-rose-500/20 text-rose-400`;
      default:
        return `${baseClass} bg-gray-500/20 text-gray-400`;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
                onClick={() => setStatusFilter("Processing")}
              >
                Processing
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-blue-400 hover:bg-blue-500/10"
                onClick={() => setStatusFilter("Shipped")}
              >
                Shipped
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-emerald-400 hover:bg-emerald-500/10"
                onClick={() => setStatusFilter("Delivered")}
              >
                Delivered
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-rose-400 hover:bg-rose-500/10"
                onClick={() => setStatusFilter("Cancelled")}
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
                    className="flex items-center gap-1"
                  >
                    Order ID
                    <ArrowUpDown className="h-3 w-3 ml-1" />
                  </button>
                </TableHead>
                <TableHead className="text-gray-400">
                  <button
                    onClick={() => requestSort("customer")}
                    className="flex items-center gap-1"
                  >
                    Customer
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
                <TableHead className="text-gray-400">Amount</TableHead>
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
                    {order.id}
                  </TableCell>
                  <TableCell className="text-white">{order.customer}</TableCell>
                  <TableCell className="text-gray-400">
                    {formatDate(order.date)}
                  </TableCell>
                  <TableCell className="text-emerald-400">
                    ${order.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(order.status)}>
                      {order.status}
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
                        <DropdownMenuItem
                          className="text-gray-300 hover:bg-gray-700/50"
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsDialogOpen(true);
                          }}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-blue-400 hover:bg-blue-500/10"
                          onClick={() => updateOrderStatus(order.id, "Shipped")}
                          disabled={
                            order.status === "Shipped" ||
                            order.status === "Delivered" ||
                            order.status === "Cancelled"
                          }
                        >
                          Mark as Shipped
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-emerald-400 hover:bg-emerald-500/10"
                          onClick={() =>
                            updateOrderStatus(order.id, "Delivered")
                          }
                          disabled={
                            order.status === "Delivered" ||
                            order.status === "Cancelled"
                          }
                        >
                          Mark as Delivered
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-rose-400 hover:bg-rose-500/10"
                          onClick={() =>
                            updateOrderStatus(order.id, "Cancelled")
                          }
                          disabled={
                            order.status === "Cancelled" ||
                            order.status === "Delivered"
                          }
                        >
                          Cancel Order
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

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 max-w-3xl">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="text-white">
                  Order Details: {selectedOrder.id}
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Placed on {formatDate(selectedOrder.date)}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">
                    Customer Information
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-400">Customer</p>
                      <p className="text-white">{selectedOrder.customer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Order Status</p>
                      <Badge className={getStatusBadge(selectedOrder.status)}>
                        {selectedOrder.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-3">
                    Shipping Information
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-400">Shipping Address</p>
                      <p className="text-white">
                        {selectedOrder.shipping.address}
                      </p>
                    </div>
                    {selectedOrder.shipping.carrier && (
                      <div>
                        <p className="text-sm text-gray-400">Carrier</p>
                        <p className="text-white">
                          {selectedOrder.shipping.carrier}
                        </p>
                      </div>
                    )}
                    {selectedOrder.shipping.tracking && (
                      <div>
                        <p className="text-sm text-gray-400">Tracking Number</p>
                        <p className="text-emerald-400 font-mono">
                          {selectedOrder.shipping.tracking}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-span-full">
                  <h3 className="text-lg font-medium text-white mb-3">
                    Order Items
                  </h3>
                  <div className="border border-gray-700 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-700/50 hover:bg-transparent">
                          <TableHead className="text-gray-300">
                            Product
                          </TableHead>
                          <TableHead className="text-gray-300 text-right">
                            Quantity
                          </TableHead>
                          <TableHead className="text-gray-300 text-right">
                            Price
                          </TableHead>
                          <TableHead className="text-gray-300 text-right">
                            Total
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOrder.items.map((item, index) => (
                          <TableRow
                            key={index}
                            className="border-gray-700 hover:bg-gray-700/30"
                          >
                            <TableCell className="text-white">
                              {item.name}
                            </TableCell>
                            <TableCell className="text-right text-gray-300">
                              {item.quantity}
                            </TableCell>
                            <TableCell className="text-right text-gray-300">
                              ${item.price.toFixed(2)}
                            </TableCell>
                            <TableCell className="text-right text-emerald-400">
                              ${(item.quantity * item.price).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="col-span-full flex justify-end">
                  <div className="w-full md:w-1/3">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-gray-300">
                        ${selectedOrder.amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-400">Shipping</span>
                      <span className="text-gray-300">$0.00</span>
                    </div>
                    <div className="flex justify-between py-2 border-t border-gray-700">
                      <span className="text-white font-medium">Total</span>
                      <span className="text-emerald-400 font-bold">
                        ${selectedOrder.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
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
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
