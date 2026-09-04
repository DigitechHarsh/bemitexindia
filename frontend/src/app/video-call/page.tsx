import type { Metadata } from "next";
import { Video, ShieldCheck, Clock } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import VideoCallClientForm from "@/components/VideoCallClientForm";

export const metadata: Metadata = {
  title: "Book Live Video Call Shopping Appointment | Surat Factory Showroom",
  description: "Experience live video call shopping directly with Bemitex India factory executives in Surat. Inspect fabric textures, colors, and live catalogs before placing bulk wholesale orders.",
  keywords: [
    "video call shopping ethnic wear",
    "live video shopping surat textile market",
    "wholesale video shopping kurtis",
    "virtual boutique sourcing india",
    "bemitex live video shopping"
  ],
  alternates: {
    canonical: "/video-call",
  },
  openGraph: {
    title: "Live Video Call Shopping Assistance | Bemitex India",
    description: "Book an exclusive 1-on-1 live video shopping session with our Surat factory team. View real-time fabric textures and new arrivals.",
    url: "/video-call",
  },
};

export default function VideoCallPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Breadcrumb items={[{ label: "Video Call Shopping" }]} />
      
      {/* Banner */}
      <div className="bg-bemitex-dark text-white py-12 sm:py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex p-3 bg-white/10 rounded-full text-bemitex-gold mb-4">
            <Video size={36} />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
            Live Video Call Shopping Assistance
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Can&apos;t visit our Surat factory in person? Book a personalized video call to inspect fabric quality, see latest designs in real-time, and place bulk orders with complete confidence.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* Info Side */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-serif font-bold text-bemitex-dark mb-4">
                How Video Shopping Works
              </h2>
              <ol className="list-decimal pl-5 space-y-3 text-gray-600 text-sm sm:text-base">
                <li>Submit your preferred date and time slot.</li>
                <li>Our team confirms the appointment via WhatsApp.</li>
                <li>Join high-definition video call from anywhere.</li>
                <li>Our textile executive showcases live pieces.</li>
                <li>Get immediate wholesale invoices & COD dispatch.</li>
              </ol>
            </div>
            
            <div className="bg-bemitex-cream/50 p-6 rounded-2xl border border-bemitex-gold/30">
              <h3 className="font-bold text-bemitex-maroon mb-2 flex items-center gap-2 text-sm sm:text-base">
                <ShieldCheck size={18} />
                B2B Wholesale Buyer Policy
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                Video shopping is exclusively reserved for boutique owners, retail shops, and bulk reselling businesses. Minimum order quantities apply to all catalog items.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-3">
            <VideoCallClientForm />
          </div>

        </div>
      </div>
    </div>
  );
}
