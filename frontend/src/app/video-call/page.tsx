"use client";

import { useState } from "react";
import { Video, Calendar, Clock, User, Phone, CheckCircle2 } from "lucide-react";

export default function VideoCallPage() {
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
        <h1 className="text-3xl font-bold text-bemitex-dark mb-2">Video Appointment Requested!</h1>
        <p className="text-gray-600 max-w-md mb-8">
          Thank you for booking a video shopping appointment with Bemitex India. Our team will contact you via WhatsApp to confirm the exact time and share the video call link.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="bg-bemitex-maroon text-white px-8 py-3 rounded-md hover:bg-bemitex-maroon/90 font-medium"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      
      {/* Banner */}
      <div className="bg-bemitex-dark text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <Video size={48} className="text-bemitex-gold mx-auto mb-4" />
          <h1 className="text-4xl font-serif font-bold mb-4">Video Call Shopping Assistance</h1>
          <p className="text-gray-300 text-lg">
            Can't visit our Surat factory? No problem. Book a personalized video call to see our latest collections, check fabric quality live, and place your bulk orders with confidence.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          
          {/* Info Side */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-bemitex-dark mb-3">How it works</h3>
              <ol className="list-decimal pl-4 space-y-2 text-gray-600">
                <li>Submit this booking form.</li>
                <li>We confirm the slot via WhatsApp.</li>
                <li>Join the video call on time.</li>
                <li>Our executive shows you the designs.</li>
                <li>Finalize your bulk order instantly.</li>
              </ol>
            </div>
            
            <div className="bg-bemitex-cream/50 p-6 rounded-lg border border-bemitex-gold/20">
              <h4 className="font-bold text-bemitex-maroon mb-2">Important Note</h4>
              <p className="text-sm text-gray-600">
                Video call shopping is strictly for B2B wholesale buyers. Minimum order quantities apply to all purchases made during the call.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:col-span-3 bg-white shadow-lg border border-gray-100 rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-bemitex-dark mb-6 border-b pb-4">Book Your Slot</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={16} className="text-gray-400" />
                    </div>
                    <input type="text" required className="pl-10 w-full rounded-md border border-gray-300 py-2 focus:ring-bemitex-maroon focus:border-bemitex-maroon outline-none" placeholder="Full Name" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <input type="text" className="w-full rounded-md border border-gray-300 py-2 px-3 focus:ring-bemitex-maroon focus:border-bemitex-maroon outline-none" placeholder="Boutique / Shop Name" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={16} className="text-gray-400" />
                  </div>
                  <input type="tel" required className="pl-10 w-full rounded-md border border-gray-300 py-2 focus:ring-bemitex-maroon focus:border-bemitex-maroon outline-none" placeholder="For video call link & confirmation" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                    <input type="date" required className="pl-10 w-full rounded-md border border-gray-300 py-2 focus:ring-bemitex-maroon focus:border-bemitex-maroon outline-none bg-white" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock size={16} className="text-gray-400" />
                    </div>
                    <select required className="pl-10 w-full rounded-md border border-gray-300 py-2 focus:ring-bemitex-maroon focus:border-bemitex-maroon outline-none bg-white">
                      <option value="">Select Time</option>
                      <option value="Morning (10 AM - 1 PM)">Morning (10 AM - 1 PM)</option>
                      <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                      <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What are you looking to buy? *</label>
                <textarea 
                  required
                  rows={3} 
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:ring-bemitex-maroon focus:border-bemitex-maroon outline-none resize-none" 
                  placeholder="E.g. Heavy Bridal Gowns, Cotton Kurtis for daily wear..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-bemitex-maroon text-white py-3 rounded-md font-bold text-lg hover:bg-bemitex-maroon/90 transition-colors flex items-center justify-center disabled:opacity-70"
              >
                {isSubmitting ? "Submitting Request..." : "Book Video Call Appointment"}
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
