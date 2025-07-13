"use client";

import { useState } from "react";
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

export default function ProductsPage() {
  const [products, setProducts] = useState([
    {
      id: "PLT-001",
      name: "Monstera Deliciosa",
      category: "Indoor Plants",
      price: 49.99,
      stock: 42,
      sales: 128,
      description: "Large tropical plant with split leaves",
    },
    // ... other products
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Handle form operations
  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setProducts(products.filter((p) => p.id !== productToDelete.id));
    setIsDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentProduct.id) {
      // Update existing product
      setProducts(
        products.map((p) => (p.id === currentProduct.id ? currentProduct : p))
      );
    } else {
      // Add new product
      setProducts([
        ...products,
        { ...currentProduct, id: `PLT-${Date.now()}` },
      ]);
    }
    setIsDialogOpen(false);
    setCurrentProduct(null);
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
            onClick={() => {
              setCurrentProduct({
                id: "",
                name: "",
                category: "",
                price: 0,
                stock: 0,
                sales: 0,
                description: "",
              });
              setIsDialogOpen(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2"
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
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-gray-400">Product</TableHead>
                <TableHead className="text-gray-400">Category</TableHead>
                <TableHead className="text-gray-400">Price</TableHead>
                <TableHead className="text-gray-400">Stock</TableHead>
                <TableHead className="text-gray-400">Sales</TableHead>
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
                      <div className="bg-emerald-900/20 border border-emerald-500/30 w-10 h-10 rounded-lg flex items-center justify-center">
                        {/* <Leaf className="h-5 w-5 text-emerald-400" /> */}
                      </div>
                      <div>
                        <p className="font-medium text-white">{product.name}</p>
                        <p className="text-xs text-gray-400">{product.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {product.category}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    ${product.price.toFixed(2)}
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
                  <TableCell className="text-gray-300">
                    {product.sales}
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
              <div className="space-y-3">
                <Label className="text-gray-300">Product Name</Label>
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
                />
              </div>

              <div className="space-y-3">
                <Label className="text-gray-300">Category</Label>
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
                />
              </div>

              <div className="space-y-3">
                <Label className="text-gray-300">Price ($)</Label>
                <Input
                  type="number"
                  value={currentProduct?.price || ""}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className="bg-gray-700/50 border-gray-600 text-white"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label className="text-gray-300">Stock Quantity</Label>
                <Input
                  type="number"
                  value={currentProduct?.stock || ""}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      stock: parseInt(e.target.value),
                    })
                  }
                  className="bg-gray-700/50 border-gray-600 text-white"
                  min="0"
                  required
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
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {currentProduct?.id ? "Update Product" : "Add Product"}
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
            >
              Cancel
            </Button>
            <Button
              className="bg-rose-600 hover:bg-rose-700"
              onClick={confirmDelete}
            >
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
