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
  X,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const BlogManagementPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/blog`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched blogs data:", data);

        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error("Fetch blogs error:", error);
        setPosts([]);
        setFilteredPosts([]);
      }
    };

    fetchBlogs();
  }, []);

  // Filter posts based on search and tab
  useEffect(() => {
    let result = posts;

    if (activeTab !== "all") {
      result = result.filter((post) => post.status === activeTab);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.excerpt.toLowerCase().includes(term) ||
          (post.tags &&
            post.tags.some((tag) => tag.toLowerCase().includes(term))) ||
          post.category.toLowerCase().includes(term)
      );
    }

    setFilteredPosts(result);
  }, [searchTerm, activeTab, posts]);

  // Handle delete click - show confirmation modal
  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  // Confirm delete action
  const confirmDelete = async () => {
    if (!postToDelete) return;

    try {
      setDeletingId(postToDelete.id);

      const res = await fetch(
        `http://localhost:5000/api/v1/blog/${postToDelete.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Failed to delete blog post");
      }

      // Update UI after successful delete
      setPosts((prev) => prev.filter((post) => post.id !== postToDelete.id));
      setFilteredPosts((prev) =>
        prev.filter((post) => post.id !== postToDelete.id)
      );

      toast({
        title: "Success",
        description: "Blog post deleted successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
  };

  // Cancel delete action
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPostToDelete(null);
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
      {/* Delete Confirmation Modal */}
      {showDeleteModal && postToDelete && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-red-400 flex items-center gap-2">
                <Trash2 className="w-5 h-5" />
                Delete Blog Post
              </h3>
              <button
                onClick={cancelDelete}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-300 mb-3">
                Are you sure you want to delete this blog post? This action
                cannot be undone.
              </p>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-white truncate">
                  {postToDelete.title}
                </h4>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant={
                      postToDelete.status === "published"
                        ? "success"
                        : "secondary"
                    }
                    className="capitalize"
                  >
                    {postToDelete.status}
                  </Badge>
                  <span className="text-xs text-gray-400">
                    {postToDelete.date}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={cancelDelete}
                disabled={deletingId === postToDelete.id}
                className="border-gray-700 text-gray-300 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                disabled={deletingId === postToDelete.id}
                className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
              >
                {deletingId === postToDelete.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Delete Post
              </Button>
            </div>
          </div>
        </div>
      )}

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

          <Link href="/admin/dashboard/blogs/new">
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Post
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <TabsList className="bg-gray-800 border border-gray-700 text-gray-200 rounded-lg p-1">
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
                                  href={`/admin/dashboard/blogs/edit/${post.id}`}
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
                                  onClick={() => handleDeleteClick(post)}
                                  disabled={deletingId === post.id}
                                >
                                  {deletingId === post.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-4 h-4" />
                                  )}
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
                        {Math.floor(Math.random() * 100000)}
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
                              href={`/admin/dashboard/blogs/edit/${post.id}`}
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
