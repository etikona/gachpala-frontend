// hooks/useSubscription.js
import { useState, useEffect } from "react";

export function useSubscription() {
  const [subscription, setSubscription] = useState({
    canGenerate: true,
    imagesRemaining: 8,
    currentPlan: "free",
    isLoading: true,
  });

  useEffect(() => {
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    try {
      const response = await fetch("/api/v1/subscription/check-generation");
      if (response.ok) {
        const data = await response.json();
        setSubscription({
          canGenerate: data.canGenerate,
          imagesRemaining: data.imagesRemaining || 0,
          currentPlan: data.currentPlan || "free",
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Failed to check subscription:", error);
      setSubscription((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return subscription;
}
