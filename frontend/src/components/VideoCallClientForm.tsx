"use client";

import { useState } from "react";
import { Calendar, Clock, User, Phone, CheckCircle2 } from "lucide-react";

export default function VideoCallClientForm() {
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
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-bemitex-dark mb-2">Video Appointment Requested!</h2>
        <p className="text-gray-600 max-w-md mb-8 text-sm sm:text-base">
          Thank you for booking a video shopping appointment with Bemitex India. Our team will contact you via WhatsApp to confirm the exact time slot and share the direct video call link.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="bg-bemitex-maroon text-white px-8 py-3 rounded-lg hover:bg-bemitex-dark font-medium transition shadow-md"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl border border-gray-100 rounded-2xl p-6 md:p-8">
      <h2 className="text-2xl font-serif font-bold text-bemitex-dark mb-6 border-b border-gray-100 pb-4">
        Book Your VIP Video Slot
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={16} className="text-gray-400" />
              </div>
              <input type="text" required className="pl-10 w-full rounded-lg border border-gray-300 py-2.5 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none" placeholder="Full Name" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business / Boutique Name</label>
            <input type="text" className="w-full rounded-lg border border-gray-300 py-2.5 px-3 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none" placeholder="Boutique / Shop Name" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone size={16} className="text-gray-400" />
            </div>
            <input type="tel" required className="pl-10 w-full rounded-lg border border-gray-300 py-2.5 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none" placeholder="+91 98765 43210 (For video call link)" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={16} className="text-gray-400" />
              </div>
              <input type="date" required className="pl-10 w-full rounded-lg border border-gray-300 py-2.5 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none bg-white" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock size={16} className="text-gray-400" />
              </div>
              <select required className="pl-10 w-full rounded-lg border border-gray-300 py-2.5 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none bg-white">
                <option value="">Select Time</option>
                <option value="Morning (10 AM - 1 PM)">Morning (10 AM - 1 PM)</option>
                <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">What collection would you like to see? *</label>
          <textarea 
            required
            rows={3} 
            className="w-full rounded-lg border border-gray-300 py-2.5 px-3 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none resize-none" 
            placeholder="E.g., Heavy Bridal Gowns, Dailywear Cotton Kurtis, Banarasi Sarees, Festive Suits..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-bemitex-maroon hover:bg-bemitex-dark text-white py-3.5 rounded-lg font-bold text-lg transition-colors flex items-center justify-center disabled:opacity-70 shadow-md"
        >
          {isSubmitting ? "Submitting Request..." : "Book Video Call Appointment"}
        </button>
        
      </form>
    </div>
  );
}
