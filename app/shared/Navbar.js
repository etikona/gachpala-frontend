// components/Navbar.js
"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice.js";
import { authAPI } from "../services/api.js";
import Image from "next/image.js";
import logo from "../../public/assets/icon.png";
import toast from "react-hot-toast";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, loginType } = useSelector((state) => state.auth);
  const navbarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const animation = useRef(null);
  const [token, setToken] = useState(null);
  // Define navigation links based on user role
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/blogs", label: "Blogs" },
    ...(user?.role === "admin"
      ? [{ href: "/admin/dashboard", label: "Admin Dashboard" }]
      : []),
    ...(user?.role === "seller"
      ? [{ href: "/seller/dashboard", label: "Seller Dashboard" }]
      : []),
    ...(user?.role === "user"
      ? [{ href: "/user/dashboard", label: "Dashboard" }]
      : []),
  ];

  // Enhanced logout function with API call
  // components/Navbar.js - Updated handleLogout function
  const handleLogout = async () => {
    try {
      if (token) {
        try {
          // Try to call the logout API
          await authAPI.logout(token);
          toast.success("Logged out successfully");
        } catch (apiError) {
          console.warn(
            "Logout API call failed, but continuing with client-side logout:",
            apiError
          );
          toast.success("Logged out locally");
        }
      }
    } catch (error) {
      console.error("Unexpected logout error:", error);
      toast.error("Logout error");
    } finally {
      // Always clear client-side data regardless of API success
      if (typeof window !== "undefined") {
        // Clear cookies
        document.cookie = "token=; Max-Age=0; path=/";
        document.cookie = "loginType=; Max-Age=0; path=/";

        // Clear localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("loginType");
        localStorage.removeItem("admin");
        localStorage.removeItem("seller");
      }

      // Clear Redux state
      dispatch(logout());

      // Reset local token state
      setToken(null);

      // Close mobile menu
      setIsOpen(false);

      // Redirect to home
      router.push("/");
      router.refresh();
    }
  };

  // GSAP animation for navbar entrance
  useEffect(() => {
    if (animation.current) animation.current.kill();

    gsap.set(navbarRef.current, { opacity: 1, y: 0 });

    animation.current = gsap.from(navbarRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.5,
      onComplete: () => {
        gsap.set(navbarRef.current, { clearProps: "all" });
      },
    });

    return () => {
      if (animation.current) animation.current.kill();
    };
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      ref={navbarRef}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/90 backdrop-blur-lg border-b border-slate-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group">
              <Image src={logo} alt="Gachpala Logo" className="w-6 h-6" />
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Gachpala
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  pathname === item.href
                    ? "text-emerald-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400 to-teal-300"
                    layoutId="navbar-underline"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* User Actions - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 flex items-center justify-center">
                    <span className="font-bold text-white text-xs">
                      {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
                    </span>
                  </div>
                  <span>{user.name || user.email}</span>
                  <span className="text-xs text-emerald-400 capitalize">
                    ({loginType})
                  </span>
                </div>
                <Button
                  onClick={handleLogout}
                  className="bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-full px-4 py-2 font-medium transition-colors duration-300"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="outline"
                  className="border-gray-700 hover:bg-slate-800 text-white rounded-full px-4 py-2"
                >
                  <Link href="/login/user">Login</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white rounded-full px-4 py-2 font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
                >
                  <Link href="/register/user">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-slate-900/95 backdrop-blur-lg border-b border-slate-800"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? "text-emerald-400 bg-slate-800/50"
                    : "text-gray-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile User Actions */}
            {user ? (
              <div className="pt-2 px-3 space-y-3">
                <div className="flex items-center gap-3 text-gray-300 px-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 flex items-center justify-center">
                    <span className="font-bold text-white text-xs">
                      {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
                    </span>
                  </div>
                  <div>
                    <p>{user.name || user.email}</p>
                    <p className="text-xs text-emerald-400 capitalize">
                      {loginType}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleLogout}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-full py-3"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="pt-2 px-3 space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-gray-700 hover:bg-slate-800 text-white rounded-full py-3"
                >
                  <Link href="/login/user">User Login</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-gray-700 hover:bg-slate-800 text-white rounded-full py-3"
                >
                  <Link href="/login/seller">Seller Login</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-gray-700 hover:bg-slate-800 text-white rounded-full py-3"
                >
                  <Link href="/login/admin">Admin Login</Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white rounded-full py-3 font-medium"
                >
                  <Link href="/register/user">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
