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
  Edit3,
  Save,
  X,
  TrendingUp,
  BarChart3,
  Calendar,
  Target,
} from "lucide-react";
import PurchaseHistory from "@/components/PurchasesHistory";
import { UsageStats } from "@/components/subscription/UsageStats";
import Link from "next/link";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [plantAnalyses, setPlantAnalyses] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [editingPlant, setEditingPlant] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
  });

  const API_BASE_URL = "http://localhost:5000/api/v1";
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // API Functions
  const apiCall = async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Network error" }));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
  };

  // Fetch Dashboard Analytics
  const fetchDashboardAnalytics = async () => {
    try {
      const data = await apiCall("/ai/dashboard");

      setDashboardData(data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching dashboard analytics:", error);
      toast.error("Failed to load dashboard analytics");
      return null;
    }
  };

  // Fetch Plant Analyses with pagination
  const fetchPlantAnalyses = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const data = await apiCall(`/ai/scans?page=${page}&limit=${limit}`);

      setPlantAnalyses(data.data || []);
      setPagination(
        data.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalCount: 0,
        }
      );
      setError(null);
      return data.data;
    } catch (error) {
      setError(error.message);
      toast.error("Failed to fetch plant analyses");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Fetch specific plant analysis by ID
  const fetchPlantAnalysis = async (id) => {
    try {
      const data = await apiCall(`/ai/scans/${id}`);
      console.log(data);
      setSelectedPlant(data.data);
      setActiveTab("plants");
      return data.data;
    } catch (error) {
      toast.error("Failed to fetch plant details");
      console.error("Error fetching plant analysis:", error);
    }
  };

  // Update plant analysis
  const updatePlantAnalysis = async (id, updateData) => {
    try {
      await apiCall(`/ai/scans/${id}`, {
        method: "PUT",
        body: JSON.stringify(updateData),
      });

      toast.success("Plant analysis updated successfully!");

      // Refresh the selected plant data
      await fetchPlantAnalysis(id);

      // Refresh the list
      await fetchPlantAnalyses(pagination.currentPage);

      setEditingPlant(null);
      setEditForm({});
    } catch (error) {
      toast.error("Failed to update plant analysis");
      console.error("Error updating plant analysis:", error);
    }
  };

  // Delete plant analysis
  const deletePlantAnalysis = async (id) => {
    try {
      await apiCall(`/ai/scans/${id}`, {
        method: "DELETE",
      });

      toast.success("Plant analysis deleted successfully!");

      // Refresh data
      await fetchPlantAnalyses(pagination.currentPage);
      await fetchDashboardAnalytics();

      // Clear selected plant if it was deleted
      if (selectedPlant && selectedPlant.id === id) {
        setSelectedPlant(null);
      }
    } catch (error) {
      toast.error("Failed to delete plant analysis");
      console.error("Error deleting plant analysis:", error);
    }
  };

  // Event Handlers
  const handlePlantClick = (plant, event) => {
    if (
      event.target.closest(".delete-button") ||
      event.target.closest(".edit-button")
    ) {
      return;
    }
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

  const handleEditClick = (event, plant) => {
    event.stopPropagation();
    setEditingPlant(plant.id);
    setEditForm({
      status: plant.status || "",
      disease: plant.disease || "",
      description: plant.description || "",
      careTips: Array.isArray(plant.careTips) ? plant.careTips.join("\n") : "",
    });
  };

  const handleSaveEdit = async (event, plantId) => {
    event.stopPropagation();
    const updateData = {
      status: editForm.status,
      disease: editForm.disease,
      description: editForm.description,
      careTips: editForm.careTips.split("\n").filter((tip) => tip.trim()),
    };

    await updatePlantAnalysis(plantId, updateData);
  };

  const handleCancelEdit = (event) => {
    event.stopPropagation();
    setEditingPlant(null);
    setEditForm({});
  };

  const handlePageChange = (newPage) => {
    fetchPlantAnalyses(newPage);
  };

  const refreshAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchDashboardAnalytics(),
        fetchPlantAnalyses(pagination.currentPage),
      ]);
      toast.success("Data refreshed successfully!");
    } catch (error) {
      toast.error("Failed to refresh data");
    } finally {
      setLoading(false);
    }
  };

  // Initialize data on component mount
  useEffect(() => {
    if (token) {
      Promise.all([fetchDashboardAnalytics(), fetchPlantAnalyses(1)]);
    } else {
      setLoading(false);
    }
  }, [token]);

  // Helper functions
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";

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
    } else if (
      status === "Fair" ||
      status === "Needs Care" ||
      healthScore > 60
    ) {
      return "bg-amber-500/20 text-amber-400";
    } else {
      return "bg-red-500/20 text-red-400";
    }
  };

  const getPlantName = (plant) => {
    return (
      plant.plantType ||
      plant.plant_name ||
      plant.plantName ||
      plant.plant_type ||
      "Unknown Plant"
    );
  };

  const getHealthStatus = (plant) => {
    return (
      plant.status ||
      plant.health_status ||
      plant.healthStatus ||
      (plant.healthScore > 80
        ? "Healthy"
        : plant.healthScore > 60
        ? "Fair"
        : "Poor") ||
      "Unknown"
    );
  };

  const getHealthScore = (plant) => {
    return plant.healthScore || plant.overall_health || plant.health_score || 0;
  };

  const getImageUrl = (plant) => {
    return plant.imageUrl || plant.image_url || null;
  };

  // Helper component for plant image with fallback
  const PlantImage = ({ src, alt, className, size = "medium" }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    const handleImageError = () => {
      setImageError(true);
      setImageLoading(false);
    };

    const handleImageLoad = () => {
      setImageLoading(false);
    };

    const iconSize =
      size === "small" ? "h-6 w-6" : size === "large" ? "h-16 w-16" : "h-8 w-8";

    return (
      <div className={`relative ${className}`}>
        {src && !imageError ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-700/50 rounded-xl">
                <RefreshCw
                  className={`${iconSize} text-gray-400 animate-spin`}
                />
              </div>
            )}
            <Image
              src={src}
              alt={alt}
              className={`${className} ${
                imageLoading ? "opacity-0" : "opacity-100"
              } transition-opacity`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              width={48}
              height={48}
            />
            || {imageError && <Leaf className="h-16 w-16 text-white" />}
          </>
        ) : (
          <div
            className={`${className} flex items-center justify-center bg-gradient-to-br from-emerald-600 to-teal-600`}
          >
            <Leaf className={`${iconSize} text-white`} />
          </div>
        )}
      </div>
    );
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
                    {dashboardData?.summary?.totalScans || 0}
                  </p>
                  <p className="text-gray-400 text-sm">Plants</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-bold">
                    {dashboardData?.summary?.uniquePlantTypes || 0}
                  </p>
                  <p className="text-gray-400 text-sm">Types</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-bold">
                    {dashboardData?.summary?.averageHealthScore || "0"}
                  </p>
                  <p className="text-gray-400 text-sm">Avg Health</p>
                </div>
              </div>

              <button
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2.5 rounded-xl font-medium mb-3 hover:opacity-90 transition-opacity disabled:opacity-50"
                onClick={refreshAllData}
                disabled={loading}
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 animate-spin mx-auto" />
                ) : (
                  "Refresh Data"
                )}
              </button>
            </div>
          </div>

          <UsageStats />

          {/* Dashboard Analytics */}
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-5 w-5 text-emerald-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">
                Plant Analytics
              </h3>
            </div>

            {loading || !dashboardData ? (
              <div className="flex items-center justify-center p-4">
                <RefreshCw className="h-5 w-5 text-emerald-400 animate-spin mr-2" />
                <span className="text-gray-400">Loading analytics...</span>
              </div>
            ) : dashboardData.summary.totalScans === 0 ? (
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
                      {dashboardData.summary.healthyPlants}/
                      {dashboardData.summary.totalScans}
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 p-2 rounded-lg">
                    <Heart className="h-5 w-5 text-emerald-400" />
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-xl">
                  <div>
                    <p className="text-gray-400 text-sm">Avg Confidence</p>
                    <p className="text-white font-bold">
                      {dashboardData.summary.averageConfidence}%
                    </p>
                  </div>
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <Target className="h-5 w-5 text-blue-400" />
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-xl">
                  <div>
                    <p className="text-gray-400 text-sm">Plant Types</p>
                    <p className="text-white font-bold">
                      {dashboardData.summary.uniquePlantTypes}
                    </p>
                  </div>
                  <div className="bg-purple-500/10 p-2 rounded-lg">
                    <Database className="h-5 w-5 text-purple-400" />
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
              onClick={() => setActiveTab("plants")}
              className={`px-4 py-2 rounded-t-lg font-medium ${
                activeTab === "plants"
                  ? "text-emerald-400 border-b-2 border-emerald-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Plant Health ({plantAnalyses.length})
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-2 rounded-t-lg font-medium ${
                activeTab === "analytics"
                  ? "text-emerald-400 border-b-2 border-emerald-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2 rounded-t-lg font-medium ${
                activeTab === "history"
                  ? "text-emerald-400 border-b-2 border-emerald-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Purchase History
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
                      manage your garden all in one place.
                      {dashboardData && (
                        <span className="block mt-1">
                          You have analyzed {dashboardData.summary.totalScans}{" "}
                          plants with {dashboardData.summary.healthyPlants}{" "}
                          healthy ones.
                        </span>
                      )}
                    </p>
                  </div>

                  <Link href="/plant-health">
                    <button className="mt-4 md:mt-0 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-medium flex items-center hover:opacity-90 transition-opacity">
                      <CloudUpload className="h-5 w-5 mr-2" />
                      Scan a Plant
                    </button>
                  </Link>
                </div>
              </div>

              {/* Dashboard Stats Grid */}
              {dashboardData && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center mb-4">
                      <div className="bg-emerald-500/10 p-2 rounded-lg mr-3">
                        <Heart className="h-6 w-6 text-emerald-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        Plant Health
                      </h3>
                    </div>
                    <p className="text-3xl font-bold text-white mb-2">
                      {Math.round(
                        (dashboardData.summary.healthyPlants /
                          Math.max(dashboardData.summary.totalScans, 1)) *
                          100
                      )}
                      %
                    </p>
                    <p className="text-gray-400 text-sm">
                      Healthy plants ratio
                    </p>
                  </div>

                  <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-500/10 p-2 rounded-lg mr-3">
                        <Target className="h-6 w-6 text-blue-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        Avg Confidence
                      </h3>
                    </div>
                    <p className="text-3xl font-bold text-white mb-2">
                      {dashboardData.summary.averageConfidence}%
                    </p>
                    <p className="text-gray-400 text-sm">Analysis accuracy</p>
                  </div>

                  <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-500/10 p-2 rounded-lg mr-3">
                        <Database className="h-6 w-6 text-purple-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        Plant Variety
                      </h3>
                    </div>
                    <p className="text-3xl font-bold text-white mb-2">
                      {dashboardData.summary.uniquePlantTypes}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Different plant types
                    </p>
                  </div>
                </div>
              )}

              {/* Recent Plant Scans */}
              <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <ImageIcon className="h-5 w-5 text-emerald-400 mr-2" />
                    Recent Plant Scans
                  </h3>
                  {plantAnalyses.length > 4 && (
                    <button
                      onClick={() => setActiveTab("plants")}
                      className="text-emerald-400 text-sm font-medium hover:text-emerald-300"
                    >
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
                        className="bg-gray-700/30 border border-gray-600 rounded-xl p-4 flex items-center hover:bg-gray-700/50 transition-colors cursor-pointer relative group"
                        onClick={(e) => handlePlantClick(plant, e)}
                      >
                        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 w-16 h-16 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                          {getImageUrl(plant) ? (
                            (
                              <Image
                                src={getImageUrl(plant)}
                                alt={getPlantName(plant)}
                                className="w-full h-full object-cover rounded-xl"
                                width={48}
                                height={48}
                              />
                            ) || <Leaf className="h-8 w-8 text-white" />
                          ) : (
                            <Leaf className="h-8 w-8 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white truncate">
                            {getPlantName(plant)}
                          </h4>
                          <p className="text-gray-400 text-sm">
                            {formatDate(plant.createdAt)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getHealthStatusColor(
                              getHealthStatus(plant),
                              getHealthScore(plant)
                            )}`}
                          >
                            {getHealthStatus(plant)}
                          </div>
                          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              className="delete-button p-1 hover:bg-red-500/20 rounded-full transition-colors"
                              onClick={(e) => handleDeleteClick(e, plant.id)}
                              title="Delete analysis"
                            >
                              <Trash2 className="h-4 w-4 text-red-400 hover:text-red-300" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                        getHealthStatus(selectedPlant),
                        getHealthScore(selectedPlant)
                      )}`}
                    >
                      {getHealthStatus(selectedPlant)}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <div className="bg-gradient-to-br from-emerald-700/20 to-teal-700/20 border border-gray-600 rounded-xl w-full md:w-1/3 h-64 flex items-center justify-center">
                      {getImageUrl(selectedPlant) ? (
                        (
                          <Image
                            src={getImageUrl(selectedPlant)}
                            alt={getPlantName(selectedPlant)}
                            className="w-full h-full object-cover rounded-xl"
                            width={192}
                            height={192}
                          />
                        ) || <Leaf className="h-16 w-16 text-emerald-400" />
                      ) : (
                        <div className="bg-gray-700/30 border border-gray-600 w-32 h-32 rounded-full flex items-center justify-center">
                          <Leaf className="h-16 w-16 text-emerald-400" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2">
                        {getPlantName(selectedPlant)}
                      </h4>
                      <p className="text-gray-400 mb-6">
                        {selectedPlant.scientificName || "Plant Species"}
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-4">
                          <div className="flex items-center mb-2">
                            <Heart className="h-5 w-5 text-rose-400 mr-2" />
                            <span className="text-white font-medium">
                              Health Score
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">
                            {getHealthScore(selectedPlant)}%
                          </p>
                        </div>

                        <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-4">
                          <div className="flex items-center mb-2">
                            <Target className="h-5 w-5 text-blue-400 mr-2" />
                            <span className="text-white font-medium">
                              Confidence
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">
                            {selectedPlant.confidence || 0}%
                          </p>
                        </div>

                        <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-4">
                          <div className="flex items-center mb-2">
                            <AlertCircle className="h-5 w-5 text-amber-400 mr-2" />
                            <span className="text-white font-medium">
                              Disease
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">
                            {selectedPlant.disease &&
                            selectedPlant.disease !== "None"
                              ? selectedPlant.disease
                              : "No diseases detected"}
                          </p>
                        </div>

                        <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-4">
                          <div className="flex items-center mb-2">
                            <Calendar className="h-5 w-5 text-purple-400 mr-2" />
                            <span className="text-white font-medium">
                              Analyzed
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">
                            {formatDate(selectedPlant.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Plant Description */}
                  {selectedPlant.description && (
                    <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-6 mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <ImageIcon className="h-5 w-5 text-blue-400 mr-2" />
                        Analysis Description
                      </h4>
                      <p className="text-gray-300">
                        {selectedPlant.description}
                      </p>
                    </div>
                  )}

                  {/* Care Recommendations
                  {(selectedPlant.careTips || []).length > 0 && (
                    <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-6 mb-6">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Zap className="h-5 w-5 text-amber-400 mr-2" />
                        AI Care Recommendations
                      </h4>
                      <ul className="space-y-3">
                        {careTips(selectedPlant).map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <div className="bg-emerald-500/10 p-1 rounded-full mt-1 mr-3">
                              <Leaf className="h-4 w-4 text-emerald-400" />
                            </div>
                            <p className="text-gray-300">{tip}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )} */}

                  {/* Environmental Requirements */}
                  {(selectedPlant.environmental ||
                    selectedPlant.fertilizer) && (
                    <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-6 mb-6">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Sun className="h-5 w-5 text-yellow-400 mr-2" />
                        Environmental Requirements
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {selectedPlant.environmental?.humidity && (
                          <div className="text-center">
                            <Droplet className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                            <p className="text-white font-medium">Humidity</p>
                            <p className="text-gray-400 text-sm">
                              {selectedPlant.environmental.humidity}
                            </p>
                          </div>
                        )}
                        {selectedPlant.environmental?.light && (
                          <div className="text-center">
                            <Sun className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                            <p className="text-white font-medium">Light</p>
                            <p className="text-gray-400 text-sm">
                              {selectedPlant.environmental.light}
                            </p>
                          </div>
                        )}
                        {selectedPlant.environmental?.temperature && (
                          <div className="text-center">
                            <TrendingUp className="h-6 w-6 text-red-400 mx-auto mb-2" />
                            <p className="text-white font-medium">
                              Temperature
                            </p>
                            <p className="text-gray-400 text-sm">
                              {selectedPlant.environmental.temperature}
                            </p>
                          </div>
                        )}
                      </div>

                      {selectedPlant.fertilizer && (
                        <div className="mt-6 pt-6 border-t border-gray-600">
                          <h5 className="text-white font-medium mb-3">
                            Fertilizer Recommendations
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Type:</span>
                              <p className="text-white">
                                {selectedPlant.fertilizer.type}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-400">
                                Application:
                              </span>
                              <p className="text-white">
                                {selectedPlant.fertilizer.application}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-400">Frequency:</span>
                              <p className="text-white">
                                {selectedPlant.fertilizer.frequency}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setSelectedPlant(null)}
                      className="text-gray-400 hover:text-gray-300 font-medium flex items-center"
                    >
                      ← Back to Plant List
                    </button>
                    <div className="flex space-x-3">
                      <button
                        onClick={(e) => handleDeleteClick(e, selectedPlant.id)}
                        className="text-red-400 hover:text-red-300 font-medium flex items-center"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete Analysis
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Plants List Header */}
                  <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                          <Leaf className="h-6 w-6 text-emerald-400 mr-2" />
                          Plant Health Dashboard
                        </h3>
                        <p className="text-gray-400">
                          Manage and monitor all your plant analyses. Total:{" "}
                          {pagination.totalCount} plants
                        </p>
                      </div>
                      <Link href="/plant-health">
                        <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center">
                          <Plus className="h-4 w-4 mr-2" />
                          Add New Plant
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Plants Grid */}
                  {loading ? (
                    <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-xl">
                      <div className="flex items-center justify-center">
                        <RefreshCw className="h-6 w-6 text-emerald-400 animate-spin mr-2" />
                        <span className="text-gray-400">Loading plants...</span>
                      </div>
                    </div>
                  ) : plantAnalyses.length === 0 ? (
                    <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-xl">
                      <div className="text-center">
                        <Leaf className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">
                          No Plants Found
                        </h3>
                        <p className="text-gray-400 mb-6">
                          Start your plant care journey by scanning your first
                          plant.
                        </p>
                        <Link href="/plant-health">
                          <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity">
                            Scan Your First Plant
                          </button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {plantAnalyses.map((plant) => (
                          <div
                            key={plant.id}
                            className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl hover:border-gray-600 transition-colors cursor-pointer group"
                            onClick={(e) => handlePlantClick(plant, e)}
                          >
                            {/* Edit Form */}
                            {editingPlant === plant.id ? (
                              <div
                                className="space-y-4"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Status
                                  </label>
                                  <select
                                    value={editForm.status}
                                    onChange={(e) =>
                                      setEditForm({
                                        ...editForm,
                                        status: e.target.value,
                                      })
                                    }
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-emerald-400 focus:outline-none"
                                  >
                                    <option value="Healthy">Healthy</option>
                                    <option value="Unhealthy">Unhealthy</option>
                                    <option value="Fair">Fair</option>
                                    <option value="Poor">Poor</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Disease
                                  </label>
                                  <input
                                    type="text"
                                    value={editForm.disease}
                                    onChange={(e) =>
                                      setEditForm({
                                        ...editForm,
                                        disease: e.target.value,
                                      })
                                    }
                                    placeholder="Enter disease or 'None'"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-emerald-400 focus:outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Description
                                  </label>
                                  <textarea
                                    value={editForm.description}
                                    onChange={(e) =>
                                      setEditForm({
                                        ...editForm,
                                        description: e.target.value,
                                      })
                                    }
                                    placeholder="Enter description"
                                    rows={3}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-emerald-400 focus:outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Care Tips (one per line)
                                  </label>
                                  <textarea
                                    value={editForm.careTips}
                                    onChange={(e) =>
                                      setEditForm({
                                        ...editForm,
                                        careTips: e.target.value,
                                      })
                                    }
                                    placeholder="Enter care tips, one per line"
                                    rows={4}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-emerald-400 focus:outline-none"
                                  />
                                </div>
                                <div className="flex space-x-2">
                                  <button
                                    onClick={(e) => handleSaveEdit(e, plant.id)}
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                                  >
                                    <Save className="h-4 w-4 mr-1" />
                                    Save
                                  </button>
                                  <button
                                    onClick={handleCancelEdit}
                                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                {/* Plant Image */}
                                <div className="bg-gradient-to-br from-emerald-600 to-teal-600 w-full h-48 rounded-xl flex items-center justify-center mb-4">
                                  {getImageUrl(plant) ? (
                                    (
                                      <Image
                                        src={getImageUrl(plant)}
                                        alt={getPlantName(plant)}
                                        className="w-full h-full object-cover rounded-xl"
                                        width={192}
                                        height={192}
                                      />
                                    ) || (
                                      <Leaf className="h-16 w-16 text-white" />
                                    )
                                  ) : (
                                    <Leaf className="h-16 w-16 text-white" />
                                  )}
                                </div>

                                {/* Plant Info */}
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-white text-lg truncate">
                                      {getPlantName(plant)}
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                      {formatDate(plant.createdAt)}
                                    </p>
                                  </div>
                                  <div
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getHealthStatusColor(
                                      getHealthStatus(plant),
                                      getHealthScore(plant)
                                    )}`}
                                  >
                                    {getHealthStatus(plant)}
                                  </div>
                                </div>

                                {/* Health Metrics */}
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                  <div className="bg-gray-700/50 rounded-lg p-3">
                                    <div className="flex items-center mb-1">
                                      <Heart className="h-4 w-4 text-emerald-400 mr-1" />
                                      <span className="text-xs text-gray-400">
                                        Health
                                      </span>
                                    </div>
                                    <p className="text-white font-semibold">
                                      {getHealthScore(plant)}%
                                    </p>
                                  </div>
                                  <div className="bg-gray-700/50 rounded-lg p-3">
                                    <div className="flex items-center mb-1">
                                      <Target className="h-4 w-4 text-blue-400 mr-1" />
                                      <span className="text-xs text-gray-400">
                                        Confidence
                                      </span>
                                    </div>
                                    <p className="text-white font-semibold">
                                      {plant.confidence || 0}%
                                    </p>
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    className="delete-button text-red-400 hover:text-red-300 text-sm flex items-center"
                                    onClick={(e) =>
                                      handleDeleteClick(e, plant.id)
                                    }
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Pagination */}
                      {pagination.totalPages > 1 && (
                        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
                          <div className="flex justify-between items-center">
                            <div className="text-gray-400 text-sm">
                              Showing {(pagination.currentPage - 1) * 10 + 1} to{" "}
                              {Math.min(
                                pagination.currentPage * 10,
                                pagination.totalCount
                              )}{" "}
                              of {pagination.totalCount} plants
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  handlePageChange(pagination.currentPage - 1)
                                }
                                disabled={!pagination.hasPrev}
                                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                Previous
                              </button>
                              <span className="px-4 py-2 bg-emerald-600 text-white rounded-lg">
                                {pagination.currentPage}
                              </span>
                              <button
                                onClick={() =>
                                  handlePageChange(pagination.currentPage + 1)
                                }
                                disabled={!pagination.hasNext}
                                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              {dashboardData ? (
                <>
                  {/* Analytics Overview */}
                  <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                      <BarChart3 className="h-6 w-6 text-emerald-400 mr-2" />
                      Plant Analytics Overview
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="bg-emerald-500/10 p-3 rounded-lg mb-3">
                          <Database className="h-8 w-8 text-emerald-400 mx-auto" />
                        </div>
                        <h4 className="text-2xl font-bold text-white">
                          {dashboardData.summary.totalScans}
                        </h4>
                        <p className="text-gray-400 text-sm">Total Scans</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-green-500/10 p-3 rounded-lg mb-3">
                          <Heart className="h-8 w-8 text-green-400 mx-auto" />
                        </div>
                        <h4 className="text-2xl font-bold text-white">
                          {dashboardData.summary.healthyPlants}
                        </h4>
                        <p className="text-gray-400 text-sm">Healthy Plants</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-red-500/10 p-3 rounded-lg mb-3">
                          <AlertCircle className="h-8 w-8 text-red-400 mx-auto" />
                        </div>
                        <h4 className="text-2xl font-bold text-white">
                          {dashboardData.summary.unhealthyPlants}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          Unhealthy Plants
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="bg-blue-500/10 p-3 rounded-lg mb-3">
                          <Target className="h-8 w-8 text-blue-400 mx-auto" />
                        </div>
                        <h4 className="text-2xl font-bold text-white">
                          {dashboardData.summary.averageConfidence}%
                        </h4>
                        <p className="text-gray-400 text-sm">Avg Confidence</p>
                      </div>
                    </div>
                  </div>

                  {/* Plant Types Distribution */}
                  {dashboardData.charts.plantTypes.length > 0 && (
                    <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Leaf className="h-5 w-5 text-emerald-400 mr-2" />
                        Plant Types Distribution
                      </h4>
                      <div className="space-y-3">
                        {dashboardData.charts.plantTypes.map((plant, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                          >
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-emerald-400 rounded-full mr-3"></div>
                              <span className="text-white font-medium">
                                {plant.type}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-white font-bold">
                                {plant.count}
                              </span>
                              <span className="text-gray-400 text-sm ml-2">
                                ({plant.avgHealth}% avg health)
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Health Status Distribution */}
                  {dashboardData.charts.healthDistribution.length > 0 && (
                    <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Heart className="h-5 w-5 text-rose-400 mr-2" />
                        Health Status Distribution
                      </h4>
                      <div className="space-y-3">
                        {dashboardData.charts.healthDistribution.map(
                          (status, index) => {
                            const percentage = Math.round(
                              (status.count /
                                dashboardData.summary.totalScans) *
                                100
                            );
                            return (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                              >
                                <div className="flex items-center">
                                  <div
                                    className={`w-3 h-3 rounded-full mr-3 ${
                                      status.status === "Healthy"
                                        ? "bg-emerald-400"
                                        : status.status === "Fair"
                                        ? "bg-amber-400"
                                        : "bg-red-400"
                                    }`}
                                  ></div>
                                  <span className="text-white font-medium">
                                    {status.status}
                                  </span>
                                </div>
                                <div className="text-right">
                                  <span className="text-white font-bold">
                                    {status.count}
                                  </span>
                                  <span className="text-gray-400 text-sm ml-2">
                                    ({percentage}%)
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}

                  {/* Recent Scans */}
                  {dashboardData.recentScans.length > 0 && (
                    <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Calendar className="h-5 w-5 text-purple-400 mr-2" />
                        Recent Plant Scans
                      </h4>
                      <div className="space-y-3">
                        {dashboardData.recentScans.map((scan, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 cursor-pointer transition-colors"
                            onClick={() => fetchPlantAnalysis(scan.id)}
                          >
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center mr-3">
                                {scan.imageUrl ? (
                                  (
                                    <Image
                                      src={scan.imageUrl}
                                      alt={scan.plantType}
                                      className="w-full h-full object-cover rounded-lg"
                                      width={48}
                                      height={48}
                                    />
                                  ) || <Leaf className="h-6 w-6 text-white" />
                                ) : (
                                  <Leaf className="h-6 w-6 text-white" />
                                )}
                              </div>
                              <div>
                                <p className="text-white font-medium">
                                  {scan.plantType}
                                </p>
                                <p className="text-gray-400 text-sm">
                                  {formatDate(scan.createdAt)}
                                </p>
                              </div>
                            </div>
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getHealthStatusColor(
                                scan.status,
                                scan.healthScore
                              )}`}
                            >
                              {scan.status}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-xl">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">
                      No Analytics Data
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Start scanning plants to see detailed analytics and
                      insights.
                    </p>
                    <Link href="/plant-health">
                      <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity">
                        Scan Your First Plant
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Purchase History Tab */}
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
        </div>
      </div>
    </div>
  );
}
