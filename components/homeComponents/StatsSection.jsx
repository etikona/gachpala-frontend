"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StatsSection = () => {
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const numbers = gsap.utils.toArray(".stat-number");
      const cards = gsap.utils.toArray(".stat-card");

      // ✅ Number count animation with onUpdate
      numbers.forEach((el, i) => {
        const finalValue = [97, 75000, 99.8, 24][i];
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: finalValue,
            duration: 1.5,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            onUpdate: function () {
              el.textContent = Math.floor(el.textContent);
            },
          }
        );
      });

      // ✅ Card fade-in animation
      gsap.fromTo(
        cards,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, statsRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: "97", suffix: "%", label: "Accuracy Rate" },
    { value: "75000", suffix: "+", label: "Plants Analyzed" },
    { value: "99.8", suffix: "%", label: "User Satisfaction" },
    { value: "24", suffix: "/7", label: "AI Monitoring" },
  ];

  return (
    <section ref={statsRef} className="relative py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card text-center opacity-100">
              {/* ✅ Default opacity set to 100 to avoid invisible elements if JS fails */}
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-emerald-400/30 transition-colors">
                <div className="text-3xl lg:text-4xl font-bold mb-2">
                  <span className="stat-number bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                    0
                  </span>
                  <span className="text-emerald-400">{stat.suffix}</span>
                </div>
                <h3 className="text-white font-semibold text-sm">
                  {stat.label}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(StatsSection);
