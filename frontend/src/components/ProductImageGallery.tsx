"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Maximize2, X, ShieldCheck, Sparkles } from "lucide-react";

interface ImageItem {
  image_url: string;
  sort_order?: number;
}

interface ProductImageGalleryProps {
  images: (ImageItem | string)[];
  productName: string;
  fabric?: string;
}

export default function ProductImageGallery({ images, productName, fabric }: ProductImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Normalize images array to string URLs
  const normalizedImages: string[] = images && images.length > 0
    ? images.map((img) => (typeof img === "string" ? img : img.image_url))
    : ["/products/prod_anarkali.jpg"];

  const activeImageUrl = normalizedImages[activeImage] || normalizedImages[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImage((prev) => (prev === 0 ? normalizedImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImage((prev) => (prev === normalizedImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 items-start w-full">
      
      {/* Side Vertical Thumbnails on Desktop / Horizontal on Mobile */}
      {normalizedImages.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[580px] w-full md:w-24 shrink-0 pb-2 md:pb-0 scrollbar-thin">
          {normalizedImages.map((url, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveImage(idx)}
              type="button"
              aria-label={`View ${productName} image ${idx + 1}`}
              className={`relative w-18 h-24 sm:w-20 sm:h-28 md:w-24 md:h-32 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all duration-300 ${
                activeImage === idx 
                  ? 'border-bemitex-maroon ring-2 ring-bemitex-maroon/30 scale-105 shadow-md opacity-100' 
                  : 'border-gray-200 opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={url}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="100px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image Viewport */}
      <div 
        onClick={() => setIsZoomOpen(true)}
        className="relative h-[420px] sm:h-[500px] md:h-[580px] flex-1 w-full rounded-3xl overflow-hidden bg-gray-50 border border-gray-200/80 shadow-sm group cursor-zoom-in"
      >
        <Image
          src={activeImageUrl}
          alt={`${productName} - Wholesale Ethnic Wear Surat`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <span className="inline-flex items-center gap-1.5 bg-bemitex-maroon text-white text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md">
            <Sparkles size={13} className="text-bemitex-gold" /> Surat Factory Direct
          </span>
          {fabric && (
            <span className="inline-flex items-center gap-1.5 bg-white/90 text-bemitex-dark text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full shadow-md backdrop-blur-md border border-gray-100">
              <ShieldCheck size={13} className="text-emerald-600" /> {fabric}
            </span>
          )}
        </div>

        {/* Zoom Icon Hint */}
        <div className="absolute top-4 right-4 bg-white/90 hover:bg-white text-bemitex-dark p-2 rounded-full shadow-md backdrop-blur-md transition group-hover:scale-110">
          <Maximize2 size={16} />
        </div>

        {/* Previous / Next Arrows (if > 1 image) */}
        {normalizedImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Image"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-bemitex-dark p-2 rounded-full shadow-lg opacity-80 group-hover:opacity-100 transition hover:scale-110"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Image"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-bemitex-dark p-2 rounded-full shadow-lg opacity-80 group-hover:opacity-100 transition hover:scale-110"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Bottom Pagination Pill */}
        {normalizedImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full">
            {activeImage + 1} / {normalizedImages.length}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Zoom Modal */}
      {isZoomOpen && (
        <div 
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <button
            type="button"
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition"
          >
            <X size={24} />
          </button>

          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src={activeImageUrl}
                alt={`${productName} - Full High Resolution`}
                fill
                className="object-contain"
                quality={100}
              />
            </div>

            {normalizedImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
