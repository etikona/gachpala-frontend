"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HowItWorksSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".process-card");
      const numbers = gsap.utils.toArray(".step-number");

      // ✅ Animate cards
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // ✅ Animate step numbers
      gsap.fromTo(
        numbers,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      number: "01",
      title: "Intelligent Capture",
      description:
        "Advanced computer vision technology for optimal plant photography.",
    },
    {
      number: "02",
      title: "AI Analysis Engine",
      description:
        "Neural networks processing thousands of botanical characteristics.",
    },
    {
      number: "03",
      title: "Actionable Insights",
      description:
        "Personalized care recommendations and predictive analytics.",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-lg mb-6">
            <div className="w-2 h-2 bg-emerald-400 rounded-full" />
            <span className="text-emerald-300 font-medium text-sm uppercase">
              How It Works
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Three Steps to{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Plant Perfection
            </span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="process-card group relative opacity-100"
            >
              {" "}
              {/* ✅ Default visible */}
              <div className="relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-emerald-400/30 transition-all">
                <div className="step-number absolute -top-4 left-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold">{step.number}</span>
                  </div>
                </div>

                <div className="pt-10">
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="mt-6 w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 group-hover:w-12 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(HowItWorksSection);
