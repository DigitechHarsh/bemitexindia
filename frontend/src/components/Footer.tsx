import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-600 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-2 md:gap-3 mb-6">
              <div className="relative w-16 h-16 md:w-24 md:h-24">
                <Image
                  src="/logo.jpg"
                  alt="Bemitex Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl md:text-3xl font-serif text-bemitex-maroon font-bold">Bemitex India</span>
            </div>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Direct from Factory to Your Business. India&apos;s leading bulk women&apos;s ethnic wear manufacturer and wholesaler.
            </p>
            <div className="flex gap-4">
              <span className="text-sm text-bemitex-maroon font-semibold">Follow us on Social Media</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-bemitex-dark mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-500 hover:text-bemitex-maroon transition-colors">About Us</Link></li>
              <li><Link href="/products" className="text-gray-500 hover:text-bemitex-maroon transition-colors">Wholesale Catalog</Link></li>
              <li><Link href="/how-it-works" className="text-gray-500 hover:text-bemitex-maroon transition-colors">How to Order</Link></li>
              <li><Link href="/shipping-policy" className="text-gray-500 hover:text-bemitex-maroon transition-colors">Shipping & COD</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold text-bemitex-dark mb-6 uppercase tracking-wider">Categories</h3>
            <ul className="space-y-3">
              <li><Link href="/products?category=kurtis" className="text-gray-500 hover:text-bemitex-maroon transition-colors">Kurtis & Sets</Link></li>
              <li><Link href="/products?category=salwar-suits" className="text-gray-500 hover:text-bemitex-maroon transition-colors">Designer Salwar Suits</Link></li>
              <li><Link href="/products?category=sarees" className="text-gray-500 hover:text-bemitex-maroon transition-colors">Traditional Sarees</Link></li>
              <li><Link href="/products?category=gowns" className="text-gray-500 hover:text-bemitex-maroon transition-colors">Partywear Gowns</Link></li>
              <li><Link href="/products?category=dress-materials" className="text-gray-500 hover:text-bemitex-maroon transition-colors">Dress Materials</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-bemitex-dark mb-6 uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-bemitex-maroon flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-500">Plot No. 12/B, Kharwarnagar BRTS Stop, Khatodara, Surat - 395002</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-bemitex-maroon flex-shrink-0" size={20} />
                <span className="text-gray-500">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-bemitex-maroon flex-shrink-0" size={20} />
                <span className="text-gray-500">wholesale@bemitexindia.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Bemitex India. All rights reserved. Wholesale Only.
          </p>
          <div className="flex gap-4 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-bemitex-maroon transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-bemitex-maroon transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
