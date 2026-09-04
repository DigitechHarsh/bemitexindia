"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { usePathname } from "next/navigation";

interface AnnouncementData {
  badge: string;
  message: string;
  cta_text: string;
  cta_link: string;
  product_slug?: string;
  theme: string;
  is_active: number | boolean;
}

const DEFAULT_ANNOUNCEMENT: AnnouncementData = {
  badge: "SURAT FACTORY DIRECT",
  message: "Festive Season 2026 Ready Stock Direct From Looms | Fast All-India Transport Dispatch",
  cta_text: "Explore Collection",
  cta_link: "/products/premium-anarkali",
  product_slug: "premium-anarkali",
  theme: "maroon",
  is_active: true,
};

export default function AnnouncementBar() {
  const pathname = usePathname();
  const [announcement, setAnnouncement] = useState<AnnouncementData>(DEFAULT_ANNOUNCEMENT);
  const [isVisible, setIsVisible] = useState(true);

  // Hide on admin routes
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await fetch("https://bemitex.harshaicreations.com/backend/api/announcement.php");
        const json = await res.json();
        if (json.success && json.data) {
          setAnnouncement({
            ...json.data,
            is_active: Boolean(json.data.is_active),
          });
        }
      } catch (err) {
        // Fallback default
      }
    };

    fetchAnnouncement();
  }, []);

  if (isAdmin || !isVisible || !announcement.is_active) {
    return null;
  }

  const getThemeStyle = (theme: string) => {
    switch (theme) {
      case "festive":
        return "bg-gradient-to-r from-rose-950 via-rose-900 to-red-950 text-white border-b border-rose-800/40";
      case "emerald":
        return "bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white border-b border-emerald-800/40";
      case "dark":
        return "bg-gradient-to-r from-neutral-950 via-neutral-900 to-black text-amber-300 border-b border-neutral-800";
      case "maroon":
      default:
        return "bg-gradient-to-r from-[#3D0A11] via-bemitex-maroon to-[#26050A] text-white border-b border-amber-900/40";
    }
  };

  return (
    <div className={`relative z-40 py-2 px-3 sm:px-6 transition-all duration-300 ${getThemeStyle(announcement.theme)}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm font-medium">
        
        {/* Left / Center: Highlight Badge & Marketing Message */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap mx-auto sm:mx-0">
          {announcement.badge && (
            <span className="inline-flex items-center bg-white/15 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-white/20 shadow-sm text-bemitex-gold">
              {announcement.badge}
            </span>
          )}

          <p className="line-clamp-1 sm:line-clamp-none font-medium">
            {announcement.message}
          </p>
        </div>

        {/* Right CTA Button & Dismiss */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {announcement.cta_text && (
            <Link
              href={announcement.cta_link || "/products"}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-bemitex-cream text-bemitex-dark px-3.5 py-1 rounded-full text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all group"
            >
              <span>{announcement.cta_text}</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}

          <button
            type="button"
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss Announcement"
            className="text-white/60 hover:text-white p-1 rounded-md transition"
          >
            <X size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}
