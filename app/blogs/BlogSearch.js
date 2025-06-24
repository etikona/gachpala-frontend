import { useState } from "react";
import { Search } from "lucide-react";

const categories = [
  "All",
  "Indoor Plants",
  "Outdoor Plants",
  "Flowering Plants",
  "Vegetable Plants",
  "Fruit Plants",
];

const BlogSearch = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", query, "in category:", selectedCategory);
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-6">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="w-full flex items-center border border-gray-400 rounded-full bg-gray-800 shadow-sm overflow-hidden"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search blog articles..."
          className="flex-1 px-5 py-3 bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none"
          aria-label="Search blog articles"
        />
        <button
          type="submit"
          className="px-4 py-3 text-green-500 hover:text-green-600 transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm rounded-full border transition-colors
              ${
                selectedCategory === category
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
              }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogSearch;
