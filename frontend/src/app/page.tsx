"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Globe, Video, ShieldCheck, ArrowRight, Star, CheckCircle, Package } from "lucide-react";

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

  const featuredProducts = [
    { id: 1, name: "Premium Anarkali Kurti", price: "₹450 / piece", moq: "12 pcs", image: "/products/prod_anarkali.jpg" },
    { id: 2, name: "Georgette Designer Suit", price: "₹1,250 / piece", moq: "6 pcs", image: "/products/prod_suit.jpg" },
    { id: 3, name: "Banarasi Silk Saree", price: "₹1,850 / piece", moq: "8 pcs", image: "/products/prod_saree.jpg" },
    { id: 4, name: "Heavy Bridal Gown", price: "₹3,500 / piece", moq: "4 pcs", image: "/products/prod_gown.jpg" },
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
    }, 4000); // 4 seconds slider
    return () => clearInterval(timer);
  }, [heroSlides.length]);

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
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-bemitex-dark mb-4 md:mb-6 leading-tight">
                <span className={heroSlides[currentSlide].titleColor}>
                  {heroSlides[currentSlide].title}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 mb-6 md:mb-8 font-medium drop-shadow-sm">
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
      <section className="py-20 bg-white">
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
                    <span className="text-white font-medium flex items-center gap-1 group-hover:translate-x-2 transition-transform">
                      Explore Collection <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-bemitex-dark mb-4">Featured Products</h2>
              <div className="w-24 h-1 bg-bemitex-gold"></div>
            </div>
            <Link href="/products" className="hidden md:flex items-center gap-2 text-bemitex-maroon font-bold hover:text-bemitex-dark transition-colors">
              View All Catalog <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-bemitex-maroon shadow-sm">
                    MOQ: {product.moq}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex text-bemitex-gold mb-2">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                  <h3 className="text-lg font-bold text-bemitex-dark mb-2 line-clamp-1">{product.name}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-bemitex-maroon font-bold text-xl">{product.price}</span>
                  </div>
                  <Link href="/inquiry" className="mt-4 w-full block text-center bg-gray-50 border border-gray-200 text-bemitex-dark font-medium py-2 rounded hover:bg-bemitex-maroon hover:text-white transition-colors">
                    Inquire Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/products" className="inline-flex items-center gap-2 text-bemitex-maroon font-bold hover:text-bemitex-dark transition-colors">
              View All Products <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-bemitex-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/banners/banner_factory.jpg" alt="Factory" fill className="object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight">Why Partner With<br/><span className="text-white">Bemitex India?</span></h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                With years of expertise in textile manufacturing, we provide businesses with high-quality ethnic wear at unbeatable factory-direct prices. Our state-of-the-art facility in Surat ensures every piece meets strict quality standards before it reaches your boutique or retail store.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-4xl font-bold text-white mb-2">500+</h4>
                  <p className="text-gray-400">Happy B2B Clients</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-white mb-2">10k+</h4>
                  <p className="text-gray-400">Designs Manufactured</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-white mb-2">100%</h4>
                  <p className="text-gray-400">Quality Assurance</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-white mb-2">PAN India</h4>
                  <p className="text-gray-400">Delivery Network</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative h-64 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
              <Image src="/banners/banner_suit.jpg" alt="Bemitex Quality" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-bemitex-dark mb-4">How To Order</h2>
            <div className="w-24 h-1 bg-bemitex-gold mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Simple, transparent, and completely professional ordering process tailored for your business needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-10 right-10 h-0.5 bg-gray-300 -z-10"></div>
            
            {[
              { icon: <Package size={32} />, title: "1. Browse Catalog", desc: "Explore our wide range of wholesale ethnic wear collections." },
              { icon: <Video size={32} />, title: "2. Video Call / Inquiry", desc: "Book a live video call to see samples or send a bulk inquiry." },
              { icon: <CheckCircle size={32} />, title: "3. Confirm Order", desc: "Finalize your selection, quantities, and receive the invoice." },
              { icon: <Truck size={32} />, title: "4. Fast Delivery", desc: "Goods dispatched with tracking. COD available across India." }
            ].map((step, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-bemitex-maroon shadow-lg border-4 border-gray-50 mb-6 relative z-10">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-bemitex-dark mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 bg-gray-50 border-t border-gray-200 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-1/4 translate-y-1/4">
          <Image src="/logo.jpg" alt="Watermark" width={600} height={600} className="rounded-full grayscale" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-bemitex-dark mb-6">
            Partner With India&apos;s Trusted Manufacturer
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
