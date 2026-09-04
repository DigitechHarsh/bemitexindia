"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageItem {
  image_url: string;
  sort_order: number;
}

interface ProductImageGalleryProps {
  images: ImageItem[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const activeImageUrl = images[activeImage]?.image_url || "/products/prod_anarkali.jpg";

  return (
    <div className="space-y-4">
      <div className="relative h-[380px] sm:h-[480px] md:h-[580px] w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
        <Image
          src={activeImageUrl}
          alt={`${productName} - Wholesale Ethnic Wear Surat`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveImage(idx)}
              type="button"
              aria-label={`View ${productName} image ${idx + 1}`}
              className={`relative w-20 h-24 sm:w-24 sm:h-32 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${activeImage === idx ? 'border-bemitex-maroon scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
            >
              <Image
                src={img.image_url}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="100px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
