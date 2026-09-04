import type { Metadata } from "next";
import { Search, FileText, Video, Truck, CheckCircle } from "lucide-react";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "How to Order Wholesale Ethnic Wear | Simple 5-Step Process",
  description: "Learn how to order wholesale Kurtis, Suits, and Sarees from Bemitex India. Browse catalog, request bulk quotes, book video calls, and get doorstep COD delivery across India.",
  keywords: [
    "how to buy wholesale kurtis",
    "wholesale ordering process surat",
    "b2b textile wholesale process",
    "video call shopping wholesale",
    "cash on delivery wholesale clothing"
  ],
  alternates: {
    canonical: "/how-it-works",
  },
  openGraph: {
    title: "How to Order Wholesale Ethnic Wear | Bemitex India",
    description: "Simple 5-step B2B wholesale ordering process from Surat factory. Video call shopping and Cash On Delivery available.",
    url: "/how-it-works",
  },
};

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <Search className="text-bemitex-maroon w-8 h-8 sm:w-10 sm:h-10" />,
      title: "1. Browse Catalog",
      desc: "Explore our wide range of wholesale ethnic wear. Filter by category to find Kurtis, Salwar Suits, Sarees, and Gowns.",
    },
    {
      icon: <FileText className="text-bemitex-maroon w-8 h-8 sm:w-10 sm:h-10" />,
      title: "2. Submit Inquiry",
      desc: "Click 'Inquire on WhatsApp' on any product, or submit a bulk quote request form with your requirements and quantity.",
    },
    {
      icon: <Video className="text-bemitex-maroon w-8 h-8 sm:w-10 sm:h-10" />,
      title: "3. Video Call (Optional)",
      desc: "Book a video call appointment to see our products live, check fabric quality, and interact with our sales team.",
    },
    {
      icon: <CheckCircle className="text-bemitex-maroon w-8 h-8 sm:w-10 sm:h-10" />,
      title: "4. Confirm & Pay",
      desc: "Once you finalize the designs, we'll send a proforma invoice. We support bulk pricing slabs and flexible payment methods.",
    },
    {
      icon: <Truck className="text-bemitex-maroon w-8 h-8 sm:w-10 sm:h-10" />,
      title: "5. Delivery (COD Available)",
      desc: "Your order is dispatched via our trusted logistics partners. Cash on Delivery is available across India. We also ship internationally.",
    },
  ];

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Order Wholesale Ethnic Wear from Bemitex India",
    "description": "Step-by-step guide to purchasing bulk ethnic wear directly from our Surat factory.",
    "step": steps.map((step, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "name": step.title,
      "text": step.desc,
    })),
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <JsonLd data={howToSchema} />
      <Breadcrumb items={[{ label: "How It Works" }]} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-bemitex-dark mb-4">
            How to Order Wholesale
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Ordering wholesale from Bemitex India is simple and transparent. Follow these 5 easy steps to stock your boutique with our premium collection.
          </p>
        </div>

        <div className="space-y-8 sm:space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
          {steps.map((step, idx) => (
            <div key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-bemitex-cream text-bemitex-maroon font-bold text-sm shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                {idx + 1}
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-2.5 bg-bemitex-cream/70 rounded-full shrink-0">
                    {step.icon}
                  </div>
                  <h2 className="font-bold text-lg sm:text-xl text-bemitex-dark">{step.title}</h2>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-bemitex-dark mb-4">
            Ready to Stock Your Boutique?
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto mb-8 text-sm sm:text-base">
            Get instant factory rates, check live fabric catalog, or schedule a video call with our wholesale advisors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="bg-bemitex-maroon text-white px-8 py-3.5 rounded-lg font-bold hover:bg-bemitex-dark transition-colors shadow-md">
              Browse Catalog
            </Link>
            <Link href="/video-call" className="bg-bemitex-dark text-white px-8 py-3.5 rounded-lg font-bold hover:bg-gray-800 transition-colors shadow-md">
              Book Video Call
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
