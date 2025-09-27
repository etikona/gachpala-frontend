// app/shop/page.jsx
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal, Search, Loader2, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { toast } from "sonner";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://gachpala-server.onrender.com/api/v1";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/products`);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      toast.error("Failed to load products");
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (category !== "all") {
      result = result.filter((product) => product.category === category);
    }

    // Apply sorting
    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
      default:
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, searchTerm, category, sortBy]);

  // Get unique categories for filter
  const categories = [
    "all",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-gray-900 py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="h-12 w-12 text-emerald-400 animate-spin mx-auto mb-4" />
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-lg" />
          </div>
          <p className="text-emerald-200">Loading plants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-gradient-to-br from-slate-900 via-slate-950 to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto my-12">
        {/* Header */}
        <div className="relative rounded-2xl overflow-hidden mb-12 bg-gradient-to-r from-emerald-900/80 via-emerald-800/60 to-teal-900/80 border border-emerald-800/30">
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-400/5 via-transparent to-transparent" />
            <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
          </div>

          <div className="relative py-16 px-8 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-300 font-semibold text-sm uppercase tracking-widest">
                Premium Collection
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-200 via-emerald-100 to-teal-200 bg-clip-text text-transparent">
              Plant Paradise
            </h1>
            <p className="max-w-xl mx-auto text-emerald-200/80 text-lg leading-relaxed">
              Discover natures beauty with our carefully curated collection of
              exotic plants
            </p>

            {/* Floating elements */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-emerald-400/30 rounded-tl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-teal-400/30 rounded-br-lg" />
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 h-4 w-4" />
                <Input
                  placeholder="Search plants..."
                  className="pl-10 bg-slate-700/50 border-slate-600 focus:border-emerald-400 text-white placeholder:text-slate-400"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>

              <Select value={category} onValueChange={handleCategoryChange}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600 text-white">
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat}
                      value={cat}
                      className="focus:bg-slate-700"
                    >
                      {cat === "all" ? "All Plants" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600 text-white">
                  <SelectItem value="newest" className="focus:bg-slate-700">
                    Newest Arrivals
                  </SelectItem>
                  <SelectItem value="price_asc" className="focus:bg-slate-700">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price_desc" className="focus:bg-slate-700">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="rating" className="focus:bg-slate-700">
                    Top Rated
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              className="border-slate-600 text-slate-300 hover:border-emerald-400 hover:text-emerald-300"
              onClick={() => {
                setSearchTerm("");
                setCategory("all");
                setSortBy("newest");
              }}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>

          {searchTerm || category !== "all" ? (
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-emerald-300">
              <span>Filtered results:</span>
              {searchTerm && (
                <span className="bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                  Search: {searchTerm}
                </span>
              )}
              {category !== "all" && (
                <span className="bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                  Category: {category}
                </span>
              )}
            </div>
          ) : null}
        </div>

        {/* Product Grid Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-2xl font-bold text-white">
            {category === "all" ? "All Plants" : category}{" "}
            <span className="text-emerald-400">
              ({filteredProducts.length})
            </span>
          </h2>
          <div className="text-sm text-slate-400">
            Showing {Math.min(startIndex + 1, filteredProducts.length)}-
            {Math.min(startIndex + productsPerPage, filteredProducts.length)} of{" "}
            {filteredProducts.length} plants
          </div>
        </div>

        {/* Product Grid */}
        {currentProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/products/${product.id}`}
                  className="group hover:transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <ProductCard product={product} />
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:border-emerald-400 hover:text-emerald-300"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "ghost"}
                        className={
                          currentPage === page
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "text-slate-300 hover:text-emerald-300"
                        }
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    );
                  })}

                  {totalPages > 5 && (
                    <>
                      <span className="px-2 text-slate-400">...</span>
                      <Button
                        variant="ghost"
                        className="text-slate-300 hover:text-emerald-300"
                        onClick={() => handlePageChange(totalPages)}
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}

                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:border-emerald-400 hover:text-emerald-300"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <Search className="h-12 w-12 text-emerald-400" />
              </div>
              <div className="absolute inset-0 bg-emerald-400/10 rounded-full blur-lg" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No plants found
            </h3>
            <p className="text-slate-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setCategory("all");
                setSortBy("newest");
              }}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
