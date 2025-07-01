"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import hero from "../public/assets/hero.png";

const HomePage = () => {
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const animationPlayed = useRef(false);

  useEffect(() => {
    // Check if animation has already played
    if (sessionStorage.getItem("homeAnimationPlayed")) {
      // Set elements to final visible state immediately
      gsap.set(
        [
          headingRef.current,
          paraRef.current,
          buttonRef.current,
          imageRef.current,
        ],
        {
          opacity: 1,
          y: 0,
          scale: 1,
        }
      );
      return;
    }

    // Run animation only if it hasn't played before
    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 1 },
    });

    tl.fromTo(headingRef.current, { y: -50, opacity: 0 }, { y: 0, opacity: 1 })
      .fromTo(
        paraRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.5"
      )
      .fromTo(
        buttonRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1 },
        "-=0.5"
      )
      .fromTo(
        imageRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.5"
      );

    // Mark animation as played in session storage
    sessionStorage.setItem("homeAnimationPlayed", "true");
    animationPlayed.current = true;

    // Cleanup function
    return () => {
      if (tl) tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1
        ref={headingRef}
        className="mt-6 text-3xl font-bold text-gray-300 light:text-gray-800 opacity-0"
      >
        Welcome to Gachpala
      </h1>

      <div ref={paraRef} className="max-w-3xl mt-4 opacity-0">
        <p className="text-lg font-semibold text-gray-400 dark:text-gray-200 text-justify">
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
          className="px-6 py-3 text-green-600 border border-green-600 rounded-full bg-transparent hover:bg-green-100 hover:font-semibold transition-colors duration-300 opacity-0"
        >
          Get Started
        </button>
      </div>

      <div className="flex items-center justify-center w-full mt-6">
        <div ref={imageRef} className="opacity-0">
          <Image src={hero} alt="Hero Image" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
