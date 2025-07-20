"use client";
import { useState } from "react";

const Rating = ({ rating, editable = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <button
            key={i}
            type={editable ? "button" : undefined}
            className={`${editable ? "cursor-pointer" : ""}`}
            onClick={() =>
              editable && console.log("Rating selected:", ratingValue)
            }
            onMouseEnter={() => editable && setHoverRating(ratingValue)}
            onMouseLeave={() => editable && setHoverRating(0)}
          >
            <svg
              className={`w-5 h-5 ${
                ratingValue <= (hoverRating || rating)
                  ? "text-amber-400 fill-current"
                  : "text-emerald-200"
              }`}
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
};

export default Rating;
