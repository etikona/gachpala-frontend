"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

const BlogPage = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Placeholder for search logic
    console.log("Searching blog for:", query);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-24 px-4 text-center">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-200">
        Explore Blogs for Your Plants
      </h1>

      {/* Description */}
      <p className="mt-4 max-w-2xl text-base text-gray-300">
        Discover expert advice, plant care tutorials, and seasonal gardening
        tips. Our curated blog posts help plant lovers and gardeners grow
        smarter, greener, and happier.
      </p>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="mt-10 flex items-center w-full max-w-md border border-gray-400 rounded-full overflow-hidden shadow-sm bg-gray-800"
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
          className="px-4 py-3 cursor-pointer text-green-500 hover:text-green-600 transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default BlogPage;
