// app/page.js (Enhanced with Advanced Animations - No Emojis)
"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  Leaf,
  Star,
  Heart,
  Shield,
  ChevronLeft,
  Users,
  Sprout,
  CheckCircle,
  Moon,
  PawPrint,
  Wind,
  ShoppingCart,
  BookOpen,
  Truck,
  Award,
  UserCheck,
  Palette,
  Home,
} from "lucide-react";
import shop from "../../public/assets/shop-hero.png";
import air from "../../public/assets/air-purifying.png";
import pet from "../../public/assets/pet-friendly.png";
import low from "../../public/assets/low-light.png";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ShopLandingPage = () => {
  const heroRef = useRef(null);
  const collectionsRef = useRef(null);
  const benefitsRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // HERO TIMELINE
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-badge",
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1 }
      )
        .fromTo(
          ".hero-title",
          { y: 50, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.2 },
          "-=0.5"
        )
        .fromTo(
          ".hero-description",
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1 },
          "-=0.4"
        )
        .fromTo(
          ".hero-buttons",
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1 },
          "-=0.3"
        )
        .fromTo(
          ".hero-stats",
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.8 },
          "-=0.2"
        )
        .fromTo(
          ".hero-main-image",
          { scale: 0.8, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 1.5, ease: "back.out(1.2)" },
          "-=0.6"
        );

      // COLLECTIONS SCROLL
      gsap.fromTo(
        ".collection-card",
        { y: 80, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: collectionsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // BENEFITS SCROLL
      gsap.fromTo(
        ".benefit-card",
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // TESTIMONIALS SCROLL
      gsap.fromTo(
        ".testimonial-card",
        { scale: 0.9, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Animated particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="bg-particle absolute w-1 h-1 bg-emerald-400/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Morphing blobs */}
        <div className="morph-blob absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/3 rounded-full blur-3xl" />
        <div className="morph-blob absolute top-3/4 right-1/4 w-80 h-80 bg-emerald-500/2 rounded-full blur-3xl" />
        <div className="morph-blob absolute bottom-1/4 left-1/3 w-48 h-48 bg-emerald-500/4 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-32 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      >
        {/* Enhanced background effects */}
        <div className="absolute inset-0 z-0">
          <div className="parallax-slow absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-700/10 to-transparent"></div>
          <div className="parallax-fast absolute top-20 left-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>

          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                backgroundSize: "20px 20px",
              }}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <Badge
                variant="secondary"
                className="hero-badge bg-slate-800/60 text-slate-300 border-slate-700/50 px-6 py-3 backdrop-blur-sm hover:bg-slate-700/60 transition-colors duration-300"
              >
                <Leaf className="w-4 h-4 mr-2" />
                Bringing nature indoors
              </Badge>

              <h1 className="hero-title text-5xl md:text-7xl font-bold text-white leading-tight">
                Find Your Perfect{" "}
                <span className="text-emerald-400 relative">
                  Green Companion
                  <div className="absolute -inset-2 bg-emerald-400/5 rounded-lg blur-sm -z-10" />
                </span>
              </h1>

              <p className="hero-description text-xl text-slate-400 max-w-xl leading-relaxed">
                Carefully nurtured plants delivered to your doorstep. Create
                your personal oasis with our collection of premium indoor
                plants.
              </p>

              <div className="hero-buttons flex flex-wrap gap-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg px-8 py-4 text-lg font-semibold transform hover:scale-105 hover:shadow-emerald-500/25 transition-all duration-300 group"
                >
                  <Link href="/shop/products">
                    <div className="flex items-center">
                      <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      <span className="ml-2">Shop Plants</span>
                    </div>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500 px-8 py-4 text-lg font-semibold backdrop-blur-sm hover:backdrop-blur-md transition-all duration-300 group"
                >
                  <Link href="/plant-health" className="flex items-center">
                    <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="ml-2">Plant Care Guide</span>
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>

              <div className="mt-16 flex items-center gap-12">
                {[
                  {
                    number: "2.5K+",
                    label: "Happy Customers",
                    icon: Users,
                    color: "text-blue-400",
                  },
                  {
                    number: "150+",
                    label: "Plant Species",
                    icon: Sprout,
                    color: "text-green-400",
                  },
                  {
                    number: "99%",
                    label: "Survival Rate",
                    icon: CheckCircle,
                    color: "text-emerald-400",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="hero-stats text-center group cursor-pointer hover:bg-slate-800/30 rounded-xl p-4 transition-all duration-300"
                  >
                    <div className="mb-2 flex justify-center">
                      <stat.icon
                        className={`w-8 h-8 ${stat.color} group-hover:scale-125 group-hover:rotate-12 transition-all duration-300`}
                      />
                    </div>
                    <span className="text-3xl font-bold text-slate-200 block">
                      {stat.number}
                    </span>
                    <p className="text-sm text-slate-500 font-medium mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative lg:pl-12">
              <div className="relative">
                {/* Orbital container for floating icons */}
                <div className="orbital-container absolute inset-0 w-96 h-96 mx-auto">
                  {/* Orbital icons */}
                  <div className="orbital-icon absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-700 hover:border-emerald-500 hover:scale-110 transition-all duration-300 cursor-pointer group">
                    <Star className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300" />
                  </div>
                  <div className="orbital-icon absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-700 hover:border-emerald-500 hover:scale-110 transition-all duration-300 cursor-pointer group">
                    <Heart className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300" />
                  </div>
                  <div className="orbital-icon absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-700 hover:border-emerald-500 hover:scale-110 transition-all duration-300 cursor-pointer group">
                    <Shield className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300" />
                  </div>
                  <div className="orbital-icon absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-700 hover:border-emerald-500 hover:scale-110 transition-all duration-300 cursor-pointer group">
                    <Leaf className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300" />
                  </div>
                </div>

                {/* Main image with enhanced effects */}
                <div className="hero-main-image relative w-96 h-96 mx-auto">
                  <div className="absolute inset-0 bg-emerald-400/10 rounded-full blur-2xl animate-pulse"></div>
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-slate-700 shadow-2xl hover:border-emerald-500/50 transition-all duration-500 group">
                    <Image
                      src={shop}
                      alt="Shop Plants"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Enhanced floating elements */}
                <div className="floating-element absolute -bottom-8 -left-8 w-32 h-32 bg-slate-800 rounded-3xl border border-slate-700 shadow-xl z-10 flex items-center justify-center group hover:rotate-12 hover:scale-110 hover:bg-slate-700 transition-all duration-300 cursor-pointer">
                  <div className="bg-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:rotate-[-12deg] transition-transform duration-300">
                    <Leaf className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="floating-element absolute -top-8 -right-8 w-28 h-28 bg-slate-800 rounded-3xl border border-slate-700 shadow-xl z-10 flex items-center justify-center group hover:-rotate-12 hover:scale-110 hover:bg-slate-700 transition-all duration-300 cursor-pointer">
                  <div className="bg-slate-600 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="floating-element absolute top-1/2 -right-4 w-24 h-24 bg-slate-800 rounded-3xl border border-slate-700 shadow-xl z-10 flex items-center justify-center group hover:scale-125 hover:bg-slate-700 transition-all duration-300 cursor-pointer">
                  <div className="bg-amber-600 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section
        ref={collectionsRef}
        className="section-reveal py-24 px-4 bg-slate-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white">
                Featured Collections
              </h2>
              <p className="text-slate-400 max-w-lg text-lg">
                Curated selections for every space and lifestyle
              </p>
            </div>
            <Button
              variant="ghost"
              className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 p-3 text-lg font-semibold group"
            >
              <Link href="/shop/products" className="flex items-center">
                View All Collections
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Low Light Heroes",
                desc: "Perfect for dim corners and offices",
                count: "24 plants",
                img: low,
                icon: Moon,
                iconColor: "text-purple-400",
              },
              {
                title: "Pet Safe Picks",
                desc: "100% safe for your furry friends",
                count: "18 plants",
                img: pet,
                icon: PawPrint,
                iconColor: "text-orange-400",
              },
              {
                title: "Air Purifying Stars",
                desc: "NASA-approved air cleaners",
                count: "32 plants",
                img: air,
                icon: Wind,
                iconColor: "text-blue-400",
              },
            ].map((collection, i) => (
              <div
                key={i}
                className="collection-card relative rounded-3xl overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 bg-slate-900 border border-slate-700/50 hover:border-slate-600"
                style={{ minHeight: "380px" }}
              >
                <div className="h-full p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-800 group-hover:bg-slate-700 transition-colors duration-300">
                        <collection.icon
                          className={`w-6 h-6 ${collection.iconColor} group-hover:scale-125 group-hover:rotate-12 transition-all duration-300`}
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-emerald-100 transition-colors duration-300">
                        {collection.title}
                      </h3>
                    </div>
                    <p className="text-slate-400 text-lg leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                      {collection.desc}
                    </p>
                  </div>

                  <div className="flex justify-between items-end mt-8">
                    <span className="text-sm text-slate-500 font-semibold bg-slate-800/60 px-3 py-1 rounded-full group-hover:bg-slate-700 transition-colors duration-300">
                      {collection.count}
                    </span>
                    <div className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 p-0 h-auto group-hover:underline font-semibold text-lg">
                      <ChevronLeft className="ml-2 h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 w-36 h-36 rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-slate-700/50">
                  <Image
                    src={collection.img}
                    alt={collection.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Enhanced decorative elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400/60 rounded-full group-hover:scale-150 group-hover:bg-emerald-400 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        ref={benefitsRef}
        className="section-reveal py-24 px-4 bg-slate-900"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-white mb-6">
              Why Choose GreenLeaf?
            </h2>
            <p className="text-slate-400 text-xl leading-relaxed">
              We are more than just a plant shop - we are your partners in
              creating a greener, healthier living space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Sustainable Sourcing",
                desc: "Ethically grown plants from eco-conscious nurseries worldwide",
                icon: Sprout,
                iconColor: "text-green-400",
                bgColor: "bg-green-400/10",
              },
              {
                title: "Plant Experts",
                desc: "24/7 personalized care advice with every single purchase",
                icon: UserCheck,
                iconColor: "text-blue-400",
                bgColor: "bg-blue-400/10",
              },
              {
                title: "Fast & Safe Shipping",
                desc: "Climate-controlled delivery with tracking in 2-3 days",
                icon: Truck,
                iconColor: "text-orange-400",
                bgColor: "bg-orange-400/10",
              },
              {
                title: "30-Day Health Guarantee",
                desc: "Money-back guarantee on every plants health and vitality",
                icon: Award,
                iconColor: "text-purple-400",
                bgColor: "bg-purple-400/10",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="benefit-card bg-slate-800 rounded-3xl p-8 shadow-lg hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500 border border-slate-700/50 group hover:scale-105 hover:bg-slate-750 cursor-pointer hover:border-slate-600"
              >
                <div
                  className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500`}
                >
                  <feature.icon
                    className={`w-8 h-8 ${feature.iconColor} group-hover:rotate-12 transition-all duration-500`}
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-100 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        ref={testimonialsRef}
        className="section-reveal py-24 px-4 bg-slate-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-white mb-6">
              What Our Plant Parents Say
            </h2>
            <p className="text-slate-400 text-xl">
              Join thousands of happy customers who have transformed their
              spaces with our plants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                review:
                  "My Monstera arrived in perfect condition and has already grown two new leaves! The care instructions were incredibly detailed and helpful. Best plant purchase ever!",
                name: "Alexandra P.",
                role: "Plant Enthusiast",
                avatar: Users,
                avatarColor: "text-pink-400",
                avatarBg: "bg-pink-400/10",
              },
              {
                review:
                  "Outstanding quality and service. The plants are healthy and absolutely beautiful. My clients are always impressed with the greenery in my designs!",
                name: "Marcus R.",
                role: "Interior Designer",
                avatar: Palette,
                avatarColor: "text-purple-400",
                avatarBg: "bg-purple-400/10",
              },
              {
                review:
                  "Fast shipping and excellent packaging. My apartment feels like a jungle paradise now! The air quality has improved dramatically. Highly recommended!",
                name: "Sarah K.",
                role: "Urban Gardener",
                avatar: Home,
                avatarColor: "text-green-400",
                avatarBg: "bg-green-400/10",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="testimonial-card bg-slate-900 rounded-3xl p-8 border border-slate-700/50 shadow-lg hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500 group hover:scale-105 cursor-pointer hover:border-slate-600"
              >
                <div className="flex items-center mb-6">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-5 h-5 text-amber-400 fill-amber-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-slate-300 mb-8 italic text-lg leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                  {testimonial.review}
                </p>
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 ${testimonial.avatarBg} rounded-full flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    <testimonial.avatar
                      className={`w-6 h-6 ${testimonial.avatarColor}`}
                    />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg group-hover:text-emerald-100 transition-colors duration-300">
                      {testimonial.name}
                    </p>
                    <p className="text-slate-500 font-medium">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopLandingPage;
