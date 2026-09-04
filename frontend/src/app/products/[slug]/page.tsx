import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Ruler, 
  Info, 
  Package, 
  Truck, 
  ShieldCheck, 
  Video, 
  CheckCircle2, 
  Clock, 
  Layers,
  IndianRupee,
  Share2
} from "lucide-react";
import WhatsappIcon from "@/components/WhatsappIcon";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import ProductImageGallery from "@/components/ProductImageGallery";
import RelatedProducts from "@/components/RelatedProducts";
import DownloadProductPdf from "@/components/DownloadProductPdf";
import ProductDetailActions from "@/components/ProductDetailActions";
import { fetchProductBySlug, fetchProducts } from "@/lib/api";

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  fabric: string;
  moq: number;
  price_per_piece: number;
  category_name: string;
  catalog_pdf_url?: string | null;
  images: { image_url: string; sort_order: number }[];
}

const fallbackCatalog: Record<string, Product> = {
  "premium-anarkali": {
    id: 1,
    name: "Premium Anarkali Kurti with Heavy Embroidery and Mirror Work",
    slug: "premium-anarkali",
    description: "Experience the epitome of elegance with this premium Anarkali kurti. Crafted with precision in our Surat facility, it features intricate heavy thread embroidery and dazzling mirror work that catches the light beautifully. Made from breathable 100% rayon slub fabric, it ensures premium comfort without compromising on royal style. Perfect for festive occasions, weddings, and premium boutique retail collections.\n\nWholesale pack includes a complete size set (M, L, XL, XXL) ensuring you can cater to all your customers' needs with high profit margins.",
    fabric: "Rayon Slub with Lurex",
    moq: 12,
    price_per_piece: 450,
    category_name: "Kurtis & Sets",
    images: [
      { image_url: "/products/prod_anarkali.jpg", sort_order: 1 },
      { image_url: "/products/prod_suit.jpg", sort_order: 2 },
      { image_url: "/products/prod_cotton.jpg", sort_order: 3 },
    ],
  },
  "georgette-suit": {
    id: 2,
    name: "Georgette Designer Salwar Suit with Heavy Dupatta",
    slug: "georgette-suit",
    description: "Exquisite designer Georgette Salwar Suit set with matching Nazneen embroidered dupatta. Features intricate thread work, zari border detailing, and santoon inner lining. Ready for boutique retail with guaranteed customer satisfaction.",
    fabric: "Pure Micro Georgette",
    moq: 6,
    price_per_piece: 1250,
    category_name: "Designer Salwar Suits",
    images: [
      { image_url: "/products/prod_suit.jpg", sort_order: 1 },
      { image_url: "/products/prod_anarkali.jpg", sort_order: 2 },
      { image_url: "/products/prod_gown.jpg", sort_order: 3 },
    ],
  },
  "banarasi-silk": {
    id: 3,
    name: "Banarasi Silk Saree Collection with Rich Zari Pallu",
    slug: "banarasi-silk",
    description: "Traditional woven Banarasi Silk Saree with heavy golden zari jacquard weave and matching unstitched blouse piece. Direct from Surat weaving units. Perfect for wedding collections and bridal wear.",
    fabric: "Banarasi Katan Silk",
    moq: 8,
    price_per_piece: 1850,
    category_name: "Traditional Sarees",
    images: [
      { image_url: "/products/prod_saree.jpg", sort_order: 1 },
      { image_url: "/products/prod_gown.jpg", sort_order: 2 },
      { image_url: "/products/prod_anarkali.jpg", sort_order: 3 },
    ],
  },
  "cotton-kurti-set": {
    id: 4,
    name: "Pure Cotton Printed Kurti with Pant & Dupatta Set",
    slug: "cotton-kurti-set",
    description: "Dailywear pure 60-60 cotton printed kurti with matching pant and malmal cotton dupatta. Fast-moving stock with guaranteed color fastness and shrink resistance.",
    fabric: "60-60 Pure Cambric Cotton",
    moq: 20,
    price_per_piece: 350,
    category_name: "Kurtis & Sets",
    images: [
      { image_url: "/products/prod_cotton.jpg", sort_order: 1 },
      { image_url: "/products/prod_anarkali.jpg", sort_order: 2 },
      { image_url: "/products/prod_suit.jpg", sort_order: 3 },
    ],
  },
  "heavy-bridal-gown": {
    id: 5,
    name: "Heavy Bridal Gown with Stone & Zardozi Flared Work",
    slug: "heavy-bridal-gown",
    description: "Grand bridal flared gown with double cancan, zardozi hand embroidery, and stone embellishments. Ideal for bridal boutiques, partywear showrooms, and wedding rental businesses.",
    fabric: "Net & Silk Satin with Double Cancan",
    moq: 4,
    price_per_piece: 3500,
    category_name: "Partywear Gowns",
    images: [
      { image_url: "/products/prod_gown.jpg", sort_order: 1 },
      { image_url: "/products/prod_saree.jpg", sort_order: 2 },
      { image_url: "/products/prod_suit.jpg", sort_order: 3 },
    ],
  },
  "pashmina-winter": {
    id: 6,
    name: "Pashmina Winter Suit Collection with Warm Shawl",
    slug: "pashmina-winter",
    description: "Premium Kashmiri Pashmina woolen printed salwar suit collection with full length warm shawl dupatta for winter boutique retail.",
    fabric: "Spun Kashmiri Pashmina Wool",
    moq: 10,
    price_per_piece: 850,
    category_name: "Designer Salwar Suits",
    images: [
      { image_url: "/products/prod_pashmina.jpg", sort_order: 1 },
      { image_url: "/products/prod_suit.jpg", sort_order: 2 },
      { image_url: "/products/prod_cotton.jpg", sort_order: 3 },
    ],
  },
};

// Helper to get product from live API or fallback
async function getProduct(slug: string): Promise<Product | null> {
  try {
    const apiProduct = await fetchProductBySlug(slug);
    if (apiProduct) {
      const liveImages = (apiProduct.images && apiProduct.images.length > 0)
        ? apiProduct.images 
        : [
            { image_url: apiProduct.main_image || "/products/prod_anarkali.jpg", sort_order: 1 },
            { image_url: "/products/prod_suit.jpg", sort_order: 2 },
            { image_url: "/products/prod_cotton.jpg", sort_order: 3 },
          ];

      return {
        id: apiProduct.id,
        name: apiProduct.name,
        slug: apiProduct.slug,
        description: apiProduct.description || "Factory-direct wholesale ethnic wear from Surat, Gujarat.",
        fabric: apiProduct.fabric || "Rayon / Cotton",
        moq: Number(apiProduct.moq) || 12,
        price_per_piece: Number(apiProduct.price_per_piece) || 450,
        category_name: apiProduct.category_name || "Ethnic Wear",
        catalog_pdf_url: apiProduct.catalog_pdf_url || null,
        images: liveImages,
      };
    }
  } catch (e) {
    console.error("Live API fetch error, using fallback catalog");
  }

  if (fallbackCatalog[slug]) {
    return fallbackCatalog[slug];
  }

  // General slug generator
  const formattedName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    id: 99,
    name: `${formattedName} - Wholesale Collection`,
    slug: slug,
    description: `Factory-direct wholesale ${formattedName}. Manufactured with premium quality fabrics in Surat, Gujarat. Available in full set bundles for boutiques, retail showrooms, and reseller businesses.`,
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
  const product = await getProduct(params.slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bemitexindia.com";
  
  if (!product) {
    return {
      title: "Product Not Found | Bemitex India",
    };
  }

  const mainImage = product.images[0]?.image_url || `${baseUrl}/logo.jpg`;

  return {
    title: `${product.name} (Wholesale ₹${product.price_per_piece}/pc)`,
    description: `Buy ${product.name} at factory wholesale price ₹${product.price_per_piece}/pc (MOQ: ${product.moq} pcs). Fabric: ${product.fabric}. Direct manufacturer dispatch from Surat. Cash on delivery available.`,
    keywords: [
      product.name,
      `${product.category_name} wholesale surat`,
      `${product.fabric} wholesale`,
      "surat factory price",
      "b2b wholesale ethnic wear",
      "bemitex india",
    ],
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Factory Wholesale ₹${product.price_per_piece}`,
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

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bemitexindia.com";

  if (!product) {
    notFound();
  }

  // Fetch all products for recommendations
  const allProducts = await fetchProducts();
  const suggestionList = allProducts.length > 0 ? allProducts : Object.values(fallbackCatalog);

  // Bundle Calculations
  const bundleTotalPrice = product.price_per_piece * product.moq;
  const estRetailPrice = Math.round(product.price_per_piece * 2.5);

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

  const whatsappInquiryUrl = `https://wa.me/919876543210?text=Hello%20Bemitex,%20I'm%20interested%20in%20wholesale%20order%20for:%20${encodeURIComponent(product.name)}%20(Wholesale%20Price:%20₹${product.price_per_piece}/pc,%20MOQ:%20${product.moq}%20pcs).%20Please%20send%20the%20catalog%20and%20invoice.`;

  return (
    <div className="bg-gray-50/50 min-h-screen pb-24">
      <JsonLd data={productSchema} />
      
      {/* Navigation Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Catalog", href: "/products" },
          { label: product.category_name, href: `/products?category=${product.category_name.toLowerCase().replace(/\s+/g, "-")}` },
          { label: product.name },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        
        {/* Main Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-gray-100">
          
          {/* Left Column: High-Res Media Gallery (7 cols) */}
          <div className="lg:col-span-6">
            <ProductImageGallery 
              images={product.images} 
              productName={product.name} 
              fabric={product.fabric}
            />
          </div>

          {/* Right Column: Wholesale Specifications & Direct Actions (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Category Tag & SKU */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-extrabold text-bemitex-maroon uppercase tracking-wider bg-bemitex-cream px-3.5 py-1 rounded-full border border-bemitex-gold/30">
                {product.category_name}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                SKU: BMT-{product.id.toString().padStart(4, "0")}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-bemitex-dark leading-tight">
              {product.name}
            </h1>

            {/* Price & Bundle Slabs Box */}
            <div className="bg-gradient-to-br from-bemitex-cream/60 via-amber-50/40 to-white p-6 rounded-2xl border border-bemitex-gold/40 shadow-sm space-y-3">
              <div className="flex items-baseline justify-between flex-wrap gap-2 pb-3 border-b border-bemitex-gold/20">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                    Factory Wholesale Price
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl sm:text-4xl font-extrabold text-bemitex-maroon">
                      ₹{product.price_per_piece}
                    </span>
                    <span className="text-sm font-semibold text-gray-600">/ piece</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-gray-500 block">Est. Retail Margin</span>
                  <span className="text-base font-bold text-emerald-700">
                    ₹{estRetailPrice} <span className="text-xs font-normal text-gray-500">(~60% Profit)</span>
                  </span>
                </div>
              </div>

              {/* Bundle MOQ Details */}
              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-700 pt-1">
                <span className="font-semibold flex items-center gap-1.5 text-bemitex-dark">
                  <Package size={16} className="text-bemitex-maroon" /> Minimum Order Quantity:
                </span>
                <span className="font-bold text-bemitex-maroon bg-white px-2.5 py-1 rounded-lg border border-gray-200 shadow-sm">
                  {product.moq} Pieces (Full Set)
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600 pt-1">
                <span>Bundle Total Estimate:</span>
                <span className="font-bold text-gray-900 text-sm">
                  ₹{bundleTotalPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Size Set Breakdown Pills */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-700 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Ruler size={15} className="text-bemitex-maroon" /> Included Sizes in Set:
                </span>
                <span className="text-emerald-600 font-semibold lowercase">equal ratio full set</span>
              </div>

              <div className="flex items-center gap-2">
                {["M (38)", "L (40)", "XL (42)", "XXL (44)"].map((size, idx) => (
                  <span
                    key={idx}
                    className="flex-1 py-2 text-center text-xs font-bold rounded-xl bg-gray-50 text-gray-800 border border-gray-200"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Spec Highlights Grid */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3">
                <Info size={18} className="text-bemitex-maroon shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-semibold text-gray-500 uppercase block">Fabric Quality</span>
                  <span className="text-xs sm:text-sm font-bold text-bemitex-dark">{product.fabric}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3">
                <Clock size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-semibold text-gray-500 uppercase block">Dispatch Speed</span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-700">24-48 Hrs Ready</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3">
                <Truck size={18} className="text-bemitex-maroon shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-semibold text-gray-500 uppercase block">Payment Options</span>
                  <span className="text-xs sm:text-sm font-bold text-bemitex-dark">COD & Transport LR</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3">
                <ShieldCheck size={18} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-semibold text-gray-500 uppercase block">Quality Assurance</span>
                  <span className="text-xs sm:text-sm font-bold text-bemitex-dark">100% Checked</span>
                </div>
              </div>
            </div>

            {/* Bulk Inquiry Actions & Wholesale Quantity Bar */}
            <ProductDetailActions product={product} />

            {/* Download Wholesale PDF Catalog Button */}
            <DownloadProductPdf product={product} />

            {/* Trust Sourcing Guarantee */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200/60 rounded-2xl flex items-center gap-3 text-xs text-emerald-900">
              <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
              <span>
                <strong>B2B Factory Direct Guarantee:</strong> Sourced directly from Surat manufacturing looms. Zero middlemen commissions.
              </span>
            </div>

          </div>
        </div>

        {/* Product Specifications & Details Tabs */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-bemitex-dark mb-6 flex items-center gap-2">
            <Layers size={22} className="text-bemitex-maroon" /> Product Description & Fabric Specifications
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
              {product.description.split("\n\n").map((paragraph: string, idx: number) => (
                <p key={idx}>{paragraph}</p>
              ))}

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-bold text-bemitex-dark text-base mb-3">Wholesale Packaging & Dispatch Details:</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                  <li><strong>Packaging:</strong> Each piece in individual zipper polybag with style code, packed in master corrugated carton.</li>
                  <li><strong>Dispatch:</strong> Orders dispatched within 24-48 hours from Surat via Delhivery, BlueDart, or city transport godown.</li>
                  <li><strong>Payment:</strong> Cash on Delivery (COD) available with token booking advance. NEFT, RTGS, and UPI accepted.</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200/80 space-y-4">
              <h3 className="font-bold text-bemitex-dark text-sm uppercase tracking-wider">Quick Specification Table</h3>
              
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between py-1.5 border-b border-gray-200">
                  <span className="text-gray-500">Fabric</span>
                  <span className="font-semibold text-gray-800">{product.fabric}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-200">
                  <span className="text-gray-500">Category</span>
                  <span className="font-semibold text-gray-800">{product.category_name}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-200">
                  <span className="text-gray-500">Sizes Available</span>
                  <span className="font-semibold text-gray-800">M, L, XL, XXL (Full Set)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-200">
                  <span className="text-gray-500">Minimum Order</span>
                  <span className="font-semibold text-bemitex-maroon">{product.moq} Pieces</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-200">
                  <span className="text-gray-500">Origin</span>
                  <span className="font-semibold text-gray-800">Surat, Gujarat, India</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-500">Wash Care</span>
                  <span className="font-semibold text-gray-800">Dry Clean / Gentle Wash</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related / Suggested Products Section */}
        <RelatedProducts
          currentSlug={product.slug}
          currentCategory={product.category_name}
          products={suggestionList}
        />

      </div>
    </div>
  );
}
