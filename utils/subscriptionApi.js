// utils/subscriptionApi.js
export const subscriptionApi = {
  // Get current subscription
  getCurrent: async () => {
    const response = await fetch("/api/v1/subscription/current");
    if (!response.ok) throw new Error("Failed to fetch subscription");
    return response.json();
  },

  // Get subscription history
  getHistory: async () => {
    const response = await fetch("/api/v1/subscription/history");
    if (!response.ok) throw new Error("Failed to fetch history");
    return response.json();
  },

  // Subscribe to a plan
  subscribe: async (planId) => {
    const response = await fetch("/api/v1/subscription/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ planId }),
    });
    if (!response.ok) throw new Error("Failed to subscribe");
    return response.json();
  },

  // Upgrade subscription
  upgrade: async (newPlanId) => {
    const response = await fetch("/api/v1/subscription/upgrade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPlanId }),
    });
    if (!response.ok) throw new Error("Failed to upgrade");
    return response.json();
  },

  // Cancel subscription
  cancel: async () => {
    const response = await fetch("/api/v1/subscription/cancel", {
      method: "POST",
    });
    if (!response.ok) throw new Error("Failed to cancel");
    return response.json();
  },

  // Track image generation
  trackImage: async () => {
    const response = await fetch("/api/v1/subscription/track-image", {
      method: "POST",
    });
    if (!response.ok) throw new Error("Failed to track image");
    return response.json();
  },

  // Check generation availability
  checkGeneration: async () => {
    const response = await fetch("/api/v1/subscription/check-generation");
    if (!response.ok) throw new Error("Failed to check generation");
    return response.json();
  },
};
