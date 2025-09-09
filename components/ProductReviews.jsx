// components/ProductReviews.jsx
"use client";

import { useState, useEffect } from "react";
import Rating from "./Rating";
import { Loader2 } from "lucide-react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/products/${productId}/ratings`
        );

        if (response.ok) {
          const reviewsData = await response.json();
          setReviews(reviewsData);
        } else {
          throw new Error("Failed to fetch reviews");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 text-emerald-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-emerald-600">
        Failed to load reviews: {error}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-emerald-600">
        No reviews yet. Be the first to review this product!
      </div>
    );
  }

  return (
    <div className="space-y-6 mb-12">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="border-b border-emerald-100 pb-6 last:border-b-0"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-medium text-emerald-800">
                {review.username || "Anonymous User"}
              </h4>
              {review.user_avatar && (
                <div className="w-8 h-8 rounded-full overflow-hidden mt-1">
                  <img
                    src={review.user_avatar}
                    alt={review.username}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            <span className="text-emerald-600 text-sm">
              {new Date(review.created_at).toLocaleDateString()}
            </span>
          </div>
          <Rating rating={review.rating} />
          {review.review && (
            <p className="mt-3 text-emerald-700 leading-relaxed">
              {review.review}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
