"use client";

import BlogForm from "@/components/BlogForm";
import BlogSearch from "./BlogSearch";
import AllBlogsPage from "./AllBlogs";

const BlogPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-start pt-24 px-4 text-center">
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
      </div>

      {/* Search Bar Section */}
      <div className="flex flex-col items-center justify-center mt-10">
        <BlogSearch />
      </div>
      <div>
        <AllBlogsPage />
      </div>
    </div>
  );
};

export default BlogPage;
