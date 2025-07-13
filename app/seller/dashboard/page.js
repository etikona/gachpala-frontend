"use client";

import { useState } from "react";
import {
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  BarChart,
  Leaf,
  Plus,
} from "lucide-react";
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
import Link from "next/link";

export default function SellerDashboard() {
  // Sample data (same as before)
  const stats = [
    /* ... */
  ];
  const recentOrders = [
    /* ... */
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <Link href="/seller/products">
          <Button className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="bg-gray-800/50 backdrop-blur-lg border border-gray-700"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ... (same as before) */}
      </div>

      {/* Recent Orders */}
      <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>{/* ... (same as before) */}</Table>
        </CardContent>
      </Card>
    </div>
  );
}
