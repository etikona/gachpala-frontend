// components/subscription/UsageStats.js
"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Sparkles } from "lucide-react";
import { UpgradePlanButton } from "./UpgradePlanButton";

export function UsageStats() {
  const [usageData, setUsageData] = useState({
    uploadedImages: 0,
    totalLimit: 8,
    subscription: null,
    isLoading: true,
  });

  useEffect(() => {
    fetchUsageData();
  }, []);

  const fetchUsageData = async () => {
    try {
      let subscriptionData = null;
      let totalScans = 0;
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      // Fetch subscription data
      try {
        const subscriptionResponse = await fetch(
          "/api/v1/subscription/current",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (subscriptionResponse.ok) {
          const subData = await subscriptionResponse.json();

          subscriptionData = subData.subscription;
        } else {
          const errorText = await subscriptionResponse.text();
        }
      } catch (subscriptionError) {}

      // Fetch dashboard data
      try {
        const dashboardResponse = await fetch(
          "https://gachpala-server.onrender.com/api/v1/ai/dashboard",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (dashboardResponse.ok) {
          const dashData = await dashboardResponse.json();

          totalScans = dashData.data?.summary?.totalScans || 0;
        } else {
          const errorText = await dashboardResponse.text();
        }
      } catch (dashboardError) {}

      if (subscriptionData) {
        setUsageData({
          uploadedImages: totalScans,
          totalLimit: subscriptionData.image_limit || 8,
          subscription: subscriptionData,
          isLoading: false,
        });
      } else {
        // Free tier user
        setUsageData({
          uploadedImages: totalScans,
          totalLimit: 8,
          subscription: null,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("💥 Critical error in fetchUsageData:", error);
      toast({
        title: "Error",
        description: "Failed to load usage statistics",
        variant: "destructive",
      });
      setUsageData((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const { uploadedImages, totalLimit, subscription, isLoading } = usageData;
  const remainingScans = Math.max(0, totalLimit - uploadedImages);
  const usagePercentage = (uploadedImages / totalLimit) * 100;

  if (isLoading) {
    return (
      <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
          <div className="h-2 bg-gray-700 rounded-full"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-10 bg-gray-700 rounded-xl"></div>
        </div>
      </div>
    );
  }

  const isFreeTier = !subscription || subscription.plan_name === "free";
  const isOverLimit = uploadedImages >= totalLimit;
  const usageColor = isOverLimit
    ? "from-red-500 to-orange-500"
    : "from-emerald-500 to-teal-500";

  return (
    <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Sparkles className="h-5 w-5 text-emerald-400 mr-2" />
        Image Scan Usage
      </h3>

      {/* Usage Statistics */}
      <div className="mb-4">
        <div className="flex justify-between items-center text-sm mb-2">
          <div className="flex flex-col">
            <span className="text-white font-medium">
              {uploadedImages.toLocaleString()} of {totalLimit.toLocaleString()}{" "}
              scans used
            </span>
            <span className="text-xs text-gray-500 mt-1">
              Data synced from dashboard
            </span>
          </div>
          <div className="text-right">
            <span
              className={`${
                isFreeTier ? "text-emerald-400" : "text-blue-400"
              } font-medium text-sm`}
            >
              {isFreeTier
                ? "Free Tier"
                : `${subscription.plan_name?.toUpperCase()} Plan`}
            </span>
            {!isFreeTier && (
              <div className="text-xs text-gray-500 mt-1">Monthly limit</div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-3 mb-3 overflow-hidden">
          <div
            className={`bg-gradient-to-r ${usageColor} h-3 rounded-full transition-all duration-500 ease-out ${
              isOverLimit ? "animate-pulse" : ""
            }`}
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          ></div>
        </div>

        {/* Usage Numbers */}
        <div className="flex justify-between text-xs text-gray-400">
          <span>0</span>
          <span className="text-center">
            {Math.round(usagePercentage)}% used
          </span>
          <span>{totalLimit.toLocaleString()}</span>
        </div>
      </div>

      {/* Status Message */}
      <div className="mb-4 p-3 bg-gray-700/30 rounded-lg">
        {isOverLimit ? (
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-red-400 font-medium text-sm">Limit Exceeded</p>
              <p className="text-gray-400 text-xs mt-1">
                You have used {uploadedImages.toLocaleString()} scans (limit:{" "}
                {totalLimit.toLocaleString()}).
                {isFreeTier
                  ? " Upgrade to continue scanning."
                  : " Contact support for assistance."}
              </p>
            </div>
          </div>
        ) : remainingScans > 0 ? (
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-emerald-400 font-medium text-sm">
                {remainingScans.toLocaleString()} scans remaining
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {isFreeTier
                  ? "Upgrade for higher limits and additional features."
                  : "Your monthly allocation resets on your billing cycle."}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-amber-400 font-medium text-sm">
                Monthly limit reached
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {isFreeTier
                  ? "Upgrade to continue with unlimited scanning."
                  : "Your limit will reset on your next billing cycle."}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {isFreeTier && (
        <div className="space-y-3">
          <UpgradePlanButton className="w-full" />
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
            <div className="text-center p-2 bg-gray-700/20 rounded">
              <div className="text-blue-400 font-medium">Pro</div>
              <div>100 scans/mo</div>
            </div>
            <div className="text-center p-2 bg-gray-700/20 rounded">
              <div className="text-purple-400 font-medium">Premium</div>
              <div>1000 scans/mo</div>
            </div>
          </div>
        </div>
      )}

      {!isFreeTier &&
        subscription.plan_name === "pro" &&
        remainingScans <= 10 && (
          <div className="space-y-2">
            <UpgradePlanButton className="w-full" variant="outline">
              Upgrade to Premium (1000 scans/mo)
            </UpgradePlanButton>
            <p className="text-xs text-gray-500 text-center">
              Running low? Get 10x more scans with Premium
            </p>
          </div>
        )}
    </div>
  );
}
