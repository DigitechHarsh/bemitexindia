"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShoppingBag, 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  MapPin, 
  User, 
  FileText,
  ShieldCheck,
  Truck
} from "lucide-react";
import { useBulkInquiry } from "@/context/BulkInquiryContext";
import WhatsappIcon from "@/components/WhatsappIcon";
import { usePathname } from "next/navigation";

export default function BulkInquiryDrawer() {
  const pathname = usePathname();
  const { 
    items, 
    isDrawerOpen, 
    closeDrawer, 
    openDrawer, 
    removeFromInquiry, 
    updateQuantity, 
    clearInquiry, 
    totalItems, 
    totalPcs, 
    totalAmount 
  } = useBulkInquiry();

  // Buyer Info Form State
  const [buyerName, setBuyerName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [city, setCity] = useState("");

  // Do not render on Admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Construct WhatsApp Structured Message
  const generateWhatsAppMessage = () => {
    let msg = `*BEMITEX INDIA - WHOLESALE BULK ORDER INQUIRY*\n`;
    msg += `-------------------------------------------\n`;
    
    if (buyerName || businessName || city) {
      msg += `*Buyer Details:*\n`;
      if (buyerName) msg += `• Contact Person: ${buyerName}\n`;
      if (businessName) msg += `• Business/Boutique: ${businessName}\n`;
      if (city) msg += `• City / State: ${city}\n`;
      msg += `-------------------------------------------\n`;
    }

    msg += `*Requested Bulk Designs (${totalItems} Designs | ${totalPcs} Pcs):*\n\n`;

    items.forEach((item, index) => {
      const lineTotal = (item.price_per_piece * item.quantity).toLocaleString("en-IN");
      msg += `${index + 1}. *${item.name}*\n`;
      msg += `   • Fabric: ${item.fabric}\n`;
      msg += `   • Wholesale Rate: ₹${item.price_per_piece}/pc (MOQ: ${item.moq} pcs)\n`;
      msg += `   • Ordered Qty: *${item.quantity} pieces*\n`;
      msg += `   • Subtotal: ₹${lineTotal}\n\n`;
    });

    msg += `-------------------------------------------\n`;
    msg += `*TOTAL ESTIMATED AMOUNT:* ₹${totalAmount.toLocaleString("en-IN")} + GST\n`;
    msg += `*TOTAL QUANTITY:* ${totalPcs} Pieces\n`;
    msg += `-------------------------------------------\n`;
    msg += `Please send the formal proforma invoice, ready stock confirmation & transport dispatch schedule to my location.`;

    return `https://wa.me/919876543210?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      {/* 1. Floating Bottom Trigger Pill (When items in cart and drawer is closed) */}
      {totalItems > 0 && !isDrawerOpen && (
        <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <button
            onClick={openDrawer}
            type="button"
            className="flex items-center gap-3.5 bg-bemitex-dark hover:bg-black text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-bemitex-gold/40 hover:scale-105 active:scale-95 transition-all group cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag size={22} className="text-bemitex-gold" />
              <span className="absolute -top-2 -right-2 bg-bemitex-maroon text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-bemitex-dark">
                {totalItems}
              </span>
            </div>

            <div className="text-left">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Bulk Inquiry Cart</span>
                <span className="text-[11px] font-normal text-gray-300">({totalPcs} pcs)</span>
              </div>
              <div className="text-[11px] font-bold text-bemitex-gold">
                Est: ₹{totalAmount.toLocaleString("en-IN")}
              </div>
            </div>

            <div className="p-1.5 bg-white/10 rounded-xl group-hover:bg-bemitex-maroon transition">
              <ArrowRight size={14} className="text-white" />
            </div>
          </button>
        </div>
      )}

      {/* 2. Slide-Over Drawer Overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity animate-in fade-in duration-200"
          onClick={closeDrawer}
        >
          {/* Drawer Panel */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-y-0 right-0 max-w-lg w-full bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/80">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-bemitex-maroon/10 text-bemitex-maroon flex items-center justify-center font-bold">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-bemitex-dark">
                    Bulk Wholesale Inquiry
                  </h3>
                  <p className="text-xs text-gray-500">
                    {totalItems} {totalItems === 1 ? "Design" : "Designs"} • {totalPcs} Total Pieces Selected
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {totalItems > 0 && (
                  <button
                    onClick={clearInquiry}
                    className="text-xs text-gray-400 hover:text-red-600 font-medium px-2 py-1 rounded-md transition"
                    title="Clear All Items"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={closeDrawer}
                  className="text-gray-400 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-200 transition"
                  aria-label="Close Inquiry Drawer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {totalItems === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center">
                    <ShoppingBag size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-700 text-base">Your Bulk Inquiry Cart is Empty</h4>
                    <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                      Explore our wholesale catalog and add multiple kurti sets, sarees, and suits to get a single consolidated quote.
                    </p>
                  </div>
                  <Link
                    href="/products"
                    onClick={closeDrawer}
                    className="inline-flex items-center gap-2 bg-bemitex-maroon text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md hover:bg-bemitex-dark transition"
                  >
                    <span>Browse Wholesale Catalog</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className="space-y-3">
                    {items.map((item) => {
                      const itemSubtotal = (item.price_per_piece * item.quantity).toLocaleString("en-IN");
                      const stepSize = item.moq || 4;

                      return (
                        <div 
                          key={item.id}
                          className="bg-white rounded-2xl border border-gray-200/80 p-3.5 shadow-sm hover:border-bemitex-maroon/40 transition flex gap-3.5 items-center"
                        >
                          {/* Image */}
                          <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                            <img
                              src={item.main_image || "/products/prod_anarkali.jpg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs sm:text-sm text-bemitex-dark line-clamp-1 leading-snug">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-gray-500 mt-0.5">
                              Fabric: <span className="font-medium text-gray-700">{item.fabric}</span>
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-bold text-bemitex-maroon">
                                ₹{item.price_per_piece}
                              </span>
                              <span className="text-[10px] text-gray-400">/pc</span>
                              <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-mono">
                                MOQ: {item.moq}
                              </span>
                            </div>

                            {/* Quantity Controls & Line Total */}
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg p-0.5">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity - stepSize)}
                                  className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-200 rounded transition"
                                  title={`Decrease by ${stepSize} pcs`}
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="text-xs font-bold px-2 text-bemitex-dark min-w-[2.5rem] text-center">
                                  {item.quantity} pcs
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity + stepSize)}
                                  className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-200 rounded transition"
                                  title={`Increase by ${stepSize} pcs`}
                                >
                                  <Plus size={12} />
                                </button>
                              </div>

                              <div className="text-right flex items-center gap-2">
                                <span className="text-xs font-bold text-gray-900">₹{itemSubtotal}</span>
                                <button
                                  type="button"
                                  onClick={() => removeFromInquiry(item.id)}
                                  className="text-gray-400 hover:text-red-600 p-1 transition"
                                  title="Remove Item"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Buyer Quick Info Form (Optional for WhatsApp message personalization) */}
                  <div className="bg-gray-50/90 rounded-2xl p-4 border border-gray-200/70 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-gray-700 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Building2 size={14} className="text-bemitex-maroon" /> Sourcing Details (Optional):
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="col-span-2 sm:col-span-1">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={buyerName}
                          onChange={(e) => setBuyerName(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-bemitex-maroon"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <input
                          type="text"
                          placeholder="Boutique / Business Name"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-bemitex-maroon"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          placeholder="City / State (e.g. Mumbai, Bangalore, Jaipur, Export)"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-bemitex-maroon"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Wholesale Sourcing Guarantees */}
                  <div className="space-y-1.5 text-[11px] text-gray-500 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                    <p className="flex items-center gap-1.5 text-emerald-900 font-semibold">
                      <CheckCircle2 size={13} className="text-emerald-600" /> Factory Direct Pricing • Zero Middlemen
                    </p>
                    <p className="flex items-center gap-1.5 text-gray-600">
                      <Truck size={13} className="text-gray-500" /> Safechem, V-Trans & DTDC transport all over India & Export
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Drawer Footer / Actions */}
            {totalItems > 0 && (
              <div className="p-5 border-t border-gray-100 bg-white space-y-3">
                {/* Total Summary Row */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-gray-400 uppercase font-semibold block">Total Estimated Loom Value</span>
                    <span className="text-2xl font-serif font-bold text-bemitex-maroon">
                      ₹{totalAmount.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-gray-500 font-normal"> + GST</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-gray-800">{totalPcs} Pieces Total</span>
                    <span className="text-[11px] text-gray-400 block">{totalItems} Unique Designs</span>
                  </div>
                </div>

                {/* Primary WhatsApp Button */}
                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm sm:text-base py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-98 transition cursor-pointer"
                >
                  <WhatsappIcon size={20} />
                  <span>Send Bulk Inquiry on WhatsApp</span>
                </a>

                {/* Secondary RFQ Button */}
                <Link
                  href={`/inquiry?items=${encodeURIComponent(JSON.stringify(items.map(i => ({ id: i.id, name: i.name, qty: i.quantity }))))}`}
                  onClick={closeDrawer}
                  className="w-full py-2.5 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition text-center"
                >
                  <FileText size={14} />
                  <span>Request Official Proforma Invoice by Email</span>
                </Link>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
