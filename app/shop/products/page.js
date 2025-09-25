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
import { SlidersHorizontal, Search, Loader2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { toast } from "sonner";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://gachpala-server.onrender.com/api/v1";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  // console.log(products[0]?.price);
  const newPrice = products[0]?.price;
  console.log(parseFloat(newPrice));
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
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-emerald-700">Loading plants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="relative rounded-2xl overflow-hidden mb-12 bg-gradient-to-r from-emerald-600 to-teal-500 text-white">
          <div className="absolute inset-0 bg-[url('/plant-pattern.svg')] bg-repeat opacity-10"></div>
          <div className="relative py-16 px-8 text-center">
            <h1 className="text-4xl font-serif font-bold mb-4">
              Plant Paradise
            </h1>
            <p className="max-w-xl mx-auto text-emerald-100 text-lg">
              Discover natures beauty with our carefully curated collection of
              plants
            </p>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 border border-emerald-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 h-4 w-4" />
                <Input
                  placeholder="Search plants..."
                  className="pl-10 border-emerald-200 focus:border-emerald-400"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>

              <Select value={category} onValueChange={handleCategoryChange}>
                <SelectTrigger className="border-emerald-200">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === "all" ? "All Plants" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="border-emerald-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest Arrivals</SelectItem>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              className="border-emerald-300 text-emerald-700"
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
            <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600">
              <span>Filtered results:</span>
              {searchTerm && (
                <span className="bg-emerald-100 px-2 py-1 rounded">
                  Search: {searchTerm}
                </span>
              )}
              {category !== "all" && (
                <span className="bg-emerald-100 px-2 py-1 rounded">
                  Category: {category}
                </span>
              )}
            </div>
          ) : null}
        </div>

        {/* Product Grid Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-serif font-semibold text-emerald-900">
            {category === "all" ? "All Plants" : category}{" "}
            <span className="text-emerald-600">
              ({filteredProducts.length})
            </span>
          </h2>
          <div className="text-sm text-emerald-700">
            Showing {Math.min(startIndex + 1, filteredProducts.length)}-
            {Math.min(startIndex + productsPerPage, filteredProducts.length)} of{" "}
            {filteredProducts.length} plants
          </div>
        </div>

        {/* Product Grid */}
        {currentProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/products/${product.id}`}
                  className="hover:opacity-90 transition-opacity group"
                >
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="border-emerald-200 text-emerald-700"
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
                            ? "bg-emerald-600 hover:bg-emerald-700"
                            : "text-emerald-700"
                        }
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    );
                  })}

                  {totalPages > 5 && (
                    <>
                      <span className="px-2 text-emerald-600">...</span>
                      <Button
                        variant="ghost"
                        className="text-emerald-700"
                        onClick={() => handlePageChange(totalPages)}
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}

                  <Button
                    variant="outline"
                    className="border-emerald-200 text-emerald-700"
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
            <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-emerald-800 mb-2">
              No plants found
            </h3>
            <p className="text-emerald-600 mb-6">
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

        {/* Plant Care CTA */}
        <div className="mt-16 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="max-w-md">
            <h3 className="text-2xl font-serif font-bold text-emerald-900 mb-3">
              Need Help Choosing?
            </h3>
            <p className="text-emerald-700 mb-4">
              Our plant experts are here to help you find the perfect green
              companion for your space and lifestyle.
            </p>
            <Button
              variant="outline"
              className="border-emerald-300 text-emerald-700"
            >
              Get Personalized Recommendations
            </Button>
          </div>
          <div className="bg-emerald-200/50 rounded-xl w-48 h-48 flex items-center justify-center">
            <div className="bg-emerald-400 w-32 h-32 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
