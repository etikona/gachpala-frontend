// app/admin/dashboard/sellers/page.jsx
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
  Store,
  Star,
  CheckCircle,
  XCircle,
  Globe,
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

export default function SellersPage() {
  // Sample seller data
  const sellers = [
    {
      id: "SEL-001",
      name: "Green Thumb Nursery",
      owner: "John Smith",
      joined: "2023-01-15",
      status: "verified",
      products: 42,
      rating: 4.8,
    },
    {
      id: "SEL-002",
      name: "Urban Jungle",
      owner: "Sarah Johnson",
      joined: "2023-02-22",
      status: "pending",
      products: 18,
      rating: 4.5,
    },
    {
      id: "SEL-003",
      name: "Botanical Wonders",
      owner: "Michael Brown",
      joined: "2023-03-10",
      status: "verified",
      products: 67,
      rating: 4.9,
    },
    {
      id: "SEL-004",
      name: "Plant Paradise",
      owner: "Emily Davis",
      joined: "2023-04-05",
      status: "suspended",
      products: 25,
      rating: 3.2,
    },
    {
      id: "SEL-005",
      name: "Forest Friends",
      owner: "David Wilson",
      joined: "2023-05-18",
      status: "verified",
      products: 38,
      rating: 4.7,
    },
    {
      id: "SEL-006",
      name: "Leafy Greens Co.",
      owner: "Jennifer Lee",
      joined: "2023-06-01",
      status: "verified",
      products: 53,
      rating: 4.6,
    },
    {
      id: "SEL-007",
      name: "Desert Blooms",
      owner: "Robert Garcia",
      joined: "2023-06-12",
      status: "pending",
      products: 29,
      rating: 4.3,
    },
  ];

  const statusBadge = (status) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <CheckCircle className="h-3 w-3 mr-1" /> Verified
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
        <span className="text-gray-200 font-semibold">{rating}</span>
        <span className="text-gray-500 ml-1">/5</span>
      </div>
    );
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-indigo-900/40 to-indigo-800/20 backdrop-blur-md border border-indigo-800/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Total Sellers
            </CardTitle>
            <Store className="h-5 w-5 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1,432</div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span>+24 new this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 backdrop-blur-md border border-emerald-800/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Verified Sellers
            </CardTitle>
            <CheckCircle className="h-5 w-5 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1,125</div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span>78.5% verified rate</span>
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
            <div className="text-2xl font-bold text-white">187</div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span>Avg. 3 days to review</span>
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
            <div className="text-2xl font-bold text-white">4.6</div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span>Across all sellers</span>
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
              placeholder="Search sellers..."
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
            {sellers.map((seller) => (
              <TableRow
                key={seller.id}
                className="border-gray-700 hover:bg-gray-800/50"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src="" alt={seller.name} />
                      <AvatarFallback className="bg-gradient-to-r from-green-600 to-emerald-600">
                        {seller.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-gray-200">{seller.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-400">{seller.owner}</TableCell>
                <TableCell className="text-gray-400">{seller.joined}</TableCell>
                <TableCell>{statusBadge(seller.status)}</TableCell>
                <TableCell className="text-gray-200 font-semibold">
                  {seller.products}
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
                      <DropdownMenuItem className="text-gray-200 hover:bg-gray-700/50 focus:bg-gray-700/50">
                        View Store
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-200 hover:bg-gray-700/50 focus:bg-gray-700/50">
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-200 hover:bg-gray-700/50 focus:bg-gray-700/50">
                        View Products
                      </DropdownMenuItem>
                      {seller.status === "verified" ? (
                        <DropdownMenuItem className="text-amber-400 hover:bg-amber-500/20 focus:bg-amber-500/20">
                          Suspend Seller
                        </DropdownMenuItem>
                      ) : seller.status === "pending" ? (
                        <DropdownMenuItem className="text-emerald-400 hover:bg-emerald-500/20 focus:bg-emerald-500/20">
                          Verify Seller
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-emerald-400 hover:bg-emerald-500/20 focus:bg-emerald-500/20">
                          Activate Seller
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-400 hover:bg-red-500/20 focus:bg-red-500/20">
                        Delete Seller
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
          Showing 1 to 7 of 1,432 sellers
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
