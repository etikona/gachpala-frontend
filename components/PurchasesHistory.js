"use client";

import { useState, useEffect } from "react";

export default function PurchaseHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/v1/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch orders");

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      setCancellingOrderId(orderId);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/v1/orders/${orderId}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to cancel order");

      const updatedOrder = await response.json();
      setOrders(
        orders.map((order) => (order.id === orderId ? updatedOrder : order))
      );

      alert("Order cancelled successfully");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to cancel order");
    } finally {
      setCancellingOrderId(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return `$${amount}`;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      shipped: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      cancelled: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    };
    return colors[status] || colors.pending;
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        {/* <h2 className="text-2xl font-bold mb-4 text-white">Purchase History</h2> */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg animate-pulse"
            >
              <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-white">Purchase History</h2>

      {orders.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-white">
                    Order #{order.id}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {formatDate(order.created_at)}
                  </p>
                  {order.shipping_address && (
                    <p className="text-gray-400 text-sm mt-1">
                      {order.shipping_address}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <p className="font-semibold text-white">
                    {formatCurrency(order.total)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        order.status
                      )} border`}
                    >
                      {order.status}
                    </span>

                    {order.status === "pending" && (
                      <button
                        onClick={() => cancelOrder(order.id)}
                        disabled={cancellingOrderId === order.id}
                        className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {cancellingOrderId === order.id
                          ? "Cancelling..."
                          : "Cancel"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
