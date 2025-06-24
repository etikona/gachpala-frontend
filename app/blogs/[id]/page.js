"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`https://gachpala-server.onrender.com/api/v1/blog/:id/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data));
  }, [id]);

  if (!blog) return <div className="p-10 text-gray-200">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pt-24 px-4 max-w-4xl mx-auto">
      {/* Cover */}
      <img
        src={blog.imageUrl}
        alt={blog.title}
        className="w-full h-64 object-cover rounded mb-6"
      />

      {/* Title */}
      <h1 className="text-3xl font-bold text-green-400 mb-4">{blog.title}</h1>

      {/* Content */}
      <p className="text-gray-300 leading-relaxed whitespace-pre-line">
        {blog.content}
      </p>
    </div>
  );
}
