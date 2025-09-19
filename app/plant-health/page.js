// app/plant-health/page.js
"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  BarChart,
  UploadCloud,
  Camera,
  Shield,
  X,
  Loader,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  HelpCircle,
  XCircle,
  FlaskConical,
  Calendar,
  Download,
  Brain,
  ClipboardCheck,
} from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";

// API base URL - adjust based on your environment
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// Custom Progress component to fix indicatorColor issue
const CustomProgress = ({ value, className }) => {
  return (
    <div className={`w-full bg-gray-700 rounded-full h-2 ${className}`}>
      <div
        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default function PlantHealthPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  // Check authentication status
  const checkAuthStatus = () => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    return !!token;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysisResult(null);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const analyzePlantHealth = async () => {
    if (!selectedImage) {
      toast.error("Please select an image first");
      return;
    }

    // Check authentication
    if (!checkAuthStatus()) {
      toast.error("Please log in to analyze plants");
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setAnalysisResult(null);

    try {
      // Create form data for the API request
      const formData = new FormData();
      formData.append("plant", selectedImage);

      console.log("Sending request to backend...");

      // Get authentication token
      const token =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");

      // Start progress animation
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 80) {
            clearInterval(progressInterval);
            return 80;
          }
          return prev + 5;
        });
      }, 200);

      // Use the authenticated endpoint with proper headers
      const response = await fetch(`${API_BASE_URL}/ai/plant-image`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error:", response.status, errorText);

        if (response.status === 401) {
          toast.error("Session expired. Please log in again.");
          // Clear invalid token
          localStorage.removeItem("authToken");
          sessionStorage.removeItem("authToken");
          return;
        }

        throw new Error(`Server returned ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("API response data:", data);

      // Handle response format
      if (data.analysis) {
        setAnalysisResult(data.analysis);
        toast.success("Plant analysis completed and saved successfully!");
      } else if (data) {
        setAnalysisResult(data);
        toast.success("Plant analysis completed!");
      } else {
        throw new Error("Invalid response format from server");
      }

      // Refresh the dashboard data if we're coming from there
      if (typeof window !== "undefined" && window.parent) {
        window.parent.postMessage({ type: "ANALYSIS_COMPLETED" }, "*");
      }
    } catch (error) {
      console.error("Analysis error:", error);

      if (
        error.message.includes("NetworkError") ||
        error.message.includes("Failed to fetch")
      ) {
        toast.error(
          "Cannot connect to server. Please check if the backend is running."
        );
      } else if (
        error.message.includes("401") ||
        error.message.includes("403")
      ) {
        toast.error("Authentication failed. Please log in again.");
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");
      } else {
        toast.error("Failed to analyze plant image. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setPreviewUrl("");
    setAnalysisResult(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Helper function to determine plant health status based on confidence
  const getPlantHealthStatus = (confidence, originalStatus) => {
    if (!confidence && !originalStatus) return "Unknown";

    // If confidence is available, use it to determine health
    if (confidence) {
      return confidence >= 80 ? "Healthy" : "Unhealthy";
    }

    // Fallback to original status
    return originalStatus || "Unknown";
  };

  const getStatusIcon = (status) => {
    if (!status) return <HelpCircle className="h-5 w-5 text-gray-400" />;

    switch (status.toLowerCase()) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-emerald-400" />;
      case "unhealthy":
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      case "at risk":
        return <AlertTriangle className="h-5 w-5 text-orange-400" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return <HelpCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  // Helper function to get status card styling based on confidence
  const getStatusCardStyling = (confidence, status) => {
    const healthStatus = getPlantHealthStatus(confidence, status);

    switch (healthStatus.toLowerCase()) {
      case "healthy":
        return "bg-emerald-900/30 border-emerald-800";
      case "unhealthy":
        return "bg-red-900/30 border-red-800";
      case "at risk":
        return "bg-orange-900/30 border-orange-800";
      default:
        return "bg-gray-900/30 border-gray-800";
    }
  };

  // Helper function to safely access nested properties
  const getSafe = (obj, path, defaultValue = "N/A") => {
    if (!obj) return defaultValue;

    const pathArray = path.split(".");
    let current = obj;

    for (let i = 0; i < pathArray.length; i++) {
      if (
        current[pathArray[i]] === undefined ||
        current[pathArray[i]] === null
      ) {
        return defaultValue;
      }
      current = current[pathArray[i]];
    }

    return current || defaultValue;
  };

  // PDF Download Function
  const downloadPDFReport = async () => {
    if (!analysisResult) {
      toast.error("No analysis result to download");
      return;
    }

    try {
      // Create PDF content using jsPDF
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();

      // Get calculated health status
      const confidence = getSafe(analysisResult, "confidence", 0);
      const originalStatus = getSafe(analysisResult, "status");
      const healthStatus = getPlantHealthStatus(confidence, originalStatus);

      // Add title
      doc.setFontSize(20);
      doc.setTextColor(34, 197, 94); // Emerald color
      doc.text("Plant Health Analysis Report", 20, 30);

      // Add date
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 40);

      // Plant identification section
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text("Plant Identification", 20, 60);

      doc.setFontSize(12);
      const plantType = getSafe(analysisResult, "plantType", "Unknown Plant");
      const scientificName = getSafe(analysisResult, "scientificName", "N/A");

      doc.text(`Plant Type: ${plantType}`, 25, 75);
      doc.text(`Scientific Name: ${scientificName}`, 25, 85);
      doc.text(`Confidence Score: ${confidence}%`, 25, 95);

      // Health status section
      doc.setFontSize(16);
      doc.text("Health Assessment", 20, 115);

      doc.setFontSize(12);
      // Set color based on health status
      if (healthStatus.toLowerCase() === "healthy") {
        doc.setTextColor(34, 197, 94); // Green
      } else if (healthStatus.toLowerCase() === "unhealthy") {
        doc.setTextColor(239, 68, 68); // Red
      } else {
        doc.setTextColor(249, 115, 22); // Orange
      }

      doc.text(`Status: ${healthStatus}`, 25, 130);

      doc.setTextColor(0, 0, 0);
      const disease = getSafe(analysisResult, "disease");
      if (disease && disease !== "null") {
        doc.text(`Detected Issue: ${disease}`, 25, 140);
      } else {
        doc.text("No diseases detected", 25, 140);
      }

      // Description
      const description = getSafe(
        analysisResult,
        "description",
        "No description available"
      );
      const splitDescription = doc.splitTextToSize(description, 170);
      doc.text(splitDescription, 25, 155);

      // Environmental requirements
      doc.setFontSize(16);
      doc.text("Environmental Requirements", 20, 190);

      doc.setFontSize(12);
      const humidity = getSafe(analysisResult, "measurements.humidity", "N/A");
      const light = getSafe(analysisResult, "measurements.light", "N/A");
      const temp = getSafe(analysisResult, "measurements.temp", "N/A");

      doc.text(`Humidity: ${humidity}`, 25, 205);
      doc.text(`Light: ${light}`, 25, 215);
      doc.text(`Temperature: ${temp}`, 25, 225);

      // Care tips (new page if needed)
      const careTips = getSafe(analysisResult, "careTips", []);
      if (careTips.length > 0) {
        doc.addPage();
        doc.setFontSize(16);
        doc.text("Care Recommendations", 20, 30);

        doc.setFontSize(12);
        let yPosition = 45;

        careTips.forEach((tip, index) => {
          const tipText = `${index + 1}. ${tip}`;
          const splitTip = doc.splitTextToSize(tipText, 170);
          doc.text(splitTip, 25, yPosition);
          yPosition += splitTip.length * 7 + 5;

          // Add new page if content exceeds page height
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 30;
          }
        });

        // Fertilizer recommendations
        const fertilizer = getSafe(analysisResult, "fertilizer");
        if (fertilizer && typeof fertilizer === "object") {
          yPosition += 15;

          if (yPosition > 250) {
            doc.addPage();
            yPosition = 30;
          }

          doc.setFontSize(16);
          doc.text("Fertilizer Recommendations", 20, yPosition);
          yPosition += 15;

          doc.setFontSize(12);
          const fertType = getSafe(fertilizer, "type", "N/A");
          const application = getSafe(fertilizer, "application", "N/A");
          const frequency = getSafe(fertilizer, "frequency", "N/A");

          doc.text(`Type: ${fertType}`, 25, yPosition);
          yPosition += 10;

          const splitApplication = doc.splitTextToSize(
            `Application: ${application}`,
            170
          );
          doc.text(splitApplication, 25, yPosition);
          yPosition += splitApplication.length * 7 + 5;

          doc.text(`Frequency: ${frequency}`, 25, yPosition);
        }
      }

      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`Page ${i} of ${pageCount}`, 20, 290);
        doc.text("Generated by Plant Health AI Analyzer", 150, 290);
      }

      // Save the PDF
      const fileName = `plant-health-report-${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      doc.save(fileName);

      toast.success("PDF report downloaded successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF report");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl mt-12 font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300 mb-4">
            Plant Health AI Analyzer
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Upload a photo of your plant to get instant health analysis, care
            recommendations, and treatment solutions powered by AI
          </p>
        </div>

        {/* Authentication warning */}
        {!checkAuthStatus() && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-8">
            <p className="font-medium">Authentication Required</p>
            <p>You need to be logged in to analyze plants and save results.</p>
            <button
              onClick={() => (window.location.href = "/login/user")}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mt-2"
            >
              Go to Login
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-emerald-400" />
                Upload Plant Photo
              </CardTitle>
              <CardDescription className="text-gray-400">
                Capture a clear photo of your plants leaves, stems, and soil for
                accurate analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              {previewUrl ? (
                <div className="relative group">
                  <div className="relative h-64 w-full overflow-hidden rounded-lg border border-gray-700">
                    <Image
                      src={previewUrl}
                      alt="Plant preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    onClick={resetAnalysis}
                    className="absolute top-2 right-2 bg-gray-900/80 hover:bg-gray-800 rounded-full p-2 transition-all"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed border-gray-700 rounded-xl h-64 flex flex-col items-center justify-center gap-4 transition-all hover:border-emerald-500 cursor-pointer"
                  onClick={handleUploadClick}
                >
                  <UploadCloud className="h-12 w-12 text-gray-500" />
                  <p className="text-gray-500">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-600">JPG, PNG (Max 5MB)</p>
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/jpeg,image/png,image/webp"
              />

              <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-700 rounded-lg p-2">
                    <Camera className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Photo Tips</p>
                    <p className="text-xs text-gray-500">
                      Use natural light, focus on affected areas
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-gray-700 rounded-lg p-2">
                    <Shield className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Privacy First</p>
                    <p className="text-xs text-gray-500">
                      Your images are processed securely and not stored
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                  onClick={resetAnalysis}
                  disabled={!selectedImage && !analysisResult}
                >
                  Clear
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={analyzePlantHealth}
                  disabled={!selectedImage || isLoading || !checkAuthStatus()}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader className="h-4 w-4 animate-spin" />
                      Analyzing...
                    </span>
                  ) : (
                    "Analyze Plant Health"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-emerald-400" />
                Analysis Results
              </CardTitle>
              <CardDescription className="text-gray-400">
                {analysisResult
                  ? "Detailed health assessment and recommendations"
                  : "Upload a plant photo to see analysis results"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-400">
                        Analyzing plant health
                      </p>
                      <p className="text-sm font-medium">{progress}%</p>
                    </div>
                    <CustomProgress value={progress} />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-8">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="animate-pulse">
                        <div className="bg-gray-700 rounded-lg h-24 mb-2"></div>
                        <div className="h-4 bg-gray-700 rounded w-3/4 mb-1"></div>
                        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : analysisResult ? (
                <div className="space-y-6">
                  {/* Status Card with updated logic */}
                  <div
                    className={`p-4 rounded-lg border ${getStatusCardStyling(
                      getSafe(analysisResult, "confidence", 0),
                      getSafe(analysisResult, "status")
                    )}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium flex items-center gap-2">
                          {getStatusIcon(
                            getPlantHealthStatus(
                              getSafe(analysisResult, "confidence", 0),
                              getSafe(analysisResult, "status")
                            )
                          )}
                          {getPlantHealthStatus(
                            getSafe(analysisResult, "confidence", 0),
                            getSafe(analysisResult, "status")
                          )}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {getSafe(analysisResult, "disease") &&
                          getSafe(analysisResult, "disease") !== "null"
                            ? `Detected: ${getSafe(analysisResult, "disease")}`
                            : getPlantHealthStatus(
                                getSafe(analysisResult, "confidence", 0),
                                getSafe(analysisResult, "status")
                              ).toLowerCase() === "healthy"
                            ? "No diseases detected"
                            : "Health assessment complete"}
                        </p>
                      </div>
                      <div className="bg-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                        {getSafe(analysisResult, "confidence", 0)}% confidence
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <Tabs defaultValue="diagnosis" className="mt-4">
                    <TabsList className="bg-gray-900 border border-gray-700">
                      <TabsTrigger
                        value="diagnosis"
                        className="data-[state=active]:bg-gray-800"
                      >
                        Diagnosis
                      </TabsTrigger>
                      <TabsTrigger
                        value="care"
                        className="data-[state=active]:bg-gray-800"
                      >
                        Care Plan
                      </TabsTrigger>
                      <TabsTrigger
                        value="treatment"
                        className="data-[state=active]:bg-gray-800"
                      >
                        Treatment
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="diagnosis" className="mt-4">
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          {getSafe(
                            analysisResult,
                            "description",
                            "No description available."
                          )}
                        </p>

                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-sm text-gray-500">Humidity</p>
                            <p className="font-medium mt-1">
                              {getSafe(
                                analysisResult,
                                "measurements.humidity",
                                "N/A"
                              )}
                            </p>
                          </div>
                          <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-sm text-gray-500">Light Level</p>
                            <p className="font-medium mt-1">
                              {getSafe(
                                analysisResult,
                                "measurements.light",
                                "N/A"
                              )}
                            </p>
                          </div>
                          <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-sm text-gray-500">Temperature</p>
                            <p className="font-medium mt-1">
                              {getSafe(
                                analysisResult,
                                "measurements.temp",
                                "N/A"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="care" className="mt-4">
                      <div className="space-y-4">
                        <h4 className="font-medium text-emerald-400">
                          Recommended Care Steps
                        </h4>
                        {getSafe(analysisResult, "careTips", []).length > 0 ? (
                          <ul className="space-y-3">
                            {getSafe(analysisResult, "careTips", []).map(
                              (tip, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-3"
                                >
                                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-300">{tip}</span>
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          <p className="text-gray-400">
                            No specific care tips available.
                          </p>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="treatment" className="mt-4">
                      <div className="space-y-4">
                        {getSafe(analysisResult, "fertilizer") ? (
                          <>
                            <div className="flex items-start gap-4">
                              <div className="bg-emerald-900/20 border border-emerald-800 rounded-lg p-3">
                                <FlaskConical className="h-6 w-6 text-emerald-400" />
                              </div>
                              <div>
                                <h4 className="font-medium">
                                  Recommended Treatment
                                </h4>
                                <p className="text-emerald-400 mt-1">
                                  {getSafe(
                                    analysisResult,
                                    "fertilizer.type",
                                    "Not specified"
                                  )}
                                </p>
                                <div className="mt-3 space-y-2">
                                  <div className="flex items-center gap-3">
                                    <FlaskConical className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm text-gray-400">
                                      {getSafe(
                                        analysisResult,
                                        "fertilizer.application",
                                        "Not specified"
                                      )}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm text-gray-400">
                                      {getSafe(
                                        analysisResult,
                                        "fertilizer.frequency",
                                        "Not specified"
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-6">
                              <h4 className="font-medium text-amber-400">
                                Important Notes
                              </h4>
                              <p className="text-gray-400 text-sm mt-2">
                                Follow the recommended treatment plan carefully.
                                Monitor your plants progress and adjust care as
                                needed.
                              </p>
                            </div>
                          </>
                        ) : (
                          <p className="text-gray-400">
                            No specific treatment recommendations available.
                          </p>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Updated button section - removed shopping cart, improved PDF download */}
                  <div className="mt-8 flex justify-center">
                    <Button
                      className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 px-8"
                      onClick={downloadPDFReport}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF Report
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-96 text-center p-8">
                  <div className="bg-gray-900 rounded-full p-4 mb-6">
                    <BarChart className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Ready to Analyze</h3>
                  <p className="text-gray-500 max-w-md">
                    Upload a clear photo of your plant to receive an AI-powered
                    health analysis, personalized care recommendations, and
                    treatment solutions.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <UploadCloud className="h-8 w-8 text-emerald-400" />,
                title: "Upload Photo",
                description:
                  "Take a clear picture of your plant focusing on leaves, stems, and soil",
              },
              {
                icon: <Brain className="h-8 w-8 text-emerald-400" />,
                title: "AI Analysis",
                description:
                  "Our advanced AI analyzes plant health using cutting-edge technology",
              },
              {
                icon: <ClipboardCheck className="h-8 w-8 text-emerald-400" />,
                title: "Get Results",
                description:
                  "Receive detailed diagnosis and personalized care recommendations",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-emerald-500 transition-colors"
              >
                <div className="bg-emerald-900/20 border border-emerald-800 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
