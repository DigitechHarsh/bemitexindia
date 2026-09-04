"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus, ShoppingBag, Check, Layers } from "lucide-react";
import WhatsappIcon from "@/components/WhatsappIcon";
import { useBulkInquiry } from "@/context/BulkInquiryContext";

interface ProductDetailActionsProps {
  product: {
    id: number;
    name: string;
    slug: string;
    fabric: string;
    moq: number;
    price_per_piece: number;
    category_name: string;
    catalog_pdf_url?: string | null;
    main_image?: string;
    images?: { image_url: string; sort_order?: number }[];
  };
}

export default function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const { addToInquiry } = useBulkInquiry();
  const step = Math.max(Number(product.moq) || 4, 1);
  const [selectedQty, setSelectedQty] = useState(step);
  const [added, setAdded] = useState(false);

  const handleIncrement = () => setSelectedQty((prev) => prev + step);
  const handleDecrement = () => setSelectedQty((prev) => Math.max(prev - step, step));

  const handleAdd = () => {
    const mainImg = product.images?.[0]?.image_url || product.main_image || "/products/prod_anarkali.jpg";
    addToInquiry(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        fabric: product.fabric,
        moq: product.moq,
        price_per_piece: product.price_per_piece,
        category_name: product.category_name,
        main_image: mainImg,
      },
      selectedQty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const calculatedSubtotal = (product.price_per_piece * selectedQty).toLocaleString("en-IN");
  const bundlesCount = Math.round(selectedQty / step);

  const directWhatsAppUrl = `https://wa.me/919876543210?text=Hello%20Bemitex,%20I'm%20interested%20in%20wholesale%20order%20for:%20${encodeURIComponent(product.name)}%20(Wholesale%20Price:%20₹${product.price_per_piece}/pc,%20Quantity:%20${selectedQty}%20pcs%20/%20${bundlesCount}%20sets,%20Est:%20₹${calculatedSubtotal}).%20Please%20send%20invoice.`;

  return (
    <div className="space-y-4 pt-2">
      {/* Bundle Quantity Selector Bar */}
      <div className="bg-gray-50/90 rounded-2xl p-4 border border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
            Select Order Quantity (Multiples of {product.moq} pcs set):
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs font-semibold text-bemitex-maroon font-serif">
              {bundlesCount} {bundlesCount === 1 ? "Full Size Set" : "Full Size Sets"} ({selectedQty} Pcs)
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs font-bold text-gray-800">
              Est: ₹{calculatedSubtotal}
            </span>
          </div>
        </div>

        {/* Counter Buttons */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1 shadow-sm shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleDecrement}
            className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-lg transition active:scale-95 disabled:opacity-40"
            disabled={selectedQty <= step}
            title={`Decrease by ${step} pcs`}
          >
            <Minus size={14} />
          </button>
          
          <span className="text-sm font-bold px-3 text-bemitex-dark min-w-[3.5rem] text-center">
            {selectedQty} pcs
          </span>

          <button
            type="button"
            onClick={handleIncrement}
            className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-lg transition active:scale-95"
            title={`Increase by ${step} pcs`}
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Primary Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Add to Bulk Inquiry Cart */}
        <button
          type="button"
          onClick={handleAdd}
          className={`py-3.5 px-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer ${
            added 
              ? "bg-emerald-600 text-white" 
              : "bg-bemitex-dark hover:bg-black text-white hover:border-bemitex-gold border border-transparent"
          }`}
        >
          {added ? (
            <>
              <Check size={18} />
              <span>Added to Inquiry!</span>
            </>
          ) : (
            <>
              <ShoppingBag size={18} className="text-bemitex-gold" />
              <span>+ Add to Bulk Inquiry Cart</span>
            </>
          )}
        </button>

        {/* Direct WhatsApp Quick Message */}
        <a
          href={directWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm sm:text-base py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition shadow-md active:scale-95"
        >
          <WhatsappIcon size={20} />
          <span>Quick WhatsApp Order</span>
        </a>
      </div>

      {/* Proforma Request Link */}
      <Link
        href={`/inquiry?product=${encodeURIComponent(product.slug)}&qty=${selectedQty}`}
        className="w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 transition text-center border border-gray-200"
      >
        <span>Request Official Proforma Invoice / Email Quote</span>
      </Link>
    </div>
  );
}
