// components/Rating.jsx
"use client";

import { useState } from "react";

export default function Rating({
  rating = 0,
  editable = false,
  onRatingChange,
  size = "md",
}) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (newRating) => {
    if (editable && onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const handleMouseEnter = (starRating) => {
    if (editable) {
      setHoverRating(starRating);
    }
  };

  const handleMouseLeave = () => {
    if (editable) {
      setHoverRating(0);
    }
  };

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoverRating || rating);
        return (
          <button
            key={star}
            type="button"
            className={`p-1 ${editable ? "cursor-pointer" : "cursor-default"}`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            disabled={!editable}
          >
            <svg
              className={`${sizeClasses[size]} ${
                isFilled ? "text-amber-400 fill-current" : "text-emerald-200"
              } transition-colors duration-200`}
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
