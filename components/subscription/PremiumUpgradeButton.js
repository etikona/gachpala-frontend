// components/subscription/PremiumUpgradeButton.js
"use client";

import { useState } from "react";
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UpgradePlanModal } from "./UpgradePlanModal";

export function PremiumUpgradeButton({
  className = "",
  variant = "default",
  size = "default",
  children,
}) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgradeClick = () => {
    setShowUpgradeModal(true);
  };

  const handleUpgrade = async (planId) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/v1/subscription/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId }),
      });

      if (response.ok) {
        toast({
          title: "🎉 Upgrade Successful!",
          description: "Your plant care experience has been enhanced!",
        });
        setShowUpgradeModal(false);
        // Refresh after a short delay to show the success message
        setTimeout(() => window.location.reload(), 1500);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to process upgrade");
      }
    } catch (error) {
      toast({
        title: "Upgrade Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleUpgradeClick}
        disabled={isLoading}
        className={`bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-amber-500/25 ${className}`}
        variant={variant}
        size={size}
      >
        <Crown className="h-4 w-4 mr-2" />
        {isLoading ? "Loading..." : children || "Upgrade Plan"}
      </Button>

      {/* <UpgradePlanModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={handleUpgrade}
        isLoading={isLoading}
      /> */}
    </>
  );
}
