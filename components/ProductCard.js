// components/ProductCard.jsx
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;

  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") ||
    "http://localhost:5000";
  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;

  return `${baseUrl}/${cleanPath}`;
};

export default function ProductCard({ product }) {
  const imageUrl = getImageUrl(product.image);
  const rating = product.rating || 4.5;
  const reviewCount = product.reviews_count || 12;

  return (
    <div className="h-full group">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-emerald-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col group-hover:border-emerald-300">
        {/* Image Section */}
        <div className="bg-emerald-50 aspect-square relative overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="bg-emerald-200 w-32 h-32 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 text-4xl">🌿</span>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-white/90 hover:bg-white shadow-sm rounded-full"
            >
              <Heart className="h-4 w-4 text-emerald-600" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-white/90 hover:bg-white shadow-sm rounded-full"
            >
              <ShoppingCart className="h-4 w-4 text-emerald-600" />
            </Button>
          </div>

          {/* Stock Status Badge */}
          {product.stock === 0 && (
            <div className="absolute top-3 left-3 bg-rose-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Sold Out
            </div>
          )}

          {product.stock > 0 && product.stock < 10 && (
            <div className="absolute top-3 left-3 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Low Stock
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Category */}
          <span className="text-sm font-medium text-emerald-600 mb-1 capitalize">
            {product.category}
          </span>

          {/* Product Name */}
          <h3 className="text-lg font-semibold text-emerald-900 mb-2 line-clamp-2 group-hover:text-emerald-700 transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm font-semibold text-slate-800 mb-4 line-clamp-2 flex-1">
            {product.description}
          </p>

          {/* Price and Rating */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-xl font-bold text-emerald-700">
              ${parseFloat(product.price).toFixed(2)}
            </span>

            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? "text-amber-400 fill-current"
                      : "text-emerald-200"
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <span className="text-sm text-emerald-600 ml-1">
                ({reviewCount})
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {[
              product.stock > 0 ? "In Stock" : "Out of Stock",
              product.category,
              ...(product.tags || []),
            ]
              .slice(0, 3)
              .map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full capitalize"
                >
                  {tag}
                </span>
              ))}
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
