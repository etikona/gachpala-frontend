// app/admin/dashboard/blog/page.jsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  FileText,
  Eye,
  Pencil,
  Trash2,
  Plus,
  Search,
  CalendarDays,
  User,
} from "lucide-react";
import Link from "next/link";

const BlogManagementPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Mock data for blog posts
  useEffect(() => {
    const mockData = [
      {
        id: "1",
        title: "The Ultimate Guide to Indoor Plant Care",
        slug: "ultimate-guide-indoor-plant-care",
        excerpt:
          "Learn how to keep your indoor plants thriving with these expert tips and tricks.",
        status: "published",
        author: "Admin User",
        date: "2023-10-15",
        views: 1245,
        category: "Plant Care",
        tags: ["indoor plants", "care tips", "beginners"],
        image: "/assets/blog1.jpg",
      },
      {
        id: "2",
        title: "10 Rare Tropical Plants You Need in Your Collection",
        slug: "rare-tropical-plants-collection",
        excerpt:
          "Discover exotic tropical plants that will transform your space into a jungle paradise.",
        status: "published",
        author: "Admin User",
        date: "2023-09-28",
        views: 892,
        category: "Plant Species",
        tags: ["tropical", "rare plants", "collection"],
        image: "/assets/blog2.jpg",
      },
      {
        id: "3",
        title: "How to Propagate Succulents: A Step-by-Step Guide",
        slug: "propagate-succulents-guide",
        excerpt:
          "Expand your succulent collection with our easy propagation methods for beginners.",
        status: "draft",
        author: "Admin User",
        date: "2023-11-02",
        views: 0,
        category: "Gardening Tips",
        tags: ["succulents", "propagation", "diy"],
        image: "/assets/blog3.jpg",
      },
      {
        id: "4",
        title: "The Science of Plant Nutrition: What Your Plants Really Need",
        slug: "science-plant-nutrition",
        excerpt:
          "Understanding the essential nutrients that keep your plants healthy and vibrant.",
        status: "published",
        author: "Admin User",
        date: "2023-08-17",
        views: 1567,
        category: "Plant Health",
        tags: ["nutrition", "science", "plant health"],
        image: "/assets/blog4.jpg",
      },
      {
        id: "5",
        title: "Creating a Sustainable Indoor Garden: Eco-Friendly Practices",
        slug: "sustainable-indoor-garden",
        excerpt:
          "How to create an eco-friendly indoor garden that benefits both you and the environment.",
        status: "draft",
        author: "Admin User",
        date: "2023-11-10",
        views: 0,
        category: "Sustainable Gardening",
        tags: ["sustainability", "eco-friendly", "indoor garden"],
        image: "/assets/blog5.jpg",
      },
    ];

    setPosts(mockData);
    setFilteredPosts(mockData);
  }, []);

  // Filter posts based on search and tab
  useEffect(() => {
    let result = posts;

    // Filter by tab
    if (activeTab !== "all") {
      result = result.filter((post) => post.status === activeTab);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.excerpt.toLowerCase().includes(term) ||
          post.tags.some((tag) => tag.toLowerCase().includes(term)) ||
          post.category.toLowerCase().includes(term)
      );
    }

    setFilteredPosts(result);
  }, [searchTerm, activeTab, posts]);

  const deletePost = (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const toggleStatus = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              status: post.status === "published" ? "draft" : "published",
            }
          : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <BookOpen className="text-emerald-400" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-teal-300">
                Blog Management
              </span>
            </h1>
            <p className="text-gray-400 mt-2">
              Create, manage, and publish your plant-based blog content
            </p>
          </div>

          <Link href="/admin/dashboard/blog/new">
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Post
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <TabsList className="bg-gray-800 border border-gray-700 rounded-lg p-1">
              <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
                All Posts
              </TabsTrigger>
              <TabsTrigger
                value="published"
                onClick={() => setActiveTab("published")}
              >
                Published
              </TabsTrigger>
              <TabsTrigger value="draft" onClick={() => setActiveTab("draft")}>
                Drafts
              </TabsTrigger>
            </TabsList>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 w-full md:w-80"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-gray-800/50 border border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Blog Posts</CardTitle>
                  <CardDescription className="text-gray-400">
                    {filteredPosts.length} posts found
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-gray-300">Title</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">
                          Category
                        </TableHead>
                        <TableHead className="text-gray-300 text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                          <TableRow
                            key={post.id}
                            className="border-gray-800 hover:bg-gray-800/30"
                          >
                            <TableCell className="font-medium text-white">
                              <div className="flex items-center gap-3">
                                <div className="bg-gray-700 border border-gray-600 rounded-md w-12 h-12 flex items-center justify-center">
                                  <FileText className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                  <div className="font-medium">
                                    {post.title}
                                  </div>
                                  <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                    <CalendarDays className="w-3 h-3" />
                                    {post.date}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  post.status === "published"
                                    ? "success"
                                    : "secondary"
                                }
                                className="capitalize"
                              >
                                {post.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-gray-300">
                              {post.category}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="text-gray-400 hover:text-emerald-400 hover:bg-emerald-900/20"
                                  onClick={() => toggleStatus(post.id)}
                                >
                                  {post.status === "published" ? (
                                    <FileText className="w-4 h-4" />
                                  ) : (
                                    <Eye className="w-4 h-4" />
                                  )}
                                </Button>
                                <Link
                                  href={`/admin/dashboard/blog/edit/${post.id}`}
                                >
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="text-gray-400 hover:text-blue-400 hover:bg-blue-900/20"
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </Button>
                                </Link>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="text-gray-400 hover:text-red-400 hover:bg-red-900/20"
                                  onClick={() => deletePost(post.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow className="hover:bg-transparent">
                          <TableCell
                            colSpan={4}
                            className="h-24 text-center text-gray-400"
                          >
                            No posts found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-gray-800/50 border border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-gray-300">Total Posts</div>
                      <div className="text-2xl font-bold text-white">
                        {posts.length}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-gray-300">Published</div>
                      <div className="text-2xl font-bold text-emerald-400">
                        {posts.filter((p) => p.status === "published").length}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-gray-300">Drafts</div>
                      <div className="text-2xl font-bold text-amber-400">
                        {posts.filter((p) => p.status === "draft").length}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-gray-300">Total Views</div>
                      <div className="text-2xl font-bold text-blue-400">
                        {posts.reduce((sum, post) => sum + post.views, 0)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Recent Drafts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {posts
                      .filter((post) => post.status === "draft")
                      .slice(0, 3)
                      .map((post) => (
                        <div
                          key={post.id}
                          className="border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="bg-gray-700 border border-gray-600 rounded-md w-10 h-10 flex items-center justify-center flex-shrink-0">
                              <FileText className="w-4 h-4 text-amber-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-white">
                                {post.title}
                              </h4>
                              <div className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                                <CalendarDays className="w-3 h-3" />
                                {post.date}
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end mt-3">
                            <Link
                              href={`/admin/dashboard/blog/edit/${post.id}`}
                            >
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-gray-300 border-gray-700 hover:text-white"
                              >
                                Continue Editing
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}

                    {posts.filter((post) => post.status === "draft").length ===
                      0 && (
                      <div className="text-center py-8 text-gray-500">
                        No draft posts available
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-800">
                  <Link
                    href="/admin/dashboard/blog?status=draft"
                    className="w-full"
                  >
                    <Button variant="link" className="text-emerald-400 w-full">
                      View All Drafts
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default BlogManagementPage;
