"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Truck, Globe, Video, ShieldCheck, ArrowRight } from "lucide-react";

export default function Home() {
  const trustFeatures = [
    { icon: <ShieldCheck size={32} />, title: "Factory Direct", desc: "Unbeatable wholesale pricing directly from the manufacturer." },
    { icon: <Truck size={32} />, title: "PAN India COD", desc: "Cash on delivery available across all locations in India." },
    { icon: <Globe size={32} />, title: "Global Shipping", desc: "We export and ship worldwide to your business location." },
    { icon: <Video size={32} />, title: "Video Call Shopping", desc: "Book an appointment to see live samples with our team." },
  ];

  const categories = [
    { name: "Wholesale Kurtis", image: "https://images.unsplash.com/photo-1631541909061-71e34a360a03?q=80&w=800&auto=format&fit=crop", slug: "kurtis" },
    { name: "Designer Salwar Suits", image: "https://images.unsplash.com/photo-1616421571738-eb7f1b1356fc?q=80&w=800&auto=format&fit=crop", slug: "salwar-suits" },
    { name: "Traditional Sarees", image: "https://images.unsplash.com/photo-1610189031109-174092b3a992?q=80&w=800&auto=format&fit=crop", slug: "sarees" },
    { name: "Partywear Gowns", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop", slug: "gowns" },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[90vh] bg-bemitex-dark flex items-center">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1583391733958-d1531119d1f5?q=80&w=2000&auto=format&fit=crop"
            alt="Wholesale Textiles"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bemitex-dark to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Direct from Factory to <span className="text-bemitex-gold">Your Business</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 font-light">
              India's premier bulk manufacturer of Women's Ethnic Wear. Empowering boutiques and resellers with quality products and unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="bg-bemitex-gold text-bemitex-dark font-bold text-lg px-8 py-4 rounded hover:bg-white transition-colors text-center inline-flex justify-center items-center gap-2">
                View Wholesale Catalog <ArrowRight size={20} />
              </Link>
              <Link href="/video-call" className="bg-transparent border-2 border-white text-white font-bold text-lg px-8 py-4 rounded hover:bg-white/10 transition-colors text-center">
                Book Video Call
              </Link>
            </div>
            <div className="mt-8">
              <span className="inline-block bg-bemitex-maroon text-white font-bold px-4 py-2 rounded text-sm uppercase tracking-wider">
                B2B Wholesale Only
              </span>
            </div>
          </motion.div>
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
      <section className="py-24 bg-bemitex-maroon relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
          <Image src="/logo.jpg" alt="Watermark" width={600} height={600} className="rounded-full grayscale" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            Partner With India's Trusted Manufacturer
          </h2>
          <p className="text-xl text-bemitex-cream/80 mb-10 font-light">
            Whether you run a boutique, a retail chain, or are a home reseller, Bemitex India gives you the factory-direct advantage.
          </p>
          <Link href="/inquiry" className="bg-bemitex-gold text-bemitex-dark font-bold text-xl px-10 py-5 rounded-lg shadow-xl hover:bg-white hover:scale-105 transition-all inline-block">
            Submit Bulk Inquiry
          </Link>
        </div>
      </section>
    </div>
  );
}
