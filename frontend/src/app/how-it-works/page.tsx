import { Search, FileText, Video, Truck, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <Search className="text-bemitex-maroon w-12 h-12" />,
      title: "1. Browse Catalog",
      desc: "Explore our wide range of wholesale ethnic wear. Filter by category to find Kurtis, Salwar Suits, Sarees, and Gowns.",
    },
    {
      icon: <FileText className="text-bemitex-maroon w-12 h-12" />,
      title: "2. Submit Inquiry",
      desc: "Click 'Inquire on WhatsApp' on any product, or submit a bulk quote request form with your requirements and quantity.",
    },
    {
      icon: <Video className="text-bemitex-maroon w-12 h-12" />,
      title: "3. Video Call (Optional)",
      desc: "Book a video call appointment to see our products live, check fabric quality, and interact with our sales team.",
    },
    {
      icon: <CheckCircle className="text-bemitex-maroon w-12 h-12" />,
      title: "4. Confirm & Pay",
      desc: "Once you finalize the designs, we'll send a proforma invoice. We support bulk pricing slabs and flexible payment methods.",
    },
    {
      icon: <Truck className="text-bemitex-maroon w-12 h-12" />,
      title: "5. Delivery (COD Available)",
      desc: "Your order is dispatched via our trusted logistics partners. Cash on Delivery is available across India. We also ship internationally.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-bemitex-dark mb-4">How to Order</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ordering wholesale from Bemitex India is simple and transparent. Follow these steps to stock your boutique with our premium collection.
          </p>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
          {steps.map((step, idx) => (
            <div key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-gray-100 text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <span className="font-bold text-sm text-bemitex-dark">{idx + 1}</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-bemitex-cream rounded-full">
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-xl text-bemitex-dark">{step.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-4">Ready to stock up?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="bg-bemitex-gold text-bemitex-dark px-8 py-3 rounded font-bold hover:bg-yellow-500 transition-colors">
              Browse Catalog
            </Link>
            <Link href="/video-call" className="bg-bemitex-dark text-white px-8 py-3 rounded font-bold hover:bg-gray-800 transition-colors">
              Book Video Call
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
