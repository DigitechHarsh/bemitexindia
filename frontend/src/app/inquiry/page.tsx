"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, Building2, User, Phone, CheckCircle2, Loader2 } from "lucide-react";

function InquiryForm() {
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
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <CheckCircle2 size={64} className="text-green-500 mb-4" />
        <h1 className="text-3xl font-bold text-bemitex-dark mb-2">Inquiry Submitted!</h1>
        <p className="text-gray-600 max-w-md mb-8">
          Thank you for reaching out to Bemitex India. Our wholesale team has received your request and will contact you via WhatsApp or call shortly.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="bg-bemitex-maroon text-white px-8 py-3 rounded-md hover:bg-bemitex-maroon/90 font-medium"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input type="text" required className="pl-10 w-full rounded-md border border-gray-300 py-2.5 focus:ring-bemitex-maroon focus:border-bemitex-maroon outline-none" placeholder="Enter your full name" />
            </div>
          </div>

          {/* Business Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business/Boutique Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 size={18} className="text-gray-400" />
              </div>
              <input type="text" className="pl-10 w-full rounded-md border border-gray-300 py-2.5 focus:ring-bemitex-maroon focus:border-bemitex-maroon outline-none" placeholder="Enter business name" />
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
              <input type="tel" required className="pl-10 w-full rounded-md border border-gray-300 py-2.5 focus:ring-bemitex-maroon focus:border-bemitex-maroon outline-none" placeholder="+91 98765 43210" />
            </div>
          </div>

          {/* Business Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Type *</label>
            <select required className="w-full rounded-md border border-gray-300 py-2.5 px-3 focus:ring-bemitex-maroon focus:border-bemitex-maroon outline-none bg-white">
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
            <input type="text" required className="w-full rounded-md border border-gray-300 py-2.5 px-3 focus:ring-bemitex-maroon focus:border-bemitex-maroon outline-none" placeholder="e.g., Mumbai" />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
            <input type="text" required defaultValue="India" className="w-full rounded-md border border-gray-300 py-2.5 px-3 focus:ring-bemitex-maroon focus:border-bemitex-maroon outline-none" placeholder="e.g., India" />
          </div>
        </div>

        {/* Category Interest */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Category Interest</label>
          <input 
            type="text" 
            defaultValue={productInterest ? `Inquiry for product: ${productInterest}` : ""}
            className="w-full rounded-md border border-gray-300 py-2.5 px-3 focus:ring-bemitex-maroon focus:border-bemitex-maroon outline-none" 
            placeholder="e.g., Kurtis, Designer Suits, Sarees" 
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message / Requirements</label>
          <textarea 
            rows={4} 
            className="w-full rounded-md border border-gray-300 py-2.5 px-3 focus:ring-bemitex-maroon focus:border-bemitex-maroon outline-none resize-none" 
            placeholder="Tell us about your estimated order quantity, specific requirements, or ask for the latest PDF catalog..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-bemitex-dark text-white py-4 rounded-md font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={20} /> Submitting...
            </>
          ) : (
            <>
              <Send size={20} /> Submit Wholesale Inquiry
            </>
          )}
        </button>
        <p className="text-center text-xs text-gray-500 mt-2">We will not share your information with any third parties.</p>
      </form>
    </div>
  );
}

export default function InquiryPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-bemitex-dark mb-4">Request Bulk Quote</h1>
          <p className="text-gray-600 text-lg">
            Fill out the form below to get wholesale pricing, catalogs, and start your order process. Minimum order quantities apply.
          </p>
        </div>

        <Suspense fallback={<div className="flex justify-center p-12"><Loader2 className="animate-spin text-bemitex-maroon" size={40} /></div>}>
          <InquiryForm />
        </Suspense>
        
      </div>
    </div>
  );
}
