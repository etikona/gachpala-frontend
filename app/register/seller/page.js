"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

export default function UserRegister() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // State declarations
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [websiteOrSocialLinks, setWebsiteOrSocialLinks] = useState("");
  const [gstVatNumber, setGstVatNumber] = useState("");
  const [bankAccountHolderName, setBankAccountHolderName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [swiftIbanCode, setSwiftIbanCode] = useState("");
  const [paypalIdOrPayoneer, setPaypalIdOrPayoneer] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [plantTypesSold, setPlantTypesSold] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [agreeTermsAndPolicy, setAgreeTermsAndPolicy] = useState(false);

  const [govtIdProof, setGovtIdProof] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [businessLicense, setBusinessLicense] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      { field: fullName, name: "fullName", label: "Full Name" },
      { field: email, name: "email", label: "Email" },
      { field: phoneNumber, name: "phoneNumber", label: "Phone Number" },
      { field: password, name: "password", label: "Password" },
      { field: businessName, name: "businessName", label: "Business Name" },
      { field: businessType, name: "businessType", label: "Business Type" },
      { field: country, name: "country", label: "Country" },
      { field: state, name: "state", label: "State" },
      { field: city, name: "city", label: "City" },
      { field: address, name: "address", label: "Address" },
      {
        field: bankAccountHolderName,
        name: "bankAccountHolderName",
        label: "Bank Account Holder",
      },
      {
        field: bankAccountNumber,
        name: "bankAccountNumber",
        label: "Account Number",
      },
      { field: bankName, name: "bankName", label: "Bank Name" },
    ];

    // Check required fields
    requiredFields.forEach(({ field, name, label }) => {
      if (!field) {
        newErrors[name] = `${label} is required`;
      }
    });

    // Email validation
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (password) {
      if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      if (password !== passwordConfirmation) {
        newErrors.passwordConfirmation = "Passwords do not match";
      }
    }

    // Add to validateForm function
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (govtIdProof) {
      if (!validImageTypes.includes(govtIdProof.type)) {
        newErrors.govtIdProof = "Government ID must be JPG or PNG";
      }
      if (govtIdProof.size > 5 * 1024 * 1024) {
        // 5MB
        newErrors.govtIdProof = "Government ID must be smaller than 5MB";
      }
    }

    if (profilePhoto) {
      if (!validImageTypes.includes(profilePhoto.type)) {
        newErrors.profilePhoto = "Profile photo must be JPG or PNG";
      }
      if (profilePhoto.size > 5 * 1024 * 1024) {
        newErrors.profilePhoto = "Profile photo must be smaller than 5MB";
      }
    }

    if (businessLicense && businessLicense.size > 0) {
      if (!validImageTypes.includes(businessLicense.type)) {
        newErrors.businessLicense = "Business license must be JPG or PNG";
      }
      if (businessLicense.size > 10 * 1024 * 1024) {
        // 10MB
        newErrors.businessLicense =
          "Business license must be smaller than 10MB";
      }
    }

    // File validations
    // if (!govtIdProof) newErrors.govtIdProof = "Government ID is required";
    if (!profilePhoto) newErrors.profilePhoto = "Profile photo is required";

    // Terms agreement
    if (!agreeTermsAndPolicy) {
      newErrors.agreeTermsAndPolicy = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    // Reset all states
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setPasswordConfirmation("");
    setBusinessName("");
    setBusinessType("");
    setCountry("");
    setState("");
    setCity("");
    setAddress("");
    setWebsiteOrSocialLinks("");
    setGstVatNumber("");
    setBankAccountHolderName("");
    setBankAccountNumber("");
    setBankName("");
    setBranchName("");
    setSwiftIbanCode("");
    setPaypalIdOrPayoneer("");
    setBusinessDescription("");
    setPlantTypesSold("");
    setYearsOfExperience("");
    setPreferredLanguage("");
    setReferralCode("");
    setAgreeTermsAndPolicy(false);
    setGovtIdProof(null);
    setProfilePhoto(null);
    setBusinessLicense(null);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      // Append all text fields
      formData.append("full_name", fullName);
      formData.append("email", email);
      formData.append("phone_number", phoneNumber);
      formData.append("password", password);
      formData.append("business_name", businessName);
      formData.append("business_type", businessType);
      formData.append("country", country);
      formData.append("state", state);
      formData.append("city", city);
      formData.append("address", address);
      formData.append("website_or_social_links", websiteOrSocialLinks);
      formData.append("gst_vat_number", gstVatNumber);
      formData.append("bank_account_holder_name", bankAccountHolderName);
      formData.append("bank_account_number", bankAccountNumber);
      formData.append("bank_name", bankName);
      formData.append("branch_name", branchName);
      formData.append("swift_iban_code", swiftIbanCode);
      formData.append("paypal_id_or_payoneer", paypalIdOrPayoneer);
      formData.append("business_description", businessDescription);
      formData.append("plant_types_sold", plantTypesSold);
      formData.append("years_of_experience", yearsOfExperience);
      formData.append("preferred_language", preferredLanguage);
      formData.append("referral_code", referralCode);
      formData.append("agree_terms_and_policy", agreeTermsAndPolicy);

      // Append files with explicit file names
      if (govtIdProof) {
        formData.append(
          "govt_id_proof",
          govtIdProof,
          govtIdProof.name || "govt_id_proof.jpg"
        );
      }

      if (profilePhoto) {
        formData.append(
          "profile_photo",
          profilePhoto,
          profilePhoto.name || "profile_photo.jpg"
        );
      }

      if (businessLicense) {
        formData.append(
          "business_license",
          businessLicense,
          businessLicense.name || "business_license.jpg"
        );
      }

      const res = await fetch(
        `https://gachpala-server.onrender.com/api/v1/seller/register`,
        {
          method: "POST",
          // headers: { "Content-Type": "application/json" },
          body: formData,
        }
      );

      // Handle response
      let responseData;
      try {
        responseData = await res.json();
      } catch (jsonError) {
        // If JSON parsing fails, get text response
        const textResponse = await res.text();
        console.error(
          "JSON parse error:",
          jsonError,
          "Text response:",
          textResponse
        );
        throw new Error(`Server responded with ${res.status}: ${textResponse}`);
      }

      if (res.ok) {
        resetForm();
        toast.success("Seller registration successful! Please log in.");
        router.push("/login/seller");
      } else {
        let errorMessage = `Registration failed (${res.status})`;

        // Try to extract more specific error from server response
        if (responseData && responseData.error) {
          errorMessage = responseData.error;
        } else if (responseData && responseData.message) {
          errorMessage = responseData.message;
        } else if (responseData && responseData.msg) {
          errorMessage = responseData.msg;
        }

        // Special handling for file-related errors
        if (
          errorMessage.includes("govt_id_proof") ||
          errorMessage.includes("Cannot read properties of undefined")
        ) {
          errorMessage =
            "Error processing uploaded files. Please ensure files are valid images (JPG, PNG) and try again.";
        }

        toast.error(errorMessage);
        console.error("Registration failed:", res.status, responseData);
      }
    } catch (error) {
      let errorMessage = error.message || "Network error. Please try again.";

      // Special handling for file-related errors
      if (
        errorMessage.includes("govt_id_proof") ||
        errorMessage.includes("Cannot read properties of undefined")
      ) {
        errorMessage =
          "Error processing uploaded files. Please ensure files are valid and try again.";
      }

      toast.error(errorMessage);
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen">
      <Card className="bg-gray-900 border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-100">
            Seller Registration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Column 1 */}
              <div className="space-y-4">
                {/* Personal Information */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2">
                    Personal Information
                  </h3>

                  <div>
                    <Label className="text-gray-300">Full Name *</Label>
                    <Input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                    {errors.fullName && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-300">Email *</Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-300">Phone Number *</Label>
                    <Input
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-300">Password *</Label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                    {errors.password && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-300">Confirm Password *</Label>
                    <Input
                      type="password"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                    {errors.passwordConfirmation && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.passwordConfirmation}
                      </p>
                    )}
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-3 pt-4">
                  <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2">
                    Location Information
                  </h3>

                  <div>
                    <Label className="text-gray-300">Country *</Label>
                    <Input
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                    {errors.country && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.country}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">State *</Label>
                      <Input
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-gray-100"
                      />
                      {errors.state && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.state}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label className="text-gray-300">City *</Label>
                      <Input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-gray-100"
                      />
                      {errors.city && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-300">Address *</Label>
                    <Input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                    {errors.address && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>
                </div>

                {/* Business Details */}
                <div className="space-y-3 pt-4">
                  <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2">
                    Business Details
                  </h3>

                  <div>
                    <Label className="text-gray-300">Plant Types Sold</Label>
                    <Input
                      value={plantTypesSold}
                      onChange={(e) => setPlantTypesSold(e.target.value)}
                      placeholder="e.g., Indoor, Bonsai, Terrarium"
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300">Years of Experience</Label>
                    <Input
                      type="number"
                      value={yearsOfExperience}
                      onChange={(e) => setYearsOfExperience(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300">Preferred Language</Label>
                    <Input
                      value={preferredLanguage}
                      onChange={(e) => setPreferredLanguage(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                {/* Business Information */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2">
                    Business Information
                  </h3>

                  <div>
                    <Label className="text-gray-300">Business Name *</Label>
                    <Input
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                    {errors.businessName && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.businessName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-300">Business Type *</Label>
                    <Input
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                    {errors.businessType && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.businessType}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-300">
                      Website or Social Links
                    </Label>
                    <Input
                      value={websiteOrSocialLinks}
                      onChange={(e) => setWebsiteOrSocialLinks(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300">GST/VAT Number</Label>
                    <Input
                      value={gstVatNumber}
                      onChange={(e) => setGstVatNumber(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                  </div>
                </div>

                {/* Banking Information */}
                <div className="space-y-3 pt-4">
                  <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2">
                    Banking Information
                  </h3>

                  <div>
                    <Label className="text-gray-300">
                      Bank Account Holder *
                    </Label>
                    <Input
                      value={bankAccountHolderName}
                      onChange={(e) => setBankAccountHolderName(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                    {errors.bankAccountHolderName && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.bankAccountHolderName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Account Number *</Label>
                      <Input
                        value={bankAccountNumber}
                        onChange={(e) => setBankAccountNumber(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-gray-100"
                      />
                      {errors.bankAccountNumber && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.bankAccountNumber}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label className="text-gray-300">Bank Name *</Label>
                      <Input
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-gray-100"
                      />
                      {errors.bankName && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.bankName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Branch Name</Label>
                      <Input
                        value={branchName}
                        onChange={(e) => setBranchName(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-gray-100"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">SWIFT/IBAN Code</Label>
                      <Input
                        value={swiftIbanCode}
                        onChange={(e) => setSwiftIbanCode(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-gray-100"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-300">Paypal/Payoneer ID</Label>
                    <Input
                      value={paypalIdOrPayoneer}
                      onChange={(e) => setPaypalIdOrPayoneer(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-3 pt-4">
                  <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2">
                    Additional Information
                  </h3>

                  <div>
                    <Label className="text-gray-300">
                      Business Description
                    </Label>
                    <Textarea
                      value={businessDescription}
                      onChange={(e) => setBusinessDescription(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-gray-100 min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300">Referral Code</Label>
                    <Input
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Full-width sections */}
              <div className="md:col-span-2 space-y-6">
                {/* Documents Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2">
                    Documents
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-gray-300 block mb-2">
                        Govt ID Proof *
                      </Label>
                      <Input
                        type="file"
                        accept="image/jpeg, image/png, image/jpg"
                        onChange={(e) => setGovtIdProof(e.target.files[0])}
                        className="bg-gray-800 border-gray-700 text-gray-100 file:text-gray-300 file:bg-gray-700 file:border-0 file:mr-2 file:px-4 file:py-2"
                      />
                      {errors.govtIdProof && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.govtIdProof}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="text-gray-300 block mb-2">
                        Profile Photo *
                      </Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProfilePhoto(e.target.files[0])}
                        className="bg-gray-800 border-gray-700 text-gray-100 file:text-gray-300 file:bg-gray-700 file:border-0 file:mr-2 file:px-4 file:py-2"
                      />
                      {errors.profilePhoto && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.profilePhoto}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="text-gray-300 block mb-2">
                        Business License (Optional)
                      </Label>
                      <Input
                        type="file"
                        onChange={(e) => setBusinessLicense(e.target.files[0])}
                        className="bg-gray-800 border-gray-700 text-gray-100 file:text-gray-300 file:bg-gray-700 file:border-0 file:mr-2 file:px-4 file:py-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms and Submit */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreeTermsAndPolicy}
                        onChange={(e) =>
                          setAgreeTermsAndPolicy(e.target.checked)
                        }
                        className="h-4 w-4 text-primary rounded focus:ring-primary border-gray-600 bg-gray-700"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <Label
                        htmlFor="terms"
                        className="text-gray-300 font-medium"
                      >
                        I agree to the terms and privacy policy *
                      </Label>
                      <p className="text-gray-400 mt-1">
                        By checking this box, you confirm that you have read and
                        agree to our Terms of Service and Privacy Policy.
                      </p>
                      {errors.agreeTermsAndPolicy && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.agreeTermsAndPolicy}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full cursor-pointer py-6 text-lg font-semibold transition-all duration-300 ${
                      isLoading
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800"
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                        Processing...
                      </span>
                    ) : (
                      "Register as Seller"
                    )}
                  </Button>

                  <div className="text-center text-gray-400 text-sm pt-2">
                    <p>Fields marked with * are required</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
