// app/page.js (Enhanced Landing Page)
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

const ShopLandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-100/80 to-transparent"></div>
          <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-amber-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge
                variant="secondary"
                className="bg-emerald-100 text-emerald-800 mb-4"
              >
                Bringing nature indoors
              </Badge>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-emerald-900 mb-6 leading-tight">
                Find Your Perfect{" "}
                <span className="text-emerald-600">Green Companion</span>
              </h1>
              <p className="text-lg text-emerald-800 max-w-xl mb-10">
                Carefully nurtured plants delivered to your doorstep. Create
                your personal oasis with our collection of premium indoor
                plants.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200"
                >
                  <Link href="/shop/products">Shop Plants</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                >
                  <span>Plant Care Guide</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="mt-12 flex items-center gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex flex-col">
                    <span className="text-2xl font-bold text-emerald-700">
                      100+
                    </span>
                    <span className="text-sm text-emerald-600">
                      Plant Species
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-square bg-emerald-100/50 rounded-2xl overflow-hidden border-8 border-white shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-emerald-300 w-64 h-64 rounded-full"></div>
                  <div className="absolute w-48 h-48 bg-emerald-500 rounded-full"></div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-100 rounded-2xl border-4 border-white shadow-lg z-10">
                <div className="flex items-center justify-center h-full">
                  <div className="bg-emerald-400 w-16 h-16 rounded-full"></div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-100 rounded-2xl border-4 border-white shadow-lg z-10">
                <div className="flex items-center justify-center h-full">
                  <div className="bg-amber-400 w-10 h-10 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-2xl font-serif font-bold text-emerald-900 mb-2">
                Featured Collections
              </h2>
              <p className="text-emerald-700 max-w-lg">
                Curated selections for every space and lifestyle
              </p>
            </div>
            <Button
              variant="link"
              className="text-emerald-600 hover:text-emerald-800 p-0"
            >
              View All Collections <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Low Light Heroes",
                desc: "Thrives in dim corners",
                count: "24 plants",
                color: "bg-emerald-500",
              },
              {
                title: "Pet Safe Picks",
                desc: "Non-toxic for furry friends",
                count: "18 plants",
                color: "bg-amber-500",
              },
              {
                title: "Air Purifying Stars",
                desc: "Clean your indoor air",
                count: "32 plants",
                color: "bg-teal-500",
              },
            ].map((collection, i) => (
              <div
                key={i}
                className={`relative rounded-2xl overflow-hidden group ${
                  i === 0 ? "md:row-span-2" : ""
                }`}
              >
                <div
                  className={`${collection.color}/10 h-full p-8 flex flex-col justify-between`}
                >
                  <div>
                    <h3 className="text-xl font-serif font-bold text-emerald-900 mb-2">
                      {collection.title}
                    </h3>
                    <p className="text-emerald-700 mb-4">{collection.desc}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-sm text-emerald-600">
                      {collection.count}
                    </span>
                    <Button
                      variant="ghost"
                      className="text-emerald-700 group-hover:underline p-0"
                    >
                      Shop now <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 w-32 h-32 rounded-full opacity-20 group-hover:opacity-30 transition-all duration-300">
                  <div
                    className={`${collection.color} w-full h-full rounded-full`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-emerald-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-emerald-900 mb-4">
              Why Choose GreenLeaf?
            </h2>
            <p className="text-emerald-700">
              We're more than just a plant shop - we are your partners in
              creating a greener, healthier living space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Sustainable Sourcing",
                desc: "Ethically grown plants from eco-conscious nurseries",
                icon: "🌱",
              },
              {
                title: "Plant Experts",
                desc: "Personalized care advice with every purchase",
                icon: "👩‍🌾",
              },
              {
                title: "Fast & Safe Shipping",
                desc: "Carefully packaged and climate-controlled delivery",
                icon: "🚚",
              },
              {
                title: "30-Day Health Guarantee",
                desc: "We stand by the health of every plant we send",
                icon: "✅",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-emerald-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-emerald-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-emerald-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-emerald-900 mb-4">
              What Our Plant Parents Say
            </h2>
            <p className="text-emerald-700">
              Join thousands of happy customers who have transformed their
              spaces with our plants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100"
              >
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-amber-400">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-emerald-800 mb-6 italic">
                  "My Monstera arrived in perfect condition and has already
                  grown two new leaves! The care instructions were incredibly
                  helpful."
                </p>
                <div className="flex items-center">
                  <div className="bg-emerald-200 w-10 h-10 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium text-emerald-900">Alexandra P.</p>
                    <p className="text-sm text-emerald-600">Plant Enthusiast</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Join the Green Community
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-emerald-100">
              Get plant care tips, exclusive offers, and inspiration delivered
              to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder:text-emerald-100 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button
                size="lg"
                className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-lg"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopLandingPage;
