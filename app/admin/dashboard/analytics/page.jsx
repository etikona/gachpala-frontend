// app/admin/dashboard/analytics/page.jsx
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Users,
  ShoppingCart,
  Package,
  DollarSign,
  ArrowUp,
  BarChart2,
  PieChart,
  TrendingUp,
  Map,
  Globe,
  Smartphone,
  Calendar,
  Filter,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function AnalyticsPage() {
  // Mock data
  const revenueData = [45, 70, 60, 90, 85, 95, 100, 110, 105, 120, 115, 130];
  const userGrowthData = [120, 95, 156, 210, 185, 240, 300];
  const trafficSources = [
    { name: "Direct", value: 45, color: "bg-indigo-500" },
    { name: "Social", value: 25, color: "bg-pink-500" },
    { name: "Search", value: 20, color: "bg-amber-500" },
    { name: "Email", value: 10, color: "bg-emerald-500" },
  ];
  const deviceUsage = [
    { name: "Mobile", value: 65, color: "bg-blue-500" },
    { name: "Desktop", value: 30, color: "bg-purple-500" },
    { name: "Tablet", value: 5, color: "bg-green-500" },
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

  const topProducts = [
    { name: "Monstera Deliciosa", sales: 245, revenue: "$4,890" },
    { name: "Snake Plant", sales: 198, revenue: "$3,760" },
    { name: "Fiddle Leaf Fig", sales: 176, revenue: "$5,280" },
    { name: "Pothos Golden", sales: 154, revenue: "$2,310" },
    { name: "ZZ Plant", sales: 132, revenue: "$2,376" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
          Analytics Dashboard
        </h1>
        <p className="text-gray-400 mt-1">
          Comprehensive insights into your platform performance
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1 flex gap-3">
          <div className="relative w-full max-w-xs">
            {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /> */}
            <Input
              placeholder="Search analytics..."
              className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
            />
          </div>
          <Button
            variant="outline"
            className="bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="30">
            <SelectTrigger className="w-[180px] bg-gray-800/50 border-gray-700 text-gray-300">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="90">Last 90 Days</SelectItem>
              <SelectItem value="365">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

      {/* Main Charts */}
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
                {revenueData.map((value, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    <div className="text-xs text-gray-500 mb-1">
                      {index + 1}
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
            <CardTitle className="text-white">User Acquisition</CardTitle>
            <CardDescription className="text-gray-400">
              Daily active users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <div className="h-full w-full flex items-end justify-between pt-8">
                {userGrowthData.map((value, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    <div className="text-xs text-gray-500 mb-1">
                      D{index + 1}
                    </div>
                    <div
                      className="w-4/5 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-t"
                      style={{ height: `${value / 4}%` }}
                    ></div>
                    <div className="text-xs mt-1">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <Tabs defaultValue="traffic">
        <TabsList className="bg-gray-800/30 backdrop-blur-md border border-gray-700">
          <TabsTrigger
            value="traffic"
            className="data-[state=active]:bg-gray-700/50 data-[state=active]:text-white"
          >
            <Globe className="h-4 w-4 mr-2" />
            Traffic Sources
          </TabsTrigger>
          <TabsTrigger
            value="devices"
            className="data-[state=active]:bg-gray-700/50 data-[state=active]:text-white"
          >
            <Smartphone className="h-4 w-4 mr-2" />
            Device Usage
          </TabsTrigger>
          <TabsTrigger
            value="geo"
            className="data-[state=active]:bg-gray-700/50 data-[state=active]:text-white"
          >
            <Map className="h-4 w-4 mr-2" />
            Geographic
          </TabsTrigger>
        </TabsList>

        <TabsContent value="traffic">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
            <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700 lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-white">Traffic Sources</CardTitle>
                <CardDescription className="text-gray-400">
                  Where your visitors come from
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trafficSources.map((source, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">{source.name}</span>
                        <span className="text-gray-400">{source.value}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`${source.color} h-2 rounded-full`}
                          style={{ width: `${source.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">
                  Conversion by Source
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Conversion rates from different traffic sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <div className="h-full w-full flex items-end justify-between pt-8">
                    {trafficSources.map((source, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center flex-1"
                      >
                        <div className="text-xs text-gray-500 mb-1">
                          {source.name}
                        </div>
                        <div
                          className="w-4/5 bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-t"
                          style={{ height: `${source.value * 2}%` }}
                        ></div>
                        <div className="text-xs mt-1">{source.value / 10}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
            <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700 lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-white">Device Usage</CardTitle>
                <CardDescription className="text-gray-400">
                  Devices used to access your platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deviceUsage.map((device, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">{device.name}</span>
                        <span className="text-gray-400">{device.value}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`${device.color} h-2 rounded-full`}
                          style={{ width: `${device.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">Revenue by Device</CardTitle>
                <CardDescription className="text-gray-400">
                  Revenue generated from different devices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <div className="h-full w-full flex items-end justify-between pt-8">
                    {deviceUsage.map((device, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center flex-1"
                      >
                        <div className="text-xs text-gray-500 mb-1">
                          {device.name}
                        </div>
                        <div
                          className={`w-4/5 ${device.color.replace(
                            "bg",
                            "bg-gradient-to-t"
                          )} to-gray-300 rounded-t`}
                          style={{ height: `${device.value * 2}%` }}
                        ></div>
                        <div className="text-xs mt-1">
                          ${(device.value * 100).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geo">
          <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700 mt-4">
            <CardHeader>
              <CardTitle className="text-white">
                Geographic Distribution
              </CardTitle>
              <CardDescription className="text-gray-400">
                User locations around the world
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 relative bg-gradient-to-br from-gray-800/50 to-gray-900/30 rounded-xl border border-gray-700">
                {/* World map visualization would go here */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="h-16 w-16 text-indigo-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-300">
                      Geographic Data
                    </h3>
                    <p className="text-gray-500">
                      Visualization of user locations worldwide
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="text-gray-300 font-medium mb-2">
                    Top Countries
                  </div>
                  <ol className="space-y-2">
                    <li className="flex justify-between">
                      <span>United States</span>
                      <span className="text-gray-400">32%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>United Kingdom</span>
                      <span className="text-gray-400">15%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Canada</span>
                      <span className="text-gray-400">12%</span>
                    </li>
                  </ol>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="text-gray-300 font-medium mb-2">
                    Fastest Growing
                  </div>
                  <ol className="space-y-2">
                    <li className="flex justify-between">
                      <span>Australia</span>
                      <span className="text-green-400">+24%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Germany</span>
                      <span className="text-green-400">+18%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Japan</span>
                      <span className="text-green-400">+15%</span>
                    </li>
                  </ol>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="text-gray-300 font-medium mb-2">
                    Highest Revenue
                  </div>
                  <ol className="space-y-2">
                    <li className="flex justify-between">
                      <span>United States</span>
                      <span className="text-gray-400">$42,890</span>
                    </li>
                    <li className="flex justify-between">
                      <span>United Kingdom</span>
                      <span className="text-gray-400">$18,760</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Canada</span>
                      <span className="text-gray-400">$12,450</span>
                    </li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Top Selling Products</CardTitle>
            <CardDescription className="text-gray-400">
              Most popular items by revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold mr-4">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{product.name}</h4>
                    <div className="flex justify-between text-sm text-gray-400 mt-1">
                      <span>{product.sales} sales</span>
                      <span>{product.revenue} revenue</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Performance Metrics</CardTitle>
            <CardDescription className="text-gray-400">
              Key indicators of business health
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm">{metric.title}</div>
                  <div className="text-xl font-bold text-white mt-1">
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
                      <span className="mr-1">▼</span>
                    )}
                    <span>{metric.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
