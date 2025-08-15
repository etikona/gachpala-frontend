"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Store,
  Star,
  CheckCircle,
  Loader2,
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SellersPage() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch seller stats
  const fetchStats = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/admin/sellers/stats"
      );
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch seller statistics",
      });
    }
  };

  // Fetch sellers with pagination and filters
  const fetchSellers = async () => {
    setLoading(true);
    try {
      const url = new URL("http://localhost:5000/api/v1/admin/sellers");
      url.searchParams.append("page", pagination.page);
      url.searchParams.append("limit", pagination.limit);
      if (statusFilter) url.searchParams.append("status", statusFilter);
      if (search) url.searchParams.append("search", search);

      const response = await fetch(url);
      const data = await response.json();

      setSellers(data.sellers);
      setPagination((prev) => ({
        ...prev,
        total: data.total,
        totalPages: data.totalPages,
      }));
    } catch (error) {
      console.error("Error fetching sellers:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch sellers",
      });
    } finally {
      setLoading(false);
    }
  };

  // Update seller status
  const updateSellerStatus = async (sellerId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/admin/sellers/${sellerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) throw new Error("Failed to update status");

      toast({
        title: "Success",
        description: `Seller status updated to ${newStatus}`,
      });

      // Refresh data
      fetchStats();
      fetchSellers();
    } catch (error) {
      console.error("Error updating seller status:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  // Delete seller
  const deleteSeller = async (sellerId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/admin/sellers/${sellerId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete seller");

      toast({
        title: "Success",
        description: "Seller deleted successfully",
      });

      // Refresh data
      fetchStats();
      fetchSellers();
    } catch (error) {
      console.error("Error deleting seller:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchStats();
    fetchSellers();
  }, [pagination.page, statusFilter, search]);

  const statusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <CheckCircle className="h-3 w-3 mr-1" /> Active
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            Pending Review
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

  const renderRating = (rating) => {
    return (
      <div className="flex items-center">
        <Star className="h-4 w-4 text-amber-400 fill-amber-400 mr-1" />
        <span className="text-gray-200 font-semibold">{rating || 0}</span>
        <span className="text-gray-500 ml-1">/5</span>
      </div>
    );
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
          Seller Management
        </h1>
        <p className="text-gray-400 mt-1">
          Manage all sellers and their stores
        </p>
      </div>

      {/* Seller Stats */}
      {stats ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-indigo-900/40 to-indigo-800/20 backdrop-blur-md border border-indigo-800/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Total Sellers
              </CardTitle>
              <Store className="h-5 w-5 text-indigo-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {stats.totalSellers}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 backdrop-blur-md border border-emerald-800/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Active Sellers
              </CardTitle>
              <CheckCircle className="h-5 w-5 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {stats.activeSellers}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-900/40 to-amber-800/20 backdrop-blur-md border border-amber-800/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Pending Approval
              </CardTitle>
              <span className="h-5 w-5 text-amber-400">🔄</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {stats.pendingSellers}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-md border border-purple-800/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Avg. Rating
              </CardTitle>
              <Star className="h-5 w-5 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {stats.avgRating?.toFixed(1) || 0}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      )}

      {/* Filters and Search */}
      <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700">
        <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search sellers..."
              className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {statusFilter
                    ? statusFilter.charAt(0).toUpperCase() +
                      statusFilter.slice(1)
                    : "Filter"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800/80 backdrop-blur-md border border-gray-700">
                <DropdownMenuItem onClick={() => setStatusFilter("")}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("suspended")}>
                  Suspended
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              onClick={() => router.push(`/admin/dashboard/sellers/add`)}
            >
              + Add Seller
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sellers Table */}
      <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-800/60">
            <TableRow>
              <TableHead className="text-gray-300">Store</TableHead>
              <TableHead className="text-gray-300">Owner</TableHead>
              <TableHead className="text-gray-300">Joined</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              <TableHead className="text-gray-300">Products</TableHead>
              <TableHead className="text-gray-300">Rating</TableHead>
              <TableHead className="text-right text-gray-300">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400 mx-auto" />
                </TableCell>
              </TableRow>
            ) : sellers.length > 0 ? (
              sellers.map((seller) => (
                <TableRow
                  key={seller.id}
                  className="border-gray-700 hover:bg-gray-800/50"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarImage
                          src={seller.profile_photo_or_logo}
                          alt={seller.store_name}
                        />
                        <AvatarFallback className="bg-gradient-to-r from-green-600 to-emerald-600">
                          {seller.store_name?.charAt(0) || "S"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-200">{seller.store_name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {seller.owner_name}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {new Date(seller.joining_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{statusBadge(seller.status)}</TableCell>
                  <TableCell className="text-gray-200 font-semibold">
                    {seller.products_count || 0}
                  </TableCell>
                  <TableCell>{renderRating(seller.rating)}</TableCell>
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
                          onClick={() =>
                            router.push(
                              `/admin/dashboard/sellers/view/${seller.id}`
                            )
                          }
                        >
                          View Store
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-gray-200 hover:bg-gray-700/50 focus:bg-gray-700/50"
                          onClick={() =>
                            router.push(
                              `/admin/dashboard/sellers/edit/${seller.id}`
                            )
                          }
                        >
                          Edit Details
                        </DropdownMenuItem>

                        {seller.status === "pending" && (
                          <DropdownMenuItem
                            className="text-emerald-400 hover:bg-emerald-500/20 focus:bg-emerald-500/20"
                            onClick={() =>
                              updateSellerStatus(seller.id, "active")
                            }
                          >
                            Approve Seller
                          </DropdownMenuItem>
                        )}

                        {seller.status === "active" && (
                          <DropdownMenuItem
                            className="text-amber-400 hover:bg-amber-500/20 focus:bg-amber-500/20"
                            onClick={() =>
                              updateSellerStatus(seller.id, "suspended")
                            }
                          >
                            Suspend Seller
                          </DropdownMenuItem>
                        )}

                        {seller.status === "suspended" && (
                          <DropdownMenuItem
                            className="text-emerald-400 hover:bg-emerald-500/20 focus:bg-emerald-500/20"
                            onClick={() =>
                              updateSellerStatus(seller.id, "active")
                            }
                          >
                            Activate Seller
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuItem
                          className="text-red-400 hover:bg-red-500/20 focus:bg-red-500/20"
                          onClick={() => deleteSeller(seller.id)}
                        >
                          Delete Seller
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-gray-400"
                >
                  No sellers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      {sellers.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} sellers
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              className="bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
