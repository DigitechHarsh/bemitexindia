"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";

export default function AdminProducts() {
  const [products] = useState([
    { id: 1, name: "Premium Anarkali Kurti", category: "Kurtis", moq: 12, price: 450, status: "Active" },
    { id: 2, name: "Georgette Designer Salwar Suit", category: "Salwar Suits", moq: 6, price: 1250, status: "Active" },
  ]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-64">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-bemitex-maroon focus:border-bemitex-maroon outline-none"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        <button className="bg-bemitex-maroon text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 hover:bg-bemitex-maroon/90 w-full sm:w-auto justify-center">
          <Plus size={18} /> Add Product
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm">
              <th className="p-4 font-semibold border-b">ID</th>
              <th className="p-4 font-semibold border-b">Product Name</th>
              <th className="p-4 font-semibold border-b">Category</th>
              <th className="p-4 font-semibold border-b">MOQ</th>
              <th className="p-4 font-semibold border-b">Price/Pc</th>
              <th className="p-4 font-semibold border-b">Status</th>
              <th className="p-4 font-semibold border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-4 text-gray-500">#{p.id}</td>
                <td className="p-4 font-medium text-gray-800">{p.name}</td>
                <td className="p-4 text-gray-600">{p.category}</td>
                <td className="p-4 text-gray-600">{p.moq}</td>
                <td className="p-4 text-gray-600">₹{p.price}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                    {p.status}
                  </span>
                </td>
                <td className="p-4 flex items-center gap-2">
                  <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit size={18} /></button>
                  <button className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
