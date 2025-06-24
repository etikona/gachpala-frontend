"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const PER_PAGE = 12;

export default function AllBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(
      `https://gachpala-server.onrender.com/api/v1/blog?page=${page}&limit=${PER_PAGE}`
    )
      .then((res) => res.json())
      .then((data) => setBlogs(data.blogs || []));
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
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blogs/${blog.id}`}>
            <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-900 rounded-lg shadow hover:bg-gray-800 transition">
              {/* Cover Image */}
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full md:w-56 h-40 object-cover rounded"
              />

              {/* Title + Description */}
              <div className="flex-1 text-left">
                <h2 className="text-xl font-semibold text-green-400">
                  {blog.title}
                </h2>
                <p className="text-gray-300 mt-2">{blog.description}</p>
              </div>
            </div>
          </Link>
        ))}
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
