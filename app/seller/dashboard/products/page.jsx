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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import Image from "next/image";
// API base URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  console.log(products[1]?.image);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/products/seller/my-products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission with FormData
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const formData = new FormData();

      // Append all product data to FormData
      formData.append("name", currentProduct.name);
      formData.append("description", currentProduct.description);
      formData.append("category", currentProduct.category);
      formData.append("price", currentProduct.price.toString());
      formData.append("stock", currentProduct.stock.toString());

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
      console.log(response);
      if (response.ok) {
        const product = await response.json();
        toast({
          title: "Success",
          description: currentProduct.id
            ? "Product updated successfully"
            : "Product added successfully",
        });

        // Refresh products list
        fetchProducts();
        setIsDialogOpen(false);
        setCurrentProduct(null);
        setImageFile(null);
        setImagePreview("");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Failed to save product");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to save product",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete confirmation
  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/products/${productToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast({
          title: "Success",
          description: "Product deleted successfully",
        });

        // Refresh products list
        fetchProducts();
        setIsDeleteDialogOpen(false);
        setProductToDelete(null);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Failed to delete product");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete product",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (product) => {
    setCurrentProduct({
      ...product,
      price: parseFloat(product.price),
      stock: parseInt(product.stock),
    });
    setImagePreview(product.image || "");
    setImageFile(null);
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
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Product Management</h1>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700/50 flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button
            onClick={handleAddNew}
            className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2"
            disabled={isLoading}
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Your Products</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-400">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No products found</p>
              <Button onClick={handleAddNew} className="mt-4">
                Add Your First Product
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
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
                {products.map((product) => (
                  <TableRow
                    key={product.id}
                    className="border-gray-700 hover:bg-gray-700/30"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-900/20 border border-emerald-500/30 w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
                          {product.image ? (
                            <div className="w-10 h-10 relative">
                              <img
                                src={`http://localhost:5000${product.image}`}
                                alt={product.name}
                                className="w-full h-full object-cover rounded-lg"
                                onError={(e) => {
                                  console.error(
                                    "Image failed to load:",
                                    e.target.src
                                  );
                                  e.target.style.display = "none";
                                }}
                              />
                            </div>
                          ) : (
                            <ImageIcon className="h-5 w-5 text-emerald-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            ID: {product.id}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {product.category}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      ${parseFloat(product.price).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          product.stock > 50
                            ? "bg-emerald-500/20 text-emerald-400"
                            : product.stock > 20
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-rose-500/20 text-rose-400"
                        }`}
                      >
                        {product.stock} in stock
                      </span>
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
                            className="text-gray-300 hover:bg-gray-700/50 flex items-center gap-2"
                            onClick={() => handleEdit(product)}
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-rose-500 hover:bg-rose-500/10 flex items-center gap-2"
                            onClick={() => handleDelete(product)}
                          >
                            <Trash className="h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
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
            <div className="grid grid-cols-2 gap-6 py-4">
              {/* Image Upload */}
              <div className="col-span-2 space-y-3">
                <Label className="text-gray-300">Product Image</Label>
                <div className="flex items-center gap-4">
                  <div className="border-2 border-dashed border-gray-600 rounded-lg w-24 h-24 flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Upload a product image (JPEG, PNG, etc.)
                    </p>
                    {currentProduct?.image && !imageFile && (
                      <p className="text-xs text-emerald-400 mt-1">
                        Current image will be kept
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-gray-300">Product Name *</Label>
                <Input
                  value={currentProduct?.name || ""}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      name: e.target.value,
                    })
                  }
                  className="bg-gray-700/50 border-gray-600 text-white"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-gray-300">Category *</Label>
                <Input
                  value={currentProduct?.category || ""}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      category: e.target.value,
                    })
                  }
                  className="bg-gray-700/50 border-gray-600 text-white"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-gray-300">Price ($) *</Label>
                <Input
                  type="number"
                  value={currentProduct?.price || ""}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      price: e.target.value,
                    })
                  }
                  className="bg-gray-700/50 border-gray-600 text-white"
                  min="0"
                  step="0.01"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-gray-300">Stock Quantity *</Label>
                <Input
                  type="number"
                  value={currentProduct?.stock || ""}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      stock: e.target.value,
                    })
                  }
                  className="bg-gray-700/50 border-gray-600 text-white"
                  min="0"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="col-span-2 space-y-3">
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
                  disabled={isLoading}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
                onClick={() => {
                  setIsDialogOpen(false);
                  setImageFile(null);
                  setImagePreview("");
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={isLoading}
              >
                {isLoading
                  ? "Saving..."
                  : currentProduct?.id
                  ? "Update Product"
                  : "Add Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-300">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-white">
                {productToDelete?.name}
              </span>
              ? This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              className="bg-rose-600 hover:bg-rose-700"
              onClick={confirmDelete}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
