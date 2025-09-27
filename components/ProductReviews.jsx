// components/ProductReviews.jsx
"use client";

import { useState, useEffect } from "react";
import Rating from "./Rating";
import { Loader2 } from "lucide-react";
import Image from "next/image";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://gachpala-server.onrender.com/api/v1";

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
        <Loader2 className="h-6 w-6 text-emerald-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-rose-400">
        Failed to load reviews: {error}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-slate-400">
        No reviews yet. Be the first to review this product!
      </div>
    );
  }

  return (
    <div className="space-y-6 mb-12">
      <h3 className="text-2xl font-bold text-white mb-6">Customer Reviews</h3>

      {reviews.map((review) => (
        <div
          key={review.id}
          className="border-b border-slate-700 pb-6 last:border-b-0"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              {review.user_avatar && (
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={review.user_avatar}
                    alt={review.username}
                    className="w-full h-full object-cover"
                    width={40}
                    height={40}
                  />
                </div>
              )}
              <div>
                <h4 className="font-medium text-white">
                  {review.username || "Anonymous User"}
                </h4>
                <div className="mt-1">
                  <Rating rating={review.rating} size="sm" />
                </div>
              </div>
            </div>
            <span className="text-slate-400 text-sm">
              {new Date(review.created_at).toLocaleDateString()}
            </span>
          </div>

          {review.review && (
            <p className="mt-3 text-slate-300 leading-relaxed">
              {review.review}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
