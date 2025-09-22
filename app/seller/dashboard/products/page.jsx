"use client";

import { useState, useEffect } from "react";
import {
  Package,
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  Edit,
  Trash,
  PlusCircle,
  X,
  ImageIcon,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// API base URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// Product categories for dropdown
const PRODUCT_CATEGORIES = [
  "Fruits",
  "Vegetables",
  "Flowers",
  "Indoor Plants",
  "Outdoor Plants",
  "Medicinal Plants",
  "Tropical Plants",
  "Succulents",
  "Herbs",
  "Trees",
  "Shrubs",
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [errors, setErrors] = useState({});

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search term and filters
  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter) {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    // Stock filter
    if (stockFilter) {
      switch (stockFilter) {
        case "low":
          filtered = filtered.filter((product) => product.stock < 20);
          break;
        case "medium":
          filtered = filtered.filter(
            (product) => product.stock >= 20 && product.stock <= 50
          );
          break;
        case "high":
          filtered = filtered.filter((product) => product.stock > 50);
          break;
        case "out":
          filtered = filtered.filter((product) => product.stock === 0);
          break;
      }
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, categoryFilter, stockFilter]);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `${API_BASE_URL}/products/seller/my-products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } else if (response.status === 401) {
        throw new Error("Authentication failed. Please log in again.");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Fetch products error:", error);
      toast.error("Error", {
        description: error.message || "Failed to fetch products",
      });
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    if (!currentProduct?.name?.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!currentProduct?.category?.trim()) {
      newErrors.category = "Category is required";
    }

    if (!currentProduct?.price || parseFloat(currentProduct.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (currentProduct?.stock === undefined || currentProduct?.stock < 0) {
      newErrors.stock = "Stock must be 0 or greater";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Error", {
          description: "Image size must be less than 5MB",
        });
        return;
      }

      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error("Error", {
          description: "Please select a valid image file (JPEG, PNG, or WebP)",
        });
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Clear image error if exists
      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: undefined }));
      }
    }
  };

  // Remove selected image
  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  // Handle form submission with FormData
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Error", {
        description: "Please fix the form errors before submitting",
      });
      return;
    }

    setIsFormSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const formData = new FormData();

      // Append all product data to FormData
      formData.append("name", currentProduct.name.trim());
      formData.append("description", currentProduct.description?.trim() || "");
      formData.append("category", currentProduct.category.trim());
      formData.append("price", parseFloat(currentProduct.price).toFixed(2));
      formData.append("stock", parseInt(currentProduct.stock).toString());

      // Append image file if selected
      if (imageFile) {
        formData.append("image", imageFile);
      }

      let url = `${API_BASE_URL}/products`;
      let method = "POST";

      if (currentProduct.id) {
        // Update existing product
        url = `${API_BASE_URL}/products/${currentProduct.id}`;
        method = "PUT";

        // If no new image selected but there's existing image, keep it
        if (!imageFile && currentProduct.image) {
          formData.append("existingImage", currentProduct.image);
        }
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          // Note: Don't set Content-Type header for FormData - browser will set it automatically with boundary
        },
        body: formData,
      });

      if (response.ok) {
        const product = await response.json();
        toast.success("Success", {
          description: currentProduct.id
            ? "Product updated successfully"
            : "Product added successfully",
        });

        // Refresh products list
        await fetchProducts();
        handleCloseDialog();
      } else if (response.status === 401) {
        throw new Error("Authentication failed. Please log in again.");
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.message || errorData.msg || "Failed to save product"
        );
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Error", {
        description: error.message || "Failed to save product",
      });
    } finally {
      setIsFormSubmitting(false);
    }
  };

  // Handle delete confirmation
  const confirmDelete = async () => {
    if (!productToDelete) return;

    setIsFormSubmitting(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `${API_BASE_URL}/products/${productToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Success", {
          description: "Product deleted successfully",
        });

        // Refresh products list
        await fetchProducts();
        setIsDeleteDialogOpen(false);
        setProductToDelete(null);
      } else if (response.status === 401) {
        throw new Error("Authentication failed. Please log in again.");
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.message || errorData.msg || "Failed to delete product"
        );
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error", {
        description: error.message || "Failed to delete product",
      });
    } finally {
      setIsFormSubmitting(false);
    }
  };

  // Handle edit
  const handleEdit = (product) => {
    setCurrentProduct({
      ...product,
      price: parseFloat(product.price),
      stock: parseInt(product.stock),
    });
    setImagePreview(
      product.image
        ? `${API_BASE_URL.replace("/api/v1", "")}${product.image}`
        : ""
    );
    setImageFile(null);
    setErrors({});
    setIsDialogOpen(true);
  };

  // Handle delete
  const handleDelete = (product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  // Handle add new product
  const handleAddNew = () => {
    setCurrentProduct({
      id: "",
      name: "",
      category: "",
      price: 0,
      stock: 0,
      description: "",
      image: "",
    });
    setImageFile(null);
    setImagePreview("");
    setErrors({});
    setIsDialogOpen(true);
  };

  // Handle close dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentProduct(null);
    setImageFile(null);
    setImagePreview("");
    setErrors({});
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setStockFilter("");
  };

  // Get stock status
  const getStockStatus = (stock) => {
    if (stock === 0)
      return { text: "Out of Stock", color: "bg-red-500/20 text-red-400" };
    if (stock < 20)
      return {
        text: `${stock} - Low Stock`,
        color: "bg-orange-500/20 text-orange-400",
      };
    if (stock <= 50)
      return {
        text: `${stock} - Medium Stock`,
        color: "bg-amber-500/20 text-amber-400",
      };
    return {
      text: `${stock} - In Stock`,
      color: "bg-emerald-500/20 text-emerald-400",
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Product Management</h1>
          <p className="text-gray-400 mt-1">
            Manage your products - {filteredProducts.length} of{" "}
            {products.length} products shown
          </p>
        </div>
        <Button
          onClick={handleAddNew}
          className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2"
          disabled={isLoading}
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700/50 border-gray-600 text-white"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {PRODUCT_CATEGORIES.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="text-white hover:bg-gray-700"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                <SelectValue placeholder="Filter by stock" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem
                  value="out"
                  className="text-white hover:bg-gray-700"
                >
                  Out of Stock
                </SelectItem>
                <SelectItem
                  value="low"
                  className="text-white hover:bg-gray-700"
                >
                  Low Stock (&lt; 20)
                </SelectItem>
                <SelectItem
                  value="medium"
                  className="text-white hover:bg-gray-700"
                >
                  Medium Stock (20-50)
                </SelectItem>
                <SelectItem
                  value="high"
                  className="text-white hover:bg-gray-700"
                >
                  High Stock (&gt; 50)
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={clearFilters}
              className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Package className="h-5 w-5" />
            Your Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 text-emerald-500 animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              {products.length === 0 ? (
                <>
                  <p className="text-gray-400 text-lg mb-2">
                    No products found
                  </p>
                  <p className="text-gray-500 mb-4">
                    Start by adding your first product
                  </p>
                  <Button
                    onClick={handleAddNew}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Product
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-gray-400 text-lg mb-2">
                    No products match your filters
                  </p>
                  <p className="text-gray-500 mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="border-gray-600 text-gray-300"
                  >
                    Clear All Filters
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-gray-700">
                    <TableHead className="text-gray-400">Product</TableHead>
                    <TableHead className="text-gray-400">Category</TableHead>
                    <TableHead className="text-gray-400">Price</TableHead>
                    <TableHead className="text-gray-400">Stock</TableHead>
                    <TableHead className="text-right text-gray-400">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => {
                    const stockStatus = getStockStatus(product.stock);
                    return (
                      <TableRow
                        key={product.id}
                        className="border-gray-700 hover:bg-gray-700/30"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="bg-emerald-900/20 border border-emerald-500/30 w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
                              {product.image ? (
                                <img
                                  src={`${API_BASE_URL.replace("/api/v1", "")}${
                                    product.image
                                  }`}
                                  alt={product.name}
                                  className="w-full h-full object-cover rounded-lg"
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                    e.target.nextElementSibling.style.display =
                                      "flex";
                                  }}
                                />
                              ) : (
                                <ImageIcon className="h-6 w-6 text-emerald-400" />
                              )}
                              <div className="w-full h-full items-center justify-center hidden">
                                <ImageIcon className="h-6 w-6 text-emerald-400" />
                              </div>
                            </div>
                            <div>
                              <p className="font-medium text-white line-clamp-2">
                                {product.name}
                              </p>
                              <p className="text-xs text-gray-400">
                                ID: {product.id}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-gray-600 text-gray-300"
                          >
                            {product.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300 font-medium">
                          ${parseFloat(product.price).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge className={stockStatus.color}>
                            {stockStatus.text}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4 text-gray-400" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-800 border-gray-700">
                              <DropdownMenuItem
                                className="text-gray-300 hover:bg-gray-700/50 flex items-center gap-2 cursor-pointer"
                                onClick={() => handleEdit(product)}
                              >
                                <Edit className="h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-rose-500 hover:bg-rose-500/10 flex items-center gap-2 cursor-pointer"
                                onClick={() => handleDelete(product)}
                              >
                                <Trash className="h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">
              {currentProduct?.id ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {currentProduct?.id
                ? "Update your product details"
                : "Fill in the details for your new product"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              {/* Image Upload */}
              <div className="col-span-full space-y-3">
                <Label className="text-gray-300">Product Image</Label>
                <div className="flex items-start gap-4">
                  <div className="border-2 border-dashed border-gray-600 rounded-lg w-32 h-32 flex items-center justify-center overflow-hidden bg-gray-700/30">
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="bg-gray-700/50 border-gray-600 text-white file:bg-emerald-600 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 hover:file:bg-emerald-700"
                      disabled={isFormSubmitting}
                    />
                    <p className="text-xs text-gray-400 mt-2">
                      Upload a product image (JPEG, PNG, WebP - Max 5MB)
                    </p>
                    {currentProduct?.image && !imageFile && (
                      <p className="text-xs text-emerald-400 mt-1">
                        ✓ Current image will be kept if no new image is selected
                      </p>
                    )}
                  </div>
                </div>
                {errors.image && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.image}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-gray-300">Product Name *</Label>
                <Input
                  value={currentProduct?.name || ""}
                  onChange={(e) => {
                    setCurrentProduct({
                      ...currentProduct,
                      name: e.target.value,
                    });
                    if (errors.name)
                      setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  className={`bg-gray-700/50 border-gray-600 text-white ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Enter product name"
                  disabled={isFormSubmitting}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-gray-300">Category *</Label>
                <Select
                  value={currentProduct?.category || ""}
                  onValueChange={(value) => {
                    setCurrentProduct({
                      ...currentProduct,
                      category: value,
                    });
                    if (errors.category)
                      setErrors((prev) => ({ ...prev, category: undefined }));
                  }}
                  disabled={isFormSubmitting}
                >
                  <SelectTrigger
                    className={`bg-gray-700/50 border-gray-600 text-white ${
                      errors.category ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {PRODUCT_CATEGORIES.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="text-white hover:bg-gray-700"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.category}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-gray-300">Price ($) *</Label>
                <Input
                  type="number"
                  value={currentProduct?.price || ""}
                  onChange={(e) => {
                    setCurrentProduct({
                      ...currentProduct,
                      price: e.target.value,
                    });
                    if (errors.price)
                      setErrors((prev) => ({ ...prev, price: undefined }));
                  }}
                  className={`bg-gray-700/50 border-gray-600 text-white ${
                    errors.price ? "border-red-500" : ""
                  }`}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  disabled={isFormSubmitting}
                />
                {errors.price && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.price}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-gray-300">Stock Quantity *</Label>
                <Input
                  type="number"
                  value={currentProduct?.stock || ""}
                  onChange={(e) => {
                    setCurrentProduct({
                      ...currentProduct,
                      stock: e.target.value,
                    });
                    if (errors.stock)
                      setErrors((prev) => ({ ...prev, stock: undefined }));
                  }}
                  className={`bg-gray-700/50 border-gray-600 text-white ${
                    errors.stock ? "border-red-500" : ""
                  }`}
                  min="0"
                  placeholder="0"
                  disabled={isFormSubmitting}
                />
                {errors.stock && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.stock}
                  </p>
                )}
              </div>

              <div className="col-span-full space-y-3">
                <Label className="text-gray-300">Description</Label>
                <Textarea
                  value={currentProduct?.description || ""}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      description: e.target.value,
                    })
                  }
                  className="bg-gray-700/50 border-gray-600 text-white min-h-[120px]"
                  placeholder="Enter product description (optional)"
                  disabled={isFormSubmitting}
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
                onClick={handleCloseDialog}
                disabled={isFormSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={isFormSubmitting}
              >
                {isFormSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {currentProduct?.id ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{currentProduct?.id ? "Update Product" : "Add Product"}</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-400" />
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-300 mb-4">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-white">
                "{productToDelete?.name}"
              </span>
              ?
            </p>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                This action cannot be undone. The product will be permanently
                removed from your inventory.
              </p>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setProductToDelete(null);
              }}
              disabled={isFormSubmitting}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={confirmDelete}
              disabled={isFormSubmitting}
            >
              {isFormSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash className="h-4 w-4 mr-2" />
                  Delete Product
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
