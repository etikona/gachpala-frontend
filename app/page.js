"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import hero from "../public/assets/hero.png";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  LeafIcon,
  LightbulbIcon,
  RobotIcon,
  StatsIcon,
} from "@/components/icons";
import PlantCareEcosystem from "@/components/PlantCareEcosystem";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const container = useRef(null);
  const heroRef = useRef(null);

  // Enhanced Hero animation
  useGSAP(
    () => {
      if (sessionStorage.getItem("homeAnimationPlayed")) {
        gsap.set(".hero-element", { opacity: 1, y: 0, scale: 1 });
        return;
      }

      const tl = gsap.timeline();

      // Floating particles animation
      gsap.set(".floating-particle", {
        opacity: 0,
        scale: 0,
        rotation: (i) => Math.random() * 360,
      });

      tl.from(".hero-badge", {
        y: -30,
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "elastic.out(1, 0.8)",
      })
        .from(
          ".heading-line-1",
          {
            x: -100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ".heading-line-2",
          {
            x: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .from(
          ".subheading",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          ".hero-buttons",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .from(
          ".hero-image",
          {
            y: 50,
            opacity: 0,
            scale: 0.9,
            rotation: 5,
            duration: 1.2,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .to(
          ".floating-particle",
          {
            opacity: 0.6,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.8"
        );

      // Continuous floating animation for particles
      gsap.to(".floating-particle", {
        y: "random(-20, 20)",
        x: "random(-15, 15)",
        rotation: "+=180",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: {
          amount: 2,
          from: "random",
        },
      });

      sessionStorage.setItem("homeAnimationPlayed", "true");
    },
    { scope: container }
  );

  // Section animations (keeping the original)
  useEffect(() => {
    gsap.utils.toArray(".animate-section").forEach((section) => {
      gsap.fromTo(
        section,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    gsap.from(".feature-card", {
      stagger: 0.2,
      y: 50,
      opacity: 0,
      duration: 0.7,
      scrollTrigger: {
        trigger: "#features",
        start: "top 85%",
      },
    });

    gsap.to(".stat-number", {
      innerText: function (index) {
        return [0, 95, 50000, 99][index];
      },
      duration: 2,
      snap: { innerText: 1 },
      scrollTrigger: {
        trigger: "#stats",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <div
      ref={container}
      className="bg-gradient-to-br from-gray-900 via-slate-900 to-emerald-950/20 text-gray-100 overflow-hidden"
    >
      {/* Enhanced Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-16 md:py-24 overflow-hidden"
      >
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 z-0">
          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slower"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-emerald-500/5 via-transparent to-transparent rounded-full"></div>

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            ></div>
          </div>

          {/* Floating Particles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="floating-particle absolute w-2 h-2 bg-emerald-400/40 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-emerald-500/20 rounded-full opacity-30"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 border-2 border-teal-400/20 rounded-lg rotate-45 opacity-40"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-sm"></div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="flex-1 max-w-3xl">
            {/* Premium Badge */}
            <motion.div className="hero-badge inline-flex items-center gap-3 px-6 py-3 mb-8 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-full backdrop-blur-sm opacity-0">
              <div className="relative">
                <LeafIcon className="text-emerald-400 w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
              </div>
              <span className="text-emerald-300 font-medium tracking-wide text-sm uppercase">
                Next-Gen AI Plant Intelligence
              </span>
              <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full"></div>
            </motion.div>

            {/* Enhanced Heading */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="heading-line-1 block opacity-0 mb-2">
                  Revolutionize Your
                </span>
                <span className="heading-line-2 block opacity-0 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
                  Plant Care Journey
                </span>
              </h1>

              {/* Decorative Line */}
              <div className="mt-6 w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"></div>
            </div>

            {/* Enhanced Subheading */}
            <p className="subheading text-xl md:text-2xl text-gray-300 max-w-2xl mb-10 leading-relaxed opacity-0">
              Experience the future of plant care with our cutting-edge AI
              diagnostics.
              <span className="text-emerald-300 font-medium">
                {" "}
                Detect diseases instantly
              </span>
              , optimize growth conditions, and transform every plant into a
              thriving masterpiece.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-6 opacity-0">
              <Button className="group relative px-10 py-4 text-lg bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 hover:from-emerald-600 hover:via-emerald-700 hover:to-teal-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:-translate-y-2 shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                  Start Your AI Journey
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Button>

              <Button
                variant="outline"
                className="group px-10 py-4 text-lg border-2 border-emerald-500/50 hover:border-emerald-400 bg-transparent hover:bg-emerald-500/10 text-emerald-300 hover:text-emerald-200 font-semibold rounded-2xl transition-all duration-300 backdrop-blur-sm"
              >
                <span className="flex items-center gap-3">
                  Watch Demo
                  <svg
                    className="w-5 h-5 transition-transform group-hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span>99.5% Accuracy Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                <span>50K+ Plants Analyzed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                <span>Real-time Monitoring</span>
              </div>
            </div>
          </div>

          {/* Enhanced Image Section */}
          <div className="flex-1 flex justify-center relative">
            <div className="hero-image relative opacity-0">
              {/* Layered Background Effects */}
              <div className="absolute -inset-8 bg-gradient-to-r from-emerald-500/20 via-teal-400/15 to-emerald-600/20 rounded-3xl blur-2xl animate-pulse"></div>
              <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/30 to-teal-400/20 rounded-2xl blur-xl"></div>

              {/* Decorative Rings */}
              <div className="absolute -inset-12 border-2 border-emerald-500/10 rounded-full animate-spin-slow"></div>
              <div className="absolute -inset-16 border border-teal-400/10 rounded-full animate-spin-reverse"></div>

              {/* Main Image Container */}
              <div className="relative z-10 transform transition-transform duration-300 hover:scale-105">
                <Image
                  src={hero}
                  alt="AI Plant Analysis Interface"
                  className="relative rounded-2xl shadow-2xl shadow-emerald-500/20 border border-slate-700/50 backdrop-blur-sm"
                  priority
                />

                {/* Floating UI Elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center shadow-lg animate-bounce-slow">
                  <RobotIcon className="w-6 h-6 text-white" />
                </div>

                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-xl">
                  <LightbulbIcon className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Status Indicators */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-500/30">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-emerald-300 text-xs font-medium">
                    AI Active
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-teal-500/20 backdrop-blur-sm rounded-full border border-teal-500/30">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                  <span className="text-teal-300 text-xs font-medium">
                    Analyzing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-sm text-gray-400">Discover More</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Rest of the sections remain the same */}
      {/* Stats Section */}
      <section
        id="stats"
        className="py-16 bg-slate-900/50 border-y border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "95", label: "Accuracy Rate" },
            { value: "50000", label: "Plants Analyzed" },
            { value: "99", label: "User Satisfaction" },
            { value: "24/7", label: "AI Monitoring" },
          ].map((stat, index) => (
            <div key={index} className="text-center animate-section">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                <span className="stat-number">0</span>
                {index !== 3 ? "%" : ""}
              </div>
              <p className="mt-2 text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4">
        <PlantCareEcosystem />
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-900/50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-section">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Gachpala Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Transform your plant care routine in just three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Scan Your Plant",
                description:
                  "Use our mobile app to scan your plant using your phone's camera",
              },
              {
                step: "02",
                title: "AI Analysis",
                description:
                  "Our neural network analyzes plant health in real-time",
              },
              {
                step: "03",
                title: "Receive Insights",
                description: "Get instant recommendations for optimal care",
              },
            ].map((step, index) => (
              <div key={index} className="animate-section">
                <div className="relative p-8 bg-slate-800/50 border border-slate-700 rounded-xl">
                  <div className="absolute -top-4 left-6 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="font-bold text-gray-900">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-slate-900 to-slate-800 border border-emerald-500/30 rounded-2xl p-8 md:p-12 text-center animate-section">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Plant Care?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Join thousands of plant enthusiasts using Gachpala to keep their
            plants thriving
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800 border-slate-700 text-gray-100 font-bold py-6 flex-1"
              />
              <Button className="py-6 bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700">
                Get Started
              </Button>
            </div>
            <p className="text-gray-500 text-sm mt-3">
              Free 14-day trial • No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default HomePage;
