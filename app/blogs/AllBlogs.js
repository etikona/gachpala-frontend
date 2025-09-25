"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const PER_PAGE = 12;

export default function AllBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `https://gachpala-server.onrender.com/api/v1/blog?page=${page}&limit=${PER_PAGE}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched blogs data:", data);

        // Since API returns an array directly
        setBlogs(data || []);
      } catch (error) {
        console.error("Fetch blogs error:", error);
        setBlogs([]);
      }
    };

    fetchBlogs();
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen pt-24 px-4 bg-gray-950 text-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-center">All Blog Posts</h1>

      <div className="space-y-8 max-w-5xl mx-auto">
        {blogs.length === 0 ? (
          <p className="text-center text-gray-400">No blogs found.</p>
        ) : (
          blogs.map((blog) => (
            <Link key={blog.id} href={`/blogs/${blog.slug}`}>
              <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-900 rounded-lg shadow hover:bg-gray-800 transition">
                {/* Cover Image */}
                <Image
                  src={
                    blog.image.startsWith("/")
                      ? blog.image
                      : `/assets/default.jpg`
                  }
                  width={600}
                  height={400}
                  alt={blog.title}
                  className="w-full md:w-56 h-40 object-cover rounded"
                />

                {/* Title + Excerpt */}
                <div className="flex-1 text-left">
                  <h2 className="text-xl font-semibold text-green-400">
                    {blog.title}
                  </h2>
                  <p className="text-gray-300 mt-2">
                    {blog.excerpt || "No excerpt available."}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">Page {page}</span>
        <button
          onClick={handleNext}
          className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}
