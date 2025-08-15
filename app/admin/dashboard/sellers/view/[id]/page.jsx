"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CheckCircle,
  Star,
  Store,
  FileText,
  MapPin,
  Globe,
} from "lucide-react";

export default function ViewSellerPage() {
  const { id } = useParams();
  const router = useRouter();
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch seller details
        const sellerResponse = await fetch(
          `http://localhost:5000/api/v1/admin/sellers/${id}`
        );
        if (!sellerResponse.ok) throw new Error("Failed to fetch seller");
        const sellerData = await sellerResponse.json();
        setSeller(sellerData);

        // Fetch seller products
        const productsResponse = await fetch(
          `http://localhost:5000/api/v1/products?seller_id=${id}`
        );
        if (!productsResponse.ok) throw new Error("Failed to fetch products");
        const productsData = await productsResponse.json();
        setProducts(productsData.products || []);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
        setProductsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <CheckCircle className="h-3 w-3 mr-1" /> Active
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            Pending Review
          </Badge>
        );
      case "suspended":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            Suspended
          </Badge>
        );
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-gray-300">Seller not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {seller.store_name}
            </h1>
            <p className="text-gray-400 mt-1">Seller details and products</p>
          </div>
          <Button
            onClick={() => router.push(`/admin/dashboard/sellers/edit/${id}`)}
            variant="outline"
            className="bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
          >
            Edit Seller
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Seller Profile */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={seller.profile_photo_or_logo} />
                  <AvatarFallback className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-2xl">
                    {seller.store_name?.charAt(0) || "S"}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-center text-white">
                  {seller.store_name}
                </CardTitle>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400 mr-1" />
                  <span className="font-medium text-gray-200">
                    {seller?.rating || 0}/5
                  </span>
                </div>
                <div className="mt-2">{getStatusBadge(seller.status)}</div>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                <div className="flex items-center">
                  <Store className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{seller.business_type}</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-gray-400" />
                  <span>
                    {seller.business_registration_no || "Not provided"}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <span>
                    {[seller.city, seller.state, seller.country]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </div>
                {seller.website_or_social_links && (
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-gray-400" />
                    <a
                      href={seller.website_or_social_links}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline"
                    >
                      {seller.website_or_social_links}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Business Details */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Business Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                <div>
                  <h4 className="text-sm font-medium text-gray-400">
                    Description
                  </h4>
                  <p className="mt-1">
                    {seller.business_description || "No description provided"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">
                    GST/VAT Number
                  </h4>
                  <p className="mt-1">
                    {seller.gst_vat_number || "Not provided"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Products ({products.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {productsLoading ? (
                  <div className="flex justify-center py-10">
                    <p className="text-gray-400">Loading products...</p>
                  </div>
                ) : products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="border border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow bg-gray-700/50"
                      >
                        <div className="aspect-square bg-gray-700 rounded-md mb-3 overflow-hidden">
                          {product.images?.[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                              No image
                            </div>
                          )}
                        </div>
                        <h3 className="font-medium text-white">
                          {product.name}
                        </h3>
                        <div className="flex items-center mt-1">
                          <Star className="h-3 w-3 text-amber-400 fill-amber-400 mr-1" />
                          <span className="text-sm text-gray-300">
                            {product.rating?.toFixed(1) || 0}/5
                          </span>
                        </div>
                        <div className="mt-2 font-bold text-white">
                          ${product.price}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-400">
                    This seller has no products yet
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
