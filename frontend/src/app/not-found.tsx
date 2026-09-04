import Link from "next/link";
import { ArrowLeft, Home, Package, Search } from "lucide-react";
import WhatsappIcon from "@/components/WhatsappIcon";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = {
  title: "404 - Page Not Found | Bemitex India",
  description: "The page you are looking for cannot be found. Explore our wholesale catalog of Kurtis, Sarees, and Salwar Suits.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="bg-gray-50 min-h-[75vh] flex flex-col justify-between">
      <Breadcrumb items={[{ label: "404 Not Found" }]} />

      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-bemitex-maroon/10 text-bemitex-maroon rounded-full mb-6">
          <span className="text-3xl font-serif font-black">404</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-bemitex-dark mb-4">
          Oops! Page Not Found
        </h1>
        
        <p className="text-gray-600 text-base sm:text-lg max-w-lg mx-auto mb-8">
          The page or product you are looking for might have been moved, renamed, or is temporarily unavailable in our catalog.
        </p>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto text-left">
          <Link
            href="/"
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition flex items-center gap-3 group"
          >
            <div className="p-2.5 bg-bemitex-cream rounded-lg text-bemitex-maroon group-hover:scale-105 transition">
              <Home size={20} />
            </div>
            <div>
              <p className="font-semibold text-bemitex-dark text-sm">Home Page</p>
              <p className="text-xs text-gray-500">Back to main factory overview</p>
            </div>
          </Link>

          <Link
            href="/products"
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition flex items-center gap-3 group"
          >
            <div className="p-2.5 bg-bemitex-cream rounded-lg text-bemitex-maroon group-hover:scale-105 transition">
              <Package size={20} />
            </div>
            <div>
              <p className="font-semibold text-bemitex-dark text-sm">Catalog</p>
              <p className="text-xs text-gray-500">Explore bulk wholesale catalog</p>
            </div>
          </Link>

          <Link
            href="/inquiry"
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition flex items-center gap-3 group"
          >
            <div className="p-2.5 bg-bemitex-cream rounded-lg text-bemitex-maroon group-hover:scale-105 transition">
              <Search size={20} />
            </div>
            <div>
              <p className="font-semibold text-bemitex-dark text-sm">Bulk Inquiry</p>
              <p className="text-xs text-gray-500">Request custom price quote</p>
            </div>
          </Link>
        </div>

        {/* Support Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-bemitex-maroon hover:bg-bemitex-dark text-white rounded-lg font-medium transition shadow-md"
          >
            <ArrowLeft size={18} />
            <span>Return to Home</span>
          </Link>

          <a
            href="https://wa.me/919876543210?text=Hi%20Bemitex,%20I%20could%20not%20find%20the%20page%20I%20was%20looking%20for."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition shadow-md"
          >
            <WhatsappIcon className="w-5 h-5 fill-white" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
