"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, MessageCircle, Ruler, Info, Package, Loader2 } from "lucide-react";

// Dummy data for initial dev
const dummyProduct = { 
  id: 1, 
  name: "Premium Anarkali Kurti with Heavy Embroidery and Mirror Work", 
  slug: "premium-anarkali", 
  description: "Experience the epitome of elegance with this premium Anarkali kurti. Crafted with precision, it features intricate heavy embroidery and dazzling mirror work that catches the light beautifully. Made from breathable rayon slub fabric, it ensures comfort without compromising on style. Perfect for festive occasions, weddings, and premium retail collections.\n\nWholesale pack includes a full size set (M, L, XL, XXL) ensuring you can cater to all your customers' needs.",
  fabric: "Rayon Slub", 
  moq: 12, 
  price_per_piece: 450, 
  category_name: "Kurtis", 
  images: [
    { image_url: "https://images.unsplash.com/photo-1631541909061-71e34a360a03?q=80&w=800&auto=format&fit=crop", sort_order: 1 },
    { image_url: "https://images.unsplash.com/photo-1616421571738-eb7f1b1356fc?q=80&w=800&auto=format&fit=crop", sort_order: 2 }
  ]
};

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  fabric: string;
  moq: number;
  price_per_piece: number;
  category_name: string;
  images: { image_url: string; sort_order: number }[];
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    // Simulate API Call
    setTimeout(() => {
      setProduct(dummyProduct); // Using dummy data for now
      setLoading(false);
    }, 800);
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-bemitex-maroon">
        <Loader2 size={48} className="animate-spin mb-4" />
        <p className="font-medium text-gray-500">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link href="/products" className="text-bemitex-maroon hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/products" className="text-gray-500 hover:text-bemitex-maroon text-sm flex items-center gap-1 w-fit">
            <ArrowLeft size={14} /> Back to Catalog
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative h-[400px] md:h-[600px] w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
              <Image
                src={product.images[activeImage]?.image_url}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img: { image_url: string; sort_order: number }, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-24 h-32 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${activeImage === idx ? 'border-bemitex-maroon scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <Image
                      src={img.image_url}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-2">
              <span className="text-sm font-bold text-bemitex-maroon uppercase tracking-wider">
                {product.category_name}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-bemitex-dark mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div>
                <span className="text-gray-500 text-sm block">Wholesale Price</span>
                <span className="text-3xl font-bold text-bemitex-maroon">₹{product.price_per_piece}</span>
                <span className="text-gray-500"> / piece</span>
              </div>
            </div>

            {/* Critical B2B Info Box */}
            <div className="bg-bemitex-cream/40 border border-bemitex-gold/30 rounded-lg p-5 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-bemitex-gold/20 p-3 rounded-full text-bemitex-dark">
                  <Package size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Wholesale Order Requirement</h3>
                  <p className="text-gray-600 mb-2">This item is sold in bulk bundles only.</p>
                  <div className="inline-block bg-bemitex-maroon text-white font-bold px-3 py-1 rounded text-sm">
                    Minimum Order Quantity (MOQ): {product.moq} Pieces
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Info className="text-bemitex-maroon" size={24} />
                <div>
                  <span className="block text-xs text-gray-500">Fabric</span>
                  <span className="font-semibold">{product.fabric}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Ruler className="text-bemitex-maroon" size={24} />
                <div>
                  <span className="block text-xs text-gray-500">Sizes Available</span>
                  <span className="font-semibold">M, L, XL, XXL Set</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 mb-10">
              <a 
                href={`https://wa.me/919876543210?text=Hello Bemitex, I want to inquire about: ${product.name} (MOQ: ${product.moq}). Please provide bulk pricing and availability.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white font-bold text-lg py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors shadow-lg"
              >
                <MessageCircle size={24} /> Inquire on WhatsApp
              </a>
              <Link 
                href={`/inquiry?product=${product.slug}`}
                className="w-full bg-bemitex-dark text-white font-bold text-lg py-4 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                Request Custom Quote
              </Link>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">Product Details</h3>
              <div className="prose text-gray-600">
                {product.description.split('\n').map((paragraph: string, idx: number) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
