// app/admin/dashboard/page.jsx
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  Activity,
  Users,
  ShoppingCart,
  TrendingUp,
  Package,
  CreditCard,
  DollarSign,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminHomePage() {
  // Mock data
  const revenueData = [
    { month: "Jan", revenue: 14500, trend: "up" },
    { month: "Feb", revenue: 19000, trend: "up" },
    { month: "Mar", revenue: 12500, trend: "down" },
    { month: "Apr", revenue: 17800, trend: "up" },
    { month: "May", revenue: 21000, trend: "up" },
    { month: "Jun", revenue: 19500, trend: "down" },
    { month: "Jul", revenue: 23000, trend: "up" },
  ];

  const userGrowthData = [
    { day: "Mon", users: 120 },
    { day: "Tue", users: 95 },
    { day: "Wed", users: 156 },
    { day: "Thu", users: 210 },
    { day: "Fri", users: 185 },
    { day: "Sat", users: 240 },
    { day: "Sun", users: 300 },
  ];

  const metrics = [
    {
      title: "Conversion Rate",
      value: "4.7%",
      change: "+2.1%",
      positive: true,
    },
    {
      title: "Avg. Order Value",
      value: "$128.50",
      change: "+$12.30",
      positive: true,
    },
    {
      title: "Customer Satisfaction",
      value: "92%",
      change: "+3%",
      positive: true,
    },
    { title: "Return Rate", value: "2.3%", change: "-0.7%", positive: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
          Dashboard Overview
        </h1>
        <p className="text-gray-400 mt-1">
          Welcome back, Admin. Here is what is going happening today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <ArrowUp className="h-3 w-3 text-green-400 mr-1" />
              <span>12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 backdrop-blur-md border border-emerald-800/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Users
            </CardTitle>
            <Users className="h-5 w-5 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12,387</div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <ArrowUp className="h-3 w-3 text-green-400 mr-1" />
              <span>+180 in last 24h</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-900/40 to-amber-800/20 backdrop-blur-md border border-amber-800/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Sellers
            </CardTitle>
            <Package className="h-5 w-5 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1,432</div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <ArrowUp className="h-3 w-3 text-green-400 mr-1" />
              <span>+24 new this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-md border border-purple-800/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Orders
            </CardTitle>
            <ShoppingCart className="h-5 w-5 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1,892</div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <ArrowUp className="h-3 w-3 text-green-400 mr-1" />
              <span>12.3% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Revenue Overview</CardTitle>
            <CardDescription className="text-gray-400">
              Monthly revenue performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <div className="h-full w-full flex items-end justify-between pt-8">
                {revenueData.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    <div className="text-xs text-gray-100 mb-1">
                      {item.month}
                    </div>
                    <div className="relative w-4/5">
                      <div
                        className="w-full bg-gradient-to-t from-indigo-900 to-indigo-400 rounded-t"
                        style={{ height: `${(item.revenue / 25000) * 70}%` }}
                      ></div>
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-gray-300  text-xs bg-gray-800/80 backdrop-blur-sm px-2 py-1 rounded-full border border-gray-700">
                        ${(item.revenue / 1000).toFixed(1)}k
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">User Activity</CardTitle>
            <CardDescription className="text-gray-400">
              Daily active users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <div className="h-full w-full flex items-end justify-between pt-8">
                {userGrowthData.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    <div className="text-xs text-gray-400 mb-1">{item.day}</div>
                    <div className="relative w-4/5">
                      <div
                        className="w-full bg-gradient-to-t from-emerald-900 to-emerald-400 rounded-t"
                        style={{ height: `${(item.users / 350) * 70}%` }}
                      ></div>
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-300 bg-gray-800/80 backdrop-blur-sm px-2 py-1 rounded-full border border-gray-700">
                        {item.users}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card
            key={index}
            className="bg-gray-800/30 backdrop-blur-md border border-gray-700"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {metric.value}
              </div>
              <div
                className={`flex items-center text-xs mt-1 ${
                  metric.positive ? "text-green-400" : "text-red-400"
                }`}
              >
                {metric.positive ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                <span>{metric.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-gray-400">
                  Latest actions in the system
                </CardDescription>
              </div>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300"
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 rounded-lg hover:bg-gray-800/50 transition-all duration-200"
                >
                  <div className="bg-indigo-500/20 p-2 rounded-full mr-4">
                    <Activity className="h-4 w-4 text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white">
                      User registration
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      New user registered: john.doe@example.com
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">2 hours ago</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
