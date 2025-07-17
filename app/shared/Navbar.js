"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux"; // Added Redux hooks
import { logout } from "../store/authSlice.js";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navbarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const animation = useRef(null);

  // Define navigation links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/blogs", label: "Blogs" },
    ...(user?.role === "admin" ? [{ href: "/admin", label: "Admin" }] : []),
    ...(user ? [{ href: "/dashboard", label: "Dashboard" }] : []),
  ];

  // Handle logout
  const handleLogout = () => {
    // Clear cookies
    document.cookie = "token=; Max-Age=0; path=/";
    document.cookie = "loginType=; Max-Age=0; path=/";

    // Clear localStorage and Redux state
    localStorage.removeItem("user");
    dispatch(logout());

    // Close mobile menu
    setIsOpen(false);

    // Redirect to home
    router.push("/");
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

  // Leaf icon SVG component
  const LeafIcon = ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 7.5L7.5 16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 10C8.5 8.5 10 7 12 7C14 7 15.5 8.5 16 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );

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
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <LeafIcon className="w-6 h-6 text-white" />
              </div>
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
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <span>{user.name}</span>
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
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white rounded-full px-4 py-2 font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
                >
                  <Link href="/signup">Sign Up</Link>
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
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <span>{user.name}</span>
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
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white rounded-full py-3 font-medium"
                >
                  <Link href="/signup">Sign Up</Link>
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

// "use client";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { Menu } from "lucide-react";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";

// import { useEffect, useRef, useState } from "react";
// import { usePathname, useRouter } from "next/navigation"; // Added useRouter
// import Image from "next/image";
// import logo from "../../public/assets/logo.png";
// import gsap from "gsap";
// import { useDispatch, useSelector } from "react-redux"; // Added Redux hooks
// import { logout } from "../store/authSlice.js"; // Added logout action

// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/shop", label: "Shop" },
//   { href: "/blogs", label: "Blogs" },
// ];

// export default function Navbar() {
//   const pathname = usePathname();
//   const router = useRouter(); // Initialize router
//   const [isScrolled, setIsScrolled] = useState(false);
//   const dispatch = useDispatch();

//   // Get authentication state from Redux
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   const logoRef = useRef(null);
//   const navRef = useRef(null);
//   const buttonsRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     gsap.from(logoRef.current, { x: -50, opacity: 0, duration: 1 });
//     gsap.from(navRef.current, { y: -30, opacity: 0, duration: 1, delay: 0.3 });
//     gsap.from(buttonsRef.current, {
//       x: 50,
//       opacity: 0,
//       duration: 1,
//       delay: 0.6,
//     });
//   }, []);

//   // Handle logout functionality
//   const handleLogout = () => {
//     // Clear cookies
//     document.cookie = "token=; Max-Age=0; path=/";
//     document.cookie = "loginType=; Max-Age=0; path=/";

//     // Clear localStorage and Redux state
//     localStorage.removeItem("user");
//     dispatch(logout());

//     // Redirect to home
//     router.push("/");
//   };

//   return (
//     <nav
//       className={`w-full flex items-center justify-between md:px-20 sticky top-0 z-50 transition-all duration-300 ${
//         isScrolled ? "bg-[#14141b] shadow-md backdrop" : "bg-transparent"
//       }`}
//     >
//       {/* Logo */}
//       <Link
//         href="/"
//         className="flex items-center hover:scale-105 transition-transform duration-200"
//         ref={logoRef}
//       >
//         <Image
//           src={logo}
//           alt="Gachpala Logo"
//           width={60}
//           height={60}
//           className="w-12 md:w-16 h-auto object-contain"
//           priority
//         />
//       </Link>

//       {/* Desktop Nav */}
//       <ul
//         className="hidden md:flex flex-1 justify-center items-center space-x-8 text-sm font-medium"
//         ref={navRef}
//       >
//         {navLinks.map((link) => (
//           <li key={link.href}>
//             <Link
//               href={link.href}
//               className={`transition-colors ${
//                 pathname === link.href
//                   ? "text-[#8abe96] font-semibold"
//                   : isScrolled
//                   ? "text-white hover:text-[#8abe96]"
//                   : "text-white hover:text-[#8abe96]"
//               }`}
//             >
//               {link.label}
//             </Link>
//           </li>
//         ))}
//       </ul>

//       {/* Auth Buttons */}
//       <div className="hidden md:flex items-center space-x-4" ref={buttonsRef}>
//         {isAuthenticated ? (
//           // Logout button when authenticated
//           <Button
//             onClick={handleLogout}
//             className="bg-red-600 text-white hover:bg-red-700"
//           >
//             Logout
//           </Button>
//         ) : (
//           // Login/Signup when not authenticated
//           <>
//             <Button
//               asChild
//               variant="ghost"
//               className={`${
//                 isScrolled ? "text-green-600" : "text-green-300"
//               } hover:text-green-700`}
//             >
//               <Link href="/login/user">Login</Link>
//             </Button>
//             <Button
//               asChild
//               className="bg-green-600 text-white hover:bg-green-700"
//             >
//               <Link href="/register/user">Sign Up</Link>
//             </Button>
//           </>
//         )}
//       </div>

//       {/* Mobile Menu */}
//       <div className="md:hidden">
//         <Sheet>
//           <SheetTrigger asChild>
//             <Button
//               variant="ghost"
//               size="icon"
//               className={`h-9 w-9 ${
//                 isScrolled ? "text-gray-800" : "text-white"
//               } hover:bg-white/10`}
//             >
//               <Menu className="h-5 w-5" />
//             </Button>
//           </SheetTrigger>
//           <SheetContent
//             side="right"
//             className="w-full max-w-xs backdrop-blur-md bg-white/80 dark:bg-black/60"
//           >
//             <SheetHeader>
//               <SheetTitle className="text-left">
//                 <Link
//                   href="/"
//                   className="flex items-center hover:scale-105 transition-transform duration-200"
//                 >
//                   <Image
//                     src={logo}
//                     alt="Gachpala Logo"
//                     width={60}
//                     height={60}
//                     className="w-12 md:w-16 h-auto object-contain"
//                     priority
//                   />
//                 </Link>
//               </SheetTitle>
//             </SheetHeader>
//             <ul className="mt-6 space-y-3">
//               {navLinks.map((link) => (
//                 <li key={link.href}>
//                   <Link
//                     href={link.href}
//                     className={`block py-1.5 px-4 text-base font-medium rounded-lg transition-colors ${
//                       pathname === link.href
//                         ? "bg-green-100 text-green-700"
//                         : "text-gray-800 hover:bg-gray-100"
//                     }`}
//                   >
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}

//               {/* Mobile Auth Buttons */}
//               <div className="flex flex-col space-y-3 pt-4">
//                 {isAuthenticated ? (
//                   <Button
//                     onClick={handleLogout}
//                     className="bg-red-600 text-white hover:bg-red-700 w-full"
//                   >
//                     Logout
//                   </Button>
//                 ) : (
//                   <>
//                     <Button
//                       asChild
//                       variant="ghost"
//                       className="text-green-600 hover:text-green-800 w-full"
//                     >
//                       <Link href="/login/user">Login</Link>
//                     </Button>
//                     <Button
//                       asChild
//                       className="bg-green-600 text-white hover:bg-green-700 w-full"
//                     >
//                       <Link href="/register/user">Sign Up</Link>
//                     </Button>
//                   </>
//                 )}
//               </div>
//             </ul>
//           </SheetContent>
//         </Sheet>
//       </div>
//     </nav>
//   );
// }
