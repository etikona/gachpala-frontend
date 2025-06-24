"use client";

import Image from "next/image";
import { useState } from "react";

const categories = [
  "Indoor Plants",
  "Outdoor Plants",
  "Flowering Plants",
  "Vegetable Plants",
  "Fruit Plants",
];

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    content: "",
    image: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const body = new FormData();
    body.append("title", formData.title);
    body.append("category", formData.category);
    body.append("description", formData.description);
    body.append("content", formData.content);
    if (formData.image) body.append("image", formData.image);

    try {
      const res = await fetch(
        "https://gachpala-server.onrender.com/api/v1/blog",
        {
          method: "POST",
          body,
        }
      );

      if (res.ok) {
        setFormData({
          title: "",
          category: "",
          description: "",
          content: "",
          image: null,
        });
        setPreviewUrl(null);
        setSuccess(true);
      } else {
        alert("Failed to create blog.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting blog.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 mb-10 p-6 bg-gray-900 text-gray-200 rounded-lg shadow-xl backdrop-blur-2xl ">
      <h2 className="text-2xl font-bold mb-6">Create New Blog</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        encType="multipart/form-data"
      >
        {/* Title */}
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-gray-100"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="text-gray-300">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-semibold">Short Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-1 font-semibold">Content</label>
          <textarea
            name="content"
            rows="6"
            value={formData.content}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-semibold">Cover Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="text-gray-100 file:bg-green-700 file:text-white file:px-4 file:py-1 file:rounded file:cursor-pointer"
          />
          {previewUrl && (
            <Image
              src={previewUrl}
              alt="Preview"
              className="mt-3 rounded-md w-full max-h-60 object-cover border border-gray-700"
              width={500}
              height={300}
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded transition"
        >
          {loading ? "Posting..." : "Post Blog"}
        </button>

        {success && (
          <p className="text-green-400 mt-2">Blog posted successfully!</p>
        )}
      </form>
    </div>
  );
};

export default BlogForm;
