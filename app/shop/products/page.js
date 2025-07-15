// app/products/page.js (Enhanced Products Page)
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const products = [
    {
      id: 1,
      name: "Monstera Deliciosa",
      price: 29.99,
      category: "Tropical",
      rating: 4.5,
      tags: ["Popular", "Low Maintenance"],
    },
    {
      id: 2,
      name: "Snake Plant Laurentii",
      price: 24.99,
      category: "Air Purifying",
      rating: 4.8,
      tags: ["Pet Friendly"],
    },
    {
      id: 3,
      name: "Golden Pothos",
      price: 18.99,
      category: "Pet Friendly",
      rating: 4.3,
      tags: ["Fast Growing"],
    },
    {
      id: 4,
      name: "ZZ Plant",
      price: 34.99,
      category: "Low Light",
      rating: 4.6,
      tags: ["Low Light"],
    },
    {
      id: 5,
      name: "Fiddle Leaf Fig",
      price: 49.99,
      category: "Tropical",
      rating: 4.2,
      tags: ["Statement Piece"],
    },
    {
      id: 6,
      name: "String of Pearls",
      price: 15.99,
      category: "Succulents",
      rating: 4.7,
      tags: ["Hanging", "Unique"],
    },
    {
      id: 7,
      name: "Rubber Plant",
      price: 32.99,
      category: "Air Purifying",
      rating: 4.4,
      tags: ["Low Maintenance"],
    },
    {
      id: 8,
      name: "Peace Lily",
      price: 22.99,
      category: "Flowering",
      rating: 4.1,
      tags: ["Air Purifying", "Blooms"],
    },
    {
      id: 9,
      name: "Bird of Paradise",
      price: 54.99,
      category: "Tropical",
      rating: 4.9,
      tags: ["Large", "Statement"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="relative rounded-2xl overflow-hidden mb-12 bg-gradient-to-r from-emerald-600 to-teal-500 text-white">
          <div className="absolute inset-0 bg-[url('/plant-pattern.svg')] bg-repeat opacity-10"></div>
          <div className="relative py-16 px-8 text-center">
            <h1 className="text-4xl font-serif font-bold mb-4">Plant Shop</h1>
            <p className="max-w-xl mx-auto text-emerald-100">
              Discover the perfect plant companion for your space among our
              curated collection
            </p>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 border border-emerald-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Search plants..."
                className="md:col-span-2 border-emerald-200 focus:border-emerald-400"
              />

              <Select>
                <SelectTrigger className="border-emerald-200">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "All Plants",
                    "Tropical",
                    "Succulents",
                    "Air Purifying",
                    "Pet Friendly",
                    "Low Light",
                    "Flowering",
                  ].map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="border-emerald-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="newest">Newest Arrivals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              className="border-emerald-300 text-emerald-700"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Pet Friendly",
              "Low Maintenance",
              "Air Purifying",
              "Under $25",
            ].map((tag) => (
              <Button
                key={tag}
                variant="outline"
                size="sm"
                className="border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Product Grid Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-serif font-semibold text-emerald-900">
            All Plants{" "}
            <span className="text-emerald-600">({products.length})</span>
          </h2>
          <div className="text-sm text-emerald-700">
            Showing 1-9 of 24 plants
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="border-emerald-200 text-emerald-700"
            >
              Previous
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">1</Button>
            <Button variant="ghost" className="text-emerald-700">
              2
            </Button>
            <Button variant="ghost" className="text-emerald-700">
              3
            </Button>
            <span className="px-4 text-emerald-600">...</span>
            <Button variant="ghost" className="text-emerald-700">
              8
            </Button>
            <Button
              variant="outline"
              className="border-emerald-200 text-emerald-700"
            >
              Next
            </Button>
          </div>
        </div>

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
