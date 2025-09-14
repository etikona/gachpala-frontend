// components/subscription/SubscriptionPage.js
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  Zap,
  Crown,
  Sparkles,
  Loader,
  X,
  Star,
  Calendar,
  Clock,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

const SubscriptionPage = () => {
  const [plans, setPlans] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [subscriptionHistory, setSubscriptionHistory] = useState([]);
  const [usageData, setUsageData] = useState({ used: 0, remaining: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        fetchPlans(),
        fetchCurrentSubscription(),
        fetchSubscriptionHistory(),
        checkUsage(),
      ]);
    } catch (error) {
      console.error("Failed to fetch subscription data:", error);
      toast.error("Failed to load subscription data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/subscription/plans"
      );
      if (response.ok) {
        const data = await response.json();
        setPlans(data.plans || []);
      } else {
        throw new Error("Failed to fetch plans");
      }
    } catch (error) {
      console.error("Failed to fetch plans:", error);
      toast.error("Failed to load subscription plans");
    }
  };

  const fetchCurrentSubscription = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/subscription/current"
      );
      if (response.ok) {
        const data = await response.json();
        setCurrentSubscription(data.subscription || null);
      }
    } catch (error) {
      console.error("Failed to fetch current subscription:", error);
    }
  };

  const fetchSubscriptionHistory = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/subscription/history"
      );
      if (response.ok) {
        const data = await response.json();
        setSubscriptionHistory(data.history || []);
      }
    } catch (error) {
      console.error("Failed to fetch subscription history:", error);
    }
  };

  const checkUsage = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/subscription/check-generation"
      );
      if (response.ok) {
        const data = await response.json();
        setUsageData({
          used: data.used_generations || 0,
          remaining: data.remaining_generations || 0,
        });
      }
    } catch (error) {
      console.error("Failed to fetch usage data:", error);
    }
  };

  // components/subscription/SubscriptionPage.js (updated handleSubscribe function)
  // Enhanced subscription handling with better debugging
  const handleSubscribe = async (planId) => {
    try {
      setIsProcessing(true);

      let token = localStorage.getItem("token");
      try {
        token = JSON.parse(token); // if it was stringified earlier
      } catch (e) {
        // keep as is
      }

      if (!token) {
        toast.error("Please log in to subscribe");
        return;
      }

      const plan = plans.find((p) => p.id === planId);
      if (!plan) {
        toast.error("Selected plan not found. Please refresh the page.");
        return;
      }

      console.log("Subscribing to plan:", plan, "Token:", token);

      const response = await fetch(
        "http://localhost:5000/api/v1/subscription/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ planId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (
          data.message ===
          "You already have an active subscription to this plan"
        ) {
          toast.info(data.message);
          return; // stop here, don't throw
        }
        throw new Error(
          data.message || `Subscription failed with ${response.status}`
        );
      }

      if (data.success) {
        toast.success(data.message || "Subscription updated successfully!");
        await fetchSubscriptionData();

        if (data.payment_url) {
          window.location.href = data.payment_url;
        }
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error(error.message || "Failed to process subscription");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpgrade = async (planId) => {
    try {
      setIsProcessing(true);

      let token = localStorage.getItem("token");
      try {
        token = JSON.parse(token); // handle case where token was stringified
      } catch (e) {
        // keep as-is if plain string
      }

      if (!token) {
        toast.error("Please log in to upgrade");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/v1/subscription/upgrade",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ planId }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        // ✅ duplicate-plan check
        if (
          data.message &&
          data.message.toLowerCase().includes("already have")
        ) {
          toast.info(data.message);
          return; // stop here, don’t throw
        }

        throw new Error(
          data.message || `Upgrade failed with ${response.status}`
        );
      }

      toast.success(data.message || "Plan upgraded successfully!");
      await fetchSubscriptionData(); // ✅ await refresh
    } catch (error) {
      console.error("Failed to upgrade:", error);
      toast.error(error.message || "Failed to upgrade plan");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel your subscription?")) return;

    try {
      setIsProcessing(true);
      const response = await fetch(
        "http://localhost:5000/api/v1/subscription/cancel",
        {
          method: "POST",
        }
      );

      if (response.ok) {
        toast.success("Subscription cancelled successfully");
        fetchSubscriptionData(); // Refresh data
      } else {
        throw new Error("Cancellation failed");
      }
    } catch (error) {
      console.error("Failed to cancel subscription:", error);
      toast.error("Failed to cancel subscription");
    } finally {
      setIsProcessing(false);
    }
  };

  const trackImage = async (imageData) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/subscription/track-image",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image_data: imageData }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Image tracking failed");
      }
    } catch (error) {
      console.error("Failed to track image:", error);
      toast.error("Failed to track image usage");
    }
  };

  const getPlanIcon = (planName) => {
    switch (planName.toLowerCase()) {
      case "pro":
        return <Zap className="h-7 w-7 text-blue-400" />;
      case "premium":
        return <Crown className="h-7 w-7 text-amber-400" />;
      default:
        return <Sparkles className="h-7 w-7 text-emerald-400" />;
    }
  };

  const getPlanColor = (planName) => {
    switch (planName.toLowerCase()) {
      case "pro":
        return {
          bg: "bg-blue-900/20 border-blue-700",
          text: "text-blue-400",
          gradient: "from-blue-600 to-blue-700",
          badge: "bg-blue-700",
          highlight: "ring-blue-500/30",
        };
      case "premium":
        return {
          bg: "bg-amber-900/20 border-amber-700",
          text: "text-amber-400",
          gradient: "from-amber-600 to-orange-600",
          badge: "bg-amber-700",
          highlight: "ring-amber-500/30",
        };
      default:
        return {
          bg: "bg-emerald-900/20 border-emerald-700",
          text: "text-emerald-400",
          gradient: "from-emerald-600 to-teal-600",
          badge: "bg-emerald-700",
          highlight: "ring-emerald-500/30",
        };
    }
  };

  const getPlanFeatures = (planName) => {
    switch (planName.toLowerCase()) {
      case "pro":
        return [
          "100 plant scans per month",
          "Advanced disease detection",
          "Detailed care recommendations",
          "Growth analytics",
          "Email support",
          "Priority processing",
        ];
      case "premium":
        return [
          "1000 plant scans per month",
          "Premium disease detection",
          "Expert care plans",
          "Advanced growth analytics",
          "24/7 priority support",
          "Custom plant care strategies",
          "Early access to new features",
        ];
      default:
        return [
          "8 plant scans per month",
          "Basic disease detection",
          "General care tips",
          "Basic growth tracking",
          "Community support",
        ];
    }
  };

  const PopularBadge = () => (
    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-semibold">
        <Star className="h-3 w-3 mr-1 fill-current" />
        Most Popular
      </Badge>
    </div>
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 text-emerald-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading subscription data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-12 bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Subscription Management</h1>
          <p className="text-gray-400">
            Manage your plant AI subscription plans
          </p>
        </div>

        {/* Current Subscription & Usage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-emerald-400" />
                Current Plan
              </CardTitle>
              <CardDescription className="text-gray-400">
                Your active subscription details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentSubscription ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold capitalize">
                      {currentSubscription.plan_name} Plan
                    </span>
                    <Badge className="bg-emerald-600">Active</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Started</p>
                      <p className="font-medium">
                        {formatDate(currentSubscription.start_date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Renews</p>
                      <p className="font-medium">
                        {formatDate(currentSubscription.end_date)}
                      </p>
                    </div>
                  </div>

                  {currentSubscription.plan_name.toLowerCase() !== "free" && (
                    <Button
                      onClick={handleCancel}
                      disabled={isProcessing}
                      variant="destructive"
                      className="w-full"
                    >
                      {isProcessing ? (
                        <Loader className="h-4 w-4 animate-spin mr-2" />
                      ) : null}
                      Cancel Subscription
                    </Button>
                  )}
                </div>
              ) : (
                <p className="text-gray-400">No active subscription</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-400" />
                Usage Statistics
              </CardTitle>
              <CardDescription className="text-gray-400">
                Your monthly generation usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-emerald-500 h-2.5 rounded-full"
                    style={{
                      width: `${
                        (usageData.used /
                          (usageData.used + usageData.remaining)) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Used</p>
                    <p className="text-xl font-bold">{usageData.used} scans</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Remaining</p>
                    <p className="text-xl font-bold">
                      {usageData.remaining} scans
                    </p>
                  </div>
                </div>

                <Button
                  onClick={checkUsage}
                  variant="outline"
                  className="w-full border-gray-600"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Usage
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Plans */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Available Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const isCurrent =
                currentSubscription?.plan_name?.toLowerCase() ===
                plan.name.toLowerCase();
              const features = getPlanFeatures(plan.name);
              const colors = getPlanColor(plan.name);
              const isPopular = plan.name.toLowerCase() === "pro";

              return (
                <Card
                  key={plan.id}
                  className={`bg-gray-800 border-gray-700 relative ${
                    isCurrent ? "ring-2 ring-emerald-500" : ""
                  }`}
                >
                  {isPopular && <PopularBadge />}

                  {isCurrent && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-600">
                      Current Plan
                    </Badge>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-3">
                      <div className={`p-2 rounded-lg ${colors.bg}`}>
                        {getPlanIcon(plan.name)}
                      </div>
                    </div>
                    <CardTitle className="capitalize">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold mt-2">
                      ${plan.price}
                      <span className="text-sm text-gray-400 font-normal">
                        /month
                      </span>
                    </div>
                    <CardDescription className="text-gray-400">
                      {plan.image_limit} plant scans included
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <Check className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-1" />
                          <span className="text-sm text-gray-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() =>
                        isCurrent
                          ? null
                          : currentSubscription
                          ? handleUpgrade(plan.id)
                          : handleSubscribe(plan.id)
                      }
                      disabled={isCurrent || isProcessing}
                      className={`w-full bg-gradient-to-r ${colors.gradient} hover:opacity-90`}
                    >
                      {isProcessing ? (
                        <Loader className="h-4 w-4 animate-spin mr-2" />
                      ) : null}
                      {isCurrent
                        ? "Current Plan"
                        : currentSubscription
                        ? "Upgrade Plan"
                        : "Subscribe Now"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Subscription History */}
        {subscriptionHistory.length > 0 && (
          <Card className="bg-gray-800 border-gray-700 mb-10">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-amber-400" />
                Subscription History
              </CardTitle>
              <CardDescription className="text-gray-400">
                Your past subscription activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-2 text-left text-sm text-gray-400">
                        Plan
                      </th>
                      <th className="py-2 text-left text-sm text-gray-400">
                        Date
                      </th>
                      <th className="py-2 text-left text-sm text-gray-400">
                        Status
                      </th>
                      <th className="py-2 text-left text-sm text-gray-400">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptionHistory.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-700 last:border-0"
                      >
                        <td className="py-3 capitalize">{item.plan_name}</td>
                        <td className="py-3 text-sm text-gray-400">
                          {formatDate(item.date)}
                        </td>
                        <td className="py-3">
                          <Badge
                            className={
                              item.status === "active"
                                ? "bg-emerald-600"
                                : item.status === "cancelled"
                                ? "bg-red-600"
                                : "bg-gray-600"
                            }
                          >
                            {item.status}
                          </Badge>
                        </td>
                        <td className="py-3">${item.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Additional Information */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription className="text-gray-400">
              Frequently asked questions about subscriptions
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">How does billing work?</h4>
              <p className="text-sm text-gray-400">
                Your subscription will automatically renew each month. You can
                cancel anytime without any cancellation fees.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">
                What happens when I cancel?
              </h4>
              <p className="text-sm text-gray-400">
                You'll continue to have access to your current plan features
                until the end of your billing period.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionPage;
