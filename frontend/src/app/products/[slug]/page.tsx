import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Ruler, Info, Package } from "lucide-react";
import WhatsappIcon from "@/components/WhatsappIcon";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import ProductImageGallery from "@/components/ProductImageGallery";

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  fabric: string;
  moq: number;
  price_per_piece: number;
  category_name: string;
  images: { image_url: string; sort_order: number }[];
}

const productsCatalog: Record<string, Product> = {
  "premium-anarkali": {
    id: 1,
    name: "Premium Anarkali Kurti with Heavy Embroidery and Mirror Work",
    slug: "premium-anarkali",
    description: "Experience the epitome of elegance with this premium Anarkali kurti. Crafted with precision, it features intricate heavy embroidery and dazzling mirror work that catches the light beautifully. Made from breathable rayon slub fabric, it ensures comfort without compromising on style. Perfect for festive occasions, weddings, and premium retail collections.\n\nWholesale pack includes a full size set (M, L, XL, XXL) ensuring you can cater to all your customers' needs.",
    fabric: "Rayon Slub",
    moq: 12,
    price_per_piece: 450,
    category_name: "Kurtis",
    images: [
      { image_url: "https://images.unsplash.com/photo-1631541909061-71e34a360a03?q=80&w=800&auto=format&fit=crop", sort_order: 1 },
      { image_url: "https://images.unsplash.com/photo-1616421571738-eb7f1b1356fc?q=80&w=800&auto=format&fit=crop", sort_order: 2 },
    ],
  },
  "georgette-suit": {
    id: 2,
    name: "Georgette Designer Salwar Suit with Dupatta",
    slug: "georgette-suit",
    description: "Exquisite designer Georgette Salwar Suit set with matching Nazneen dupatta. Features intricate thread work and zari border embroidery. Ready for boutique retail with full margins.",
    fabric: "Pure Georgette",
    moq: 6,
    price_per_piece: 1250,
    category_name: "Salwar Suits",
    images: [
      { image_url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop", sort_order: 1 },
    ],
  },
  "banarasi-silk": {
    id: 3,
    name: "Banarasi Silk Saree Collection with Rich Zari Pallu",
    slug: "banarasi-silk",
    description: "Traditional woven Banarasi Silk Saree with heavy golden zari jacquard weave and matching unstitched blouse piece. Direct from Surat weaving units.",
    fabric: "Banarasi Art Silk",
    moq: 8,
    price_per_piece: 1850,
    category_name: "Sarees",
    images: [
      { image_url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop", sort_order: 1 },
    ],
  },
  "cotton-kurti-set": {
    id: 4,
    name: "Pure Cotton Printed Kurti with Pant Set",
    slug: "cotton-kurti-set",
    description: "Dailywear pure 60-60 cotton printed kurti with matching pant and malmal dupatta. Fast-moving stock with guaranteed color fastness.",
    fabric: "60-60 Pure Cotton",
    moq: 20,
    price_per_piece: 350,
    category_name: "Kurtis",
    images: [
      { image_url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop", sort_order: 1 },
    ],
  },
  "heavy-bridal-gown": {
    id: 5,
    name: "Heavy Bridal Gown with Stone & Zardozi Work",
    slug: "heavy-bridal-gown",
    description: "Grand bridal flared gown with double cancan, zardozi embroidery, and stone embellishments. Ideal for bridal boutiques and wedding rental collections.",
    fabric: "Net & Satin with Cancan",
    moq: 4,
    price_per_piece: 3500,
    category_name: "Gowns",
    images: [
      { image_url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop", sort_order: 1 },
    ],
  },
  "pashmina-winter": {
    id: 6,
    name: "Pashmina Winter Suit Collection with Warm Shawl",
    slug: "pashmina-winter",
    description: "Premium Kashmiri Pashmina woolen printed salwar suit collection with full length warm shawl dupatta for winter boutique retail.",
    fabric: "Spun Pashmina Wool",
    moq: 10,
    price_per_piece: 850,
    category_name: "Salwar Suits",
    images: [
      { image_url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop", sort_order: 1 },
    ],
  },
};

function getProductBySlug(slug: string): Product {
  if (productsCatalog[slug]) {
    return productsCatalog[slug];
  }
  // Fallback for general slugs
  const formattedName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    id: 99,
    name: `${formattedName} - Wholesale Collection`,
    slug: slug,
    description: `Factory-direct wholesale ${formattedName}. Manufactured with premium fabrics in Surat, Gujarat. Available in full set bundles for boutiques and retailers.`,
    fabric: "Rayon / Cotton Blend",
    moq: 12,
    price_per_piece: 499,
    category_name: "Ethnic Wear",
    images: [
      { image_url: "https://images.unsplash.com/photo-1631541909061-71e34a360a03?q=80&w=800&auto=format&fit=crop", sort_order: 1 },
    ],
  };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bemitexindia.com";
  const mainImage = product.images[0]?.image_url || `${baseUrl}/logo.jpg`;

  return {
    title: `${product.name} (Wholesale Price ₹${product.price_per_piece})`,
    description: `Buy ${product.name} at factory wholesale price ₹${product.price_per_piece}/pc (MOQ: ${product.moq} pcs). Fabric: ${product.fabric}. Direct manufacturer dispatch from Surat.`,
    keywords: [
      product.name,
      `${product.category_name} wholesale surat`,
      `${product.fabric} wholesale`,
      "surat factory price",
      "b2b wholesale ethnic wear",
    ],
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Wholesale Price ₹${product.price_per_piece}`,
      description: `Wholesale ${product.category_name} direct from Surat manufacturer. MOQ: ${product.moq} pcs. Fabric: ${product.fabric}.`,
      url: `/products/${product.slug}`,
      type: "article",
      images: [
        {
          url: mainImage,
          width: 800,
          height: 800,
          alt: `${product.name} Wholesale Ethnic Wear`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} - Wholesale ₹${product.price_per_piece}`,
      description: `Wholesale ${product.category_name} from Surat factory. MOQ: ${product.moq} pcs.`,
      images: [mainImage],
    },
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bemitexindia.com";

  if (!product) {
    notFound();
  }

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images.map((img) => img.image_url),
    "description": product.description,
    "sku": `BMT-${product.id}-${product.slug}`,
    "brand": {
      "@type": "Brand",
      "name": "Bemitex India",
    },
    "material": product.fabric,
    "category": product.category_name,
    "offers": {
      "@type": "Offer",
      "url": `${baseUrl}/products/${product.slug}`,
      "priceCurrency": "INR",
      "price": product.price_per_piece,
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "Bemitex India",
      },
      "eligibleQuantity": {
        "@type": "QuantitativeValue",
        "value": product.moq,
        "unitCode": "C62",
      },
    },
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <JsonLd data={productSchema} />
      <Breadcrumb
        items={[
          { label: "Products", href: "/products" },
          { label: product.category_name, href: `/products?category=${product.category_name.toLowerCase().replace(/\s+/g, "-")}` },
          { label: product.name },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Product Image Gallery (Client Component) */}
          <div>
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-2">
              <span className="text-xs font-bold text-bemitex-maroon uppercase tracking-wider bg-bemitex-cream/80 px-3 py-1 rounded-full">
                {product.category_name}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-bemitex-dark mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div>
                <span className="text-gray-500 text-xs sm:text-sm block">Factory Wholesale Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-bold text-bemitex-maroon">₹{product.price_per_piece}</span>
                  <span className="text-gray-500 text-sm font-medium">/ piece (Ex-factory)</span>
                </div>
              </div>
            </div>

            {/* Critical B2B Info Box */}
            <div className="bg-bemitex-cream/40 border border-bemitex-gold/30 rounded-2xl p-5 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-bemitex-gold/20 p-3 rounded-xl text-bemitex-dark shrink-0">
                  <Package size={24} />
                </div>
                <div>
                  <h2 className="font-bold text-base sm:text-lg mb-1 text-bemitex-dark">
                    Wholesale Full-Set Requirement
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2">
                    This item is sold in full size sets for retail shops and boutiques.
                  </p>
                  <div className="inline-block bg-bemitex-maroon text-white font-bold px-3 py-1 rounded-lg text-xs sm:text-sm shadow-sm">
                    Minimum Order Quantity (MOQ): {product.moq} Pieces
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <Info className="text-bemitex-maroon shrink-0" size={22} />
                <div>
                  <span className="block text-xs text-gray-500">Fabric Quality</span>
                  <span className="font-semibold text-sm sm:text-base text-bemitex-dark">{product.fabric}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <Ruler className="text-bemitex-maroon shrink-0" size={22} />
                <div>
                  <span className="block text-xs text-gray-500">Sizes in Bundle</span>
                  <span className="font-semibold text-sm sm:text-base text-bemitex-dark">M, L, XL, XXL Set</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a 
                href={`https://wa.me/919876543210?text=Hello%20Bemitex,%20I%20want%20to%20inquire%20about:%20${encodeURIComponent(product.name)}%20(MOQ:%20${product.moq}%20pcs).%20Please%20provide%20bulk%20quote.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-base sm:text-lg py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <WhatsappIcon size={22} /> Inquire on WhatsApp
              </a>
              <Link 
                href={`/inquiry?product=${encodeURIComponent(product.slug)}`}
                className="flex-1 bg-bemitex-dark hover:bg-gray-800 text-white font-bold text-base sm:text-lg py-3.5 px-6 rounded-xl flex items-center justify-center transition-colors shadow-md text-center"
              >
                Request Custom Quote
              </Link>
            </div>

            {/* Description */}
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-bemitex-dark mb-4">
                Fabric & Product Specifications
              </h2>
              <div className="prose text-gray-600 text-sm sm:text-base leading-relaxed space-y-3">
                {product.description.split("\n\n").map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
