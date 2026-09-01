import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-bemitex-dark mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with our wholesale team for bulk orders, catalogs, or to schedule a visit to our facility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div className="space-y-8">
            {/* Primary Location */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-bemitex-maroon mb-6">Primary Facility (Khatodara)</h3>
              <ul className="space-y-4">
                <div className="flex gap-4">
                  <MapPin className="text-bemitex-maroon mt-1 shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-bemitex-dark">Office / Factory</h3>
                    <p className="text-gray-600">Bemitex Textile Hub, Ring Road<br/>Surat, Gujarat 395002, India</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Phone className="text-bemitex-maroon shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-bemitex-dark">Phone</h3>
                    <p className="text-gray-600">+91 98765 43210<br/>+91 98765 43211</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Mail className="text-bemitex-maroon shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-bemitex-dark">Email</h3>
                    <p className="text-gray-600">sales@bemitexindia.com<br/>info@bemitexindia.com</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Clock className="text-bemitex-maroon shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-bemitex-dark">Business Hours</h3>
                    <p className="text-gray-600">Monday - Saturday: 10:00 AM - 7:00 PM<br/>Sunday: Closed</p>
                  </div>
                </div>
              </ul>
            </div>

            {/* Branch */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-bemitex-dark mb-6">Textile Market Branch</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <MapPin className="text-bemitex-gold mt-1 shrink-0" size={24} />
                  <span className="text-gray-600">Shop U-4, Legend Textile Market, Near PTM Market, Sahara Darwaja, Ring Road, Surat - 395002, Gujarat</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-bemitex-maroon">
            <h3 className="text-2xl font-bold text-bemitex-dark mb-6">Send a Message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" className="w-full rounded-md border border-gray-300 py-2.5 px-3 focus:ring-bemitex-maroon focus:border-bemitex-maroon outline-none" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" className="w-full rounded-md border border-gray-300 py-2.5 px-3 focus:ring-bemitex-maroon focus:border-bemitex-maroon outline-none" placeholder="Phone Number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                <input type="email" className="w-full rounded-md border border-gray-300 py-2.5 px-3 focus:ring-bemitex-maroon focus:border-bemitex-maroon outline-none" placeholder="Email Address" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={4} className="w-full rounded-md border border-gray-300 py-2.5 px-3 focus:ring-bemitex-maroon focus:border-bemitex-maroon outline-none resize-none" placeholder="How can we help your business?"></textarea>
              </div>
              <button type="button" className="w-full bg-bemitex-dark text-white py-3 rounded-md font-bold text-lg hover:bg-gray-800 transition-colors">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
