// app/plant-health/page.js
"use client";

import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/icons";
import Image from "next/image";

export default function PlantHealthPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const analyzePlantHealth = () => {
    setIsLoading(true);
    setProgress(0);

    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);

          // Set mock analysis results
          setAnalysisResult({
            status: "Unhealthy",
            disease: "Powdery Mildew",
            confidence: 92,
            description:
              "Your plant shows signs of powdery mildew, a fungal disease that appears as white powdery spots on leaves and stems.",
            careTips: [
              "Remove affected leaves immediately to prevent spread",
              "Improve air circulation around the plant",
              "Avoid overhead watering to keep leaves dry",
              "Apply neem oil treatment every 7 days",
            ],
            fertilizer: {
              type: "Organic Fungicide",
              application:
                "Dilute 1 tsp per liter of water and spray on leaves",
              frequency: "Every 7 days for 3 weeks",
            },
            measurements: {
              humidity: "High (75%)",
              light: "Medium (1500 lux)",
              temp: "22°C (optimal)",
            },
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setPreviewUrl("");
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300 mb-4">
            Plant Health AI Analyzer
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Upload a photo of your plant to get instant health analysis, care
            recommendations, and treatment solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.upload className="h-5 w-5 text-emerald-400" />
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
                  <Image
                    src={previewUrl}
                    alt="Plant preview"
                    className="rounded-lg w-full h-64 object-cover border border-gray-700"
                  />
                  <button
                    onClick={resetAnalysis}
                    className="absolute top-2 right-2 bg-gray-900/80 hover:bg-gray-800 rounded-full p-2 transition-all"
                  >
                    <Icons.x className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed border-gray-700 rounded-xl h-64 flex flex-col items-center justify-center gap-4 transition-all hover:border-emerald-500 cursor-pointer"
                  onClick={handleUploadClick}
                >
                  <Icons.uploadCloud className="h-12 w-12 text-gray-500" />
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
                accept="image/*"
              />

              <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-700 rounded-lg p-2">
                    <Icons.camera className="h-5 w-5 text-emerald-400" />
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
                    <Icons.shield className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Privacy First</p>
                    <p className="text-xs text-gray-500">
                      Your images are never stored or shared
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                  onClick={resetAnalysis}
                  disabled={!selectedImage}
                >
                  Reset
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600"
                  onClick={analyzePlantHealth}
                  disabled={!selectedImage || isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Icons.spinner className="h-4 w-4 animate-spin" />
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
                <Icons.barChart className="h-5 w-5 text-emerald-400" />
                Analysis Results
              </CardTitle>
              <CardDescription className="text-gray-400">
                {analysisResult
                  ? "Detailed health assessment and recommendations"
                  : "Results will appear here after analysis"}
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
                    <Progress
                      value={progress}
                      className="bg-gray-700 h-2"
                      indicatorColor="bg-emerald-500"
                    />
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
                  {/* Status Card */}
                  <div
                    className={`p-4 rounded-lg ${
                      analysisResult.status === "Healthy"
                        ? "bg-emerald-900/30 border border-emerald-800"
                        : "bg-amber-900/30 border border-amber-800"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium flex items-center gap-2">
                          {analysisResult.status === "Healthy" ? (
                            <Icons.checkCircle className="h-5 w-5 text-emerald-400" />
                          ) : (
                            <Icons.alertCircle className="h-5 w-5 text-amber-400" />
                          )}
                          {analysisResult.status}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {analysisResult.status === "Healthy"
                            ? "Your plant shows no signs of disease"
                            : `Detected: ${analysisResult.disease}`}
                        </p>
                      </div>
                      <div className="bg-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                        {analysisResult.confidence}% confidence
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
                        value="fertilizer"
                        className="data-[state=active]:bg-gray-800"
                      >
                        Treatment
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="diagnosis" className="mt-4">
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          {analysisResult.description}
                        </p>

                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-sm text-gray-500">Humidity</p>
                            <p className="font-medium mt-1">
                              {analysisResult.measurements.humidity}
                            </p>
                          </div>
                          <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-sm text-gray-500">Light Level</p>
                            <p className="font-medium mt-1">
                              {analysisResult.measurements.light}
                            </p>
                          </div>
                          <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-sm text-gray-500">Temperature</p>
                            <p className="font-medium mt-1">
                              {analysisResult.measurements.temp}
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
                        <ul className="space-y-3">
                          {analysisResult.careTips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <Icons.checkCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="fertilizer" className="mt-4">
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-emerald-900/20 border border-emerald-800 rounded-lg p-3">
                            <Icons.droplet className="h-6 w-6 text-emerald-400" />
                          </div>
                          <div>
                            <h4 className="font-medium">
                              Recommended Fertilizer
                            </h4>
                            <p className="text-emerald-400 mt-1">
                              {analysisResult.fertilizer.type}
                            </p>
                            <div className="mt-3 space-y-2">
                              <div className="flex items-center gap-3">
                                <Icons.flaskConical className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-400">
                                  {analysisResult.fertilizer.application}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Icons.calendar className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-400">
                                  {analysisResult.fertilizer.frequency}
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
                            Avoid fertilizing during the hottest part of the
                            day. Early morning or late evening applications are
                            recommended. Always water your plant before applying
                            fertilizer to prevent root burn.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      className="border-gray-700 flex-1"
                    >
                      <Icons.save className="h-4 w-4 mr-2" />
                      Save Report
                    </Button>
                    <Button className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 flex-1">
                      <Icons.shoppingCart className="h-4 w-4 mr-2" />
                      Buy Recommended Products
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-96 text-center p-8">
                  <div className="bg-gray-900 rounded-full p-4 mb-6">
                    <Icons.barChart className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">No Analysis Yet</h3>
                  <p className="text-gray-500 max-w-md">
                    Upload a photo of your plant to get started with the AI
                    health analysis. Our system will provide detailed insights
                    into your plants condition.
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
                icon: (
                  <Icons.uploadCloud className="h-8 w-8 text-emerald-400" />
                ),
                title: "Upload Photo",
                description:
                  "Take a clear picture of your plant focusing on leaves, stems, and soil",
              },
              {
                icon: <Icons.brain className="h-8 w-8 text-emerald-400" />,
                title: "AI Analysis",
                description:
                  "Our neural network analyzes 120+ plant diseases and nutrient deficiencies",
              },
              {
                icon: (
                  <Icons.clipboardCheck className="h-8 w-8 text-emerald-400" />
                ),
                title: "Get Results",
                description:
                  "Receive detailed diagnosis and personalized care recommendations",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
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
