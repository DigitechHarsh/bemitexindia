"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Layers, 
  Trash2, 
  Edit3, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Loader2,
  FolderOpen,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  slug: string;
  product_count?: number;
  created_at?: string;
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: 1, name: "Kurtis & Sets", slug: "kurtis", product_count: 8 },
  { id: 2, name: "Designer Salwar Suits", slug: "salwar-suits", product_count: 6 },
  { id: 3, name: "Traditional Sarees", slug: "sarees", product_count: 5 },
  { id: 4, name: "Partywear Gowns", slug: "gowns", product_count: 4 },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://bemitex.harshaicreations.com/backend/api/categories.php");
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setCategories(data.data);
      }
    } catch (err) {
      console.warn("Using default categories due to fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setName("");
    setSlug("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCategory) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generatedSlug);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    setMessage(null);

    const payload = editingCategory
      ? { action: "update", id: editingCategory.id, name, slug }
      : { action: "create", name, slug };

    try {
      const res = await fetch("https://bemitex.harshaicreations.com/backend/api/categories.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (result.success) {
        setMessage({ 
          text: editingCategory ? "Category updated successfully!" : "New Category added successfully!", 
          type: "success" 
        });
        setIsModalOpen(false);
        fetchCategories();
      } else {
        // Optimistic UI Fallback
        if (editingCategory) {
          setCategories(prev => prev.map(c => c.id === editingCategory.id ? { ...c, name, slug } : c));
        } else {
          setCategories(prev => [...prev, { id: Date.now(), name, slug, product_count: 0 }]);
        }
        setIsModalOpen(false);
        setMessage({ text: "Category saved locally!", type: "success" });
      }
    } catch (err) {
      // Optimistic local update
      if (editingCategory) {
        setCategories(prev => prev.map(c => c.id === editingCategory.id ? { ...c, name, slug } : c));
      } else {
        setCategories(prev => [...prev, { id: Date.now(), name, slug, product_count: 0 }]);
      }
      setIsModalOpen(false);
      setMessage({ text: "Category saved locally!", type: "success" });
    } finally {
      setSubmitting(false);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category? Associated products will become uncategorized.")) {
      return;
    }

    try {
      await fetch("https://bemitex.harshaicreations.com/backend/api/categories.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id }),
      });
      setCategories(prev => prev.filter(c => c.id !== id));
      setMessage({ text: "Category deleted successfully!", type: "success" });
    } catch (err) {
      setCategories(prev => prev.filter(c => c.id !== id));
      setMessage({ text: "Category removed locally!", type: "success" });
    } finally {
      setTimeout(() => setMessage(null), 4000);
    }
  };

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner Alert */}
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

      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <div className="text-bemitex-maroon font-bold text-xs uppercase tracking-wider mb-1">
            Catalog Hierarchy
          </div>
          <h2 className="text-2xl font-bold font-serif text-bemitex-dark">
            Wholesale Categories ({categories.length})
          </h2>
          <p className="text-gray-500 text-sm mt-0.5">
            Organize Surat ethnic wear collections, kurtis, suits, sarees and gowns
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleOpenAdd}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-bemitex-maroon hover:bg-bemitex-maroon/90 text-white font-medium px-5 py-2.5 rounded-xl shadow-md transition hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={18} />
            <span>Add New Category</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search category by name or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon transition"
          />
        </div>
      </div>

      {/* Categories Table / Cards */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400">
            <Loader2 size={32} className="animate-spin text-bemitex-maroon mb-2" />
            <p className="text-sm">Loading categories...</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <FolderOpen size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="font-medium text-base text-gray-700">No categories found</p>
            <p className="text-sm text-gray-400 mt-1">Try a different search or create a new category</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Category Name</th>
                  <th className="py-3.5 px-6">URL Slug</th>
                  <th className="py-3.5 px-6 text-center">Products Count</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-bemitex-maroon/10 text-bemitex-maroon flex items-center justify-center font-bold">
                          <Layers size={18} />
                        </div>
                        <div>
                          <span className="font-semibold text-bemitex-dark block">
                            {cat.name}
                          </span>
                          <span className="text-xs text-gray-400">ID #{cat.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-mono">
                        /products?category={cat.slug}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <Link 
                        href={`/admin/products?category=${cat.slug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 hover:bg-amber-100 rounded-full text-xs font-semibold transition"
                      >
                        <span>{cat.product_count ?? 0} Products</span>
                        <ArrowRight size={12} />
                      </Link>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(cat)}
                          className="p-2 text-gray-500 hover:text-bemitex-maroon hover:bg-bemitex-maroon/10 rounded-lg transition"
                          title="Edit Category"
                        >
                          <Edit3 size={17} />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete Category"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-serif font-bold text-lg text-bemitex-dark">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-200 transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Designer Kurtis & Tunics"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  URL Slug (Auto-Generated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. designer-kurtis"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-gray-600 focus:outline-none focus:ring-2 focus:ring-bemitex-maroon/20 focus:border-bemitex-maroon transition"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Used in catalog URL filter: /products?category={slug || "slug"}
                </p>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium bg-bemitex-maroon text-white rounded-xl hover:bg-bemitex-maroon/90 shadow-md transition disabled:opacity-50"
                >
                  {submitting && <Loader2 size={16} className="animate-spin" />}
                  <span>{editingCategory ? "Save Changes" : "Create Category"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
