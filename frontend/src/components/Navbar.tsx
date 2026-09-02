"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24 relative">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden flex-1">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-bemitex-dark hover:text-bemitex-maroon p-2 -ml-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Left Nav */}
          <div className="hidden md:flex items-center space-x-8 flex-1">
            <Link href="/" className="text-gray-600 hover:text-bemitex-maroon font-medium transition-colors">Home</Link>
            <Link href="/products" className="text-gray-600 hover:text-bemitex-maroon font-medium transition-colors">Catalog</Link>
            <Link href="/how-it-works" className="text-gray-600 hover:text-bemitex-maroon font-medium transition-colors">How It Works</Link>
          </div>

          {/* Center Overhanging Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2 md:top-4 z-50 flex flex-col items-center pointer-events-none">
            <Link href="/" className="pointer-events-auto flex flex-col items-center group">
              <div className="relative w-16 h-16 md:w-32 md:h-32 bg-white rounded-full p-1 md:p-2 shadow-md border border-gray-100 group-hover:shadow-lg transition-shadow">
                <Image
                  src="/logo.jpg"
                  alt="Bemitex Logo"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <span className="text-lg md:text-2xl font-serif text-bemitex-maroon font-bold whitespace-nowrap mt-1 md:mt-2 drop-shadow-sm bg-white/90 px-3 py-0.5 rounded-full backdrop-blur-sm">Bemitex India</span>
            </Link>
          </div>

          {/* Desktop Right Nav */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-end">
            <Link href="/about" className="text-gray-600 hover:text-bemitex-maroon font-medium transition-colors">About Us</Link>
            <Link href="/contact" className="text-gray-600 hover:text-bemitex-maroon font-medium transition-colors">Contact</Link>
            <Link
              href="/inquiry"
              className="bg-bemitex-maroon text-white px-6 py-2 rounded-md font-semibold hover:bg-bemitex-dark transition-colors shadow-sm hover:shadow flex items-center gap-2"
            >
              <PhoneCall size={18} />
              Bulk Inquiry
            </Link>
          </div>

          {/* Mobile Right Action */}
          <div className="flex items-center md:hidden flex-1 justify-end">
            <Link href="/inquiry" className="text-bemitex-maroon p-2 -mr-2">
              <PhoneCall size={24} />
            </Link>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-200 overflow-hidden shadow-lg absolute w-full"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-bemitex-maroon hover:bg-gray-50 rounded-md">Home</Link>
              <Link href="/products" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-bemitex-maroon hover:bg-gray-50 rounded-md">Catalog</Link>
              <Link href="/how-it-works" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-bemitex-maroon hover:bg-gray-50 rounded-md">How It Works</Link>
              <Link href="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-bemitex-maroon hover:bg-gray-50 rounded-md">About Us</Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-bemitex-maroon hover:bg-gray-50 rounded-md">Contact</Link>
              
              <Link
                href="/inquiry"
                onClick={() => setIsOpen(false)}
                className="mt-4 flex items-center justify-center gap-2 w-full bg-bemitex-maroon text-white px-6 py-3 rounded-md font-semibold"
              >
                <PhoneCall size={18} />
                Bulk Inquiry
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
