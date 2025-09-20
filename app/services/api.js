// services/api.js
const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export const authAPI = {
  logout: async (token) => {
    try {
      // Try different possible endpoints
      const endpoints = [
        `${API_BASE_URL}/api/v1/auth/logout`,
        `${API_BASE_URL}/api/auth/logout`,
        `${API_BASE_URL}/auth/logout`,
      ];

      let lastError = null;

      for (const url of endpoints) {
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            return await response.json();
          }

          // If not 404, throw error
          if (response.status !== 404) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          lastError = new Error(`Endpoint not found: ${url}`);
        } catch (error) {
          lastError = error;
          continue; // Try next endpoint
        }
      }

      // If all endpoints failed
      throw lastError || new Error("All logout endpoints failed");
    } catch (error) {
      console.error("Logout API error:", error);
      throw new Error(`Logout request failed: ${error.message}`);
    }
  },
};
