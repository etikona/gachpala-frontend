"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Register ScrollTrigger plugin only on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CTASection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-br from-slate-900 to-slate-950"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="cta-content opacity-0 text-center">
          {/* CTA Card */}
          <div className="relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Transform Your Garden{" "}
              <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                Today
              </span>
            </h2>

            <p className="text-gray-300 mb-8 text-lg">
              Join 100,000+ plant enthusiasts. Start your free 14-day trial.
            </p>

            {/* Email & Button */}
            <div className="max-w-md mx-auto space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
              />
              <Button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-lg">
                Start Free Trial
              </Button>
            </div>

            {/* Trust Indicator */}
            <div className="mt-8 text-sm text-gray-400">
              Free for 14 days • No credit card required
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(CTASection);
