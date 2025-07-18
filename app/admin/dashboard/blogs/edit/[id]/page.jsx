// app/admin/dashboard/blog/edit/[id]/page.jsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import BlogEditor from "../../components/BlogEditor";

// Mock API function to fetch a blog post by ID
const fetchPost = async (id) => {
  // In a real app, you would fetch from your API
  const mockPosts = [
    {
      id: "1",
      title: "The Ultimate Guide to Indoor Plant Care",
      slug: "ultimate-guide-indoor-plant-care",
      excerpt:
        "Learn how to keep your indoor plants thriving with these expert tips and tricks.",
      content: `Keeping indoor plants healthy requires understanding their specific needs. Different plants have different requirements for light, water, and humidity.\n\n## Light Requirements\n\nMost houseplants thrive in bright, indirect light. South-facing windows provide the most light, while north-facing windows offer the least.\n\n## Watering Techniques\n\nOverwatering is the most common cause of houseplant death. Always check soil moisture before watering.`,
      status: "published",
      author: "Admin User",
      date: "2023-10-15",
      category: "Plant Care",
      tags: ["indoor plants", "care tips", "beginners"],
      imageUrl: "/assets/blog1.jpg",
    },
    {
      id: "2",
      title: "10 Rare Tropical Plants You Need in Your Collection",
      slug: "rare-tropical-plants-collection",
      excerpt:
        "Discover exotic tropical plants that will transform your space into a jungle paradise.",
      content: `Tropical plants bring a touch of the exotic to any indoor space. Here are 10 rare varieties worth adding to your collection:\n\n1. **Monstera Obliqua** - Known as the "Swiss Cheese Plant"\n2. **Philodendron Pink Princess** - Stunning variegated leaves\n3. **Anthurium Clarinervium** - Velvet-textured leaves with white veins`,
      status: "published",
      author: "Admin User",
      date: "2023-09-28",
      category: "Plant Species",
      tags: ["tropical", "rare plants", "collection"],
      imageUrl: "/assets/blog2.jpg",
    },
  ];

  return mockPosts.find((post) => post.id === id);
};

export default function EditBlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await fetchPost(id);
        if (postData) {
          setPost(postData);
        } else {
          console.error("Post not found");
        }
      } catch (error) {
        console.error("Error loading post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading post data...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-center p-8 bg-gray-800/50 border border-gray-700 rounded-xl backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-4">Post Not Found</h2>
          <p className="text-gray-400 mb-6">
            The blog post you're trying to edit doesn't exist or has been
            removed.
          </p>
          <a
            href="/admin/dashboard/blog"
            className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-6 py-3 rounded-lg font-medium inline-block hover:from-emerald-700 hover:to-teal-600 transition-all"
          >
            Back to Blog Management
          </a>
        </div>
      </div>
    );
  }

  return <BlogEditor initialPost={post} />;
}
