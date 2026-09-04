"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { Filter, ChevronDown, Loader2 } from "lucide-react";
import { fetchCategories, fetchProducts } from "@/lib/api";

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

export default function CatalogClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || "all");
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    } else {
      setSelectedCategory("all");
    }
  }, [initialCategory]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [cats, prods] = await Promise.all([
          fetchCategories(),
          fetchProducts(selectedCategory === "all" ? undefined : selectedCategory),
        ]);

        if (cats && cats.length > 0) {
          setCategories(cats);
        } else {
          setCategories(dummyCategories);
        }

        if (prods && prods.length > 0) {
          setProducts(prods);
        } else {
          if (selectedCategory === "all") {
            setProducts(dummyProducts);
          } else {
            setProducts(dummyProducts.filter(p => 
              p.category_name.toLowerCase().replace(/\s+/g, '-') === selectedCategory
            ));
          }
        }
      } catch {
        setCategories(dummyCategories);
        setProducts(dummyProducts);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [selectedCategory]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar / Filters */}
      <aside className="w-full lg:w-64 flex-shrink-0" aria-label="Catalog Filters">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24">
          <div 
            className="flex justify-between items-center lg:mb-4 cursor-pointer lg:cursor-default" 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            role="button"
            tabIndex={0}
            aria-expanded={isFilterOpen}
          >
            <h2 className="text-base sm:text-lg font-bold flex items-center gap-2 text-bemitex-dark">
              <Filter size={18} className="text-bemitex-maroon" /> Filter by Category
            </h2>
            <ChevronDown size={18} className={`lg:hidden transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </div>
          
          <div className={`mt-4 lg:block ${isFilterOpen ? 'block' : 'hidden'}`}>
            <div className="space-y-2.5">
              <label className="flex items-center gap-2.5 cursor-pointer group p-1.5 rounded hover:bg-bemitex-cream/40 transition">
                <input 
                  type="radio" 
                  name="category" 
                  checked={selectedCategory === "all"}
                  onChange={() => setSelectedCategory("all")}
                  className="accent-bemitex-maroon w-4 h-4"
                />
                <span className={`text-sm group-hover:text-bemitex-maroon transition-colors ${selectedCategory === 'all' ? 'text-bemitex-maroon font-bold' : 'text-gray-600'}`}>
                  All Collections
                </span>
              </label>
              {categories.map(cat => (
                <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer group p-1.5 rounded hover:bg-bemitex-cream/40 transition">
                  <input 
                    type="radio" 
                    name="category" 
                    checked={selectedCategory === cat.slug}
                    onChange={() => setSelectedCategory(cat.slug)}
                    className="accent-bemitex-maroon w-4 h-4"
                  />
                  <span className={`text-sm group-hover:text-bemitex-maroon transition-colors ${selectedCategory === cat.slug ? 'text-bemitex-maroon font-bold' : 'text-gray-600'}`}>
                    {cat.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <section className="flex-grow" aria-label="Wholesale Products Grid">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-bemitex-maroon">
            <Loader2 size={36} className="animate-spin mb-4" />
            <p className="font-medium text-gray-500">Loading catalog items...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">We couldn&apos;t find any products in this specific category.</p>
            <button 
              onClick={() => setSelectedCategory("all")}
              className="bg-bemitex-maroon text-white px-6 py-2.5 rounded-lg font-medium hover:bg-bemitex-dark transition shadow-sm"
            >
              View All Products
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
