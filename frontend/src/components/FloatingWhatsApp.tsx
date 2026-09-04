"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import WhatsappIcon from "@/components/WhatsappIcon";

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Do not show on Admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    // Show after scrolling down a bit
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          href="https://wa.me/919876543210" // Replace with real WhatsApp number
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-shadow flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <WhatsappIcon size={32} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
