"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";

export const SellerForm = ({
  defaultValues = {},
  onSubmit,
  loading,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState({
    full_name: defaultValues.full_name || "",
    email: defaultValues.email || "",
    phone_number: defaultValues.phone_number || "",
    password: "",
    business_name: defaultValues.business_name || "",
    business_type: defaultValues.business_type || "",
    business_registration_no: defaultValues.business_registration_no || "",
    country: defaultValues.country || "",
    state: defaultValues.state || "",
    city: defaultValues.city || "",
    address: defaultValues.address || "",
    website_or_social_links: defaultValues.website_or_social_links || "",
    gst_vat_number: defaultValues.gst_vat_number || "",
    business_description: defaultValues.business_description || "",
  });

  const [files, setFiles] = useState({
    govtIdProof: null,
    businessLicense: null,
    profilePhoto: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e, field) => {
    setFiles({ ...files, [field]: e.target.files[0] });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name.trim())
      newErrors.full_name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone_number.trim())
      newErrors.phone_number = "Phone number is required";
    if (!isEdit && !formData.password.trim())
      newErrors.password = "Password is required";
    if (!formData.business_name.trim())
      newErrors.business_name = "Business name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const data = new FormData();

      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      // Append files
      if (files.govtIdProof) data.append("govt_id_proof", files.govtIdProof);
      if (files.businessLicense)
        data.append("business_license", files.businessLicense);
      if (files.profilePhoto)
        data.append("profile_photo_or_logo", files.profilePhoto);

      await onSubmit(data);
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-200">
            Personal Information
          </h3>
          <div className="space-y-2">
            <Label className="text-gray-400" htmlFor="full_name">
              Full Name *
            </Label>
            <Input
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-gray-200"
            />
            {errors.full_name && (
              <p className="text-sm text-red-400">{errors.full_name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-gray-400" htmlFor="email">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-gray-200"
            />
            {errors.email && (
              <p className="text-sm text-red-400">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-gray-400" htmlFor="phone_number">
              Phone Number *
            </Label>
            <Input
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-gray-200"
            />
            {errors.phone_number && (
              <p className="text-sm text-red-400">{errors.phone_number}</p>
            )}
          </div>
          {!isEdit && (
            <div className="space-y-2">
              <Label className="text-gray-400" htmlFor="password">
                Password *
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-800 border-gray-700 text-gray-200"
              />
              {errors.password && (
                <p className="text-sm text-red-400">{errors.password}</p>
              )}
            </div>
          )}
        </div>

        {/* Business Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-200">
            Business Information
          </h3>
          <div className="space-y-2">
            <Label className="text-gray-400" htmlFor="business_name">
              Business Name *
            </Label>
            <Input
              id="business_name"
              name="business_name"
              value={formData.business_name}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-gray-200"
            />
            {errors.business_name && (
              <p className="text-sm text-red-400">{errors.business_name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-gray-400" htmlFor="business_type">
              Business Type
            </Label>
            <Input
              id="business_type"
              name="business_type"
              value={formData.business_type}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-400" htmlFor="business_registration_no">
              Registration Number
            </Label>
            <Input
              id="business_registration_no"
              name="business_registration_no"
              value={formData.business_registration_no}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-gray-200"
            />
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-200">
          Address Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-400" htmlFor="country">
              Country
            </Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-400" htmlFor="state">
              State
            </Label>
            <Input
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-400" htmlFor="city">
              City
            </Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-gray-200"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-gray-400" htmlFor="address">
            Address
          </Label>
          <Textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="bg-gray-800 border-gray-700 text-gray-200"
          />
        </div>
      </div>

      {/* Documents */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-200">Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-400" htmlFor="govt_id_proof">
              Government ID Proof
            </Label>
            <Input
              id="govt_id_proof"
              type="file"
              onChange={(e) => handleFileChange(e, "govtIdProof")}
              className="bg-gray-800 border-gray-700 text-gray-200 file:text-gray-200 file:bg-gray-700 file:border-0 file:mr-2"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-400" htmlFor="business_license">
              Business License
            </Label>
            <Input
              id="business_license"
              type="file"
              onChange={(e) => handleFileChange(e, "businessLicense")}
              className="bg-gray-800 border-gray-700 text-gray-200 file:text-gray-200 file:bg-gray-700 file:border-0 file:mr-2"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-gray-400" htmlFor="profile_photo_or_logo">
            Profile Photo/Logo
          </Label>
          <Input
            id="profile_photo_or_logo"
            type="file"
            onChange={(e) => handleFileChange(e, "profilePhoto")}
            className="bg-gray-800 border-gray-700 text-gray-200 file:text-gray-200 file:bg-gray-700 file:border-0 file:mr-2"
          />
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-200">
          Additional Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-400" htmlFor="website_or_social_links">
              Website/Social Links
            </Label>
            <Input
              id="website_or_social_links"
              name="website_or_social_links"
              value={formData.website_or_social_links}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-400" htmlFor="gst_vat_number">
              GST/VAT Number
            </Label>
            <Input
              id="gst_vat_number"
              name="gst_vat_number"
              value={formData.gst_vat_number}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-gray-200"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-gray-400" htmlFor="business_description">
            Business Description
          </Label>
          <Textarea
            id="business_description"
            name="business_description"
            value={formData.business_description}
            onChange={handleChange}
            className="bg-gray-800 border-gray-700 text-gray-200"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {loading ? "Processing..." : isEdit ? "Update Seller" : "Add Seller"}
        </Button>
      </div>
    </form>
  );
};
