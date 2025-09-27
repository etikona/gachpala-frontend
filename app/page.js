"use client";
import React, { lazy, Suspense } from "react";
import dynamic from "next/dynamic";

// Import components directly instead of dynamic imports for better reliability
import HeroSection from "@/components/homeComponents/HeroSection";
import StatsSection from "@/components/homeComponents/StatsSection";
import HowItWorks from "@/components/homeComponents/HowItWorks";
import CTASection from "@/components/homeComponents/CTASection";

// Keep PlantCareEcosystem as dynamic since it's working
const FeaturesSection = dynamic(
  () => import("@/components/PlantCareEcosystem"),
  {
    ssr: false,
    loading: () => (
      <div className="py-24 px-4">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-700 rounded mx-auto w-64 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-700 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    ),
  }
);

// Loading component for better UX
const SectionSkeleton = ({ height = "h-64", className = "" }) => (
  <div
    className={`animate-pulse bg-gray-800/50 rounded-xl ${height} ${className}`}
  >
    <div className="h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-xl"></div>
  </div>
);

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-gray-900 to-emerald-950/20 text-gray-100 overflow-hidden">
      {/* Hero Section - Load immediately */}
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-slate-950">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading...</p>
            </div>
          </div>
        }
      >
        <HeroSection />
      </Suspense>

      {/* Stats Section */}
      <Suspense
        fallback={
          <div className="py-16 bg-slate-900/50 border-y border-slate-800">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center">
                  <SectionSkeleton height="h-12" className="mb-2" />
                  <SectionSkeleton height="h-4" />
                </div>
              ))}
            </div>
          </div>
        }
      >
        <StatsSection />
      </Suspense>

      {/* Features Section - PlantCareEcosystem */}
      <Suspense
        fallback={
          <div className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
              <SectionSkeleton height="h-8" className="mx-auto w-64 mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <SectionSkeleton key={i} height="h-64" />
                ))}
              </div>
            </div>
          </div>
        }
      >
        <section id="features" className="py-24 px-4">
          <FeaturesSection />
        </section>
      </Suspense>

      {/* How It Works Section */}
      <Suspense
        fallback={
          <div className="py-24 bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4">
              <SectionSkeleton height="h-8" className="mx-auto w-64 mb-16" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <SectionSkeleton key={i} height="h-80" />
                ))}
              </div>
            </div>
          </div>
        }
      >
        <HowItWorks />
      </Suspense>

      {/* CTA Section */}
      <Suspense
        fallback={
          <div className="py-24 px-4">
            <div className="max-w-4xl mx-auto bg-slate-800/50 rounded-2xl p-12">
              <SectionSkeleton height="h-8" className="mx-auto w-96 mb-6" />
              <SectionSkeleton height="h-4" className="mx-auto w-64 mb-8" />
              <SectionSkeleton height="h-12" className="mx-auto w-80" />
            </div>
          </div>
        }
      >
        <CTASection />
      </Suspense>

      {/* Footer */}
    </div>
  );
};

export default HomePage;
