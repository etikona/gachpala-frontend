import Image from "next/image";
import React from "react";
import hero from "../public/assets/hero.png"; // Adjust the path if needed

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="mt-6 text-3xl font-bold text-gray-300 light:text-gray-800">
        Welcome to Gachpala
      </h1>
      <div className="max-w-3xl mt-4">
        <p className="font-sans text-lg font-semibold text-gray-400 dark:text-gray-200">
          Gachpala is your smart companion for plant analysis and care. Our
          advanced plant health monitoring tools help you diagnose garden issues
          and optimize growth. Discover a wide range of healthy indoor and
          outdoor plants curated for every space. Whether you're a plant parent,
          a gardener, or looking to buy plants online, Gachpala offers reliable
          plant analytics and a seamless plant shopping experience. Explore,
          analyze, and grow with Gachpala — your one-stop shop for smart plant
          solutions.
        </p>
      </div>

      {/* Get Started Button */}
      <div className="mt-6">
        <button className="px-6 py-3 text-green-600 border border-green-600 rounded-full bg-transparent hover:bg-green-100 hover:font-semibold transition-colors duration-300">
          Get Started
        </button>
      </div>
      {/* Hero Image */}
      <div className="flex items-center justify-center w-full">
        <Image src={hero} alt="Hero Image" />
      </div>

      {/* Heading */}

      {/* Description Paragraph */}
    </div>
  );
};

export default HomePage;
