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
import { useEffect, useState } from "react";

export default function AdminHomePage() {
  const [stats, setStats] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [userActivity, setUserActivity] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [
          statsRes,
          revenueRes,
          userActivityRes,
          metricsRes,
          recentActivityRes,
        ] = await Promise.all([
          fetch(
            "https://gachpala-server.onrender.com/api/v1/admin/overview/stats"
          ),
          fetch(
            "https://gachpala-server.onrender.com/api/v1/admin/overview/revenue"
          ),
          fetch(
            "https://gachpala-server.onrender.com/api/v1/admin/overview/user-activity"
          ),
          fetch(
            "https://gachpala-server.onrender.com/api/v1/admin/overview/metrics"
          ),
          fetch(
            "https://gachpala-server.onrender.com/api/v1/admin/overview/recent-activity"
          ),
        ]);

        // Check if all responses are OK
        if (
          !statsRes.ok ||
          !revenueRes.ok ||
          !userActivityRes.ok ||
          !metricsRes.ok ||
          !recentActivityRes.ok
        ) {
          throw new Error("Failed to fetch data");
        }

        // Parse JSON responses
        const [
          statsData,
          revenueData,
          userActivityData,
          metricsData,
          recentActivityData,
        ] = await Promise.all([
          statsRes.json(),
          revenueRes.json(),
          userActivityRes.json(),
          metricsRes.json(),
          recentActivityRes.json(),
        ]);

        // Set state with fetched data
        setStats(statsData);
        setRevenueData(revenueData);
        setUserActivity(userActivityData);
        setMetrics(metricsData);
        setRecentActivity(recentActivityData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format time ago for recent activity
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return formatDate(dateString);
  };

  // Get activity icon based on type
  const getActivityIcon = (activityType) => {
    switch (activityType) {
      case "order":
        return <ShoppingCart className="h-4 w-4 text-blue-400" />;
      case "user_signup":
        return <Users className="h-4 w-4 text-green-400" />;
      case "seller_registration":
        return <Package className="h-4 w-4 text-amber-400" />;
      default:
        return <Activity className="h-4 w-4 text-indigo-400" />;
    }
  };

  // Get activity title based on type
  const getActivityTitle = (activityType, data) => {
    switch (activityType) {
      case "order":
        return `New Order #${data.id}`;
      case "user_signup":
        return "User Registration";
      case "seller_registration":
        return "Seller Registration";
      default:
        return "Activity";
    }
  };

  // Get activity description based on type
  const getActivityDescription = (activityType, data) => {
    switch (activityType) {
      case "order":
        return `Order placed by ${data.user_name} for ${formatCurrency(
          data.total
        )}`;
      case "user_signup":
        return `New user registered: ${data.email}`;
      case "seller_registration":
        return `New seller: ${data.business_name} by ${data.owner_name}`;
      default:
        return "Activity occurred";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 my-12 min-h-screen">
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
            <div className="text-2xl font-bold text-white">
              {stats
                ? formatCurrency(stats.total_revenue || stats.totalRevenue || 0)
                : "$0"}
            </div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <ArrowUp className="h-3 w-3 text-green-400 mr-1" />
              <span>From completed orders</span>
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
            <div className="text-2xl font-bold text-white">
              {stats
                ? (stats.total_users || stats.totalUsers || 0).toLocaleString()
                : "0"}
            </div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <ArrowUp className="h-3 w-3 text-green-400 mr-1" />
              <span>Registered users</span>
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
            <div className="text-2xl font-bold text-white">
              {stats
                ? (
                    stats.total_sellers ||
                    stats.totalSellers ||
                    0
                  ).toLocaleString()
                : "0"}
            </div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <ArrowUp className="h-3 w-3 text-green-400 mr-1" />
              <span>Approved sellers</span>
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
            <div className="text-2xl font-bold text-white">
              {stats
                ? (
                    stats.total_orders ||
                    stats.totalOrders ||
                    0
                  ).toLocaleString()
                : "0"}
            </div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <ArrowUp className="h-3 w-3 text-green-400 mr-1" />
              <span>Total orders</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Overview */}
        <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Revenue Overview</CardTitle>
            <CardDescription className="text-gray-400">
              Monthly revenue performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {revenueData.length > 0 ? (
                <div className="h-full w-full flex items-end justify-between pt-8">
                  {revenueData.map((item, index) => {
                    const month = new Date(item.month).toLocaleDateString(
                      "en-US",
                      { month: "short" }
                    );
                    const revenue = item.revenue || item.revenue;
                    const maxRevenue = Math.max(
                      ...revenueData.map((r) => r.revenue || r.revenue)
                    );

                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center flex-1"
                      >
                        <div className="text-xs text-gray-100 mb-1">
                          {month}
                        </div>
                        <div className="relative w-4/5">
                          <div
                            className="w-full bg-gradient-to-t from-indigo-900 to-indigo-400 rounded-t"
                            style={{
                              height: `${
                                ((revenue || 0) / (maxRevenue || 1)) * 70
                              }%`,
                            }}
                          ></div>
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-gray-300 text-xs bg-gray-800/80 backdrop-blur-sm px-2 py-1 rounded-full border border-gray-700">
                            {formatCurrency(revenue || 0)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  No revenue data available
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* User Activity */}
        <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">User Activity</CardTitle>
            <CardDescription className="text-gray-400">
              Daily active users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {userActivity.length > 0 ? (
                <div className="h-full w-full flex items-end justify-between pt-8">
                  {userActivity.slice(0, 7).map((item, index) => {
                    const date = new Date(item.date);
                    const day = date.toLocaleDateString("en-US", {
                      weekday: "short",
                    });
                    const users = item.active_users || item.active_users;
                    const maxUsers = Math.max(
                      ...userActivity.map(
                        (u) => u.active_users || u.active_users
                      )
                    );

                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center flex-1"
                      >
                        <div className="text-xs text-gray-400 mb-1">{day}</div>
                        <div className="relative w-4/5">
                          <div
                            className="w-full bg-gradient-to-t from-emerald-900 to-emerald-400 rounded-t"
                            style={{
                              height: `${
                                ((users || 0) / (maxUsers || 1)) * 70
                              }%`,
                            }}
                          ></div>
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-300 bg-gray-800/80 backdrop-blur-sm px-2 py-1 rounded-full border border-gray-700">
                            {users || 0}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  No user activity data available
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics ? (
          <>
            <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  Conversion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {metrics.conversionRate
                    ? `${metrics.conversionRate.toFixed(1)}%`
                    : "0%"}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  Avg. Order Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {metrics.avgOrderValue
                    ? formatCurrency(metrics.avgOrderValue)
                    : "$0"}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  Customer Satisfaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {metrics.customerSatisfaction
                    ? `${(metrics.customerSatisfaction * 20).toFixed(0)}%`
                    : "0%"}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  Return Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {metrics.returnRate
                    ? `${metrics.returnRate.toFixed(1)}%`
                    : "0%"}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="col-span-4 text-center text-gray-400 py-8">
            No metrics data available
          </div>
        )}
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
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.slice(0, 5).map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 rounded-lg hover:bg-gray-800/50 transition-all duration-200"
                  >
                    <div className="bg-indigo-500/20 p-2 rounded-full mr-4">
                      {getActivityIcon(activity.activity_type)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">
                        {getActivityTitle(activity.activity_type, activity)}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        {getActivityDescription(
                          activity.activity_type,
                          activity
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatTimeAgo(activity.created_at)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                No recent activity
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
