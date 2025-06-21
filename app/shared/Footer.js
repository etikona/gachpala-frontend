import React from "react";

const Footer = () => {
  return (
    <div className="bg-neutral-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <p className="text-center text-gray-600">
          &copy; {new Date().getFullYear()} GachPala. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
