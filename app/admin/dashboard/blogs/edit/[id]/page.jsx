// app/admin/dashboard/blog/edit/[id]/page.jsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BlogEditorUpdate from "../../components/BlogEditorUpdate";
import { Loader2 } from "lucide-react";

export default function EditBlogPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://gachpala-server.onrender.com/api/v1/blog/${id}`
        );

        console.log("Fetch response status:", response.status);

        if (!response.ok) {
          const errorData = await response.json();
          console.log("Fetch error data:", errorData);
          throw new Error(
            errorData.message || `Failed to fetch post (${response.status})`
          );
        }

        const postData = await response.json();
        console.log("Fetched post data:", postData);

        // Ensure we have consistent ID property
        const blogId = postData._id || postData.id || id;

        // Ensure tags is always an array
        const tags = Array.isArray(postData.tags)
          ? postData.tags
          : (postData.tags || "").split(",").filter((tag) => tag.trim());

        // Safely handle publishDate
        const publishDate = postData.publishDate
          ? new Date(postData.publishDate).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0];

        setPost({
          ...postData,
          _id: blogId, // Set consistent _id property
          tags,
          publishDate,
          image: postData.image || null,
        });
      } catch (err) {
        console.error("Error loading post:", err);
        setError(err.message || "Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-emerald-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-center p-8 bg-gray-800/50 border border-gray-700 rounded-xl backdrop-blur-sm max-w-md w-full">
          <h2 className="text-2xl font-bold text-white mb-4">
            Error Loading Post
          </h2>
          <p className="text-gray-400 mb-6">
            {error || "The blog post could not be loaded."}
          </p>
          <button
            onClick={() => router.push("/admin/dashboard/blog")}
            className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-6 py-3 rounded-lg font-medium inline-block hover:from-emerald-700 hover:to-teal-600 transition-all"
          >
            Back to Blog Management
          </button>
        </div>
      </div>
    );
  }

  return <BlogEditorUpdate blogData={post} />;
}
