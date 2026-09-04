"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import WhatsappIcon from "@/components/WhatsappIcon";
import { useBulkInquiry } from "@/context/BulkInquiryContext";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    slug: string;
    fabric: string;
    moq: number;
    price_per_piece: number;
    category_name: string;
    main_image: string | null;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToInquiry, items } = useBulkInquiry();
  const [justAdded, setJustAdded] = useState(false);

  const isAlreadyInCart = items.some((item) => item.id === product.id);

  // Use placeholder if no image, and support relative public paths vs backend uploads
  const imageUrl = product.main_image 
    ? (product.main_image.startsWith('/') || product.main_image.startsWith('http') 
        ? product.main_image 
        : `https://harshaicreations.com/bemitex/backend/uploads/${product.main_image}`)
    : "https://images.unsplash.com/photo-1583391733958-d1531119d1f5?q=80&w=600&auto=format&fit=crop";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToInquiry({
      id: product.id,
      name: product.name,
      slug: product.slug,
      fabric: product.fabric || "Premium Fabric",
      moq: product.moq || 1,
      price_per_piece: product.price_per_piece,
      category_name: product.category_name,
      main_image: imageUrl,
    }, product.moq || 1);

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group flex flex-col h-full"
    >
      {/* Image Container */}
      <Link href={`/products/${product.slug}`} className="relative h-[300px] w-full overflow-hidden block bg-gray-100">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* MOQ Badge */}
        <div className="absolute top-3 left-3 bg-bemitex-maroon text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wide shadow-md">
          MOQ: {product.moq} Pcs
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs text-bemitex-maroon font-bold uppercase tracking-wider mb-2">
          {product.category_name}
        </div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-bold text-bemitex-dark mb-2 line-clamp-2 hover:text-bemitex-maroon transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-4">Fabric: {product.fabric}</p>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-gray-500 block">Wholesale Price</span>
            <span className="text-xl font-bold text-bemitex-maroon">₹{product.price_per_piece}</span>
            <span className="text-xs text-gray-500"> /pc</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleAddToCart}
              type="button"
              className={`p-2.5 rounded-lg border transition-all flex items-center justify-center ${
                justAdded || isAlreadyInCart
                  ? "bg-amber-50 border-amber-300 text-bemitex-maroon"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-bemitex-maroon hover:text-white hover:border-bemitex-maroon"
              }`}
              title={isAlreadyInCart ? "Added to Inquiry Cart" : `Add MOQ (${product.moq} pcs) to Bulk Inquiry`}
            >
              {justAdded ? <Check size={18} className="text-green-600" /> : <ShoppingBag size={18} />}
            </button>

            <a
              href={`https://wa.me/919876543210?text=I'm interested in wholesale order for ${encodeURIComponent(product.name)} (MOQ: ${product.moq} pcs)`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors shadow-sm hover:shadow-md"
              title="Inquire on WhatsApp"
            >
              <WhatsappIcon size={20} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

