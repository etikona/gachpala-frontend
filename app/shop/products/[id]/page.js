// app/shop/products/[id]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Rating from "@/components/Rating";
import { Loader2, ShoppingCart, Heart, Share2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// Helper function to convert image path to full URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;

  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
  const baseUrl = API_BASE_URL.replace("/api/v1", "");

  return `${baseUrl}/${cleanPath}`;
};

export default function ProductDetails({ params }) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/products/${params.id}`);

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        toast.error("Failed to load product");
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${product.name} to cart`);
    // Add to cart logic here
  };

  const handleAddToWishlist = () => {
    toast.success("Added to wishlist");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-emerald-700">Loading plant details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-emerald-800">
            Plant Not Found
          </h1>
          <p className="text-emerald-700 mt-4">
            The plant you are looking for does not exist in our collection.
          </p>
          <Button className="mt-6 bg-emerald-600 hover:bg-emerald-700">
            <a href="/shop">Browse All Plants</a>
          </Button>
        </div>
      </div>
    );
  }

  const imageUrl = getImageUrl(product.image);
  const images = imageUrl ? [imageUrl] : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-emerald-600 mb-8">
          <a href="/shop" className="hover:text-emerald-800">
            Shop
          </a>
          <span className="mx-2">/</span>
          <a
            href={`/shop?category=${product.category}`}
            className="hover:text-emerald-800 capitalize"
          >
            {product.category}
          </a>
          <span className="mx-2">/</span>
          <span className="text-emerald-800">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-8 aspect-square flex items-center justify-center shadow-sm border border-emerald-100">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-contain rounded-lg"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <div className="bg-emerald-100 w-64 h-64 rounded-full flex items-center justify-center">
                  <div className="text-emerald-400 text-6xl">🌿</div>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`bg-white rounded-lg p-2 border-2 ${
                      activeImage === index
                        ? "border-emerald-500"
                        : "border-emerald-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-16 object-cover rounded"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium capitalize">
                {product.category}
              </span>

              <h1 className="text-3xl font-serif font-bold text-emerald-800 mt-4 mb-2">
                {product.name}
              </h1>

              <div className="flex items-center justify-between mb-4">
                <p className="text-2xl font-bold text-emerald-700">
                  ${parseFloat(product.price)}
                </p>
                <div className="flex items-center gap-2">
                  <Rating rating={product.rating || 4.5} />
                  <span className="text-emerald-600 text-sm">
                    ({product.reviews_count || 12} reviews)
                  </span>
                </div>
              </div>

              {product.stock > 0 ? (
                <span className="text-green-600 font-medium">
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-rose-600 font-medium">Out of Stock</span>
              )}
            </div>

            <p className="text-emerald-700 mb-8 leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Care Instructions */}
            <div className="bg-emerald-50 rounded-xl p-6 mb-8 border border-emerald-100">
              <h3 className="font-semibold text-emerald-800 mb-3 text-lg">
                🌱 Care Instructions
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-emerald-700">Light:</span>
                  <p className="text-emerald-600">Bright indirect light</p>
                </div>
                <div>
                  <span className="font-medium text-emerald-700">Water:</span>
                  <p className="text-emerald-600">When soil is dry</p>
                </div>
                <div>
                  <span className="font-medium text-emerald-700">
                    Humidity:
                  </span>
                  <p className="text-emerald-600">Moderate to high</p>
                </div>
                <div>
                  <span className="font-medium text-emerald-700">
                    Pet Safe:
                  </span>
                  <p className="text-emerald-600">Yes</p>
                </div>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-emerald-300 rounded-lg bg-white">
                  <Button
                    variant="ghost"
                    className="text-emerald-700 text-xl px-3"
                    onClick={handleDecrement}
                  >
                    -
                  </Button>
                  <span className="px-4 font-medium min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    className="text-emerald-700 text-xl px-3"
                    onClick={handleIncrement}
                  >
                    +
                  </Button>
                </div>

                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 flex-1"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-emerald-200 text-emerald-700"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </Button>
                <Button
                  variant="outline"
                  className="border-emerald-200 text-emerald-700"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif text-emerald-800">
              Customer Reviews
            </h2>
            <div className="flex items-center gap-2">
              <Rating rating={product.rating || 4.5} />
              <span className="text-emerald-700">
                ({product.reviews_count || 12} reviews)
              </span>
            </div>
          </div>

          {/* Sample Reviews */}
          <div className="space-y-6 mb-12">
            {[
              {
                id: 1,
                user: "Sarah Johnson",
                date: "2 weeks ago",
                rating: 5,
                comment:
                  "Absolutely love this plant! It arrived in perfect condition and has been thriving in my living room. The care instructions were very helpful.",
              },
              {
                id: 2,
                user: "Mike Chen",
                date: "1 month ago",
                rating: 4,
                comment:
                  "Beautiful plant, healthy and well-packaged. Would recommend to any plant lover looking to add some green to their space.",
              },
            ].map((review) => (
              <div
                key={review.id}
                className="border-b border-emerald-100 pb-6 last:border-b-0"
              >
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium text-emerald-800">
                    {review.user}
                  </h4>
                  <span className="text-emerald-600 text-sm">
                    {review.date}
                  </span>
                </div>
                <Rating rating={review.rating} />
                <p className="mt-3 text-emerald-700">{review.comment}</p>
              </div>
            ))}
          </div>

          {/* Review Form */}
          <div>
            <h3 className="text-xl font-serif text-emerald-800 mb-6">
              Share Your Experience
            </h3>
            <form className="space-y-6">
              <div>
                <label className="block text-emerald-800 mb-2">
                  Your Rating
                </label>
                <Rating editable={true} />
              </div>

              <div>
                <label
                  htmlFor="comment"
                  className="block text-emerald-800 mb-2"
                >
                  Your Review
                </label>
                <Textarea
                  id="comment"
                  placeholder="Share your experience with this plant..."
                  className="min-h-[120px] border-emerald-200 focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="border-emerald-200 focus:border-emerald-400"
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="border-emerald-200 focus:border-emerald-400"
                />
              </div>

              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Submit Review
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
