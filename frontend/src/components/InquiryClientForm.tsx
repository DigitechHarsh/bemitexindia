"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send, Building2, User, Phone, CheckCircle2, Loader2 } from "lucide-react";

export default function InquiryClientForm() {
  const searchParams = useSearchParams();
  const productInterest = searchParams.get("product") || "";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 sm:p-12 min-h-[50vh] flex flex-col items-center justify-center text-center">
        <CheckCircle2 size={64} className="text-emerald-500 mb-4" />
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-bemitex-dark mb-2">Inquiry Submitted!</h2>
        <p className="text-gray-600 max-w-md mb-8 text-sm sm:text-base">
          Thank you for reaching out to Bemitex India. Our wholesale team has received your request and will contact you via WhatsApp or call shortly with the latest catalog and price quotation.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="bg-bemitex-maroon text-white px-8 py-3 rounded-lg hover:bg-bemitex-dark font-medium transition shadow-md"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input type="text" required className="pl-10 w-full rounded-lg border border-gray-300 py-2.5 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none" placeholder="Enter your full name" />
            </div>
          </div>

          {/* Business Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business / Boutique Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 size={18} className="text-gray-400" />
              </div>
              <input type="text" className="pl-10 w-full rounded-lg border border-gray-300 py-2.5 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none" placeholder="Enter business or shop name" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone / WhatsApp Number *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone size={18} className="text-gray-400" />
              </div>
              <input type="tel" required className="pl-10 w-full rounded-lg border border-gray-300 py-2.5 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none" placeholder="+91 98765 43210" />
            </div>
          </div>

          {/* Business Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Type *</label>
            <select required className="w-full rounded-lg border border-gray-300 py-2.5 px-3 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none bg-white">
              <option value="">Select your business type</option>
              <option value="Boutique Owner">Boutique Owner</option>
              <option value="Retail Store">Retail Store / Showroom</option>
              <option value="Home Reseller">Home Reseller / WhatsApp Seller</option>
              <option value="Wholesaler">Wholesaler / Distributor</option>
              <option value="Online Seller">Online E-commerce Seller</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
            <input type="text" required className="w-full rounded-lg border border-gray-300 py-2.5 px-3 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none" placeholder="e.g., Delhi, Mumbai, Bengaluru" />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
            <input type="text" required defaultValue="India" className="w-full rounded-lg border border-gray-300 py-2.5 px-3 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none" placeholder="e.g., India" />
          </div>
        </div>

        {/* Category Interest */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Category Interest</label>
          <input 
            type="text" 
            defaultValue={productInterest ? `Inquiry for product: ${productInterest}` : ""}
            className="w-full rounded-lg border border-gray-300 py-2.5 px-3 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none" 
            placeholder="e.g., Anarkali Kurtis, Partywear Suits, Banarasi Sarees" 
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message / Requirements</label>
          <textarea 
            rows={4} 
            className="w-full rounded-lg border border-gray-300 py-2.5 px-3 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none resize-none" 
            placeholder="Tell us about your estimated order quantity, specific requirements, or ask for the latest PDF wholesale catalog..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-bemitex-maroon hover:bg-bemitex-dark text-white py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 shadow-md"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={20} /> Submitting Quote Request...
            </>
          ) : (
            <>
              <Send size={20} /> Submit Wholesale Inquiry
            </>
          )}
        </button>
        <p className="text-center text-xs text-gray-500 mt-2">Direct factory response guaranteed within 2-4 business hours.</p>
      </form>
    </div>
  );
}
