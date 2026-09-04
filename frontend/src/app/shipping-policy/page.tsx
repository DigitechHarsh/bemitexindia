import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Wholesale Shipping & COD Policy | Domestic & Global Logistics",
  description: "Read Bemitex India's wholesale shipping, Cash On Delivery (COD), transport godown dispatch, and international export delivery policies from Surat.",
  keywords: [
    "wholesale shipping policy",
    "b2b cod textile surat",
    "export shipping ethnic wear india",
    "surat transport delivery cloth"
  ],
  alternates: {
    canonical: "/shipping-policy",
  },
  openGraph: {
    title: "Wholesale Shipping & COD Policy | Bemitex India",
    description: "Learn about our fast 24-48 hour dispatch, domestic transport options, and worldwide export shipping.",
    url: "/shipping-policy",
  },
};

export default function ShippingPolicyPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does wholesale dispatch and delivery take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For ready stock, orders are dispatched within 24 to 48 hours. Standard domestic delivery takes 3 to 7 business days depending on the city."
        }
      },
      {
        "@type": "Question",
        "name": "Is Cash on Delivery (COD) available for wholesale orders?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer Cash on Delivery (COD) across major pincodes in India with a nominal 10-20% confirmation advance to cover partial transit costs."
        }
      },
      {
        "@type": "Question",
        "name": "Does Bemitex India ship internationally?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we export worldwide to USA, UK, Canada, UAE, Australia, Malaysia and more via DHL, FedEx, and Aramex."
        }
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={faqSchema} />
      <Breadcrumb items={[{ label: "Shipping Policy" }]} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-bemitex-dark mb-4">
            Wholesale Shipping & COD Policy
          </h1>
          <div className="w-20 h-1 bg-bemitex-gold"></div>
        </div>

        <div className="prose prose-lg text-gray-700 max-w-none space-y-8">
          
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-bemitex-dark mb-3">
              1. Dispatch and Delivery Timelines
            </h2>
            <p className="leading-relaxed">
              As a wholesale manufacturer, our dispatch timelines vary based on order size and availability. 
              For ready stock, orders are dispatched within <strong>24 to 48 hours</strong> of order confirmation. 
              Standard delivery within India takes between <strong>3 to 7 business days</strong> depending on the destination state and logistics connectivity.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-bemitex-dark mb-3">
              2. Cash on Delivery (COD) Facility
            </h2>
            <p className="leading-relaxed mb-3">
              We offer Cash on Delivery (COD) across major serviceable pincodes in India to build trust with our new retail & boutique partners:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>A nominal advance payment (typically 10-20% of invoice value) is required to confirm the COD booking and cover partial logistics costs.</li>
              <li>The remaining balance is paid directly to the courier executive upon delivery.</li>
              <li>COD is serviced via reputed partners including Delhivery, BlueDart, and Xpressbees.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-bemitex-dark mb-3">
              3. International Export Shipping
            </h2>
            <p className="leading-relaxed mb-3">
              Bemitex India proudly exports high-quality ethnic wear worldwide, including the United States, United Kingdom, Canada, UAE, Australia, and Malaysia:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>International orders are 100% prepaid via wire transfer or international cards.</li>
              <li>Shipping charges are calculated transparently based on the volumetric weight and destination country.</li>
              <li>We partner with DHL, FedEx, and Aramex for express door-to-door delivery.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-bemitex-dark mb-3">
              4. Surat Local Transport Godown Delivery
            </h2>
            <p className="leading-relaxed">
              If your business works with a dedicated transport company having an office or godown in Surat, our team can deliver your packed parcels directly to their Surat hub with complete LR receipts.
            </p>
          </div>

          <div className="mt-8 bg-bemitex-cream/50 p-6 rounded-xl border border-bemitex-gold/30">
            <h3 className="font-bold text-bemitex-maroon mb-2">Have Logistics or Transport Inquiries?</h3>
            <p className="text-sm text-gray-700">
              For custom transport arrangements or express cargo quotes, please reach out to our logistics desk at <strong>sales@bemitexindia.com</strong> or WhatsApp our support line.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
