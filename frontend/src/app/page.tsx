"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Globe, Video, ShieldCheck, ArrowRight } from "lucide-react";

export default function Home() {
  const trustFeatures = [
    { icon: <ShieldCheck size={32} />, title: "Factory Direct", desc: "Unbeatable wholesale pricing directly from the manufacturer." },
    { icon: <Truck size={32} />, title: "PAN India COD", desc: "Cash on delivery available across all locations in India." },
    { icon: <Globe size={32} />, title: "Global Shipping", desc: "We export and ship worldwide to your business location." },
    { icon: <Video size={32} />, title: "Video Call Shopping", desc: "Book an appointment to see live samples with our team." },
  ];

  const categories = [
    { name: "Wholesale Kurtis", image: "/images/kurti.jpg", slug: "kurtis" },
    { name: "Designer Salwar Suits", image: "/images/suit.jpg", slug: "salwar-suits" },
    { name: "Traditional Sarees", image: "/images/saree.jpg", slug: "sarees" },
    { name: "Partywear Gowns", image: "/images/gown.jpg", slug: "gowns" },
  ];

  const heroSlides = [
    {
      image: "/banners/banner_kurti.jpg",
      title: "Premium Wholesale Kurtis",
      titleColor: "text-bemitex-maroon",
      subtitle: "India's top ethnic wear collection direct from the factory.",
      ctaText: "Shop Kurtis",
      ctaLink: "/products?category=kurtis"
    },
    {
      image: "/banners/banner_suit.jpg",
      title: "Designer Salwar Suits",
      titleColor: "text-bemitex-dark",
      subtitle: "Elegant pastel collections with heavy embroidery.",
      ctaText: "Shop Suits",
      ctaLink: "/products?category=salwar-suits"
    },
    {
      image: "/banners/banner_saree.jpg",
      title: "Traditional Banarasi Sarees",
      titleColor: "text-bemitex-maroon",
      subtitle: "Authentic rich zari work and premium silk.",
      ctaText: "Shop Sarees",
      ctaLink: "/products?category=sarees"
    },
    {
      image: "/banners/banner_gown.jpg",
      title: "Heavy Bridal Gowns",
      titleColor: "text-bemitex-dark",
      subtitle: "Luxurious partywear for the modern boutique.",
      ctaText: "Shop Gowns",
      ctaLink: "/products?category=gowns"
    },
    {
      image: "/banners/banner_factory.jpg",
      title: "B2B Textile Manufacturing",
      titleColor: "text-bemitex-maroon",
      subtitle: "Quality and efficient wholesale manufacturing for your business.",
      ctaText: "Book Video Call",
      ctaLink: "/video-call"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 2500); // 2.5 seconds slider
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section Slider */}
      <section className="relative h-[80vh] md:h-[90vh] bg-white flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              fill
              className="object-cover"
              priority
            />
            {/* Soft gradient to make text readable on the left */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent w-full md:w-2/3"></div>
          </motion.div>
        </AnimatePresence>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-bemitex-dark mb-6 leading-tight">
                <span className={heroSlides[currentSlide].titleColor}>
                  {heroSlides[currentSlide].title}
                </span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 font-medium drop-shadow-sm">
                {heroSlides[currentSlide].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={heroSlides[currentSlide].ctaLink} className="bg-bemitex-maroon text-white font-bold text-lg px-8 py-4 rounded hover:bg-bemitex-dark transition-colors text-center inline-flex justify-center items-center gap-2 shadow-lg hover:scale-105 transform transition-transform">
                  {heroSlides[currentSlide].ctaText} <ArrowRight size={20} />
                </Link>
                <Link href="/video-call" className="bg-white/80 backdrop-blur-sm border-2 border-bemitex-dark text-bemitex-dark font-bold text-lg px-8 py-4 rounded hover:bg-gray-50 transition-colors text-center">
                  Book Video Call
                </Link>
              </div>
              <div className="mt-8">
                <span className="inline-block bg-bemitex-gold text-bemitex-dark font-bold px-4 py-2 rounded text-sm uppercase tracking-wider shadow-md">
                  B2B Wholesale Only
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Dots */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? "bg-bemitex-maroon w-8" : "bg-gray-400 w-2 hover:bg-gray-600"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFeatures.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center p-6 bg-bemitex-cream/30 rounded-xl"
              >
                <div className="text-bemitex-maroon mb-4 p-4 bg-white rounded-full shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-bemitex-dark mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-bemitex-cream/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-bemitex-dark mb-4">Wholesale Categories</h2>
            <div className="w-24 h-1 bg-bemitex-gold mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="relative h-96 rounded-xl overflow-hidden group cursor-pointer shadow-lg"
              >
                <Link href={`/products?category=${category.slug}`}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                    <span className="text-bemitex-gold font-medium flex items-center gap-1 group-hover:translate-x-2 transition-transform">
                      Explore Collection <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-200 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-1/4 translate-y-1/4">
          <Image src="/logo.jpg" alt="Watermark" width={600} height={600} className="rounded-full grayscale" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-bemitex-dark mb-6">
            Partner With India's Trusted Manufacturer
          </h2>
          <p className="text-xl text-gray-600 mb-10 font-light">
            Whether you run a boutique, a retail chain, or are a home reseller, Bemitex India gives you the factory-direct advantage.
          </p>
          <Link href="/inquiry" className="bg-bemitex-maroon text-white font-bold text-xl px-10 py-5 rounded-lg shadow-xl hover:bg-bemitex-dark hover:scale-105 transition-all inline-block">
            Submit Bulk Inquiry
          </Link>
        </div>
      </section>
    </div>
  );
}
