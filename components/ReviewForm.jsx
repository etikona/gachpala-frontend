// components/ReviewForm.jsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Rating from "@/components/Rating";
import { toast } from "sonner";
import { Loader2, Edit, Trash2, Star } from "lucide-react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://gachpala-server.onrender.com/api/v1";

export default function ReviewForm({ productId, onReviewSubmitted }) {
  const [userRating, setUserRating] = useState(0);
  const [review, setReview] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingRating, setExistingRating] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user's existing rating for this product
  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoading(false);
          return;
        }

        const response = await fetch(
          `${API_BASE_URL}/products/${productId}/my-rating`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const ratingData = await response.json();
          if (ratingData) {
            setExistingRating(ratingData);
            setUserRating(ratingData.rating);
            setReview(ratingData.review || "");
          }
        }
      } catch (error) {
        console.error("Error fetching user rating:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRating();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userRating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!review.trim()) {
      toast.error("Please write a review");
      return;
    }

    if (!userName.trim() || !userEmail.trim()) {
      toast.error("Please provide your name and email");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const method = existingRating ? "PUT" : "POST";
      const url = existingRating
        ? `${API_BASE_URL}/ratings/${existingRating.id}`
        : `${API_BASE_URL}/products/${productId}/ratings`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          rating: userRating,
          review: review.trim(),
          userName: userName.trim(),
          userEmail: userEmail.trim(),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(
          existingRating
            ? "Review updated successfully!"
            : "Review submitted successfully!"
        );

        // Reset form if it was a new review
        if (!existingRating) {
          setUserRating(0);
          setReview("");
          setUserName("");
          setUserEmail("");
        }

        // Refresh reviews
        if (onReviewSubmitted) {
          onReviewSubmitted();
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Failed to submit review");
      }
    } catch (error) {
      toast.error(error.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!existingRating) return;

    if (!confirm("Are you sure you want to delete your review?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to delete your review");
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/ratings/${existingRating.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Review deleted successfully!");
        setExistingRating(null);
        setUserRating(0);
        setReview("");
        setUserName("");
        setUserEmail("");

        if (onReviewSubmitted) {
          onReviewSubmitted();
        }
      } else {
        throw new Error("Failed to delete review");
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete review");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 text-emerald-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
      <div className="flex items-center gap-3 mb-2">
        <Star className="h-5 w-5 text-emerald-400" />
        <h3 className="text-xl font-bold text-white">
          {existingRating ? "Edit Your Review" : "Share Your Experience"}
        </h3>
      </div>

      <p className="text-slate-400 mb-6">
        {existingRating
          ? "Update your review to help other plant lovers."
          : "Your review helps other plant enthusiasts make informed decisions."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white mb-3 font-medium">
            Your Rating *
          </label>
          <Rating
            rating={userRating}
            editable={true}
            onRatingChange={setUserRating}
          />
        </div>

        <div>
          <label
            htmlFor="comment"
            className="block text-white mb-3 font-medium"
          >
            Your Review *
          </label>
          <Textarea
            id="comment"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience with this plant... How does it look? How easy is it to care for?"
            className="min-h-[120px] bg-slate-700/50 border-slate-600 focus:border-emerald-400 text-white placeholder:text-slate-400"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-white mb-3 font-medium">
              Your Name *
            </label>
            <Input
              id="name"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your Name"
              className="bg-slate-700/50 border-slate-600 focus:border-emerald-400 text-white placeholder:text-slate-400"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-white mb-3 font-medium"
            >
              Your Email *
            </label>
            <Input
              id="email"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Your Email"
              className="bg-slate-700/50 border-slate-600 focus:border-emerald-400 text-white placeholder:text-slate-400"
              required
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : existingRating ? (
              <Edit className="h-4 w-4 mr-2" />
            ) : null}
            {existingRating ? "Update Review" : "Submit Review"}
          </Button>

          {existingRating && (
            <Button
              type="button"
              variant="outline"
              className="text-rose-400 border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-300"
              onClick={handleDeleteReview}
              disabled={isSubmitting}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
        </div>
      </form>

      {!localStorage.getItem("token") && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mt-4">
          <p className="text-amber-400 text-sm">
            💡 You are submitting as a guest. To manage your reviews later,
            please create an account.
          </p>
        </div>
      )}
    </div>
  );
}
