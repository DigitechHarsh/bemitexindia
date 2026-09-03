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

          {/* Desktop Layout: Logo Left, Nav Middle, Action Right */}
          <div className="hidden md:flex w-full items-center justify-between">
            
            {/* Left: Overhanging Logo */}
            <div className="flex-shrink-0 relative z-50 flex items-center">
              <Link href="/" className="group block hover:scale-105 transition-transform absolute -top-12 left-0">
                <div className="relative w-36 h-36">
                  <Image
                    src="/logo.jpg"
                    alt="Bemitex Logo"
                    fill
                    className="object-contain mix-blend-multiply"
                  />
                </div>
              </Link>
              {/* Spacer so nav items don't overlap the absolute logo */}
              <div className="w-40"></div>
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

          {/* Mobile Center Logo (Visible only on mobile) */}
          <div className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center">
            <Link href="/" className="group block">
              <div className="relative w-28 h-28">
                <Image
                  src="/logo.jpg"
                  alt="Bemitex Logo"
                  fill
                  className="object-contain mix-blend-multiply"
                />
              </div>
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
