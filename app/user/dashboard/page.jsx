// app/page.jsx
"use client";

import { useState } from "react";
import {
  Leaf,
  ShoppingCart,
  Image as ImageIcon,
  User,
  History,
  Database,
  CloudUpload,
  Sun,
  Droplet,
  Zap,
  Heart,
  Star,
  ChevronRight,
  Plus,
  Download,
  RefreshCw,
  Settings,
  Bell,
  HelpCircle,
} from "lucide-react";

export default function PlantCareDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [uploadedImages, setUploadedImages] = useState(5);

  const purchaseHistory = [
    {
      id: 1,
      item: "Premium Fertilizer",
      date: "2023-11-18",
      amount: "$24.99",
      status: "Completed",
    },
    {
      id: 2,
      item: "Plant Food Supplement",
      date: "2023-11-10",
      amount: "$16.50",
      status: "Completed",
    },
    {
      id: 3,
      item: "Gardening Tools Set",
      date: "2023-10-25",
      amount: "$42.75",
      status: "Completed",
    },
    {
      id: 4,
      item: "Organic Pest Control",
      date: "2023-10-12",
      amount: "$18.99",
      status: "Refunded",
    },
  ];

  const subscriptions = [
    {
      id: 1,
      name: "AI Health Analysis Pro",
      date: "2023-12-15",
      amount: "$9.99/mo",
      status: "Active",
    },
    {
      id: 2,
      name: "Plant Care Premium",
      date: "2023-11-20",
      amount: "$14.99/mo",
      status: "Expired",
    },
  ];

  const recentScans = [
    { id: 1, name: "Monstera Deliciosa", date: "Today", health: "Healthy" },
    { id: 2, name: "Snake Plant", date: "Yesterday", health: "Healthy" },
    { id: 3, name: "Peace Lily", date: "Nov 15", health: "Needs Care" },
    { id: 4, name: "Fiddle Leaf Fig", date: "Nov 10", health: "Healthy" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 p-4 md:p-8">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            PlantCare AI Dashboard
          </h1>
          <p className="text-emerald-300">Welcome back, Alex Johnson</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-gray-800/50 hover:bg-gray-700/50 text-emerald-300 p-2 rounded-full transition-all">
            <Bell className="h-5 w-5" />
          </button>
          <button className="bg-gray-800/50 hover:bg-gray-700/50 text-emerald-300 p-2 rounded-full transition-all">
            <Settings className="h-5 w-5" />
          </button>
          <button className="bg-gray-800/50 hover:bg-gray-700/50 text-emerald-300 p-2 rounded-full transition-all">
            <HelpCircle className="h-5 w-5" />
          </button>
          <div className="flex items-center bg-gradient-to-r from-emerald-600/30 to-teal-600/30 px-4 py-2 rounded-full border border-emerald-500/20">
            <div className="bg-emerald-600 w-8 h-8 rounded-full flex items-center justify-center mr-2">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="text-white font-medium">Alex J.</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* User Profile Card */}
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">AJ</span>
                </div>
                <div className="absolute bottom-2 right-2 bg-emerald-500 rounded-full p-1 border-2 border-gray-900">
                  <Leaf className="h-4 w-4 text-white" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-white">Alex Johnson</h2>
              <p className="text-emerald-400 mb-2">Premium Member</p>
              <p className="text-gray-400 text-sm mb-6">
                Plant Enthusiast | Since 2021
              </p>

              <div className="flex justify-between w-full mb-6">
                <div className="text-center">
                  <p className="text-white font-bold">28</p>
                  <p className="text-gray-400 text-sm">Plants</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-bold">42</p>
                  <p className="text-gray-400 text-sm">Scans</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-bold">4.7</p>
                  <p className="text-gray-400 text-sm">Rating</p>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2.5 rounded-xl font-medium mb-3 hover:opacity-90 transition-opacity">
                Edit Profile
              </button>
              <button className="w-full bg-gray-700/50 text-emerald-400 py-2.5 rounded-xl font-medium border border-gray-600 hover:bg-gray-600/50 transition-colors">
                Upgrade Plan
              </button>
            </div>
          </div>

          {/* Storage Card */}
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center mb-4">
              <Database className="h-5 w-5 text-emerald-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">
                Storage Usage
              </h3>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>{uploadedImages} of 8 scans used</span>
                <span>Free Tier</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2.5 rounded-full"
                  style={{ width: `${(uploadedImages / 8) * 100}%` }}
                ></div>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-4">
              {8 - uploadedImages} free scans remaining. Upgrade for unlimited
              scans.
            </p>

            <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity">
              Upgrade to Pro
            </button>
          </div>

          {/* Quick Stats */}
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center mb-4">
              <Zap className="h-5 w-5 text-emerald-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">AI Insights</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-xl">
                <div>
                  <p className="text-gray-400 text-sm">Healthy Plants</p>
                  <p className="text-white font-bold">24/28</p>
                </div>
                <div className="bg-emerald-500/10 p-2 rounded-lg">
                  <Heart className="h-5 w-5 text-emerald-400" />
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-xl">
                <div>
                  <p className="text-gray-400 text-sm">Care Suggestions</p>
                  <p className="text-white font-bold">12</p>
                </div>
                <div className="bg-amber-500/10 p-2 rounded-lg">
                  <Sun className="h-5 w-5 text-amber-400" />
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-xl">
                <div>
                  <p className="text-gray-400 text-sm">Water Reminders</p>
                  <p className="text-white font-bold">3</p>
                </div>
                <div className="bg-blue-500/10 p-2 rounded-lg">
                  <Droplet className="h-5 w-5 text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Tab Navigation */}
          <div className="flex space-x-4 border-b border-gray-700 pb-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-t-lg font-medium ${
                activeTab === "overview"
                  ? "text-emerald-400 border-b-2 border-emerald-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2 rounded-t-lg font-medium ${
                activeTab === "history"
                  ? "text-emerald-400 border-b-2 border-emerald-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Buying History
            </button>
            <button
              onClick={() => setActiveTab("subscriptions")}
              className={`px-4 py-2 rounded-t-lg font-medium ${
                activeTab === "subscriptions"
                  ? "text-emerald-400 border-b-2 border-emerald-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Subscriptions
            </button>
            <button
              onClick={() => setActiveTab("plants")}
              className={`px-4 py-2 rounded-t-lg font-medium ${
                activeTab === "plants"
                  ? "text-emerald-400 border-b-2 border-emerald-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Plant Health
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Welcome Back, Plant Lover!
                    </h2>
                    <p className="text-gray-400 max-w-2xl">
                      Check your plant's health, get AI-powered care tips, and
                      manage your garden all in one place. You have{" "}
                      {8 - uploadedImages} free scans remaining this month.
                    </p>
                  </div>
                  <button className="mt-4 md:mt-0 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-medium flex items-center hover:opacity-90 transition-opacity">
                    <CloudUpload className="h-5 w-5 mr-2" />
                    Scan a Plant
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="bg-emerald-500/10 p-2 rounded-lg mr-3">
                      <ShoppingCart className="h-6 w-6 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      Recent Purchases
                    </h3>
                  </div>
                  <p className="text-3xl font-bold text-white mb-2">3</p>
                  <p className="text-gray-400 text-sm">Last purchase: Nov 18</p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-500/10 p-2 rounded-lg mr-3">
                      <RefreshCw className="h-6 w-6 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      Active Subscriptions
                    </h3>
                  </div>
                  <p className="text-3xl font-bold text-white mb-2">1</p>
                  <p className="text-gray-400 text-sm">Renews on Dec 15</p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500/10 p-2 rounded-lg mr-3">
                      <Leaf className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      Plant Health
                    </h3>
                  </div>
                  <p className="text-3xl font-bold text-white mb-2">86%</p>
                  <p className="text-gray-400 text-sm">Healthy plants ratio</p>
                </div>
              </div>

              {/* Recent Scans */}
              <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <ImageIcon className="h-5 w-5 text-emerald-400 mr-2" />
                    Recent Plant Scans
                  </h3>
                  <button className="text-emerald-400 text-sm font-medium hover:text-emerald-300">
                    View All
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentScans.map((scan) => (
                    <div
                      key={scan.id}
                      className="bg-gray-700/30 border border-gray-600 rounded-xl p-4 flex items-center hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="bg-gradient-to-br from-emerald-600 to-teal-600 w-16 h-16 rounded-xl flex items-center justify-center mr-4">
                        <Leaf className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{scan.name}</h4>
                        <p className="text-gray-400 text-sm">{scan.date}</p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          scan.health === "Healthy"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {scan.health}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Buying History Tab */}
          {activeTab === "history" && (
            <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <History className="h-5 w-5 text-emerald-400 mr-2" />
                  Purchase History
                </h3>
                <button className="text-emerald-400 text-sm font-medium hover:text-emerald-300">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {purchaseHistory.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="flex justify-between items-center p-4 bg-gray-700/30 border border-gray-600 rounded-xl hover:bg-gray-700/50 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium text-white">
                        {purchase.item}
                      </h4>
                      <p className="text-gray-400 text-sm">{purchase.date}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-white mr-4">
                        {purchase.amount}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          purchase.status === "Completed"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-rose-500/20 text-rose-400"
                        }`}
                      >
                        {purchase.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subscriptions Tab */}
          {activeTab === "subscriptions" && (
            <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <RefreshCw className="h-5 w-5 text-emerald-400 mr-2" />
                  AI Subscriptions
                </h3>
                <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity">
                  + Add Subscription
                </button>
              </div>

              <div className="space-y-4">
                {subscriptions.map((subscription) => (
                  <div
                    key={subscription.id}
                    className="p-4 bg-gray-700/30 border border-gray-600 rounded-xl hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-white">
                        {subscription.name}
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          subscription.status === "Active"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {subscription.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-400 text-sm">
                      <span>Renews: {subscription.date}</span>
                      <span className="font-medium">{subscription.amount}</span>
                    </div>
                  </div>
                ))}

                <div className="p-4 bg-gray-700/30 border border-gray-600 rounded-xl">
                  <h4 className="font-medium text-white mb-2">Free Tier</h4>
                  <p className="text-gray-400 text-sm mb-3">
                    Includes 8 free plant scans per month. AI health reports
                    with basic care tips.
                  </p>
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>Scans used: {uploadedImages}/8</span>
                    <span className="font-medium">Free</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Plant Health Tab */}
          {activeTab === "plants" && (
            <div className="space-y-6">
              {/* Upload Card */}
              <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 text-center shadow-xl">
                <div className="mx-auto bg-gray-700/30 border border-gray-600 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                  <CloudUpload className="h-10 w-10 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Scan Your Plant Health
                </h3>
                <p className="text-gray-400 max-w-xl mx-auto mb-6">
                  Upload a photo of your plant and our AI will analyze its
                  health, identify issues, and provide personalized care
                  recommendations.
                </p>
                <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-xl font-medium flex items-center mx-auto hover:opacity-90 transition-opacity">
                  <CloudUpload className="h-5 w-5 mr-2" />
                  Upload Plant Image
                </button>
                <p className="text-emerald-400 text-sm mt-4">
                  {8 - uploadedImages} free scans remaining this month
                </p>
              </div>

              {/* Analysis Report */}
              <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <Leaf className="h-5 w-5 text-emerald-400 mr-2" />
                    Latest Plant Analysis
                  </h3>
                  <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium">
                    Healthy
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <div className="bg-gradient-to-br from-emerald-700/20 to-teal-700/20 border border-gray-600 rounded-xl w-full md:w-1/3 h-64 flex items-center justify-center">
                    <div className="bg-gray-700/30 border border-gray-600 w-32 h-32 rounded-full flex items-center justify-center">
                      <Leaf className="h-16 w-16 text-emerald-400" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-2">
                      Monstera Deliciosa
                    </h4>
                    <p className="text-gray-400 mb-6">Swiss Cheese Plant</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-4">
                        <div className="flex items-center mb-2">
                          <Droplet className="h-5 w-5 text-blue-400 mr-2" />
                          <span className="text-white font-medium">
                            Hydration
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">Optimal - 78%</p>
                      </div>

                      <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-4">
                        <div className="flex items-center mb-2">
                          <Sun className="h-5 w-5 text-amber-400 mr-2" />
                          <span className="text-white font-medium">Light</span>
                        </div>
                        <p className="text-gray-400 text-sm">Adequate - 65%</p>
                      </div>

                      <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-4">
                        <div className="flex items-center mb-2">
                          <Zap className="h-5 w-5 text-purple-400 mr-2" />
                          <span className="text-white font-medium">
                            Nutrients
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">Good - 82%</p>
                      </div>

                      <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-4">
                        <div className="flex items-center mb-2">
                          <Heart className="h-5 w-5 text-rose-400 mr-2" />
                          <span className="text-white font-medium">Health</span>
                        </div>
                        <p className="text-gray-400 text-sm">Excellent - 92%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Zap className="h-5 w-5 text-amber-400 mr-2" />
                    AI Care Recommendations
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-emerald-500/10 p-1 rounded-full mt-1 mr-3">
                        <Droplet className="h-4 w-4 text-emerald-400" />
                      </div>
                      <p className="text-gray-300">
                        Water every 7-10 days. Soil should be moist but not
                        soggy.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-emerald-500/10 p-1 rounded-full mt-1 mr-3">
                        <Sun className="h-4 w-4 text-amber-400" />
                      </div>
                      <p className="text-gray-300">
                        Provide bright, indirect light. Avoid direct sunlight.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-emerald-500/10 p-1 rounded-full mt-1 mr-3">
                        <Leaf className="h-4 w-4 text-teal-400" />
                      </div>
                      <p className="text-gray-300">
                        Fertilize monthly during growing season with balanced
                        fertilizer.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
