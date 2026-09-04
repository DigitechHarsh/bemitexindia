import type { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import InquiryClientForm from "@/components/InquiryClientForm";

export const metadata: Metadata = {
  title: "Request Wholesale Bulk Quote | Factory Rates",
  description: "Get factory-direct wholesale quotes for Kurtis, Salwar Suits, and Sarees from Bemitex India. Bulk discounts, fast quotes, and worldwide export shipping.",
  keywords: [
    "wholesale inquiry",
    "request bulk quote ethnic wear",
    "surat clothing wholesale quote",
    "b2b ethnic wear catalog inquiry",
    "kurtis wholesale price list"
  ],
  alternates: {
    canonical: "/inquiry",
  },
  openGraph: {
    title: "Request Wholesale Bulk Quote | Bemitex India",
    description: "Connect directly with our Surat factory sales team for wholesale pricing, full set catalogs, and export inquiries.",
    url: "/inquiry",
  },
};

export default function InquiryPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Breadcrumb items={[{ label: "Bulk Inquiry" }]} />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-bemitex-dark mb-4">
            Request Bulk Quote
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto">
            Fill out the form below to receive factory-direct wholesale pricing, exclusive PDF catalogs, and custom order assistance.
          </p>
        </div>

        <Suspense fallback={<div className="flex justify-center p-12"><Loader2 className="animate-spin text-bemitex-maroon" size={40} /></div>}>
          <InquiryClientForm />
        </Suspense>
      </div>
    </div>
  );
}
