"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Rating from "@/components/Rating";
import products from "@/app/data/products";

const ProductDetails = ({ params }) => {
  const productId = parseInt(params.id);
  const product = products.find((p) => p.id === productId);

  const [quantity, setQuantity] = useState(1); // ✅ quantity state

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-green-50 py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-emerald-800">
            Plant Not Found
          </h1>
          <p className="text-emerald-700 mt-4">
            The plant you are looking for does not exist in our collection.
          </p>
          <Button className="mt-6 bg-emerald-600 hover:bg-emerald-700">
            <a href="/products">Browse All Plants</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-emerald-100 rounded-xl aspect-square flex items-center justify-center p-12">
            <div className="bg-emerald-500 w-64 h-64 rounded-full"></div>
          </div>

          <div>
            <div className="mb-6">
              <span className="text-emerald-600">{product.category}</span>
              <h1 className="text-3xl font-serif font-bold text-emerald-800 mt-2 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-emerald-700">
                  ${product.price.toFixed(2)}
                </p>
                <Rating rating={product.rating} />
              </div>
            </div>

            <p className="text-emerald-700 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="bg-emerald-50 rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-emerald-800 mb-2">
                Care Instructions
              </h3>
              <p className="text-emerald-700">{product.care}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-emerald-300 rounded-lg">
                <Button
                  variant="ghost"
                  className="text-emerald-700 text-xl"
                  onClick={handleDecrement} // ✅
                >
                  -
                </Button>
                <span className="px-4">{quantity}</span> {/* ✅ dynamic */}
                <Button
                  variant="ghost"
                  className="text-emerald-700 text-xl"
                  onClick={handleIncrement} // ✅
                >
                  +
                </Button>
              </div>
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 flex-1"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif text-emerald-800">
              Customer Reviews
            </h2>
            <div className="flex items-center gap-2">
              <Rating rating={product.rating} />
              <span className="text-emerald-700">
                ({product.reviews.length})
              </span>
            </div>
          </div>

          <div className="space-y-6 mb-12">
            {product.reviews.map((review) => (
              <div key={review.id} className="border-b border-emerald-100 pb-6">
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

          <div>
            <h3 className="text-xl font-serif text-emerald-800 mb-6">
              Write a Review
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
                  className="min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input type="text" placeholder="Your Name" />
                <Input type="email" placeholder="Your Email" />
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
};

export default ProductDetails;
