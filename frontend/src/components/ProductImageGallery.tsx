"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X, ShieldCheck, Sparkles, Layers } from "lucide-react";

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
  const rawUrls: string[] = images && images.length > 0
    ? images.map((img) => (typeof img === "string" ? img : img?.image_url)).filter(Boolean)
    : ["/products/prod_anarkali.jpg"];

  // Ensure valid array of image URLs
  const normalizedImages: string[] = rawUrls.length > 0 ? rawUrls : ["/products/prod_anarkali.jpg"];
  const currentImage = normalizedImages[activeImage] || normalizedImages[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImage((prev) => (prev === 0 ? normalizedImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImage((prev) => (prev === normalizedImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-3 sm:gap-4 items-start w-full">
      
      {/* Side Vertical Square Thumbnails on Desktop (Left Side) / Horizontal Strip on Mobile */}
      {normalizedImages.length > 1 && (
        <div className="flex lg:flex-col gap-2.5 sm:gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[580px] w-full lg:w-24 shrink-0 pb-2 lg:pb-0 scrollbar-thin">
          {normalizedImages.map((url, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveImage(idx)}
              type="button"
              aria-label={`View ${productName} view ${idx + 1}`}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all duration-300 group cursor-pointer bg-neutral-100 ${
                activeImage === idx 
                  ? 'border-bemitex-maroon ring-4 ring-bemitex-maroon/20 scale-105 shadow-md opacity-100' 
                  : 'border-gray-200/80 opacity-70 hover:opacity-100 hover:border-bemitex-maroon/50'
              }`}
            >
              <img
                src={url}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/products/prod_anarkali.jpg';
                }}
              />
              <span className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                #{idx + 1}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Main Large Image Viewport */}
      <div 
        onClick={() => setIsZoomOpen(true)}
        className="relative h-[400px] sm:h-[500px] lg:h-[580px] flex-1 w-full rounded-3xl overflow-hidden bg-gradient-to-b from-neutral-50 to-neutral-100 border border-gray-200/80 shadow-sm group cursor-zoom-in flex items-center justify-center"
      >
        <img
          src={currentImage}
          alt={`${productName} - Surat Wholesale Manufacturer Bemitex`}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/products/prod_anarkali.jpg';
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <span className="inline-flex items-center gap-1.5 bg-bemitex-maroon text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-md">
            <Sparkles size={13} className="text-bemitex-gold animate-pulse" /> Surat Factory Direct
          </span>
          {fabric && (
            <span className="inline-flex items-center gap-1.5 bg-white/95 text-bemitex-dark text-xs font-semibold px-3 py-1 rounded-full shadow-md backdrop-blur-md border border-gray-100">
              <ShieldCheck size={13} className="text-emerald-600" /> {fabric}
            </span>
          )}
        </div>

        {/* Zoom Icon Hint */}
        <div className="absolute top-4 right-4 bg-white/90 hover:bg-white text-bemitex-dark p-2.5 rounded-full shadow-md backdrop-blur-md transition group-hover:scale-110">
          <Maximize2 size={18} />
        </div>

        {/* Previous / Next Arrows */}
        {normalizedImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Image"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-bemitex-dark p-2.5 rounded-full shadow-lg opacity-90 group-hover:opacity-100 transition hover:scale-110 active:scale-95"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Image"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-bemitex-dark p-2.5 rounded-full shadow-lg opacity-90 group-hover:opacity-100 transition hover:scale-110 active:scale-95"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {/* Bottom Pagination Pill & Multiple views indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/70 backdrop-blur-md text-white text-xs font-medium px-3.5 py-1.5 rounded-full shadow-lg">
          <Layers size={13} className="text-bemitex-gold" />
          <span>Angle {activeImage + 1} of {normalizedImages.length}</span>
        </div>
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
            aria-label="Close zoom"
            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition cursor-pointer"
          >
            <X size={24} />
          </button>

          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-5xl max-h-[88vh] w-full h-full flex items-center justify-center"
          >
            <img
              src={currentImage}
              alt={`${productName} - Full High Resolution View`}
              className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/products/prod_anarkali.jpg';
              }}
            />

            {normalizedImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3.5 rounded-full transition"
                >
                  <ChevronLeft size={30} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3.5 rounded-full transition"
                >
                  <ChevronRight size={30} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
