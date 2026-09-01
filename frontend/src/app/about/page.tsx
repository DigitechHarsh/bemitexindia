import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  const reasons = [
    "Direct from Factory Pricing - No Middlemen",
    "Stringent Quality Checking Process",
    "Wide Range of Traditional & Modern Ethnic Wear",
    "Dedicated B2B Support & Video Call Shopping",
    "Fast PAN-India Dispatch & Global Shipping"
  ];

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop"
              alt="Bemitex Manufacturing Facility"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-bemitex-dark/20"></div>
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
              <p className="text-bemitex-maroon font-bold text-xl">15+ Years</p>
              <p className="text-gray-700 text-sm">Of Textile Excellence</p>
            </div>
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-bemitex-dark mb-6">
              About Bemitex India
            </h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Based in the textile hub of Surat, Gujarat, Bemitex India is a premier manufacturer and wholesale distributor of women&apos;s ethnic wear. We specialize in supply-chain distribution, serving business owners, retail showrooms, boutique owners, and home resellers across the globe.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our mission is to empower businesses with high-margin, top-quality ethnic wear direct from the factory. By eliminating middlemen, we ensure that you get the best wholesale prices without compromising on fabric quality or intricate detailing.
            </p>
            
            <h3 className="text-2xl font-bold text-bemitex-dark mb-4">Why Partner With Us?</h3>
            <ul className="space-y-3">
              {reasons.map((reason, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="text-bemitex-maroon flex-shrink-0" size={20} />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
