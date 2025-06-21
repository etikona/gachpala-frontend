"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../public/assets/logo.png";
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/new-cars", label: "Shop" },
  { href: "/used-cars", label: "Blogs" },
  { href: "/sell-trade", label: "Sell/Trade" },
  { href: "/reviews", label: "Reviews" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="w-full flex items-center justify-between px-4 md:px-6 py-2 sticky top-0 z-50 transition-all duration-300">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center hover:scale-105 transition-transform duration-200"
      >
        <Image
          src={logo}
          alt="Gachpala Logo"
          width={60}
          height={60}
          className="w-12 md:w-16 h-auto object-contain"
          priority
        />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center space-x-6 text-sm font-medium">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`hover:font-semibold ${
                pathname === link.href
                  ? "text-[#8abe96] after:w-full after:bg-green-600"
                  : "text-gray-100 hover:text-[#8abe96] after:w-0 after:bg-gray-100 hover:after:w-full"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 hover:bg-gray-100 ${
                isScrolled ? "text-gray-800" : "text-gray-100"
              }`}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs bg-white">
            <SheetHeader>
              <SheetTitle className="text-left">
                <p className="text-xl text-[#8abe96] font-bold">Gachpala</p>
              </SheetTitle>
            </SheetHeader>
            <ul className="mt-6 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-1.5 px-4 text-base font-medium rounded-lg transition-colors ${
                      pathname === link.href
                        ? "bg-orange-100/50 text-orange-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
