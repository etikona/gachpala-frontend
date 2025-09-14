// components/subscription/SubscriptionManager.js
"use client";

import { useState, useEffect } from "react";
import {
  RefreshCw,
  Zap,
  Crown,
  Sparkles,
  Check,
  ArrowUp,
  Calendar,
  Image,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { UpgradePlanModal } from "./UpgradePlanModal";

export function SubscriptionManager() {
  const [subscription, setSubscription] = useState(null);
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async () => {
    try {
      setIsLoading(true);
      const [subscriptionRes, plansRes] = await Promise.all([
        fetch("/api/v1/subscription/current"),
        fetch("/api/v1/subscription/plans"),
      ]);

      if (subscriptionRes.ok) {
        const subscriptionData = await subscriptionRes.json();
        setSubscription(subscriptionData.subscription);
      }

      if (plansRes.ok) {
        const plansData = await plansRes.json();
        setPlans(plansData.plans);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch subscription data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = async (planId) => {
    try {
      const response = await fetch("/api/v1/subscription/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Subscription upgraded successfully!",
        });
        setShowUpgradeModal(false);
        fetchSubscriptionData();
      } else {
        throw new Error("Failed to upgrade subscription");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upgrade subscription",
        variant: "destructive",
      });
    }
  };

  const handleCancel = async () => {
    try {
      const response = await fetch("/api/v1/subscription/cancel", {
        method: "POST",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Subscription cancelled successfully",
        });
        fetchSubscriptionData();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel subscription",
        variant: "destructive",
      });
    }
  };

  const getPlanIcon = (planName) => {
    switch (planName.toLowerCase()) {
      case "pro":
        return <Zap className="h-5 w-5 text-blue-400" />;
      case "premium":
        return <Crown className="h-5 w-5 text-amber-400" />;
      default:
        return <Sparkles className="h-5 w-5 text-emerald-400" />;
    }
  };

  const getPlanColor = (planName) => {
    switch (planName.toLowerCase()) {
      case "pro":
        return "bg-blue-500/20 text-blue-400";
      case "premium":
        return "bg-amber-500/20 text-amber-400";
      default:
        return "bg-emerald-500/20 text-emerald-400";
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              <div className="h-20 bg-gray-700 rounded"></div>
              <div className="h-20 bg-gray-700 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentPlan = subscription?.plan_name || "free";
  const imagesUsed = subscription?.images_used || 0;
  const imageLimit = subscription?.image_limit || 8;
  const usagePercentage = (imagesUsed / imageLimit) * 100;

  return (
    <>
      <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <RefreshCw className="h-5 w-5 text-emerald-400 mr-2" />
            Plant AI Subscriptions
          </CardTitle>
          <Button
            onClick={() => setShowUpgradeModal(true)}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
          >
            <ArrowUp className="h-4 w-4 mr-2" />
            Upgrade Plan
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Current Subscription */}
          {subscription && subscription.plan_name !== "free" && (
            <div className="p-4 bg-gray-700/30 border border-gray-600 rounded-xl">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  {getPlanIcon(subscription.plan_name)}
                  <h4 className="font-medium text-white capitalize">
                    {subscription.plan_name} Plan
                  </h4>
                </div>
                <Badge className={getPlanColor(subscription.plan_name)}>
                  {subscription.status}
                </Badge>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Plant scans used</span>
                  <span>
                    {imagesUsed}/{imageLimit}
                  </span>
                </div>
                <Progress value={usagePercentage} className="h-2" />
              </div>

              <div className="flex justify-between text-gray-400 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    Renews:{" "}
                    {new Date(
                      subscription.current_period_end
                    ).toLocaleDateString()}
                  </span>
                </div>
                <span className="font-medium">${subscription.price}/month</span>
              </div>

              {subscription.status === "active" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  className="w-full mt-3 border-gray-600 text-gray-400 hover:text-white"
                >
                  Cancel Subscription
                </Button>
              )}
            </div>
          )}

          {/* Free Tier */}
          <div className="p-4 bg-gray-700/30 border border-gray-600 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              <h4 className="font-medium text-white">Free Tier</h4>
              {currentPlan === "free" && (
                <Badge className="bg-emerald-500/20 text-emerald-400">
                  Current
                </Badge>
              )}
            </div>

            <p className="text-gray-400 text-sm mb-3">
              Includes 8 free plant scans per month. AI health reports with
              basic care tips.
            </p>

            <div className="mb-3">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Scans used</span>
                <span>{imagesUsed}/8</span>
              </div>
              <Progress value={usagePercentage} className="h-2" />
            </div>

            <div className="flex justify-between text-gray-400 text-sm">
              <span>Basic plant analysis</span>
              <span className="font-medium">Free</span>
            </div>
          </div>

          {/* Features Comparison */}
          <div className="p-4 bg-gray-700/30 border border-gray-600 rounded-xl">
            <h4 className="font-medium text-white mb-3">Plan Features</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Plant scans per month</span>
                <span className="text-white">8 → 100 → 1000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Disease detection</span>
                <span className="text-white">Basic → Advanced → Premium</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Care recommendations</span>
                <span className="text-white">Basic → Detailed → Expert</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <UpgradePlanModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        plans={plans}
        currentPlan={currentPlan}
        onUpgrade={handleUpgrade}
      />
    </>
  );
}
