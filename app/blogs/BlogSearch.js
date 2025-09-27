// BlogSearch
import { useState } from "react";
import { Search, Filter } from "lucide-react";

const categories = [
  "All",
  "Indoor Plants",
  "Outdoor Plants",
  "Flowering Plants",
  "Vegetable Plants",
  "Fruit Plants",
  "Plant Care",
  "Gardening Tips",
];

const BlogSearch = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", query, "in category:", selectedCategory);
    // Implement search logic here
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-6">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="w-full relative group">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search blog articles, tips, guides..."
            className="w-full px-12 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
            aria-label="Search blog articles"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
            aria-label="Search"
          >
            Search
          </button>
        </div>
      </form>

      {/* Category Filter */}
      <div className="w-full">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-400">
            Filter by category:
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm rounded-full border transition-all duration-200
                ${
                  selectedCategory === category
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-500/25"
                    : "bg-slate-800/50 text-slate-300 border-slate-600 hover:bg-slate-700 hover:border-slate-500"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      {(query || selectedCategory !== "All") && (
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span>Active filters:</span>
          {query && (
            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">
              Search: {query}
            </span>
          )}
          {selectedCategory !== "All" && (
            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">
              Category: {selectedCategory}
            </span>
          )}
          <button
            onClick={() => {
              setQuery("");
              setSelectedCategory("All");
            }}
            className="text-slate-300 hover:text-white underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogSearch;
