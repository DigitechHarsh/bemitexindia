import type { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import CatalogClient from "@/components/CatalogClient";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Wholesale Ethnic Wear Catalog | Kurtis, Sarees & Suits Surat",
  description: "Browse Bemitex India's full wholesale catalog of Designer Kurtis, Salwar Suits, Traditional Sarees, and Festive Gowns direct from our Surat textile factory.",
  keywords: [
    "wholesale catalog kurtis surat",
    "wholesale salwar suit catalog",
    "surat sarees wholesale catalog",
    "bulk ethnic wear catalog",
    "bemitex products"
  ],
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Wholesale Ethnic Wear Catalog | Bemitex India",
    description: "Direct factory wholesale collection of Designer Kurtis, Salwar Suits, Sarees, and Gowns. Full set sizing and lowest wholesale prices.",
    url: "/products",
  },
};

export default function CatalogPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Bemitex India Wholesale Ethnic Wear Catalog",
    "description": "Factory-direct catalog of Kurtis, Salwar Suits, and Sarees from Surat, Gujarat.",
    "url": "https://bemitexindia.com/products",
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <JsonLd data={collectionSchema} />
      <Breadcrumb items={[{ label: "Products Catalog" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-bemitex-dark">
            Wholesale Catalog
          </h1>
          <p className="text-gray-600 mt-2 text-base sm:text-lg">
            Explore factory-direct wholesale collections of Kurtis, Suits, and Sarees for bulk boutique orders.
          </p>
        </div>

        <Suspense fallback={<div className="flex justify-center p-16"><Loader2 className="animate-spin text-bemitex-maroon" size={40} /></div>}>
          <CatalogClient />
        </Suspense>

      </div>
    </div>
  );
}
