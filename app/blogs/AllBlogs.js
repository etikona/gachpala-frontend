// AllBlogs
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Calendar, User, ArrowRight, Clock } from "lucide-react";

const PER_PAGE = 12;

// Image fallback handler
const handleImageError = (e) => {
  e.target.src = "/api/placeholder/600/400?text=🌿+Plant+Blog";
  e.target.onerror = null; // Prevent infinite loop
};

// Default placeholder image
const getImageUrl = (imagePath) => {
  if (!imagePath) return "/api/placeholder/600/400?text=Plant+Blog";

  if (imagePath.startsWith("http")) return imagePath;

  if (imagePath.startsWith("/")) {
    return `https://gachpala-server.onrender.com${imagePath}`;
  }

  return `https://gachpala-server.onrender.com/${imagePath}`;
};

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Calculate reading time
const getReadingTime = (content) => {
  const wordsPerMinute = 200;
  const words = content?.split(/\s+/).length || 0;
  return Math.ceil(words / wordsPerMinute);
};

export default function AllBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://gachpala-server.onrender.com/api/v1/blog?page=${page}&limit=${PER_PAGE}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched blogs data:", data);

        // Handle both array and object response formats
        const blogsArray = Array.isArray(data)
          ? data
          : data.blogs || data.data || [];
        setBlogs(blogsArray);

        // Calculate total pages (assuming API returns total count)
        if (data.totalCount) {
          setTotalPages(Math.ceil(data.totalCount / PER_PAGE));
        }
      } catch (error) {
        console.error("Fetch blogs error:", error);
        setBlogs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 px-4 bg-gradient-to-br from-slate-900 via-slate-950 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-emerald-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 px-4 bg-gradient-to-br ">
      <div className="max-w-6xl mx-auto">
        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogs.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No blogs found
              </h3>
              <p className="text-slate-400">
                Check back later for new blog posts!
              </p>
            </div>
          ) : (
            blogs.map((blog) => (
              <Link key={blog.id} href={`/blogs/${blog.slug || blog.id}`}>
                <article className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300 hover:transform hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={getImageUrl(blog.image)}
                      alt={blog.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={handleImageError}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk6obJztP//Z"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />

                    {/* Category Badge */}
                    {blog.category && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-emerald-500/90 text-white text-xs font-medium rounded-full">
                          {blog.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-emerald-300 transition-colors">
                      {blog.title}
                    </h2>

                    <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                      {blog.excerpt ||
                        blog.description ||
                        "No excerpt available."}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {blog.createdAt
                            ? formatDate(blog.createdAt)
                            : "Recent"}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {getReadingTime(blog.content)} min read
                        </div>
                      </div>
                    </div>

                    {/* Read More */}
                    <div className="flex items-center text-emerald-400 group-hover:text-emerald-300 transition-colors">
                      <span className="text-sm font-medium">Read more</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            ))
          )}
        </div>

        {/* Enhanced Pagination */}
        {blogs.length > 0 && (
          <div className="flex items-center justify-between border-t border-slate-700/50 pt-8">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="flex items-center px-6 py-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-emerald-500/30 text-slate-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>

            <div className="flex items-center space-x-2 text-slate-400">
              <span className="font-medium">Page</span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg font-semibold">
                {page}
              </span>
              <span className="font-medium">of {totalPages}</span>
            </div>

            <button
              onClick={handleNext}
              disabled={page >= totalPages}
              className="flex items-center px-6 py-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-emerald-500/30 text-slate-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
