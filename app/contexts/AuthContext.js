// contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token and user data on app load
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("userData");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));

      // Verify token is still valid
      verifyToken(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch("/api/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        setToken(token);
      } else {
        // Token is invalid, clear storage
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      // Clear invalid token
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (newToken, userData) => {
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("userData", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const logout = async () => {
    try {
      const currentToken = localStorage.getItem("authToken");

      if (currentToken) {
        // Call logout API
        const response = await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${currentToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Logout failed");
        }
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage and state regardless of API success
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      setToken(null);
      setUser(null);
    }
  };

  const value = {
    user,
    token,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
