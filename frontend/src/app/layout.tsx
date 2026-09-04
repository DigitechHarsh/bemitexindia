import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import JsonLd from "@/components/JsonLd";
import { BulkInquiryProvider } from "@/context/BulkInquiryContext";
import BulkInquiryDrawer from "@/components/BulkInquiryDrawer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bemitexindia.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bemitex India | Wholesale Women Ethnic Wear Manufacturer Surat",
    template: "%s | Bemitex India",
  },
  description: "Bemitex India is a premier wholesale ethnic wear manufacturer in Surat. We supply factory-direct Kurtis, Designer Salwar Suits, and Traditional Sarees for boutiques, retailers & bulk buyers worldwide.",
  keywords: [
    "wholesale ethnic wear",
    "kurtis manufacturer surat",
    "wholesale salwar suit supplier",
    "surat textile wholesale market",
    "b2b ethnic wear manufacturer",
    "designer sarees wholesale",
    "bemitex india",
    "wholesale kurtis in bulk",
    "ladies suit wholesale surat"
  ],
  authors: [{ name: "Bemitex India", url: siteUrl }],
  creator: "Bemitex India",
  publisher: "Bemitex India",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Bemitex India",
    title: "Bemitex India | Factory-Direct Wholesale Ethnic Wear Manufacturer Surat",
    description: "Wholesale manufacturer and exporter of Kurtis, Salwar Suits, and Sarees directly from Surat textile hub. Guaranteed quality & worldwide shipping.",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 800,
        alt: "Bemitex India - Wholesale Ethnic Wear",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bemitex India | Wholesale Ethnic Wear Manufacturer Surat",
    description: "Wholesale manufacturer and exporter of Kurtis, Salwar Suits, and Sarees directly from Surat textile hub.",
    images: ["/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
  },
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalOrganizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "Bemitex India",
        "url": siteUrl,
        "logo": `${siteUrl}/logo.jpg`,
        "description": "Leading manufacturer, wholesaler, and exporter of Women's Ethnic Wear including Kurtis, Salwar Suits, and Sarees located in Surat, India.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ring Road, Textile Market Area",
          "addressLocality": "Surat",
          "addressRegion": "Gujarat",
          "postalCode": "395002",
          "addressCountry": "IN"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+91 98765 43210",
            "contactType": "wholesale sales and customer service",
            "areaServed": ["IN", "US", "GB", "AE", "CA", "AU"],
            "availableLanguage": ["English", "Hindi", "Gujarati"]
          }
        ]
      },
      {
        "@type": "WholesaleStore",
        "@id": `${siteUrl}/#store`,
        "name": "Bemitex India",
        "url": siteUrl,
        "image": `${siteUrl}/logo.jpg`,
        "priceRange": "₹₹",
        "telephone": "+91 98765 43210",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Surat",
          "addressRegion": "Gujarat",
          "addressCountry": "IN"
        }
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "Bemitex India",
        "publisher": { "@id": `${siteUrl}/#organization` },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${siteUrl}/products?search={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <JsonLd data={globalOrganizationSchema} />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col font-sans`}>
        <BulkInquiryProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
          <BulkInquiryDrawer />
        </BulkInquiryProvider>
      </body>
    </html>
  );
}

