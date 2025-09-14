// components/subscription/UsageStats.js
"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { PremiumUpgradeButton } from "./PremiumUpgradeButton";
import { Sparkles } from "lucide-react";

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
      const response = await fetch("/api/v1/subscription/current");
      if (response.ok) {
        const data = await response.json();

        if (data.subscription) {
          setUsageData({
            uploadedImages: data.subscription.images_used || 0,
            totalLimit: data.subscription.image_limit || 8,
            subscription: data.subscription,
            isLoading: false,
          });
        } else {
          // Free tier user
          setUsageData({
            uploadedImages: 0, // You might want to track this separately
            totalLimit: 8,
            subscription: null,
            isLoading: false,
          });
        }
      } else {
        throw new Error("Failed to fetch usage data");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load usage statistics",
        variant: "destructive",
      });
      setUsageData((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const { uploadedImages, totalLimit, subscription, isLoading } = usageData;
  const remainingScans = totalLimit - uploadedImages;
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

  return (
    <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Sparkles className="h-5 w-5 text-emerald-400 mr-2" />
        Scan Usage
      </h3>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>
            {uploadedImages} of {totalLimit} scans used
          </span>
          <span className={isFreeTier ? "text-emerald-400" : "text-blue-400"}>
            {isFreeTier ? "Free Tier" : `${subscription.plan_name} Plan`}
          </span>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-xs text-gray-500">
          <span>0</span>
          <span>{totalLimit}</span>
        </div>
      </div>

      <p className="text-gray-400 text-sm mb-4">
        {remainingScans > 0 ? (
          <>
            <span className="text-emerald-400 font-medium">
              {remainingScans}
            </span>{" "}
            free scans remaining.
            {isFreeTier && " Upgrade for unlimited scans."}
          </>
        ) : (
          <span className="text-amber-400">
            No scans remaining. Upgrade to continue.
          </span>
        )}
      </p>

      {isFreeTier && (
        <div className="space-y-2">
          <PremiumUpgradeButton className="w-full" />
          <p className="text-xs text-gray-500 text-center">
            Pro: 100 scans/mo • Premium: 1000 scans/mo
          </p>
        </div>
      )}

      {!isFreeTier && subscription.plan_name === "pro" && (
        <div className="space-y-2">
          <PremiumUpgradeButton className="w-full" variant="outline">
            Upgrade to Premium
          </PremiumUpgradeButton>
        </div>
      )}
    </div>
  );
}
