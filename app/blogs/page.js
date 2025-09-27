// page.js
"use client";

import BlogForm from "@/components/BlogForm";
import BlogSearch from "./BlogSearch";
import AllBlogsPage from "./AllBlogs";

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-gray-900">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-start pt-24 px-4 text-center">
        {/* Animated Background */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-emerald-900/20 via-transparent to-teal-900/10" />

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">
          Explore Blogs for Your{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Plants
          </span>
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-2xl text-lg text-slate-300 leading-relaxed relative z-10">
          Discover expert advice, plant care tutorials, and seasonal gardening
          tips. Our curated blog posts help plant lovers and gardeners grow
          smarter, greener, and happier.
        </p>

        {/* Decorative Elements */}
        <div className="absolute top-40 right-20 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl" />
      </div>

      {/* Search Bar Section */}
      <div className="relative z-10 flex flex-col items-center justify-center mt-12 px-4">
        <BlogSearch />
      </div>

      {/* Blogs Grid */}
      <div className="relative z-10">
        <AllBlogsPage />
      </div>
    </div>
  );
};

export default BlogPage;
