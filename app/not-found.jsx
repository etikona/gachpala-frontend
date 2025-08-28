// app/not-found.js
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, Leaf, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Animated plant icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Leaf className="h-12 w-12 text-emerald-400 animate-pulse" />
          </div>
          <div className="absolute -inset-4 bg-emerald-400/10 rounded-full blur-lg animate-ping opacity-20"></div>
        </div>

        {/* Error code with gradient */}
        <h1 className="text-9xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl font-semibold mb-4">Plant Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          Sorry, the page you're looking for seems to have grown roots and
          wandered off. Let's help you find your way back to our garden of AI
          insights and plant-based products.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-emerald-600 hover:bg-emerald-700 transition-colors"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Return Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-gray-700 text-gray-200 hover:bg-gray-800"
          >
            <Link href="/search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Additional navigation */}
        <div className="mt-10 pt-6 border-t border-gray-800">
          <p className="text-gray-500 text-sm mb-3">Quick Links</p>
          <div className="flex justify-center space-x-6">
            <Link
              href="/blogs"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              AI Blog
            </Link>
            <Link
              href="/shop"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
