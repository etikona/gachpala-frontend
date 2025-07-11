"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation"; // Added useRouter
import Image from "next/image";
import logo from "../../public/assets/logo.png";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux"; // Added Redux hooks
import { logout } from "../store/authSlice.js"; // Added logout action

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/blogs", label: "Blogs" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter(); // Initialize router
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();

  // Get authentication state from Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const logoRef = useRef(null);
  const navRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.from(logoRef.current, { x: -50, opacity: 0, duration: 1 });
    gsap.from(navRef.current, { y: -30, opacity: 0, duration: 1, delay: 0.3 });
    gsap.from(buttonsRef.current, {
      x: 50,
      opacity: 0,
      duration: 1,
      delay: 0.6,
    });
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    // Clear cookies
    document.cookie = "token=; Max-Age=0; path=/";
    document.cookie = "loginType=; Max-Age=0; path=/";

    // Clear localStorage and Redux state
    localStorage.removeItem("user");
    dispatch(logout());

    // Redirect to home
    router.push("/");
  };

  return (
    <nav
      className={`w-full flex items-center justify-between md:px-20 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#14141b] shadow-md backdrop" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center hover:scale-105 transition-transform duration-200"
        ref={logoRef}
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

      {/* Desktop Nav */}
      <ul
        className="hidden md:flex flex-1 justify-center items-center space-x-8 text-sm font-medium"
        ref={navRef}
      >
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`transition-colors ${
                pathname === link.href
                  ? "text-[#8abe96] font-semibold"
                  : isScrolled
                  ? "text-white hover:text-[#8abe96]"
                  : "text-white hover:text-[#8abe96]"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Auth Buttons */}
      <div className="hidden md:flex items-center space-x-4" ref={buttonsRef}>
        {isAuthenticated ? (
          // Logout button when authenticated
          <Button
            onClick={handleLogout}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Logout
          </Button>
        ) : (
          // Login/Signup when not authenticated
          <>
            <Button
              asChild
              variant="ghost"
              className={`${
                isScrolled ? "text-green-600" : "text-green-300"
              } hover:text-green-700`}
            >
              <Link href="/login/user">Login</Link>
            </Button>
            <Button
              asChild
              className="bg-green-600 text-white hover:bg-green-700"
            >
              <Link href="/register/user">Sign Up</Link>
            </Button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${
                isScrolled ? "text-gray-800" : "text-white"
              } hover:bg-white/10`}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full max-w-xs backdrop-blur-md bg-white/80 dark:bg-black/60"
          >
            <SheetHeader>
              <SheetTitle className="text-left">
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
              </SheetTitle>
            </SheetHeader>
            <ul className="mt-6 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-1.5 px-4 text-base font-medium rounded-lg transition-colors ${
                      pathname === link.href
                        ? "bg-green-100 text-green-700"
                        : "text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-3 pt-4">
                {isAuthenticated ? (
                  <Button
                    onClick={handleLogout}
                    className="bg-red-600 text-white hover:bg-red-700 w-full"
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button
                      asChild
                      variant="ghost"
                      className="text-green-600 hover:text-green-800 w-full"
                    >
                      <Link href="/login/user">Login</Link>
                    </Button>
                    <Button
                      asChild
                      className="bg-green-600 text-white hover:bg-green-700 w-full"
                    >
                      <Link href="/register/user">Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
