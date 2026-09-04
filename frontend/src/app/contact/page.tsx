import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Contact Us | Bemitex India Textile Factory Surat",
  description: "Contact Bemitex India wholesale team in Surat, Gujarat. Reach us for bulk inquiries, factory visits, showroom appointments, and international distribution support.",
  keywords: [
    "contact bemitex india",
    "surat textile manufacturer phone number",
    "bemitex factory address surat",
    "wholesale textile inquiry surat",
    "ethnic wear manufacturer contact"
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Bemitex India | Surat Factory & Office",
    description: "Get in touch for wholesale orders, boutique supply inquiries, and showroom visits in Surat textile hub.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Breadcrumb items={[{ label: "Contact Us" }]} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-bemitex-dark mb-4">
            Contact Bemitex India
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with our wholesale team for bulk orders, latest PDF catalogs, or to schedule a visit to our factory in Surat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          <div className="space-y-8">
            {/* Primary Location */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-bemitex-maroon mb-6">
                Primary Facility & Factory
              </h2>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <MapPin className="text-bemitex-maroon mt-1 shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-bemitex-dark">Office / Manufacturing Hub</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Bemitex Textile Hub, Ring Road<br/>Surat, Gujarat 395002, India</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Phone className="text-bemitex-maroon shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-bemitex-dark">Direct Phone / WhatsApp</h3>
                    <p className="text-gray-600 text-sm sm:text-base">+91 98765 43210 / +91 98765 43211</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Mail className="text-bemitex-maroon shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-bemitex-dark">Official Email</h3>
                    <p className="text-gray-600 text-sm sm:text-base">sales@bemitexindia.com / info@bemitexindia.com</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Clock className="text-bemitex-maroon shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-bemitex-dark">Business Hours</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Monday - Saturday: 10:00 AM - 7:00 PM<br/>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Branch */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-bemitex-dark mb-4">
                Textile Market Showroom Branch
              </h2>
              <div className="flex items-start gap-4">
                <MapPin className="text-bemitex-gold mt-1 shrink-0" size={24} />
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Shop U-4, Legend Textile Market, Near PTM Market, Sahara Darwaja, Ring Road, Surat - 395002, Gujarat, India.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-t-4 border-bemitex-maroon">
            <h2 className="text-2xl font-serif font-bold text-bemitex-dark mb-6">
              Send an Inquiry Message
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                <input type="text" required className="w-full rounded-lg border border-gray-300 py-2.5 px-3 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none" placeholder="Full Name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone / WhatsApp Number *</label>
                <input type="tel" required className="w-full rounded-lg border border-gray-300 py-2.5 px-3 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none" placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address (Optional)</label>
                <input type="email" className="w-full rounded-lg border border-gray-300 py-2.5 px-3 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none" placeholder="name@business.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message / Requirements *</label>
                <textarea rows={4} required className="w-full rounded-lg border border-gray-300 py-2.5 px-3 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none resize-none" placeholder="How can we help your boutique or wholesale store?"></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-bemitex-maroon hover:bg-bemitex-dark text-white py-3.5 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
