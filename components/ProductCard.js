export default function ProductCard({ product }) {
  return (
    <div className="h-full">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-emerald-100 hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="bg-emerald-50 aspect-square flex items-center justify-center p-8">
          <div className="bg-emerald-300 w-40 h-40 rounded-full"></div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-emerald-900">
              {product.name}
            </h3>
            <div className="flex items-center">
              <span className="text-emerald-600 font-bold">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>
          <p className="text-sm text-emerald-600 mb-4">{product.category}</p>
          <div className="mt-auto">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "text-amber-400 fill-current"
                        : "text-emerald-200"
                    }`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
                <span className="text-sm text-emerald-600 ml-1">
                  {product.rating}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {product.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
