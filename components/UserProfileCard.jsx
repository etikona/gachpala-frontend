// components/UserProfileCard.js
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Leaf, Edit3, Camera, X, Save, Loader } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const UserProfileCard = () => {
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    profileImage: null,
    joinedAt: null,
  });

  const [scanStats, setScanStats] = useState({
    totalScans: 0,
    uniquePlantTypes: 0,
    averageHealthScore: "0",
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Memoized token getter
  const getToken = useCallback(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  }, []);

  // Optimized fetch function with caching
  const fetchAPI = useCallback(
    async (endpoint, options = {}) => {
      const token = getToken();
      if (!token) throw new Error("Authentication required");

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });
      console.log(response);
      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        throw new Error("Session expired");
      }

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return response.json();
    },
    [getToken]
  );

  // Fetch user profile data
  const fetchUserProfile = useCallback(async () => {
    try {
      const data = await fetchAPI("/api/v1/user/dashboard");

      if (!data.success) {
        throw new Error("Failed to fetch profile");
      }

      return {
        name: data.data?.user?.name || "User",
        email: data.data?.user?.email || "",
        profileImage: data.data?.user?.profileImage || null,
        joinedAt: data.data?.user?.createdAt || new Date().toISOString(),
      };
    } catch (error) {
      console.error("Profile fetch error:", error);
      throw error;
    }
  }, [fetchAPI]);

  // Fetch scan statistics
  const fetchScanStats = useCallback(async () => {
    try {
      const data = await fetchAPI("/api/v1/ai/dashboard");

      if (data.success && data.data?.summary) {
        return {
          totalScans: data.data.summary.totalScans || 0,
          uniquePlantTypes: data.data.summary.uniquePlantTypes || 0,
          averageHealthScore: data.data.summary.averageHealthScore || "0",
        };
      }

      return {
        totalScans: 0,
        uniquePlantTypes: 0,
        averageHealthScore: "0",
      };
    } catch (error) {
      console.warn("Scan stats fetch failed, using defaults");
      return {
        totalScans: 0,
        uniquePlantTypes: 0,
        averageHealthScore: "0",
      };
    }
  }, [fetchAPI]);

  // Combined data fetching with error handling
  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);

      const [profileData, statsData] = await Promise.allSettled([
        fetchUserProfile(),
        fetchScanStats(),
      ]);

      if (profileData.status === "fulfilled") {
        setUserProfile(profileData.value);
      } else {
        toast.error("Failed to load profile");
      }

      if (statsData.status === "fulfilled") {
        setScanStats(statsData.value);
      }
    } catch (error) {
      toast.error(error.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [fetchUserProfile, fetchScanStats]);

  // Initial data load
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Memoized user initials
  const userInitials = useMemo(() => {
    if (!userProfile.name) return "U";
    return userProfile.name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, [userProfile.name]);

  // Memoized join date
  const joinDate = useMemo(() => {
    if (!userProfile.joinedAt) return "Since 2024";

    try {
      const date = new Date(userProfile.joinedAt);
      if (isNaN(date.getTime())) return "Since 2024";

      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      return `Since ${month} ${year}`;
    } catch {
      return "Since 2024";
    }
  }, [userProfile.joinedAt]);

  // Memoized health score formatting
  const formattedHealthScore = useMemo(() => {
    const score = parseFloat(scanStats.averageHealthScore);
    return isNaN(score) ? "0" : score.toFixed(0);
  }, [scanStats.averageHealthScore]);

  // Edit modal handlers
  const handleEditClick = () => {
    setEditForm({
      name: userProfile.name,
      profileImage: userProfile.profileImage || "",
    });
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    if (!updating) {
      setIsEditModalOpen(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setEditForm((prev) => ({
        ...prev,
        profileImage: event.target.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setEditForm((prev) => ({
      ...prev,
      profileImage: "",
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      setUpdating(true);

      const trimmedName = editForm.name.trim();
      if (!trimmedName || trimmedName.length < 2) {
        toast.error("Name must be at least 2 characters");
        return;
      }

      const updateData = {
        name: trimmedName,
        ...(editForm.profileImage !== userProfile.profileImage && {
          profileImage: editForm.profileImage || null,
        }),
      };

      const data = await fetchAPI("/api/v1/user/profile", {
        method: "PATCH",
        body: JSON.stringify(updateData),
      });

      if (data.success) {
        toast.success("Profile updated successfully");

        // Optimistic update
        setUserProfile((prev) => ({
          ...prev,
          name: trimmedName,
          profileImage: editForm.profileImage || null,
        }));

        setIsEditModalOpen(false);
      } else {
        throw new Error(data.message || "Update failed");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-gray-700 animate-pulse mb-4"></div>
          <div className="h-6 w-32 bg-gray-700 animate-pulse rounded mb-2"></div>
          <div className="h-4 w-40 bg-gray-700 animate-pulse rounded mb-6"></div>
          <div className="flex justify-between w-full mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center flex-1">
                <div className="h-6 w-12 bg-gray-700 animate-pulse rounded mb-1 mx-auto"></div>
                <div className="h-4 w-16 bg-gray-700 animate-pulse rounded mx-auto"></div>
              </div>
            ))}
          </div>
          <div className="w-full h-10 bg-gray-700 animate-pulse rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col items-center text-center">
          {/* Profile Image with Fallback */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center overflow-hidden">
              {userProfile.profileImage ? (
                <Image
                  src={userProfile.profileImage}
                  alt={userProfile.name}
                  className="w-full h-full object-cover"
                  width={96}
                  height={96}
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    e.target.style.display = "none";
                  }}
                />
              ) : null}
              <span
                className={`text-2xl font-bold text-white ${
                  userProfile.profileImage ? "hidden" : "flex"
                }`}
              >
                {userInitials}
              </span>
            </div>
            <div className="absolute bottom-0 right-0 bg-emerald-500 rounded-full p-1 border-2 border-gray-900">
              <Leaf className="h-4 w-4 text-white" />
            </div>
          </div>

          {/* User Info */}
          <h2 className="text-xl font-bold text-white mb-1">
            {userProfile.name}
          </h2>
          <p className="text-gray-400 text-sm mb-2">{userProfile.email}</p>
          <p className="text-gray-500 text-xs mb-6">
            Plant Enthusiast | {joinDate}
          </p>

          {/* Statistics */}
          <div className="flex justify-between w-full mb-6">
            <div className="text-center flex-1">
              <p className="text-2xl font-bold text-white">
                {scanStats.totalScans}
              </p>
              <p className="text-gray-400 text-xs">Plants</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-2xl font-bold text-white">
                {scanStats.uniquePlantTypes}
              </p>
              <p className="text-gray-400 text-xs">Types</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-2xl font-bold text-white">
                {formattedHealthScore}%
              </p>
              <p className="text-gray-400 text-xs">Avg Health</p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={handleEditClick}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Edit3 className="h-4 w-4" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Edit Profile</h3>
              <button
                onClick={handleCloseModal}
                disabled={updating}
                className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Profile Image Upload */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 overflow-hidden relative group">
                  {editForm.profileImage ? (
                    <>
                      <Image
                        src={editForm.profileImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        width={80}
                        height={80}
                      />
                      <button
                        onClick={handleRemoveImage}
                        disabled={updating}
                        className="absolute top-0 right-0 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </>
                  ) : (
                    <span className="text-xl font-bold text-white">
                      {userInitials}
                    </span>
                  )}

                  <label
                    htmlFor="profileImage"
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                  >
                    <Camera className="h-5 w-5 text-white" />
                  </label>
                </div>

                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={updating}
                  className="hidden"
                />

                <label
                  htmlFor="profileImage"
                  className="text-sm text-emerald-400 hover:text-emerald-300 cursor-pointer transition-colors"
                >
                  {editForm.profileImage ? "Change Photo" : "Add Profile Photo"}
                </label>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  disabled={updating}
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50"
                  placeholder="Enter your name"
                  maxLength={50}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {editForm.name.length}/50 characters
                </p>
              </div>

              {/* Email Display (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-gray-400">
                  {userProfile.email}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleCloseModal}
                  disabled={updating}
                  className="flex-1 px-4 py-2.5 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateProfile}
                  disabled={
                    updating ||
                    !editForm.name.trim() ||
                    editForm.name.trim().length < 2
                  }
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {updating ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileCard;
