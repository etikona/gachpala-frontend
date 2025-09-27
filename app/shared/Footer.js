import React from "react";
import { LeafIcon } from "@/components/icons";
const Footer = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-slate-950 text-gray-100 overflow-hidden">
      <footer className="py-16 bg-slate-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-lg"></div>
            <span className="text-2xl font-bold text-white">Gachpala</span>
          </div>
          <p className="text-gray-400">
            Revolutionizing plant care with AI intelligence
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
