"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Catalog", href: "/products" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 md:gap-3">
              <div className="relative w-12 h-12 md:w-20 md:h-20">
                <Image
                  src="/logo.jpg"
                  alt="Bemitex Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl md:text-3xl font-serif text-bemitex-maroon font-bold whitespace-nowrap">Bemitex India</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-bemitex-maroon font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/inquiry"
              className="bg-bemitex-maroon text-white px-6 py-2 rounded-md font-semibold hover:bg-bemitex-dark transition-colors shadow-sm hover:shadow flex items-center gap-2"
            >
              <PhoneCall size={18} />
              Bulk Inquiry
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-bemitex-dark hover:text-bemitex-maroon p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
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
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-bemitex-maroon hover:bg-gray-50 rounded-md"
                >
                  {link.name}
                </Link>
              ))}
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
