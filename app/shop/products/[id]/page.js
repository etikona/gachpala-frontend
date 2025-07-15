import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Rating from "@/components/Rating";

export default function ProductDetails({ params }) {
  const product = {
    id: 1,
    name: "Monstera Deliciosa",
    price: 29.99,
    description:
      "The iconic Swiss Cheese Plant with beautiful fenestrated leaves. This tropical beauty is perfect for adding a jungle vibe to your space.",
    care: "Prefers bright, indirect light. Water when top 2 inches of soil are dry.",
    rating: 4.5,
    reviews: [
      {
        id: 1,
        user: "Alex J.",
        rating: 5,
        comment:
          "Arrived in perfect condition! Already putting out new leaves.",
        date: "2023-10-15",
      },
      {
        id: 2,
        user: "Sam R.",
        rating: 4,
        comment: "Beautiful plant but took a while to adjust to my space.",
        date: "2023-09-28",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-green-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Product Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="bg-emerald-100 rounded-xl aspect-square flex items-center justify-center p-12">
            <div className="bg-emerald-500 w-64 h-64 rounded-full"></div>
          </div>

          {/* Details */}
          <div>
            <div className="mb-6">
              <span className="text-emerald-600">Tropical Plants</span>
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
                <Button variant="ghost" className="text-emerald-700 text-xl">
                  -
                </Button>
                <span className="px-4">1</span>
                <Button variant="ghost" className="text-emerald-700 text-xl">
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

          {/* Review List */}
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

          {/* Review Form */}
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
}
