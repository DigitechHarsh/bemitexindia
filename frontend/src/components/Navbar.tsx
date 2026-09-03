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
        <div className="flex justify-between items-center h-16 md:h-20 relative">
          
          {/* Mobile Layout (Visible only on small screens) */}
          <div className="flex md:hidden w-full items-center justify-between">
            {/* Left: Logo */}
            <Link href="/" className="group block hover:scale-105 transition-transform flex-shrink-0 mr-4">
              <div className="relative w-32 h-16 overflow-hidden">
                <Image
                  src="/logo.jpg"
                  alt="Bemitex Logo"
                  fill
                  className="object-contain mix-blend-multiply scale-125 md:scale-150 origin-center"
                  priority
                />
              </div>
            </Link>

            {/* Right: Phone & Menu */}
            <div className="flex items-center gap-2">
              <Link href="/inquiry" className="text-bemitex-maroon p-2">
                <PhoneCall size={24} />
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-bemitex-dark hover:text-bemitex-maroon p-2 -mr-2"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Desktop Layout: Logo Left, Nav Middle, Action Right */}
          <div className="hidden md:flex w-full items-center justify-between">
            
            {/* Left: Logo */}
            <div className="flex-shrink-0 flex items-center pr-8 overflow-hidden py-1">
              <Link href="/" className="group block hover:scale-105 transition-transform">
                <div className="relative w-40 h-16 md:w-48 md:h-20 overflow-hidden">
                  <Image
                    src="/logo.jpg"
                    alt="Bemitex Logo"
                    fill
                    className="object-contain mix-blend-multiply scale-125 md:scale-150 origin-center"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Middle: Navigation Links */}
            <div className="flex items-center justify-center space-x-8 flex-1">
              <Link href="/" className="text-gray-600 hover:text-bemitex-maroon font-medium transition-colors">Home</Link>
              <Link href="/products" className="text-gray-600 hover:text-bemitex-maroon font-medium transition-colors">Catalog</Link>
              <Link href="/how-it-works" className="text-gray-600 hover:text-bemitex-maroon font-medium transition-colors">How It Works</Link>
              <Link href="/about" className="text-gray-600 hover:text-bemitex-maroon font-medium transition-colors">About Us</Link>
              <Link href="/contact" className="text-gray-600 hover:text-bemitex-maroon font-medium transition-colors">Contact</Link>
            </div>

            {/* Right: Action Button */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/inquiry"
                className="bg-bemitex-maroon text-white px-6 py-2 rounded-md font-semibold hover:bg-bemitex-dark transition-colors shadow-sm hover:shadow flex items-center gap-2"
              >
                <PhoneCall size={18} />
                Bulk Inquiry
              </Link>
            </div>
            
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
