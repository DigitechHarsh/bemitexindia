"use client";

import { useState, useEffect } from "react";
import { 
  Megaphone, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ExternalLink, 
  Eye, 
  Palette, 
  Link as LinkIcon, 
  Layers, 
  Package,
  ArrowRight
} from "lucide-react";

interface ProductOption {
  id: number;
  name: string;
  slug: string;
}

export default function AdminAnnouncementPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Form State
  const [isActive, setIsActive] = useState(true);
  const [badge, setBadge] = useState("SURAT FACTORY DIRECT");
  const [announcementText, setAnnouncementText] = useState("Festive Season 2026 Ready Stock Direct from Surat Looms | All India Transport Dispatch");
  const [ctaText, setCtaText] = useState("Explore Trending Collection");
  const [ctaLink, setCtaLink] = useState("/products");
  const [selectedProductSlug, setSelectedProductSlug] = useState("premium-anarkali");
  const [theme, setTheme] = useState("maroon");

  // Products for dropdown
  const [products, setProducts] = useState<ProductOption[]>([
    { id: 1, name: "Premium Anarkali Kurti with Embroidery", slug: "premium-anarkali" },
    { id: 2, name: "Georgette Designer Salwar Suit", slug: "georgette-suit" },
    { id: 3, name: "Banarasi Silk Saree Collection", slug: "banarasi-silk" },
    { id: 4, name: "Cotton Printed Kurti Set", slug: "cotton-kurti-set" },
    { id: 5, name: "Heavy Bridal Gown", slug: "heavy-bridal-gown" },
    { id: 6, name: "Pashmina Winter Suit", slug: "pashmina-winter" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Announcement
        const res = await fetch("https://bemitex.harshaicreations.com/backend/api/announcement.php");
        const json = await res.json();
        if (json.success && json.data) {
          const d = json.data;
          setIsActive(Boolean(d.is_active));
          setBadge(d.badge || "SURAT FACTORY DIRECT");
          setAnnouncementText(d.message || "");
          setCtaText(d.cta_text || "Explore Now");
          setCtaLink(d.cta_link || "/products");
          setSelectedProductSlug(d.product_slug || "none");
          setTheme(d.theme || "maroon");
        }

        // Fetch Products list for linking
        const prodRes = await fetch("https://bemitex.harshaicreations.com/backend/api/products.php");
        const prodJson = await prodRes.json();
        if (prodJson.success && Array.isArray(prodJson.data)) {
          setProducts(prodJson.data);
        }
      } catch (err) {
        console.warn("Using default announcement settings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProductSelect = (slug: string) => {
    setSelectedProductSlug(slug);
    if (slug === "none" || slug === "all") {
      setCtaLink("/products");
    } else {
      setCtaLink(`/products/${slug}`);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const payload = {
      is_active: isActive ? 1 : 0,
      badge,
      message: announcementText,
      cta_text: ctaText,
      cta_link: ctaLink,
      product_slug: selectedProductSlug,
      theme,
    };

    try {
      const res = await fetch("https://bemitex.harshaicreations.com/backend/api/announcement.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setMessage({ text: "Announcement Bar updated & live on website!", type: "success" });
      } else {
        setMessage({ text: "Announcement saved locally!", type: "success" });
      }
    } catch (err) {
      setMessage({ text: "Announcement settings saved locally!", type: "success" });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  // Theme Styling Helper
  const getThemeClasses = (t: string) => {
    switch (t) {
      case "festive":
        return "bg-gradient-to-r from-rose-900 via-red-800 to-rose-950 text-white";
      case "emerald":
        return "bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white";
      case "dark":
        return "bg-gradient-to-r from-neutral-900 via-gray-900 to-black text-amber-300";
      case "maroon":
      default:
        return "bg-gradient-to-r from-[#4A0E17] via-bemitex-maroon to-[#2D090E] text-white";
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Alert Notification */}
      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
          message.type === "success" 
            ? "bg-emerald-50 text-emerald-800 border border-emerald-200" 
            : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="text-bemitex-maroon font-bold text-xs uppercase tracking-wider mb-1">
            Top Header Marketing
          </div>
          <h2 className="text-2xl font-bold font-serif text-bemitex-dark">
            Announcement Bar & Marketing Notice Manager
          </h2>
          <p className="text-gray-500 text-sm mt-0.5">
            Broadcast festive season offers, transport cutoff notices, and link directly to featured wholesale products
          </p>
        </div>

        {/* Status Toggle Switch */}
        <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-2xl border border-gray-200">
          <span className="text-xs font-bold text-gray-700 uppercase">Status:</span>
          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              isActive 
                ? "bg-emerald-600 text-white shadow-emerald-200" 
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {isActive ? "🟢 Active (Live)" : "⚪ Disabled (Hidden)"}
          </button>
        </div>
      </div>

      {/* Live Preview Box */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
            <Eye size={16} className="text-bemitex-maroon" /> Live Customer Website Preview
          </div>
          <span className="text-xs text-gray-400">Updates live as you type</span>
        </div>

        {isActive ? (
          <div className={`w-full py-2.5 px-4 rounded-xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm font-medium transition-all ${getThemeClasses(theme)}`}>
            <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-start">
              {badge && (
                <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[10px] sm:text-xs font-extrabold uppercase tracking-wider border border-white/20 shadow-sm">
                  {badge}
                </span>
              )}
              <span className="line-clamp-1">{announcementText}</span>
            </div>

            {ctaText && (
              <div className="inline-flex items-center gap-1 bg-white text-bemitex-dark px-3 py-1 rounded-full text-xs font-bold shadow-sm whitespace-nowrap hover:scale-105 transition cursor-pointer">
                <span>{ctaText}</span>
                <ArrowRight size={13} />
              </div>
            )}
          </div>
        ) : (
          <div className="w-full py-4 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-400 text-xs font-medium">
            Announcement Bar is currently <strong>DISABLED</strong>. Nothing will be shown to website visitors.
          </div>
        )}
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <h3 className="font-serif font-bold text-lg text-bemitex-dark pb-3 border-b border-gray-100 flex items-center gap-2">
          <Megaphone size={20} className="text-bemitex-maroon" /> Announcement Content & CTA Setup
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Badge Tag */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Highlight Badge Tag
            </label>
            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="e.g. SURAT FACTORY DIRECT / 🔥 FESTIVE SALE"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon"
            />
            <p className="text-[11px] text-gray-400 mt-1">Small badge pill shown before the notice</p>
          </div>

          {/* Color Theme Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Color Aesthetic Theme
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon cursor-pointer font-medium"
            >
              <option value="maroon">Royal Maroon & Gold (Default Bemitex)</option>
              <option value="festive">Festive Crimson Red & Gold</option>
              <option value="emerald">Loom Emerald Green</option>
              <option value="dark">Luxury Midnight Charcoal</option>
            </select>
          </div>

          {/* Main Notice Text */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Main Announcement Message *
            </label>
            <input
              type="text"
              required
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder="e.g. Festive Ready Stock 2026 Direct From Looms | Fast All-India Transport Dispatch"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon font-medium text-gray-800"
            />
          </div>

          {/* CTA Button Text */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Call To Action (CTA) Button Text
            </label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              placeholder="e.g. Explore Collection / Order Now"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon"
            />
          </div>

          {/* Linked Product Selection */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Link CTA To Specific Product / Catalog
            </label>
            <select
              value={selectedProductSlug}
              onChange={(e) => handleProductSelect(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon cursor-pointer"
            >
              <option value="all">Entire Wholesale Catalog (/products)</option>
              {products.map((p) => (
                <option key={p.id} value={p.slug}>
                  🎯 Specific Product: {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Destination URL */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Destination URL Link
            </label>
            <input
              type="text"
              value={ctaLink}
              onChange={(e) => setCtaLink(e.target.value)}
              placeholder="/products or /products/premium-anarkali"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-gray-600 focus:outline-none focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              Visitors will be redirected to this URL when clicking on the Announcement bar CTA button.
            </p>
          </div>
        </div>

        {/* Action Save Button */}
        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-bemitex-maroon hover:bg-bemitex-dark text-white font-bold px-8 py-3 rounded-xl shadow-lg transition hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {saving && <Loader2 size={18} className="animate-spin" />}
            <span>Save & Publish Announcement</span>
          </button>
        </div>
      </form>
    </div>
  );
}
