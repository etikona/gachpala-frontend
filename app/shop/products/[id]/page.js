// app/shop/products/[id]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Rating from "@/components/Rating";
import {
  Loader2,
  ShoppingCart,
  Heart,
  Share2,
  ChevronRight,
  CreditCard,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import ProductReviews from "@/components/ProductReviews";
import ReviewForm from "@/components/ReviewForm";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://gachpala-server.onrender.com/api/v1";

// Helper function to convert image path to full URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;

  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
  const baseUrl = API_BASE_URL.replace("/api/v1", "");

  return `${baseUrl}/${cleanPath}`;
};

// Cart functionality
const useCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("plant-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product, quantity) => {
    const newCart = [...cart];
    const existingItem = newCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      newCart.push({
        ...product,
        quantity,
        addedAt: new Date().toISOString(),
      });
    }

    setCart(newCart);
    localStorage.setItem("plant-cart", JSON.stringify(newCart));
    return newCart;
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
  };

  return { cart, addToCart, getCartTotal };
};

// Payment modal component
const PaymentModal = ({ isOpen, onClose, product, quantity, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
    email: "",
    address: "",
  });

  const totalAmount = parseFloat(product.price) * quantity;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setStep(3);

    // Simulate successful payment
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl max-w-md w-full  border-slate-700">
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">
              {step === 1 ? "Checkout" : step === 2 ? "Payment" : "Success!"}
            </h3>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white"
            >
              ×
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-slate-700">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {step > stepNum ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    stepNum
                  )}
                </div>
                {stepNum < 3 && (
                  <div
                    className={`w-12 h-0.5 mx-2 ${
                      step > stepNum ? "bg-emerald-500" : "bg-slate-600"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  {product.image && (
                    <Image
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{product.name}</h4>
                    <p className="text-slate-400 text-sm">Qty: {quantity}</p>
                  </div>
                  <div className="text-emerald-400 font-bold">
                    ${totalAmount.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <Input
                  placeholder="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <Textarea
                  placeholder="Shipping Address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <Button
                onClick={() => setStep(2)}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={
                  !formData.name || !formData.email || !formData.address
                }
              >
                Continue to Payment
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex space-x-2">
                  {["card", "paypal"].map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`flex-1 py-3 rounded-lg border-2 text-center font-medium ${
                        paymentMethod === method
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                          : "border-slate-600 text-slate-400 hover:border-slate-500"
                      }`}
                    >
                      {method === "card" ? "💳 Credit Card" : "📱 PayPal"}
                    </button>
                  ))}
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-3">
                    <Input
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={(e) =>
                        handleInputChange("cardNumber", e.target.value)
                      }
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={(e) =>
                          handleInputChange("expiry", e.target.value)
                        }
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                      <Input
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={(e) =>
                          handleInputChange("cvv", e.target.value)
                        }
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-white">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-slate-400">Shipping</span>
                  <span className="text-emerald-400">Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t border-slate-600">
                  <span className="text-white">Total</span>
                  <span className="text-emerald-400">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={
                  isProcessing ||
                  (paymentMethod === "card" &&
                    (!formData.cardNumber || !formData.expiry || !formData.cvv))
                }
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 w-4 h-4" />
                    Pay ${totalAmount.toFixed(2)}
                  </>
                )}
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">
                Payment Successful!
              </h4>
              <p className="text-slate-400 mb-6">
                Your order has been confirmed. You will receive an email
                confirmation shortly.
              </p>
              <div className="bg-emerald-500/10 rounded-lg p-4 text-sm">
                <p className="text-emerald-400">
                  Order #PLA{Math.random().toString().slice(2, 8)}
                </p>
                <p className="text-slate-400 mt-1">
                  Estimated delivery: 3-5 business days
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ProductDetails({ params }) {
  const [productId, setProductId] = useState(null);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const { addToCart, getCartTotal, cart } = useCart();

  // Extract productId from params when component mounts
  useEffect(() => {
    const extractProductId = async () => {
      try {
        const resolvedParams = await Promise.resolve(params);
        setProductId(resolvedParams.id);
      } catch (error) {
        console.error("Error extracting params:", error);
        toast.error("Invalid product URL");
      }
    };

    extractProductId();
  }, [params]);

  // Fetch product when productId is available
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/products/${productId}`);

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error details:", error);
        toast.error("Failed to load product");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    addToCart(product, quantity);
    toast.success(
      `Order placed successfully! ${product.name} will be shipped soon.`
    );
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-gray-900 py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="h-12 w-12 text-emerald-400 animate-spin mx-auto mb-4" />
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-lg" />
          </div>
          <p className="text-emerald-200">Loading plant details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-gray-900 py-12 px-4 flex items-center justify-center">
        <div className="text-center ">
          <h1 className="text-2xl font-bold text-white mb-4">
            Plant Not Found
          </h1>
          <p className="text-slate-400 mb-6">
            The plant you are looking for does not exist in our collection.
          </p>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <a href="/shop">Browse All Plants</a>
          </Button>
        </div>
      </div>
    );
  }

  const imageUrl = getImageUrl(product.image);
  const images = imageUrl ? [imageUrl] : [];
  const totalPrice = parseFloat(product.price) * quantity;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto my-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-emerald-400 mb-8 flex items-center">
          <a href="/shop" className="hover:text-emerald-300 transition-colors">
            Shop
          </a>
          <ChevronRight className="mx-2 w-4 h-4" />
          <a
            href={`/shop?category=${product.category}`}
            className="hover:text-emerald-300 transition-colors capitalize"
          >
            {product.category}
          </a>
          <ChevronRight className="mx-2 w-4 h-4" />
          <span className="text-emerald-300">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 aspect-square flex items-center justify-center border border-slate-700/50">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-contain rounded-lg"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <div className="bg-emerald-500/10 w-64 h-64 rounded-full flex items-center justify-center border border-emerald-500/20">
                  <div className="text-emerald-400 text-6xl">🌿</div>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`bg-slate-800/50 rounded-lg p-2 border-2 backdrop-blur-sm ${
                      activeImage === index
                        ? "border-emerald-500"
                        : "border-slate-600 hover:border-slate-500"
                    } transition-all`}
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
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-medium capitalize border border-emerald-500/30">
                {product.category}
              </span>

              <h1 className="text-4xl font-bold text-white mt-6 mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-baseline gap-3">
                  <p className="text-3xl font-bold text-emerald-400">
                    ${parseFloat(product.price).toFixed(2)}
                  </p>
                  {quantity > 1 && (
                    <p className="text-lg text-slate-400">
                      Total:{" "}
                      <span className="text-emerald-300">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Rating rating={product.rating || 4.5} />
                  <span className="text-slate-400 text-sm">
                    ({product.reviews_count || 12} reviews)
                  </span>
                </div>
              </div>

              {product.stock > 0 ? (
                <span className="inline-flex items-center px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 bg-rose-500/20 text-rose-400 rounded-full text-sm border border-rose-500/30">
                  Out of Stock
                </span>
              )}
            </div>

            <p className="text-slate-300 mb-8 leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Care Instructions */}
            <div className="bg-slate-800/30 rounded-xl p-6 mb-8 border border-slate-700/50 backdrop-blur-sm">
              <h3 className="font-semibold text-white mb-4 text-lg flex items-center gap-2">
                <span className="text-emerald-400">🌱</span> Care Instructions
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-emerald-400">Light:</span>
                  <p className="text-slate-400">Bright indirect light</p>
                </div>
                <div>
                  <span className="font-medium text-emerald-400">Water:</span>
                  <p className="text-slate-400">When soil is dry</p>
                </div>
                <div>
                  <span className="font-medium text-emerald-400">
                    Humidity:
                  </span>
                  <p className="text-slate-400">Moderate to high</p>
                </div>
                <div>
                  <span className="font-medium text-emerald-400">
                    Pet Safe:
                  </span>
                  <p className="text-slate-400">Yes</p>
                </div>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-600 rounded-lg bg-slate-800/50">
                  <Button
                    variant="ghost"
                    className="text-slate-300 hover:text-white text-xl px-4"
                    onClick={handleDecrement}
                  >
                    -
                  </Button>
                  <span className="px-6 font-medium min-w-[3rem] text-center text-white">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    className="text-slate-300 hover:text-white text-xl px-4"
                    onClick={handleIncrement}
                  >
                    +
                  </Button>
                </div>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Buy Now
                </Button>
              </div>

              {/* Cart Summary */}
              {cart.length > 0 && (
                <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Items in cart:</span>
                    <span className="text-white font-medium">
                      {cart.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-slate-400">Cart total:</span>
                    <span className="text-emerald-400 font-bold">
                      ${getCartTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ProductReviews productId={productId} />

        {/* Review Form */}
        <ReviewForm
          productId={productId}
          onReviewSubmitted={() => {
            console.log("Review submitted - refresh reviews");
          }}
        />

        {/* Payment Modal */}
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          product={product}
          quantity={quantity}
          onSuccess={handlePaymentSuccess}
        />
      </div>
    </div>
  );
}
