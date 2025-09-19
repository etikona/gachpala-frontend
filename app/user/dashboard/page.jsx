// app/page.jsx
"use client";

import { useState, useEffect } from "react";
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
  Trash2,
  AlertCircle,
} from "lucide-react";
import PurchaseHistory from "@/components/PurchasesHistory";
import { UsageStats } from "@/components/subscription/UsageStats";
import Link from "next/link";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [uploadedImages, setUploadedImages] = useState(5);
  const [plantAnalyses, setPlantAnalyses] = useState([]);
  console.log(plantAnalyses);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aiInsights, setAiInsights] = useState({
    healthyPlants: 0,
    totalPlants: 0,
    careSuggestions: 0,
    waterReminders: 0,
  });
  console.log(aiInsights);

  const API_BASE_URL = "http://localhost:5000/api/v1/ai";
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch all plant analyses
  const fetchPlantAnalyses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/analysis-history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch plant analyses");
      }
      const data = await response.json();

      const analyses = data.analyses || [];
      setPlantAnalyses(analyses);

      // Calculate AI insights
      const totalPlants = analyses.length || 0;
      const healthyPlants =
        analyses.filter(
          (plant) =>
            plant.health_status === "Healthy" || plant.overall_health > 80
        ).length || 0;

      let careSuggestions = 0;
      let waterReminders = 0;

      analyses.forEach((plant) => {
        const recommendations = plant.recommendations || [];
        careSuggestions += recommendations.length;

        if (
          recommendations.some(
            (rec) =>
              rec.toLowerCase().includes("water") ||
              rec.toLowerCase().includes("hydrate")
          )
        ) {
          waterReminders++;
        }
      });

      setAiInsights({
        healthyPlants,
        totalPlants,
        careSuggestions,
        waterReminders,
      });

      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching plant analyses:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch specific plant analysis
  const fetchPlantAnalysis = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/analysis/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch plant analysis");
      }
      const data = await response.json();
      setSelectedPlant(data.data);
      setActiveTab("plants");
    } catch (err) {
      console.error("Error fetching plant analysis:", err);
    }
  };

  // Delete plant analysis
  const deletePlantAnalysis = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/analysis/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete plant analysis");
      }
      await fetchPlantAnalyses();

      if (selectedPlant && selectedPlant.id === id) {
        setSelectedPlant(null);
      }
    } catch (err) {
      console.error("Error deleting plant analysis:", err);
    }
  };

  const handlePlantClick = (plant, event) => {
    if (event.target.closest(".delete-button")) return;
    fetchPlantAnalysis(plant.id);
  };

  const handleDeleteClick = (event, plantId) => {
    event.stopPropagation();
    if (
      window.confirm("Are you sure you want to delete this plant analysis?")
    ) {
      deletePlantAnalysis(plantId);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPlantAnalyses();
    }
  }, [token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getHealthStatusColor = (status, healthScore) => {
    if (status === "Healthy" || healthScore > 80) {
      return "bg-emerald-500/20 text-emerald-400";
    } else if (status === "Needs Care" || healthScore > 60) {
      return "bg-amber-500/20 text-amber-400";
    } else {
      return "bg-red-500/20 text-red-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 mt-12 gap-6">
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
                  <p className="text-white font-bold">
                    {aiInsights.totalPlants}
                  </p>
                  <p className="text-gray-400 text-sm">Plants</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-bold">{plantAnalyses.length}</p>
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
            </div>
          </div>

          <UsageStats />

          {/* AI Insights */}
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center mb-4">
              <Zap className="h-5 w-5 text-emerald-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">AI Insights</h3>
            </div>

            {loading ? (
              <div className="flex items-center justify-center p-4">
                <RefreshCw className="h-5 w-5 text-emerald-400 animate-spin mr-2" />
                <span className="text-gray-400">Loading insights...</span>
              </div>
            ) : aiInsights.totalPlants === 0 ? (
              <div className="text-center p-4">
                <Leaf className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No plant data available</p>
                <p className="text-gray-500 text-xs mt-1">
                  Start by scanning your first plant!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-xl">
                  <div>
                    <p className="text-gray-400 text-sm">Healthy Plants</p>
                    <p className="text-white font-bold">
                      {aiInsights.healthyPlants}/{aiInsights.totalPlants}
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 p-2 rounded-lg">
                    <Heart className="h-5 w-5 text-emerald-400" />
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-xl">
                  <div>
                    <p className="text-gray-400 text-sm">Care Suggestions</p>
                    <p className="text-white font-bold">
                      {aiInsights.careSuggestions}
                    </p>
                  </div>
                  <div className="bg-amber-500/10 p-2 rounded-lg">
                    <Sun className="h-5 w-5 text-amber-400" />
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-xl">
                  <div>
                    <p className="text-gray-400 text-sm">Water Reminders</p>
                    <p className="text-white font-bold">
                      {aiInsights.waterReminders}
                    </p>
                  </div>
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <Droplet className="h-5 w-5 text-blue-400" />
                  </div>
                </div>
              </div>
            )}
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
                    <Link href="/plant-health">Scan a Plant</Link>
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
                  <p className="text-3xl font-bold text-white mb-2">
                    {aiInsights.totalPlants > 0
                      ? Math.round(
                          (aiInsights.healthyPlants / aiInsights.totalPlants) *
                            100
                        )
                      : 0}
                    %
                  </p>
                  <p className="text-gray-400 text-sm">Healthy plants ratio</p>
                </div>
              </div>

              {/* Recent Plant Scans */}
              <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <ImageIcon className="h-5 w-5 text-emerald-400 mr-2" />
                    Recent Plant Scans
                  </h3>
                  {plantAnalyses.length > 4 && (
                    <button className="text-emerald-400 text-sm font-medium hover:text-emerald-300">
                      View All
                    </button>
                  )}
                </div>

                {loading ? (
                  <div className="flex items-center justify-center p-8">
                    <RefreshCw className="h-6 w-6 text-emerald-400 animate-spin mr-2" />
                    <span className="text-gray-400">
                      Loading plant scans...
                    </span>
                  </div>
                ) : plantAnalyses.length === 0 ? (
                  <div className="text-center p-8">
                    <ImageIcon className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <h4 className="text-white font-medium mb-2">
                      No Plant Scans Yet
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Start scanning your plants to see their health analysis
                      here
                    </p>
                    <Link href="/plant-health">
                      <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                        Scan Your First Plant
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {plantAnalyses.slice(0, 4).map((plant) => (
                      <div
                        key={plant.id}
                        className="bg-gray-700/30 border border-gray-600 rounded-xl p-4 flex items-center hover:bg-gray-700/50 transition-colors cursor-pointer relative"
                        onClick={(e) => handlePlantClick(plant, e)}
                      >
                        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 w-16 h-16 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                          {plant.image_url ? (
                            <img
                              src={plant.image_url}
                              alt={plant.plant_name || "Plant"}
                              className="w-full h-full object-cover rounded-xl"
                            />
                          ) : (
                            <Leaf className="h-8 w-8 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white truncate">
                            {plant.plant_name || "Unknown Plant"}
                          </h4>
                          <p className="text-gray-400 text-sm">
                            {formatDate(plant.created_at)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getHealthStatusColor(
                              plant.health_status,
                              plant.overall_health
                            )}`}
                          >
                            {plant.health_status ||
                              (plant.overall_health > 80
                                ? "Healthy"
                                : plant.overall_health > 60
                                ? "Needs Care"
                                : "Poor")}
                          </div>
                          <button
                            className="delete-button p-1 hover:bg-red-500/20 rounded-full transition-colors"
                            onClick={(e) => handleDeleteClick(e, plant.id)}
                            title="Delete analysis"
                          >
                            <Trash2 className="h-4 w-4 text-red-400 hover:text-red-300" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                <PurchaseHistory />
              </div>
            </div>
          )}

          {/* Plant Health Tab */}
          {activeTab === "plants" && (
            <div className="space-y-6">
              {selectedPlant ? (
                <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <Leaf className="h-5 w-5 text-emerald-400 mr-2" />
                      Plant Analysis Details
                    </h3>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getHealthStatusColor(
                        selectedPlant.healthStatus,
                        selectedPlant.overallHealth
                      )}`}
                    >
                      {selectedPlant.healthStatus ||
                        (selectedPlant.overallHealth > 80
                          ? "Healthy"
                          : selectedPlant.overallHealth > 60
                          ? "Needs Care"
                          : "Poor")}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <div className="bg-gradient-to-br from-emerald-700/20 to-teal-700/20 border border-gray-600 rounded-xl w-full md:w-1/3 h-64 flex items-center justify-center">
                      {selectedPlant.imageUrl ? (
                        <img
                          src={selectedPlant.imageUrl}
                          alt={selectedPlant.plantName}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <div className="bg-gray-700/30 border border-gray-600 w-32 h-32 rounded-full flex items-center justify-center">
                          <Leaf className="h-16 w-16 text-emerald-400" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2">
                        {selectedPlant.plantName || "Unknown Plant"}
                      </h4>
                      <p className="text-gray-400 mb-6">
                        {selectedPlant.scientificName || "Plant Species"}
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-4">
                          <div className="flex items-center mb-2">
                            <Droplet className="h-5 w-5 text-blue-400 mr-2" />
                            <span className="text-white font-medium">
                              Hydration
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">
                            {selectedPlant.hydrationLevel
                              ? `${selectedPlant.hydrationLevel}%`
                              : selectedPlant.wateringNeeds || "Good"}
                          </p>
                        </div>

                        <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-4">
                          <div className="flex items-center mb-2">
                            <Sun className="h-5 w-5 text-amber-400 mr-2" />
                            <span className="text-white font-medium">
                              Light
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">
                            {selectedPlant.lightCondition ||
                              selectedPlant.lightNeeds ||
                              "Adequate"}
                          </p>
                        </div>

                        <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-4">
                          <div className="flex items-center mb-2">
                            <Zap className="h-5 w-5 text-purple-400 mr-2" />
                            <span className="text-white font-medium">
                              Nutrients
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">
                            {selectedPlant.nutrientLevel
                              ? `${selectedPlant.nutrientLevel}%`
                              : selectedPlant.soilCondition || "Good"}
                          </p>
                        </div>

                        <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-4">
                          <div className="flex items-center mb-2">
                            <Heart className="h-5 w-5 text-rose-400 mr-2" />
                            <span className="text-white font-medium">
                              Health
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">
                            {selectedPlant.overallHealth
                              ? `${selectedPlant.overallHealth}%`
                              : selectedPlant.healthStatus || "Good"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedPlant.recommendations &&
                    selectedPlant.recommendations.length > 0 && (
                      <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <Zap className="h-5 w-5 text-amber-400 mr-2" />
                          AI Care Recommendations
                        </h4>
                        <ul className="space-y-3">
                          {selectedPlant.recommendations.map(
                            (recommendation, index) => (
                              <li key={index} className="flex items-start">
                                <div className="bg-emerald-500/10 p-1 rounded-full mt-1 mr-3">
                                  <Leaf className="h-4 w-4 text-emerald-400" />
                                </div>
                                <p className="text-gray-300">
                                  {recommendation}
                                </p>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() => setSelectedPlant(null)}
                      className="text-gray-400 hover:text-gray-300 font-medium"
                    >
                      ← Back to Overview
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteClick(
                          { stopPropagation: () => {} },
                          selectedPlant.id
                        )
                      }
                      className="text-red-400 hover:text-red-300 font-medium flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete Analysis
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
                  <div className="text-center p-8">
                    <Leaf className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">
                      Select a Plant to View Details
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Click on any plant from your recent scans to see detailed
                      analysis and care recommendations.
                    </p>
                    {plantAnalyses.length === 0 && (
                      <Link href="/plant-health">
                        <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity">
                          Scan Your First Plant
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
