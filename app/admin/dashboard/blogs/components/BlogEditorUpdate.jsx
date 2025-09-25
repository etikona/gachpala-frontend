// app/admin/dashboard/blog/components/BlogEditorUpdate.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Image as ImageIcon,
  Tag,
  Plus,
  X,
  Eye,
  CalendarDays,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

const BlogEditorUpdate = ({ blogData }) => {
  const router = useRouter();
  const [post, setPost] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    tags: [],
    image: null,
    category: "Gardening Tips",
    author: "Admin User",
    publishDate: new Date().toISOString().split("T")[0],
  });

  const [blogId, setBlogId] = useState("");
  const [newTag, setNewTag] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  // Initialize with blog data
  useEffect(() => {
    if (blogData) {
      if (blogData._id) {
        setBlogId(blogData._id);
      }

      setPost({
        title: blogData.title || "",
        slug: blogData.slug || "",
        excerpt: blogData.excerpt || "",
        content: blogData.content || "",
        tags: Array.isArray(blogData.tags) ? blogData.tags : [],
        image: blogData.image || null,
        category: blogData.category || "Gardening Tips",
        author: blogData.author || "Admin User",
        publishDate:
          blogData.publishDate || new Date().toISOString().split("T")[0],
      });

      if (blogData.image) {
        setImagePreview(blogData.image);
      }
    }
  }, [blogData]);

  // Define all handler functions
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPost((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleAddTag = () => {
    if (newTag.trim() && !post.tags.includes(newTag.trim())) {
      setPost((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const updateBlogPost = async () => {
    if (!blogId) {
      throw new Error("Blog ID is missing");
    }

    const formData = new FormData();
    const formatDate = (dateString) => {
      return new Date(dateString).toISOString().split("T")[0];
    };

    // Append all fields with validation
    const appendField = (name, value) => {
      if (value !== undefined && value !== null) {
        formData.append(name, value);
      }
    };

    // Append required fields
    appendField("title", post.title);
    appendField("slug", post.slug);
    appendField("excerpt", post.excerpt);
    appendField("content", post.content);
    appendField("category", post.category);
    appendField("author", post.author);
    appendField("publishDate", formatDate(post.publishDate));

    // Handle tags - ensure it's always a string
    const tagsValue = Array.isArray(post.tags)
      ? post.tags.filter((tag) => tag.trim()).join(",")
      : "";
    appendField("tags", tagsValue);

    // Handle image updates
    if (post.image && typeof post.image !== "string") {
      formData.append("image", post.image);
    } else if (!post.image) {
      formData.append("removeImage", "true");
    }

    try {
      const response = await fetch(
        `https://gachpala-server.onrender.com/api/v1/blog/${blogId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      console.log("Update response status:", response.status);
      const responseData = await response.json();
      console.log("Update response data:", responseData);

      if (!response.ok) {
        const errorMsg =
          responseData?.error?.message ||
          responseData?.message ||
          responseData?.msg ||
          `HTTP error! Status: ${response.status}`;
        throw new Error(errorMsg);
      }

      return responseData;
    } catch (error) {
      console.error("API Error details:", error);
      throw new Error(`Failed to update blog: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Validate ID exists
      if (!blogId) {
        throw new Error("Blog ID is missing - cannot update");
      }

      // Validate required fields
      if (
        !post.title ||
        !post.slug ||
        !post.content ||
        !post.category ||
        !post.author
      ) {
        throw new Error("Please fill in all required fields");
      }

      // Validate date format
      if (isNaN(new Date(post.publishDate).getTime())) {
        throw new Error("Invalid publish date format");
      }

      // Update the blog post
      await updateBlogPost();

      toast.success("Blog post updated successfully!", {
        description: "Your changes have been saved.",
      });

      // Redirect to blog management after success
      setTimeout(() => {
        router.push("/admin/dashboard/blogs");
        router.refresh();
      }, 1500);
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update blog", {
        description: error.message || "Please check your inputs and try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            <BookOpen className="text-emerald-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-teal-300">
              Edit Blog Post
            </span>
          </h1>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="bg-gray-800 border-gray-700 text-gray-300 hover:text-white"
              onClick={() => setPreviewOpen(true)}
              disabled={isSaving}
            >
              <Eye className="w-4 h-4 mr-1" /> Preview
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSaving}
              className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 disabled:opacity-70"
            >
              {isSaving ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                "Update Blog"
              )}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="content" className="w-full text-teal-100">
          <TabsList className="bg-gray-800 border border-gray-700 rounded-lg p-1">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Content
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Featured Image
            </TabsTrigger>
            <TabsTrigger value="tags" className="flex items-center gap-2">
              <Tag className="w-4 h-4" /> Tags & Categories
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <TabsContent value="content" className="mt-0">
                  <Card className="bg-gray-800/50 border border-gray-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">Content</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-gray-300">
                          Title *
                        </Label>
                        <Input
                          id="title"
                          name="title"
                          value={post.title}
                          onChange={handleChange}
                          placeholder="Enter your blog post title"
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="slug" className="text-gray-300">
                          URL Slug *
                        </Label>
                        <Input
                          id="slug"
                          name="slug"
                          value={post.slug}
                          onChange={handleChange}
                          placeholder="your-blog-post-url"
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="excerpt" className="text-gray-300">
                          Excerpt *
                        </Label>
                        <Textarea
                          id="excerpt"
                          name="excerpt"
                          value={post.excerpt}
                          onChange={handleChange}
                          placeholder="Brief summary of your post"
                          className="min-h-[120px] bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="content" className="text-gray-300">
                          Content *
                        </Label>
                        <Textarea
                          id="content"
                          name="content"
                          value={post.content}
                          onChange={handleChange}
                          placeholder="Write your blog post content here..."
                          className="min-h-[300px] bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500"
                          required
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="image" className="mt-0">
                  <Card className="bg-gray-800/50 border border-gray-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Featured Image
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-xl p-8">
                        {imagePreview ? (
                          <div className="relative group">
                            <Image
                              src={imagePreview}
                              alt="Preview"
                              className="max-h-80 rounded-lg object-cover"
                              width={600}
                              height={400}
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => {
                                setImagePreview(null);
                                setPost((prev) => ({
                                  ...prev,
                                  image: null,
                                }));
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <ImageIcon className="w-12 h-12 text-gray-500 mb-4" />
                            <p className="text-gray-400 mb-4 text-center">
                              Upload a featured image for your blog post
                            </p>
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleImageChange}
                              accept="image/*"
                              className="hidden"
                              name="image"
                            />
                            <Button
                              variant="outline"
                              className="bg-gray-800 border-gray-700 text-gray-300 hover:text-white"
                              onClick={() => fileInputRef.current.click()}
                              type="button"
                            >
                              Select Image
                            </Button>
                            <p className="text-xs text-gray-500 mt-4">
                              Recommended size: 1200x630 pixels
                            </p>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="tags" className="mt-0">
                  <Card className="bg-gray-800/50 border border-gray-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Tags & Categories
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label
                            htmlFor="tags"
                            className="text-gray-300 mb-2 block"
                          >
                            Tags
                          </Label>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="bg-emerald-900/50 text-emerald-300 border border-emerald-800/50 px-3 py-1 rounded-full flex items-center group"
                              >
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveTag(tag)}
                                  className="ml-2 text-emerald-300 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Input
                              value={newTag}
                              onChange={(e) => setNewTag(e.target.value)}
                              placeholder="Add a new tag"
                              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              className="bg-gray-800 border-gray-700 text-gray-300 hover:text-white"
                              onClick={handleAddTag}
                            >
                              <Plus className="w-4 h-4 mr-1" /> Add
                            </Button>
                          </div>
                        </div>

                        <div>
                          <Label
                            htmlFor="category"
                            className="text-gray-300 mb-2 block"
                          >
                            Category *
                          </Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {[
                              "Gardening Tips",
                              "Plant Species",
                              "Indoor Plants",
                              "Sustainable Gardening",
                              "Plant Health",
                              "DIY Projects",
                            ].map((category) => (
                              <div
                                key={category}
                                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                                  post.category === category
                                    ? "border-emerald-500 bg-emerald-900/20"
                                    : "border-gray-700 hover:border-gray-600"
                                }`}
                                onClick={() =>
                                  setPost((prev) => ({ ...prev, category }))
                                }
                              >
                                <div className="text-gray-300">{category}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>

              <div className="space-y-6">
                <Card className="bg-gray-800/50 border border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Metadata</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="author" className="text-gray-300">
                        Author *
                      </Label>
                      <Input
                        id="author"
                        name="author"
                        value={post.author}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="publishDate" className="text-gray-300">
                        Publish Date *
                      </Label>
                      <Input
                        type="date"
                        id="publishDate"
                        name="publishDate"
                        value={post.publishDate}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {imagePreview ? (
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          className="rounded-lg aspect-video object-cover"
                          width={600}
                          height={400}
                        />
                      ) : (
                        <div className="bg-gray-800 border-2 border-dashed border-gray-700 rounded-lg aspect-video flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-gray-600" />
                        </div>
                      )}

                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white">
                          {post.title || "Your Blog Post Title"}
                        </h3>
                        <p className="text-gray-400">
                          {post.excerpt ||
                            "Brief excerpt of your blog post will appear here..."}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-emerald-400 bg-emerald-900/30 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">
                      SEO Optimization
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="seoTitle" className="text-gray-300">
                        SEO Title
                      </Label>
                      <Input
                        id="seoTitle"
                        value={post.title || "Your SEO Title"}
                        className="bg-gray-800 border-gray-700 text-white"
                        readOnly
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="metaDescription"
                        className="text-gray-300"
                      >
                        Meta Description
                      </Label>
                      <Textarea
                        id="metaDescription"
                        value={post.excerpt || "Your SEO description..."}
                        className="min-h-[100px] bg-gray-800 border-gray-700 text-white"
                        readOnly
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </Tabs>
      </div>

      {/* Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Preview</h3>
              <Button
                size="icon"
                variant="ghost"
                className="text-gray-400 hover:text-white"
                onClick={() => setPreviewOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6">
              <article className="prose prose-invert max-w-none">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {post.title || "Your Blog Post Title"}
                </h1>

                <div className="flex items-center gap-4 text-gray-400 mb-8">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author || "Admin User"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    <span>
                      {post.publishDate ||
                        new Date().toISOString().split("T")[0]}
                    </span>
                  </div>
                </div>

                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Featured"
                    className="w-full h-auto rounded-xl mb-8"
                    width={600}
                    height={400}
                  />
                ) : (
                  <div className="bg-gray-800 border-2 border-dashed border-gray-700 rounded-xl aspect-video flex items-center justify-center mb-8">
                    <ImageIcon className="w-16 h-16 text-gray-600" />
                  </div>
                )}

                <p className="text-xl text-gray-300 mb-8">
                  {post.excerpt ||
                    "This is where your blog post excerpt will appear."}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-emerald-900/30 text-emerald-400 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="border-t border-gray-800 pt-8">
                  {(post.content || "").split("\n\n").map((para, i) => (
                    <p key={i} className="mb-4 text-gray-300">
                      {para}
                    </p>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogEditorUpdate;
