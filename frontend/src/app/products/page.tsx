"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { Filter, ChevronDown, Loader2 } from "lucide-react";

interface Product {
  id: number;
  name: string;
  slug: string;
  fabric: string;
  moq: number;
  price_per_piece: number;
  category_name: string;
  main_image: string | null;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

// Dummy data for initial dev (will replace with API call)
const dummyProducts: Product[] = [
  { id: 1, name: "Premium Anarkali Kurti with Embroidery", slug: "premium-anarkali", fabric: "Rayon Slub", moq: 12, price_per_piece: 450, category_name: "Kurtis", main_image: "/products/prod_anarkali.jpg" },
  { id: 2, name: "Georgette Designer Salwar Suit", slug: "georgette-suit", fabric: "Georgette", moq: 6, price_per_piece: 1250, category_name: "Salwar Suits", main_image: "/products/prod_suit.jpg" },
  { id: 3, name: "Banarasi Silk Saree Collection", slug: "banarasi-silk", fabric: "Banarasi Silk", moq: 8, price_per_piece: 1850, category_name: "Sarees", main_image: "/products/prod_saree.jpg" },
  { id: 4, name: "Cotton Printed Kurti Set", slug: "cotton-kurti-set", fabric: "Pure Cotton", moq: 20, price_per_piece: 350, category_name: "Kurtis", main_image: "/products/prod_cotton.jpg" },
  { id: 5, name: "Heavy Bridal Gown", slug: "heavy-bridal-gown", fabric: "Net & Satin", moq: 4, price_per_piece: 3500, category_name: "Gowns", main_image: "/products/prod_gown.jpg" },
  { id: 6, name: "Pashmina Winter Suit", slug: "pashmina-winter", fabric: "Pashmina", moq: 10, price_per_piece: 850, category_name: "Salwar Suits", main_image: "/products/prod_pashmina.jpg" },
];

const dummyCategories: Category[] = [
  { id: 1, name: "Kurtis", slug: "kurtis" },
  { id: 2, name: "Salwar Suits", slug: "salwar-suits" },
  { id: 3, name: "Sarees", slug: "sarees" },
  { id: 4, name: "Gowns", slug: "gowns" },
  { id: 5, name: "Dress Materials", slug: "dress-materials" },
];

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || "all");
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Sync URL parameter with state
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    } else {
      setSelectedCategory("all");
    }
  }, [initialCategory]);

  useEffect(() => {
    // Simulate API Call
    setLoading(true);
    setTimeout(() => {
      setCategories(dummyCategories);
      
      if (selectedCategory === "all") {
        setProducts(dummyProducts);
      } else {
        setProducts(dummyProducts.filter(p => 
          p.category_name.toLowerCase().replace(' ', '-') === selectedCategory
        ));
      }
      setLoading(false);
    }, 400); // reduced timeout for better UX
  }, [selectedCategory]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar / Filters */}
      <div className="w-full lg:w-64 flex-shrink-0">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 sticky top-24">
          <div className="flex justify-between items-center lg:mb-4 cursor-pointer lg:cursor-default" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <h3 className="text-lg font-bold flex items-center gap-2 text-bemitex-dark">
              <Filter size={20} className="text-bemitex-maroon" /> Filters
            </h3>
            <ChevronDown size={20} className={`lg:hidden transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </div>
          
          <div className={`mt-4 lg:block ${isFilterOpen ? 'block' : 'hidden'}`}>
            <h4 className="font-semibold mb-3 text-bemitex-dark">Categories</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="category" 
                  checked={selectedCategory === "all"}
                  onChange={() => setSelectedCategory("all")}
                  className="accent-bemitex-maroon"
                />
                <span className={`group-hover:text-bemitex-maroon transition-colors ${selectedCategory === 'all' ? 'text-bemitex-maroon font-medium' : 'text-gray-600'}`}>All Products</span>
              </label>
              {categories.map(cat => (
                <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="category" 
                    checked={selectedCategory === cat.slug}
                    onChange={() => setSelectedCategory(cat.slug)}
                    className="accent-bemitex-maroon"
                  />
                  <span className={`group-hover:text-bemitex-maroon transition-colors ${selectedCategory === cat.slug ? 'text-bemitex-maroon font-medium' : 'text-gray-600'}`}>{cat.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-grow">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-bemitex-maroon">
            <Loader2 size={40} className="animate-spin mb-4" />
            <p className="font-medium text-gray-500">Loading catalog...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-12 text-center border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">We couldn&apos;t find any products in this category.</p>
            <button 
              onClick={() => setSelectedCategory("all")}
              className="bg-bemitex-maroon text-white px-6 py-2 rounded font-medium hover:bg-bemitex-maroon/90"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-bemitex-dark">
            Wholesale Catalog
          </h1>
          <p className="text-gray-500 mt-2">Browse our factory-direct collection for bulk orders.</p>
        </div>

        <Suspense fallback={<div className="flex justify-center p-12"><Loader2 className="animate-spin text-bemitex-maroon" size={40} /></div>}>
          <CatalogContent />
        </Suspense>

      </div>
    </div>
  );
}
