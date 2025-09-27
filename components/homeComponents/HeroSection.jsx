"use client";
import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { LeafIcon } from "@/components/icons";
import hero from "../../public/assets/hero.png";

// ✅ Register GSAP Plugin (Required)
gsap.registerPlugin(useGSAP);

// ✅ Preload critical assets
if (typeof window !== "undefined") {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = hero.src;
  document.head.appendChild(link);
}

const HeroSection = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      if (sessionStorage.getItem("heroAnimationPlayed")) {
        // ✅ Fix: Target actual elements instead of non-existing `.hero-element`
        gsap.set(
          [
            ".hero-badge",
            ".hero-title",
            ".hero-subtitle",
            ".hero-cta",
            ".hero-image",
          ],
          { opacity: 1, y: 0, scale: 1 }
        );
        return;
      }

      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(".hero-badge", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      })
        .from(
          ".hero-title",
          { y: 30, opacity: 0, duration: 0.9, ease: "power2.out" },
          "-=0.5"
        )
        .from(
          ".hero-subtitle",
          { y: 25, opacity: 0, duration: 0.7, ease: "power2.out" },
          "-=0.6"
        )
        .from(
          ".hero-cta",
          { y: 25, opacity: 0, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        )
        .from(
          ".hero-image",
          {
            y: 40,
            opacity: 0,
            scale: 0.96,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.7"
        );

      sessionStorage.setItem("heroAnimationPlayed", "true");
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Optimized Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-gray-900" />
      <div className="absolute inset-0 opacity-30 bg-gradient-to-tr from-emerald-900/20 via-transparent to-teal-900/10" />

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Column */}
          <div className="space-y-8">
            <div className="hero-badge inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg opacity-0">
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              <span className="text-emerald-300 font-medium text-sm uppercase tracking-wide">
                AI Innovation
              </span>
            </div>

            <div className="hero-title opacity-0 space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Elevate Your{" "}
                <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                  Plant Care
                </span>{" "}
                Experience
              </h1>
              <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400" />
            </div>

            <p className="hero-subtitle text-lg text-gray-300 leading-relaxed opacity-0 max-w-lg">
              Revolutionary AI platform for instant health diagnostics and
              predictive care insights. Transform every plant into a thriving
              masterpiece.
            </p>

            <div className="hero-cta space-y-6 opacity-0">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 
                  hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-300"
                >
                  Start Your Journey
                  <LeafIcon className="ml-2 w-4 h-4" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 border-white/30 text-white hover:border-emerald-400 rounded-xl"
                >
                  Watch Demo
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                {["99.8% Accuracy", "100K+ Plants", "24/7 Monitoring"].map(
                  (metric) => (
                    <div key={metric} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      {metric}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="hero-image relative opacity-0">
              <div className="absolute -inset-4 bg-emerald-500/5 rounded-xl blur-xl" />
              <div className="relative z-10">
                <Image
                  src={hero}
                  alt="AI Plant Analysis Platform"
                  className="rounded-lg shadow-2xl border border-white/20"
                  priority
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-emerald-300 text-xs font-medium">
                    AI Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);
