"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, Loader, Package } from "lucide-react";

export default function OrderHistoryPage() {
  const params = useParams();
  console.log(params.id);
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  // Safely extract userId from params
  const userId = params?.id;

  useEffect(() => {
    if (!userId) {
      setError("Invalid user ID");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user info
        const userRes = await fetch(
          `https://gachpala-server.onrender.com/api/v1/admin/users/${userId}`
        );
        if (!userRes.ok) {
          const errorData = await userRes.json();
          throw new Error(errorData.message || "Failed to fetch user");
        }
        const userData = await userRes.json();
        setUser(userData);

        // Fetch orders
        const ordersRes = await fetch(
          `https://gachpala-server.onrender.com/api/v1/admin/users/${userId}/orders?page=${currentPage}&limit=10`
        );
        if (!ordersRes.ok) {
          const errorData = await ordersRes.json();
          throw new Error(errorData.message || "Failed to fetch orders");
        }
        const ordersData = await ordersRes.json();

        setOrders(ordersData.orders || []);
        setTotalOrders(ordersData.pagination?.totalOrders || 0);
        setTotalPages(ordersData.pagination?.totalPages || 1);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, currentPage]);

  const statusBadge = (status) => {
    if (!status) return <Badge>Unknown</Badge>;

    switch (status.toLowerCase()) {
      case "completed":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            Pending
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            Cancelled
          </Badge>
        );
      case "shipped":
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            Shipped
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid date";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);
  };

  const handleBack = () => {
    router.push(`/admin/dashboard/users/${userId}`);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
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
      <div className="max-w-md mx-auto bg-red-900/30 border border-red-700 rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium text-red-400 mb-2">Error</h3>
        <p className="text-red-300 mb-4">{error}</p>
        <div className="flex justify-center gap-3">
          <Button
            variant="destructive"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
          <Button variant="outline" onClick={handleBack}>
            Back to Profile
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
            Order History
          </h1>
          <p className="text-gray-400 mt-1">
            {user ? `Orders for ${user.name}` : "User orders"}
          </p>
        </div>
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Profile
        </Button>
      </div>

      <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Orders</CardTitle>
            <div className="text-gray-400 text-sm">
              {totalOrders} total orders
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <div className="border border-gray-700 rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-800/60">
                  <TableRow>
                    <TableHead className="text-gray-300">Order ID</TableHead>
                    <TableHead className="text-gray-300">Date</TableHead>
                    <TableHead className="text-gray-300">Amount</TableHead>
                    <TableHead className="text-gray-300">Items</TableHead>
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
                      <TableCell className="font-medium text-gray-200">
                        #{order.id}
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {formatDate(order.created_at)}
                      </TableCell>
                      <TableCell className="text-gray-200">
                        {formatCurrency(order.amount)}
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {order.items_count || 1}
                      </TableCell>
                      <TableCell>{statusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
                          onClick={() =>
                            router.push(`/admin/dashboard/orders/${order.id}`)
                          }
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Package className="h-16 w-16 text-gray-500 mb-4" />
              <p className="text-gray-400 text-lg">No orders found</p>
              <p className="text-gray-500 mt-2">
                This user has not placed any orders yet
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing {(currentPage - 1) * 10 + 1} to{" "}
                {Math.min(currentPage * 10, totalOrders)} of {totalOrders}{" "}
                orders
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

                <div className="flex items-center">
                  <span className="text-sm text-gray-400 mx-2">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>

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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
