"use client";

import { useState } from "react";
import { MessageSquare, Check, X, Phone } from "lucide-react";

export default function AdminInquiries() {
  const [inquiries] = useState([
    { id: 1, name: "Rahul Enterprises", type: "Wholesaler", city: "Mumbai", phone: "+91 9876543210", product: "Wholesale Kurtis", status: "New", date: "2023-10-25" },
    { id: 2, name: "Priya Boutique", type: "Boutique Owner", city: "Delhi", phone: "+91 9123456789", product: "Salwar Suits", status: "Contacted", date: "2023-10-24" },
  ]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center gap-2">
        <MessageSquare className="text-bemitex-maroon" />
        <h2 className="text-xl font-bold text-gray-800">Bulk Inquiries</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm">
              <th className="p-4 font-semibold border-b">ID / Date</th>
              <th className="p-4 font-semibold border-b">Business / Name</th>
              <th className="p-4 font-semibold border-b">Contact</th>
              <th className="p-4 font-semibold border-b">Interest</th>
              <th className="p-4 font-semibold border-b">Status</th>
              <th className="p-4 font-semibold border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <div className="text-gray-500 font-medium">#{inquiry.id}</div>
                  <div className="text-xs text-gray-400">{inquiry.date}</div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-gray-800">{inquiry.name}</div>
                  <div className="text-xs text-gray-500">{inquiry.type} - {inquiry.city}</div>
                </td>
                <td className="p-4">
                  <a href={`tel:${inquiry.phone}`} className="flex items-center gap-1 text-blue-600 hover:underline">
                    <Phone size={14} /> {inquiry.phone}
                  </a>
                </td>
                <td className="p-4 text-gray-600">{inquiry.product}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    inquiry.status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {inquiry.status}
                  </span>
                </td>
                <td className="p-4 flex items-center gap-2">
                  <button className="p-1.5 text-green-600 hover:bg-green-50 rounded" title="Mark Contacted">
                    <Check size={18} />
                  </button>
                  <button className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Close/Delete">
                    <X size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
