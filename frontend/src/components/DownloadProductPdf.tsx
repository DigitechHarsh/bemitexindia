"use client";

import { useState } from "react";
import { FileDown, Printer, CheckCircle2, Building2, Phone, Mail, MapPin } from "lucide-react";

interface ProductPdfProps {
  product: {
    id: number;
    name: string;
    slug: string;
    description: string;
    fabric: string;
    moq: number;
    price_per_piece: number;
    category_name: string;
    catalog_pdf_url?: string | null;
    images?: { image_url: string; sort_order?: number }[];
  };
}

export default function DownloadProductPdf({ product }: ProductPdfProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = () => {
    if (product.catalog_pdf_url) {
      window.open(product.catalog_pdf_url, "_blank");
      return;
    }

    // Otherwise generate the branded spec sheet
    setIsGenerating(true);
    setTimeout(() => {
      window.print();
      setIsGenerating(false);
    }, 300);
  };

  const mainImageUrl = product.images?.[0]?.image_url || "/products/prod_anarkali.jpg";

  return (
    <>
      {/* On-Page Button for Customers */}
      <button
        type="button"
        onClick={handleDownload}
        className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-amber-900 border border-amber-200/80 font-semibold text-sm shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer group"
        title="Download official wholesale specification & rate sheet PDF"
      >
        <FileDown size={18} className="text-amber-700 group-hover:-translate-y-0.5 transition-transform" />
        <span>Download Wholesale PDF Catalog / Spec Sheet</span>
      </button>

      {/* Hidden Print-Only High Resolution Wholesale PDF Document */}
      <div className="hidden print:block fixed inset-0 bg-white z-[9999] p-8 text-black font-sans">
        {/* Header */}
        <div className="flex justify-between items-start pb-6 border-b-2 border-amber-700 mb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-amber-950 tracking-wider">BEMITEX INDIA</h1>
            <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold mt-0.5">
              Surat Textile Manufacturer & Direct Wholesale Supplier
            </p>
            <div className="text-[11px] text-gray-600 mt-2 space-y-0.5">
              <p className="flex items-center gap-1.5"><MapPin size={11} /> Surat Textile Market, Ring Road, Surat, Gujarat - 395002</p>
              <p className="flex items-center gap-1.5"><Phone size={11} /> +91 98765 43210 / WhatsApp Inquiry Desk</p>
              <p className="flex items-center gap-1.5"><Mail size={11} /> info@bemitex.com | GSTIN: 24AAAAA0000A1Z5</p>
            </div>
          </div>

          <div className="text-right bg-amber-50 p-4 rounded-xl border border-amber-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">Wholesale Rate Sheet</span>
            <span className="text-xs font-mono text-gray-500">REF: BMT-{product.id}-{product.slug.slice(0, 5).toUpperCase()}</span>
            <div className="text-[10px] text-gray-500 mt-1">Date: {new Date().toLocaleDateString('en-IN')}</div>
          </div>
        </div>

        {/* Body Content */}
        <div className="grid grid-cols-12 gap-8 mb-6">
          {/* Product Image */}
          <div className="col-span-5">
            <div className="w-full h-80 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
              <img 
                src={mainImageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Specs */}
          <div className="col-span-7 space-y-4">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
                Category: {product.category_name}
              </span>
              <h2 className="text-2xl font-serif font-bold text-gray-900">{product.name}</h2>
            </div>

            <table className="w-full text-xs border border-gray-200 divide-y divide-gray-200">
              <tbody className="divide-y divide-gray-100">
                <tr className="bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-gray-700 w-1/3">Fabric Quality:</td>
                  <td className="py-2 px-3 font-bold text-amber-950">{product.fabric}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-gray-700">Minimum Order (MOQ):</td>
                  <td className="py-2 px-3 font-bold text-gray-900">{product.moq} Pieces (Full Set)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-gray-700">Wholesale Factory Rate:</td>
                  <td className="py-2 px-3 text-base font-bold text-amber-900">₹{product.price_per_piece} / piece</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-gray-700">Bundle Estimate (MOQ):</td>
                  <td className="py-2 px-3 font-bold text-gray-900">₹{(product.price_per_piece * product.moq).toLocaleString('en-IN')} + GST</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-gray-700">Available Sizes:</td>
                  <td className="py-2 px-3 font-semibold text-gray-800">M, L, XL, XXL (Standard Surat Set)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-gray-700">Dispatch Location:</td>
                  <td className="py-2 px-3 font-semibold text-gray-800">Direct Factory Unit, Surat (Gujarat)</td>
                </tr>
              </tbody>
            </table>

            <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-100 text-xs">
              <p className="font-semibold text-amber-950 mb-1">Product Description:</p>
              <p className="text-gray-700 line-clamp-4 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Wholesale Ordering Policy */}
        <div className="border-t border-gray-200 pt-4 mt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">B2B Wholesale Terms & Dispatch</h3>
          <div className="grid grid-cols-3 gap-4 text-[10px] text-gray-600 bg-gray-50 p-3 rounded-xl">
            <div>
              <p className="font-bold text-gray-800">📦 Packaging</p>
              <p>Individual poly pack with high quality master carton bale packing.</p>
            </div>
            <div>
              <p className="font-bold text-gray-800">🚚 All India Transport</p>
              <p>Safechem, V-Trans, Trackon, DTDC, and Surat transport network.</p>
            </div>
            <div>
              <p className="font-bold text-gray-800">💳 Payment Terms</p>
              <p>100% advance RTGS / NEFT / UPI before dispatch.</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6 text-[10px] text-gray-400 border-t border-gray-100 pt-3">
          This is an official wholesale price sheet generated from Bemitex India (bemitex.com). Rates are subject to fabric market revisions.
        </div>
      </div>
    </>
  );
}
