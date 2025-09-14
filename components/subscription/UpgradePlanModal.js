// components/subscription/UpgradePlanModal.js
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Sparkles, Loader, X, Star } from "lucide-react";
import { toast } from "sonner";

export function UpgradePlanModal({ isOpen, onClose, onUpgrade, isLoading }) {
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState("free");
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchPlans();
      fetchCurrentSubscription();
    }
  }, [isOpen]);

  const fetchPlans = async () => {
    try {
      setIsLoadingPlans(true);
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
      toast({
        title: "Error",
        description: "Failed to load subscription plans",
        variant: "destructive",
      });
      console.error("Failed to fetch plans:", error);
    } finally {
      setIsLoadingPlans(false);
    }
  };

  const fetchCurrentSubscription = async () => {
    try {
      const response = await fetch("/api/v1/subscription/current");
      if (response.ok) {
        const data = await response.json();
        setCurrentPlan(data.subscription?.plan_name || "free");
      }
    } catch (error) {
      console.error("Failed to fetch current subscription:", error);
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

  if (isLoadingPlans) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-white text-center text-xl font-semibold">
              Loading Plans...
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center py-12">
            <Loader className="h-8 w-8 text-emerald-400 animate-spin" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-6xl p-0 overflow-hidden rounded-xl">
        <div className="relative">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 via-emerald-900/80 to-gray-900 p-6 text-center border-b border-gray-800">
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-white text-2xl font-semibold">
                Upgrade Your Plant AI Plan
              </DialogTitle>
              <p className="text-emerald-200 text-sm">
                Choose the perfect plan for your plant care journey
              </p>
            </DialogHeader>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Plans Grid - Horizontal Layout */}
          <div className="p-6">
            <div className="flex flex-row gap-6 overflow-x-auto pb-4 -mx-2 px-2">
              {plans.map((plan) => {
                const isCurrent = plan.name.toLowerCase() === currentPlan;
                const features = getPlanFeatures(plan.name);
                const colors = getPlanColor(plan.name);
                const isPopular = plan.name.toLowerCase() === "pro";

                return (
                  <div
                    key={plan.id}
                    className={`min-w-[300px] flex-1 p-5 rounded-xl border transition-all relative ${
                      isCurrent
                        ? `${colors.bg} ring-2 ring-emerald-500/50 border-emerald-500`
                        : "border-gray-700 bg-gray-800 hover:border-gray-600"
                    } ${isPopular ? "ring-2 ring-blue-500/30" : ""}`}
                  >
                    {isPopular && <PopularBadge />}

                    {isCurrent && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white">
                        Current Plan
                      </Badge>
                    )}

                    {/* Plan Header */}
                    <div className="text-center mb-5">
                      <div className="flex justify-center mb-3">
                        <div
                          className={`p-2 rounded-lg ${colors.bg} backdrop-blur-sm`}
                        >
                          {getPlanIcon(plan.name)}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-white capitalize">
                        {plan.name}
                      </h3>
                      <div className="text-3xl font-bold text-white mt-2">
                        ${plan.price}
                        <span className="text-sm text-gray-400 font-normal">
                          /month
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">
                        {plan.image_limit} plant scans
                      </p>
                    </div>

                    {/* Features List */}
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

                    {/* Action Button */}
                    <Button
                      onClick={() => onUpgrade(plan.id)}
                      disabled={isCurrent || isLoading}
                      className={`w-full bg-gradient-to-r ${
                        colors.gradient
                      } hover:opacity-90 text-white ${
                        isCurrent ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isLoading ? (
                        <Loader className="h-4 w-4 animate-spin mr-2" />
                      ) : null}
                      {isCurrent ? "Current Plan" : "Upgrade Now"}
                    </Button>
                  </div>
                );
              })}
            </div>

            {/* Included Features */}
            <div className="mt-8 p-5 bg-gray-800/30 rounded-lg border border-gray-700">
              <h4 className="text-white font-semibold mb-4 text-lg">
                All Plans Include:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-emerald-400 mr-2" />
                  <span className="text-gray-300">
                    AI-powered plant health analysis
                  </span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-emerald-400 mr-2" />
                  <span className="text-gray-300">
                    Disease & pest identification
                  </span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-emerald-400 mr-2" />
                  <span className="text-gray-300">
                    Personalized care recommendations
                  </span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-emerald-400 mr-2" />
                  <span className="text-gray-300">
                    Growth progress tracking
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-gray-400 text-sm">
                Cancel anytime • No hidden fees • 30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
