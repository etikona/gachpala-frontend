"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import hero from "../public/assets/hero.png";
// import feature1 from "../public/assets/feature1.png";
// import feature2 from "../public/assets/feature2.png";
// import feature3 from "../public/assets/feature3.png";
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

// SVG Icon Components

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const container = useRef(null);

  // Hero animation
  useGSAP(
    () => {
      if (sessionStorage.getItem("homeAnimationPlayed")) {
        gsap.set(".hero-element", { opacity: 1, y: 0, scale: 1 });
        return;
      }

      const tl = gsap.timeline();
      tl.from(".heading", {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      })
        .from(".subheading", { y: 20, opacity: 0, duration: 0.7 }, "-=0.3")
        .from(".cta-button", { scale: 0.8, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(
          ".hero-image",
          { y: 30, opacity: 0, scale: 0.95, duration: 0.9 },
          "-=0.3"
        );

      sessionStorage.setItem("homeAnimationPlayed", "true");
    },
    { scope: container }
  );

  // Section animations
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

    // Feature cards animation
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

    // Stats counter animation
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
      className="bg-gradient-to-br from-gray-900 to-slate-950 text-gray-100 overflow-hidden"
    >
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slower"></div>
        </div>

        <div className="relative z-10 max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-4"
            >
              <LeafIcon className="text-emerald-400 w-6 h-6" />
              <span className="text-emerald-400 font-medium tracking-wide">
                AI-POWERED PLANT CARE
              </span>
            </motion.div>

            <h1 className="heading hero-element text-4xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0">
              <span className="block">Nurture Your Plants</span>
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                {/* bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent  */}
                With AI Intelligence
              </span>
            </h1>

            <p className="subheading hero-element text-lg md:text-xl text-gray-300 max-w-2xl mb-8 opacity-0">
              Gachpala revolutionizes plant care with advanced AI diagnostics
              and personalized insights. Monitor plant health, prevent diseases,
              and optimize growth with our intelligent ecosystem.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="cta-button hero-element opacity-0 px-8 py-6 text-lg bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white font-medium rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30">
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                className="px-8 py-6 text-lg border-gray-700 hover:bg-slate-800 text-white font-medium rounded-full"
              >
                View Demo
              </Button>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="hero-image hero-element opacity-0 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-teal-400/10 rounded-3xl blur-xl z-0 animate-pulse"></div>
              <Image
                src={hero}
                alt="AI Plant Analysis"
                className="relative z-10 rounded-2xl shadow-2xl shadow-emerald-500/10 border border-slate-700/50"
                priority
              />
            </div>
          </div>
        </div>
      </section>

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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-section">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Intelligent Plant Care Ecosystem
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive solutions for all
              your plant care needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <RobotIcon className="w-10 h-10" />,
                title: "AI Disease Detection",
                description:
                  "Instant diagnosis of plant diseases with 95% accuracy using computer vision",
                // image: feature1,
              },
              {
                icon: <StatsIcon className="w-10 h-10" />,
                title: "Growth Analytics",
                description:
                  "Track and optimize plant growth with data-driven insights",
                // image: feature2,
              },
              {
                icon: <LightbulbIcon className="w-10 h-10" />,
                title: "Smart Recommendations",
                description:
                  "Personalized care plans based on plant species and environment",
                // image: feature3,
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="feature-card bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 transform hover:-translate-y-2"
              >
                <CardHeader className="pb-0">
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 mb-4">
                    {feature.description}
                  </CardDescription>
                  <div className="h-48 relative rounded-lg overflow-hidden border border-slate-800">
                    {/* <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    /> */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
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
