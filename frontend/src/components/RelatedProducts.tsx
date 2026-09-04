"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import WhatsappIcon from "@/components/WhatsappIcon";

export interface SuggestionProduct {
  id: number;
  name: string;
  slug: string;
  fabric?: string;
  moq: number;
  price_per_piece: number | string;
  category_name: string;
  main_image?: string | null;
}

interface RelatedProductsProps {
  currentSlug: string;
  currentCategory?: string;
  products: SuggestionProduct[];
}

export default function RelatedProducts({ currentSlug, currentCategory, products }: RelatedProductsProps) {
  // Filter out current product and get up to 4 recommendations
  const suggestions = products
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 4);

  if (suggestions.length === 0) return null;

  return (
    <section className="mt-20 pt-16 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-bemitex-maroon text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={16} className="text-bemitex-gold" /> Trending Wholesale Sourcing
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-bemitex-dark">
            You May Also Like & Sourcing Suggestions
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Top moving factory designs in {currentCategory || "Women Ethnic Wear"} for boutique retailers
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-bemitex-maroon hover:text-bemitex-dark font-bold text-sm sm:text-base transition group"
        >
          <span>Explore Entire Catalog</span>
          <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {suggestions.map((item) => {
          const imgUrl = item.main_image || "/products/prod_anarkali.jpg";
          const parsedPrice = typeof item.price_per_piece === "number" ? item.price_per_piece : parseFloat(item.price_per_piece);

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Product Image & Badges */}
              <Link href={`/products/${item.slug}`} className="relative h-72 w-full block bg-gray-100 overflow-hidden">
                <Image
                  src={imgUrl}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute top-3 left-3 bg-bemitex-maroon/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md">
                  MOQ: {item.moq} pcs
                </div>

                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-bemitex-dark text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  {item.category_name}
                </div>
              </Link>

              {/* Card Details */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex text-bemitex-gold mb-1.5 gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={13} fill="currentColor" />
                    ))}
                  </div>

                  <Link href={`/products/${item.slug}`}>
                    <h3 className="font-bold text-base text-bemitex-dark group-hover:text-bemitex-maroon transition-colors line-clamp-1 mb-1">
                      {item.name}
                    </h3>
                  </Link>

                  {item.fabric && (
                    <p className="text-xs text-gray-500 line-clamp-1 mb-3">
                      Fabric: <span className="text-gray-700 font-medium">{item.fabric}</span>
                    </p>
                  )}
                </div>

                {/* Price & WhatsApp Action */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-2">
                  <div>
                    <span className="text-[11px] text-gray-400 block font-medium">Wholesale Rate</span>
                    <span className="text-lg font-bold text-bemitex-maroon">₹{parsedPrice}</span>
                    <span className="text-[11px] text-gray-500 font-normal"> /pc</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/919876543210?text=Hello%20Bemitex,%20I'm%20interested%20in%20wholesale%20order%20for:%20${encodeURIComponent(item.name)}%20(MOQ:%20${item.moq}%20pcs).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-[#25D366] hover:text-white transition-all shadow-sm"
                      title="Quick Inquiry on WhatsApp"
                    >
                      <WhatsappIcon size={18} />
                    </a>
                    <Link
                      href={`/products/${item.slug}`}
                      className="px-3 py-2 bg-gray-50 hover:bg-bemitex-dark hover:text-white text-gray-700 text-xs font-bold rounded-xl transition"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
