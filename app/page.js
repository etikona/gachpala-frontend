"use client"; // Only for Next.js App Router (if using it)

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import hero from "../public/assets/hero.png";

const HomePage = () => {
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 1 } });

    tl.from(headingRef.current, { y: -50, opacity: 0 })
      .from(paraRef.current, { y: 20, opacity: 0 }, "-=0.5")
      .from(buttonRef.current, { scale: 0.8, opacity: 0 }, "-=0.5")
      .from(imageRef.current, { y: 30, opacity: 0 }, "-=0.5");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1
        ref={headingRef}
        className="mt-6 text-3xl font-bold text-gray-300 light:text-gray-800"
      >
        Welcome to Gachpala
      </h1>

      <div ref={paraRef} className="max-w-3xl mt-4">
        <p className="font-sans text-lg font-semibold text-gray-400 dark:text-gray-200">
          Gachpala is your smart companion for plant analysis and care. Our
          advanced plant health monitoring tools help you diagnose garden issues
          and optimize growth. Discover a wide range of healthy indoor and
          outdoor plants curated for every space. Whether you are a plant
          parent, a gardener, or looking to buy plants online, Gachpala offers
          reliable plant analytics and a seamless plant shopping experience.
          Explore, analyze, and grow with Gachpala — your one-stop shop for
          smart plant solutions.
        </p>
      </div>

      <div className="mt-6">
        <button
          ref={buttonRef}
          className="px-6 py-3 text-green-600 border border-green-600 rounded-full bg-transparent hover:bg-green-100 hover:font-semibold transition-colors duration-300"
        >
          Get Started
        </button>
      </div>

      <div className="flex items-center justify-center w-full mt-6">
        <div ref={imageRef}>
          <Image src={hero} alt="Hero Image" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
