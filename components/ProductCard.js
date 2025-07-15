// components/ProductCard.js (Enhanced)
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({ product }) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg border border-emerald-100">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square bg-emerald-50 flex items-center justify-center p-8">
          <div className="bg-emerald-300 w-40 h-40 rounded-full group-hover:scale-105 transition-transform duration-300"></div>
          <div className="absolute bg-emerald-500 w-32 h-32 rounded-full"></div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {product.tags.map((tag, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-white text-emerald-700 border border-emerald-200 shadow-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <Link href={`/products/${product.id}`}>
              <h3 className="text-lg font-semibold text-emerald-900 group-hover:text-emerald-700 transition-colors">
                {product.name}
              </h3>
            </Link>
            <span className="text-sm text-emerald-600 block mt-1">
              {product.category}
            </span>
          </div>
          <span className="text-xl font-bold text-emerald-700">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-lg ${
                star <= product.rating ? "text-amber-400" : "text-emerald-200"
              }`}
            >
              ★
            </span>
          ))}
          <span className="text-sm text-emerald-600 ml-2">
            {product.rating}
          </span>
        </div>

        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-sm group-hover:shadow-md transition-shadow">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
