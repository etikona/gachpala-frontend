// API Configuration
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://gachpala-server.onrender.com/api/v1";

// HTTP Client
const apiClient = async (
  endpoint,
  method = "GET",
  body = null,
  options = {}
) => {
  try {
    // Build URL with query params
    const url = new URL(`${BASE_URL}${endpoint}`);
    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    // Prepare headers
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Add authorization if token exists
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Configure request
    const config = {
      method,
      headers,
      credentials: "include",
    };

    if (body && method !== "GET") {
      config.body = JSON.stringify(body);
    }

    // Execute request
    const response = await fetch(url.toString(), config);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Request failed");
    }

    return { data: responseData };
  } catch (error) {
    console.error(`API Error [${method} ${endpoint}]:`, error);
    return {
      error: error.message || "Network error",
      status: error.response?.status,
    };
  }
};

// API Service Object
export const apiService = {
  // Admin Endpoints
  admin: {
    dashboard: (data) => apiClient("/admin", "POST", data),
  },

  // Seller Endpoints
  seller: {
    dashboard: (data) => apiClient("/seller/dashboard", "POST", data),
    register: (data) => apiClient("/seller/register", "POST", data),
    getProfile: () => apiClient("/seller/profile", "GET"),
  },

  // Payment Endpoints
  payment: {
    createSellerPayment: (data) => apiClient("/payments/seller", "POST", data),
  },

  // AI Endpoints
  ai: {
    createRequest: (data) => apiClient("/ai", "POST", data),
  },

  // Auth Endpoints
  auth: {
    register: (data) => apiClient("/auth/register", "POST", data),
    login: (data) => apiClient("/auth/login", "POST", data),
  },

  // Blog Endpoints
  blog: {
    getAll: () => apiClient("/blog", "GET"),
    getById: (id) => apiClient(`/blog/${id}`, "GET"),
    create: (data) => apiClient("/blog", "POST", data),
    addComment: (blogId, commentData) =>
      apiClient(`/blog/${blogId}/comments`, "POST", commentData),
  },

  // Order Endpoints
  orders: {
    getAll: () => apiClient("/orders", "GET"),
    getById: (id) => apiClient(`/orders/${id}`, "GET"),
    create: (data) => apiClient("/orders", "POST", data),
  },

  // Product Endpoints
  products: {
    getAll: () => apiClient("/products", "GET"),
    getRatings: (productId) =>
      apiClient(`/products/${productId}/ratings`, "GET"),
    addRating: (productId, ratingData) =>
      apiClient(`/products/${productId}/ratings`, "POST", ratingData),
    create: (data) => apiClient("/products", "POST", data), // Added based on POST in your list
  },

  // Protected Endpoints
  protected: {
    adminOnly: () => apiClient("/protected/admin-only", "GET"),
    sellerOnly: () => apiClient("/protected/seller-only", "GET"),
  },

  // User Endpoints
  user: {
    dashboard: () => apiClient("/user/dashboard", "GET"),
  },
};

// Utility Functions
export const setAuthToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

export const clearAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

// React Hook for Components
export const useApi = () => {
  return {
    ...apiService,
    setAuthToken,
    clearAuthToken,
  };
};
