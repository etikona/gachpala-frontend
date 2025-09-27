"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Leaf, Droplets, Sun, Zap, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PlantCareEcosystem() {
  const componentRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Master timeline for coordinated animations
      const masterTL = gsap.timeline();

      // Animate the main plant - faster
      masterTL.fromTo(
        ".main-plant",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );

      // Animate water drops - faster
      masterTL.fromTo(
        ".water-drop",
        { y: -15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // Animate sun rays - faster
      masterTL.fromTo(
        ".sun-ray",
        { scale: 0, opacity: 0, transformOrigin: "center" },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Animate soil particles - faster
      masterTL.fromTo(
        ".soil-particle",
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.02,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // Continuous animations - faster
      gsap.to(".water-drop-1", {
        y: -6,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".water-drop-2", {
        y: -8,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.2,
      });

      gsap.to(".sun-ray", {
        rotate: 360,
        duration: 15,
        repeat: -1,
        ease: "none",
        transformOrigin: "center",
      });

      // Data particles animation - faster
      gsap.to(".data-particle", {
        y: -40,
        opacity: 1,
        duration: 2,
        stagger: 0.15,
        repeat: -1,
        repeatDelay: 0.3,
        ease: "power1.out",
      });

      // Scroll-triggered animations for features - faster
      gsap.utils.toArray(".feature-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.1,
            ease: "power2.out",
          }
        );
      });

      // Animate the section title - faster
      gsap.fromTo(
        ".section-title",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          scrollTrigger: {
            trigger: ".section-title",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          ease: "power2.out",
        }
      );
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 px-4 relative overflow-hidden" ref={componentRef}>
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/4 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse(60%_50%_at_50%_50%,#000_70%,transparent_100%))]"></div>

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.1),transparent)]"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 section-title">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
              Intelligent Plant Care Ecosystem
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto section-title">
            Our AI-powered system monitors, analyzes, and optimizes plant health
            for maximum growth and sustainability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Animated SVG Illustration */}
          <div className="relative" ref={svgRef}>
            <svg viewBox="0 0 500 500" className="w-full h-auto">
              {/* Background gradient */}
              <defs>
                <linearGradient
                  id="plantGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient
                  id="potGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#6D28D9" />
                </linearGradient>
                <linearGradient
                  id="sunGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FDE047" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>

              {/* Sun with animated rays */}
              <g className="sun-group">
                <circle
                  cx="400"
                  cy="100"
                  r="36"
                  fill="url(#sunGradient)"
                  className="sun"
                />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, i) => (
                  <rect
                    key={i}
                    x="395"
                    y="50"
                    width="10"
                    height="22"
                    fill="url(#sunGradient)"
                    className="sun-ray"
                    transform={`rotate(${rotation} 400 100)`}
                  />
                ))}
              </g>

              {/* Plant pot */}
              <rect
                x="210"
                y="320"
                width="80"
                height="100"
                fill="url(#potGradient)"
                rx="6"
              />
              <rect
                x="190"
                y="340"
                width="120"
                height="12"
                fill="#5B21B6"
                rx="6"
              />

              {/* Plant stem */}
              <path
                d="M250 320 L250 220 C250 200 270 180 290 180 L310 180 C330 180 350 200 350 220 L350 280"
                stroke="url(#plantGradient)"
                strokeWidth="8"
                fill="none"
                className="main-plant"
              />

              {/* Leaves */}
              <ellipse
                cx="290"
                cy="200"
                rx="25"
                ry="15"
                fill="url(#plantGradient)"
                transform="rotate(-30 290 200)"
                className="main-plant"
              />
              <ellipse
                cx="310"
                cy="240"
                rx="25"
                ry="15"
                fill="url(#plantGradient)"
                transform="rotate(10 310 240)"
                className="main-plant"
              />
              <ellipse
                cx="270"
                cy="230"
                rx="25"
                ry="15"
                fill="url(#plantGradient)"
                transform="rotate(-50 270 230)"
                className="main-plant"
              />
              <ellipse
                cx="300"
                cy="270"
                rx="25"
                ry="15"
                fill="url(#plantGradient)"
                transform="rotate(15 300 270)"
                className="main-plant"
              />

              {/* Water drops */}
              <g className="water-drops">
                <path
                  d="M230 300 Q235 290 240 300 Q235 310 230 300 Z"
                  fill="#3B82F6"
                  className="water-drop water-drop-1"
                />
                <path
                  d="M270 280 Q275 270 280 280 Q275 290 270 280 Z"
                  fill="#3B82F6"
                  className="water-drop water-drop-2"
                />
              </g>

              {/* Soil particles */}
              <g className="soil-particles">
                {[...Array(15)].map((_, i) => (
                  <circle
                    key={i}
                    cx={200 + Math.random() * 100}
                    cy={350 + Math.random() * 40}
                    r={2 + Math.random() * 3}
                    fill="#8B5CF6"
                    className="soil-particle"
                  />
                ))}
              </g>

              {/* Data particles emerging from plant */}
              <g className="data-particles">
                {[...Array(8)].map((_, i) => (
                  <circle
                    key={i}
                    cx={290 + Math.random() * 30}
                    cy={230}
                    r={2 + Math.random() * 2}
                    fill="#EC4899"
                    opacity="0"
                    className="data-particle"
                  />
                ))}
              </g>
            </svg>
          </div>

          {/* Features List */}
          <div className="space-y-6">
            <div className="feature-item p-6 bg-gray-900/70 backdrop-blur-md rounded-2xl border border-gray-700/50 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
              <div className="flex items-start">
                <div className="p-3 bg-emerald-900/30 rounded-xl mr-5 border border-emerald-500/30">
                  <Zap className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    AI-Powered Analysis
                  </h3>
                  <p className="text-gray-300">
                    Our advanced algorithms continuously monitor plant health
                    and provide real-time insights and recommendations.
                  </p>
                </div>
              </div>
            </div>

            <div className="feature-item p-6 bg-gray-900/70 backdrop-blur-md rounded-2xl border border-gray-700/50 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
              <div className="flex items-start">
                <div className="p-3 bg-emerald-900/30 rounded-xl mr-5 border border-emerald-500/30">
                  <Droplets className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Smart Watering System
                  </h3>
                  <p className="text-gray-300">
                    Automated hydration based on soil moisture levels, weather
                    forecasts, and plant specific needs.
                  </p>
                </div>
              </div>
            </div>

            <div className="feature-item p-6 bg-gray-900/70 backdrop-blur-md rounded-2xl border border-gray-700/50 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
              <div className="flex items-start">
                <div className="p-3 bg-emerald-900/30 rounded-xl mr-5 border border-emerald-500/30">
                  <Sun className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Optimal Light Control
                  </h3>
                  <p className="text-gray-300">
                    Intelligent light adjustment based on plant type, growth
                    stage, and natural sunlight availability.
                  </p>
                </div>
              </div>
            </div>

            <div className="feature-item p-6 bg-gray-900/70 backdrop-blur-md rounded-2xl border border-gray-700/50 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
              <div className="flex items-start">
                <div className="p-3 bg-emerald-900/30 rounded-xl mr-5 border border-emerald-500/30">
                  <Shield className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Disease Prevention
                  </h3>
                  <p className="text-gray-300">
                    Early detection of potential issues and proactive measures
                    to keep your plants healthy and thriving.
                  </p>
                </div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-lg py-6 rounded-xl border border-emerald-400/30 shadow-lg shadow-emerald-500/20 transition-all duration-300">
              <Leaf className="mr-2 h-5 w-5" />
              <Link href="/plant-health">Explore the Ecosystem</Link>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
