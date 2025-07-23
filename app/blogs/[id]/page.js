"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { FiArrowLeft, FiCalendar, FiUser, FiTag } from "react-icons/fi";

// Improved tag parser for your specific format
const parseTags = (tagsInput) => {
  if (!tagsInput) return [];
  if (Array.isArray(tagsInput)) return tagsInput;

  try {
    // Handle your specific format: "{\"tag1\",\"tag2\",\"tag3\"}"
    if (tagsInput.startsWith('{"') || tagsInput.startsWith("{")) {
      // Remove curly braces and quotes
      const cleaned = tagsInput
        .replace(/[{}"]/g, "")
        .split(",")
        .map((tag) => tag.trim());

      return cleaned;
    }

    // Handle standard JSON arrays
    return JSON.parse(tagsInput);
  } catch (e) {
    console.error("Error parsing tags:", e);
    return [];
  }
};

export default function BlogDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true); // Uncommented loading state
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `https://gachpala-server.onrender.com/api/v1/blog/${id}`
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.msg || "Failed to fetch blog");
        }

        const data = await res.json();
        console.log("API Response:", data);

        // Parse tags into proper array format
        const parsedData = {
          ...data,
          tags: parseTags(data.tags),
        };

        setBlog(parsedData);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError(error.message || "Error loading blog");
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 w-40 bg-gray-800 rounded mb-10"></div>
            <div className="h-96 bg-gray-800 rounded-xl mb-8"></div>
            <div className="h-12 bg-gray-800 rounded-lg mb-6 max-w-2xl"></div>
            <div className="flex gap-4 mb-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-6 w-20 bg-gray-800 rounded-full"
                ></div>
              ))}
            </div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-800 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog && error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-red-400 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => router.back()}
                className="px-5 py-2.5 flex items-center gap-2 text-sm font-medium bg-gray-800 hover:bg-gray-700 rounded-lg transition"
              >
                <FiArrowLeft /> Go Back
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 text-sm font-medium bg-green-600 hover:bg-green-500 rounded-lg transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-300 mb-4">
            Blog Not Found
          </h2>
          <p className="text-gray-500 mb-6 max-w-md">
            The blog you are looking for does not exist or may have been
            removed.
          </p>
          <button
            onClick={() => router.push("/blogs")}
            className="px-5 py-2.5 flex items-center gap-2 mx-auto text-sm font-medium bg-green-600 hover:bg-green-500 rounded-lg transition"
          >
            <FiArrowLeft /> Browse All Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-green-400 hover:text-green-300 mb-10 transition"
        >
          <FiArrowLeft /> Back to Blogs
        </button>

        {/* Cover Image */}
        {blog.image ? (
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-800 shadow-lg mb-8">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/default.jpg";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>
        ) : (
          <div className="aspect-video bg-gray-800/50 border border-gray-800 rounded-2xl flex items-center justify-center mb-8">
            <span className="text-gray-500">No image available</span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4 leading-tight">
          {blog.title}
        </h1>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-xl text-gray-400 mb-8 max-w-3xl">{blog.excerpt}</p>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap gap-4 items-center text-gray-500 text-sm mb-8">
          <div className="flex items-center gap-2">
            <FiUser className="text-green-400" />
            <span>{blog.author}</span>
          </div>

          <div className="flex items-center gap-2">
            <FiCalendar className="text-green-400" />
            <span>
              {blog.publish_date
                ? format(new Date(blog.publish_date), "MMM dd, yyyy")
                : "Unpublished"}
            </span>
          </div>

          {blog.category && (
            <div className="px-3 py-1 bg-gray-800 rounded-full text-gray-300">
              {blog.category}
            </div>
          )}
        </div>

        {/* Tags - Safe rendering with Array.isArray check */}
        {Array.isArray(blog.tags) && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-green-300"
              >
                <FiTag size={14} /> {tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <article className="prose prose-invert max-w-none text-gray-300 leading-relaxed border-t border-gray-800 pt-8">
          {blog.content}
        </article>
      </div>
    </div>
  );
}
