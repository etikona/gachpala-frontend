import React from "react";
import { LeafIcon } from "@/components/icons";
const Footer = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-slate-950 text-gray-100 overflow-hidden">
      <footer className="py-12 border-t border-slate-800 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <LeafIcon className="text-emerald-400 w-6 h-6" />
              <span className="text-xl font-bold">Gachpala</span>
            </div>
            <div className="flex gap-8 text-gray-400">
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Gachpala. All rights reserved.
          </div>
        </div>
      </footer>
      ;
    </div>
  );
};

export default Footer;
