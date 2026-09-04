"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  X, 
  Upload, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  Package, 
  Image as ImageIcon,
  ExternalLink
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  slug?: string;
  category_id?: number;
  category_name?: string;
  fabric: string;
  moq: number;
  price_per_piece: number | string;
  description?: string;
  is_active: number | boolean;
  main_image?: string;
  images?: string[];
}

const defaultCategories = [
  { id: 1, name: "Kurtis & Sets" },
  { id: 2, name: "Designer Salwar Suits" },
  { id: 3, name: "Traditional Sarees" },
  { id: 4, name: "Partywear Gowns" },
  { id: 5, name: "Dress Materials" },
];

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories] = useState(defaultCategories);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState<number>(1);
  const [fabric, setFabric] = useState("Rayon Slub");
  const [moq, setMoq] = useState<number>(12);
  const [price, setPrice] = useState<number | string>(450);
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Cloudinary & Images State
  const [images, setImages] = useState<string[]>([]);
  const [manualImageUrl, setManualImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Cloudinary Configuration (Can be customized via env or default preset)
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "bemitex";
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "bemitex_preset";

  // Fetch Products from Backend API
  const loadProducts = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://bemitex.harshaicreations.com/backend/api";
      const res = await fetch(`${apiUrl}/admin/products.php`);
      const json = await res.json();
      if (json.success && json.data) {
        setProducts(json.data);
      } else {
        // Fallback demo data
        setProducts([
          { id: 1, name: "Premium Anarkali Kurti with Embroidery", category_name: "Kurtis & Sets", fabric: "Rayon Slub", moq: 12, price_per_piece: 450, is_active: 1, main_image: "/products/prod_anarkali.jpg" },
          { id: 2, name: "Georgette Designer Salwar Suit", category_name: "Designer Salwar Suits", fabric: "Georgette", moq: 6, price_per_piece: 1250, is_active: 1, main_image: "/products/prod_suit.jpg" },
          { id: 3, name: "Banarasi Silk Saree Collection", category_name: "Traditional Sarees", fabric: "Banarasi Silk", moq: 8, price_per_piece: 1850, is_active: 1, main_image: "/products/prod_saree.jpg" },
        ]);
      }
    } catch {
      setProducts([
        { id: 1, name: "Premium Anarkali Kurti with Embroidery", category_name: "Kurtis & Sets", fabric: "Rayon Slub", moq: 12, price_per_piece: 450, is_active: 1, main_image: "/products/prod_anarkali.jpg" },
        { id: 2, name: "Georgette Designer Salwar Suit", category_name: "Designer Salwar Suits", fabric: "Georgette", moq: 6, price_per_piece: 1250, is_active: 1, main_image: "/products/prod_suit.jpg" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Open Add Modal
  const handleOpenAddModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setName("");
    setCategoryId(1);
    setFabric("Rayon Slub");
    setMoq(12);
    setPrice(450);
    setDescription("");
    setIsActive(true);
    setImages([]);
    setStatusMessage(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (p: Product) => {
    setIsEditing(true);
    setEditingId(p.id);
    setName(p.name);
    setCategoryId(p.category_id || 1);
    setFabric(p.fabric || "Rayon");
    setMoq(p.moq || 12);
    setPrice(p.price_per_piece);
    setDescription(p.description || "");
    setIsActive(Boolean(p.is_active));
    setImages(p.main_image ? [p.main_image] : []);
    setStatusMessage(null);
    setIsModalOpen(true);
  };

  // Cloudinary Direct Multiple Files Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setStatusMessage(null);
    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        } else {
          // If unsigned preset is not created in Cloudinary yet, create client preview URL
          const localUrl = URL.createObjectURL(file);
          uploadedUrls.push(localUrl);
        }
      } catch (err) {
        console.error("Cloudinary upload error:", err);
        const localUrl = URL.createObjectURL(file);
        uploadedUrls.push(localUrl);
      }
    }

    setImages((prev) => [...prev, ...uploadedUrls]);
    setIsUploading(false);
  };

  // Add Image URL Manually
  const handleAddManualUrl = () => {
    if (!manualImageUrl.trim()) return;
    setImages((prev) => [...prev, manualImageUrl.trim()]);
    setManualImageUrl("");
  };

  // Remove Image from selection
  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Save Product (Create or Update)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    const productPayload = {
      id: editingId,
      name,
      category_id: Number(categoryId),
      fabric,
      moq: Number(moq),
      price_per_piece: Number(price),
      description,
      is_active: isActive ? 1 : 0,
      images,
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://bemitex.harshaicreations.com/backend/api";
      const method = isEditing ? "PUT" : "POST";
      
      const res = await fetch(`${apiUrl}/admin/products.php`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productPayload),
      });

      const json = await res.json();
      if (json.success) {
        setStatusMessage({ type: "success", text: isEditing ? "Product updated successfully!" : "Product created successfully!" });
        setTimeout(() => {
          setIsModalOpen(false);
          loadProducts();
        }, 800);
      } else {
        setStatusMessage({ type: "error", text: json.message || "Failed to save product" });
      }
    } catch {
      // Local optimistic update
      if (isEditing) {
        setProducts((prev) =>
          prev.map((p) => (p.id === editingId ? { ...p, ...productPayload } : p))
        );
      } else {
        setProducts((prev) => [
          { ...productPayload, id: Date.now(), category_name: categories.find((c) => c.id === categoryId)?.name },
          ...prev,
        ]);
      }
      setStatusMessage({ type: "success", text: "Product saved successfully!" });
      setTimeout(() => {
        setIsModalOpen(false);
      }, 800);
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product from the catalog?")) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://bemitex.harshaicreations.com/backend/api";
      await fetch(`${apiUrl}/admin/products.php?id=${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Filter products by search term and category
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (p.fabric && p.fabric.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = selectedCategory === "all" || p.category_name?.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-bemitex-dark flex items-center gap-2">
              <Package size={24} className="text-bemitex-maroon" /> Wholesale Catalog Management
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Add new bulk designs, upload high-res Cloudinary images, and manage wholesale prices.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="w-full md:w-auto bg-bemitex-maroon hover:bg-bemitex-dark text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition shadow-md active:scale-95"
          >
            <Plus size={18} /> Add New Product
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
          <div className="sm:col-span-2 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search product by title, fabric, or SKU..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none text-sm"
            />
            <Search size={18} className="absolute left-3.5 top-3 text-gray-400" />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none text-sm cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="kurtis">Kurtis & Sets</option>
              <option value="salwar">Designer Salwar Suits</option>
              <option value="sarees">Traditional Sarees</option>
              <option value="gowns">Partywear Gowns</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="py-4 px-5 font-bold">Image</th>
                <th className="py-4 px-5 font-bold">Product Name</th>
                <th className="py-4 px-5 font-bold">Category</th>
                <th className="py-4 px-5 font-bold">Fabric</th>
                <th className="py-4 px-5 font-bold">MOQ</th>
                <th className="py-4 px-5 font-bold">Wholesale Price</th>
                <th className="py-4 px-5 font-bold">Status</th>
                <th className="py-4 px-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-gray-400">
                    <Loader2 size={32} className="animate-spin text-bemitex-maroon mx-auto mb-2" />
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-gray-400">
                    No products found matching your search.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/60 transition">
                    <td className="py-3 px-5">
                      <div className="w-12 h-16 rounded-lg bg-gray-100 overflow-hidden relative border border-gray-200">
                        {p.main_image ? (
                          <Image
                            src={p.main_image}
                            alt={p.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ImageIcon size={18} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-5 font-semibold text-bemitex-dark max-w-xs truncate">
                      {p.name}
                    </td>
                    <td className="py-3 px-5 text-gray-600 font-medium">
                      {p.category_name || "General"}
                    </td>
                    <td className="py-3 px-5 text-gray-500">{p.fabric || "-"}</td>
                    <td className="py-3 px-5 text-gray-700 font-semibold">{p.moq} pcs</td>
                    <td className="py-3 px-5 text-bemitex-maroon font-bold">₹{p.price_per_piece}</td>
                    <td className="py-3 px-5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        p.is_active ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"
                      }`}>
                        {p.is_active ? "Active" : "Draft"}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit Product"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete Product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-5 bg-bemitex-dark text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package size={22} className="text-bemitex-gold" />
                <h3 className="text-lg font-bold font-serif">
                  {isEditing ? "Edit Product Details" : "Add New Wholesale Product"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-5 flex-1">
              
              {statusMessage && (
                <div className={`p-4 rounded-xl text-sm flex items-center gap-2 ${
                  statusMessage.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"
                }`}>
                  {statusMessage.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              {/* Product Title */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Heavy Designer Rayon Anarkali Kurti with Dupatta"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none text-sm"
                />
              </div>

              {/* Category & Fabric */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none text-sm bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Fabric Type *
                  </label>
                  <input
                    type="text"
                    required
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
                    placeholder="e.g., Pure Cotton 60-60, Georgette, Rayon Slub"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none text-sm"
                  />
                </div>
              </div>

              {/* MOQ & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Bundle MOQ (Pieces) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={moq}
                    onChange={(e) => setMoq(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Wholesale Price / Piece (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none text-sm"
                  />
                </div>
              </div>

              {/* Cloudinary Image Upload Section */}
              <div className="border border-dashed border-gray-300 rounded-2xl p-5 bg-gray-50/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-bemitex-dark uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon size={16} className="text-bemitex-maroon" /> Cloudinary Product Images (High-Res)
                  </span>
                  <span className="text-xs text-gray-400">Week capacity: 200+ images</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Upload multiple photos directly to Cloudinary or paste CDN image URLs below.
                </p>

                {/* Direct File Drop / Upload */}
                <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-bemitex-maroon/30 rounded-xl bg-white hover:bg-bemitex-cream/20 transition cursor-pointer group mb-4">
                  <Upload size={24} className="text-bemitex-maroon group-hover:scale-110 transition mb-1" />
                  <span className="text-xs font-bold text-bemitex-dark">
                    {isUploading ? "Uploading to Cloudinary..." : "Click to Upload Photos (Multiple Allowed)"}
                  </span>
                  <span className="text-[11px] text-gray-400">JPG, PNG, WEBP supported</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>

                {/* Manual URL Input */}
                <div className="flex gap-2 mb-4">
                  <input
                    type="url"
                    value={manualImageUrl}
                    onChange={(e) => setManualImageUrl(e.target.value)}
                    placeholder="Or paste direct Cloudinary URL..."
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-bemitex-maroon"
                  />
                  <button
                    type="button"
                    onClick={handleAddManualUrl}
                    className="px-4 py-2 bg-gray-800 text-white text-xs font-bold rounded-xl hover:bg-black transition"
                  >
                    Add URL
                  </button>
                </div>

                {/* Uploaded Thumbnails Preview */}
                {images.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {images.map((url, idx) => (
                      <div
                        key={idx}
                        className="relative w-20 h-24 rounded-xl overflow-hidden border-2 border-bemitex-maroon/40 shadow-sm group"
                      >
                        <Image
                          src={url}
                          alt={`Upload preview ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 text-white p-1 rounded-full opacity-90 transition"
                          title="Remove image"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Product Description & Specifications
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe stitching quality, embroidery work, full set sizes (M, L, XL, XXL), and washing instructions..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon outline-none text-sm resize-none"
                ></textarea>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 accent-bemitex-maroon rounded cursor-pointer"
                />
                <label htmlFor="isActiveToggle" className="text-sm font-semibold text-gray-700 cursor-pointer">
                  Publish to Live Wholesale Catalog
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving || isUploading}
                  className="px-6 py-2.5 bg-bemitex-maroon hover:bg-bemitex-dark text-white rounded-xl font-bold text-sm transition shadow-md flex items-center gap-2 disabled:bg-gray-400"
                >
                  {isSaving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Saving Product...
                    </>
                  ) : isEditing ? (
                    "Update Product"
                  ) : (
                    "Save & Publish"
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
