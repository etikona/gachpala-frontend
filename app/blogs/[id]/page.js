"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { FiArrowLeft, FiCalendar, FiUser, FiTag } from "react-icons/fi";
import Image from "next/image";

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

// Image URL handler with proper fallbacks
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;

  // If it's already a full URL
  if (imagePath.startsWith("http")) return imagePath;

  // If it's a relative path, construct full URL
  if (imagePath.startsWith("/")) {
    return `https://gachpala-server.onrender.com${imagePath}`;
  }

  // For other cases, assume it's relative to the server
  return `https://gachpala-server.onrender.com/${imagePath}`;
};

// Default placeholder image
const DEFAULT_IMAGE = "/api/placeholder/800/400?text=Plant+Blog";

export default function BlogDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError("");
        setImageError(false);

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

  const handleImageError = () => {
    setImageError(true);
  };

  // Safe content rendering with line breaks
  const renderContent = (content) => {
    if (!content) return null;

    return content.split("\n").map((paragraph, index) => (
      <p key={index} className="mb-4 text-gray-300 leading-relaxed">
        {paragraph}
      </p>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-gray-900 pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            {/* Back button skeleton */}
            <div className="h-6 w-32 bg-slate-800 rounded mb-10"></div>

            {/* Image skeleton */}
            <div className="h-80 bg-slate-800 rounded-2xl mb-8"></div>

            {/* Title skeleton */}
            <div className="h-12 bg-slate-800 rounded-lg mb-6 max-w-2xl"></div>

            {/* Metadata skeletons */}
            <div className="flex gap-4 mb-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-6 w-24 bg-slate-800 rounded-full"
                ></div>
              ))}
            </div>

            {/* Content skeletons */}
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-slate-800 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog && error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-gray-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 backdrop-blur-sm">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-red-400 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-slate-400 mb-6">{error}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => router.back()}
                className="px-5 py-2.5 flex items-center gap-2 text-sm font-medium bg-slate-800 hover:bg-slate-700 rounded-lg transition text-white"
              >
                <FiArrowLeft /> Go Back
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 text-sm font-medium bg-emerald-600 hover:bg-emerald-500 rounded-lg transition text-white"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🌱</div>
          <h2 className="text-2xl font-bold text-white mb-4">Blog Not Found</h2>
          <p className="text-slate-400 mb-6 max-w-md">
            The blog you are looking for does not exist or may have been
            removed.
          </p>
          <button
            onClick={() => router.push("/blogs")}
            className="px-5 py-2.5 flex items-center gap-2 mx-auto text-sm font-medium bg-emerald-600 hover:bg-emerald-500 rounded-lg transition text-white"
          >
            <FiArrowLeft /> Browse All Blogs
          </button>
        </div>
      </div>
    );
  }

  const imageUrl = blog.image ? getImageUrl(blog.image) : null;
  const finalImageUrl = imageError || !imageUrl ? DEFAULT_IMAGE : imageUrl;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-gray-900 pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-10 transition group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Blogs
        </button>

        {/* Cover Image */}
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-700 shadow-2xl mb-8">
          <Image
            src={finalImageUrl}
            alt={blog.title}
            fill
            className="object-cover"
            onError={handleImageError}
            priority
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>

          {/* Image fallback indicator */}
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50">
              <div className="text-center text-slate-400">
                <div className="text-4xl mb-2">🌿</div>
                <p>Plant Blog Image</p>
              </div>
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          {blog.title}
        </h1>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-xl text-slate-300 mb-8 max-w-3xl leading-relaxed">
            {blog.excerpt}
          </p>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap gap-4 items-center text-slate-400 text-sm mb-8">
          <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-2 rounded-lg">
            <FiUser className="text-emerald-400" />
            <span>{blog.author || "Unknown Author"}</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-2 rounded-lg">
            <FiCalendar className="text-emerald-400" />
            <span>
              {blog.publish_date
                ? format(new Date(blog.publish_date), "MMM dd, yyyy")
                : "Unpublished"}
            </span>
          </div>

          {blog.category && (
            <div className="px-3 py-2 bg-emerald-500/20 text-emerald-300 rounded-lg border border-emerald-500/30">
              {blog.category}
            </div>
          )}
        </div>

        {/* Tags */}
        {Array.isArray(blog.tags) && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-emerald-300"
              >
                <FiTag size={14} /> {tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <article className="border-t border-slate-700 pt-8">
          <div className="prose prose-invert max-w-none">
            {blog.content ? (
              typeof blog.content === "string" ? (
                renderContent(blog.content)
              ) : (
                <p className="text-slate-300 leading-relaxed">{blog.content}</p>
              )
            ) : (
              <div className="text-center py-12 text-slate-400">
                <div className="text-4xl mb-4">📝</div>
                <p>No content available for this blog post.</p>
              </div>
            )}
          </div>
        </article>

        {/* Related Blogs CTA */}
        <div className="mt-16 pt-8 border-t border-slate-700">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Enjoyed this article?
            </h3>
            <p className="text-slate-400 mb-6">
              Discover more plant care tips and gardening insights.
            </p>
            <button
              onClick={() => router.push("/blogs")}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition font-medium"
            >
              Explore More Blogs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
