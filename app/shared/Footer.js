import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#0B0C0B] shadow-md  bottom-0 w-full">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <p className="text-center text-gray-600">
          &copy; {new Date().getFullYear()} GachPala. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
