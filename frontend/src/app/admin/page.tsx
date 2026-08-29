"use client";

import { Package, MessageSquare, Video, IndianRupee } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Products", value: "124", icon: <Package size={24} />, color: "bg-blue-500", link: "/admin/products" },
    { title: "New Inquiries", value: "12", icon: <MessageSquare size={24} />, color: "bg-bemitex-maroon", link: "/admin/inquiries" },
    { title: "Video Bookings", value: "5", icon: <Video size={24} />, color: "bg-green-500", link: "/admin/bookings" },
    { title: "Avg. MOQ", value: "15", icon: <IndianRupee size={24} />, color: "bg-bemitex-gold", link: null },
  ];

  return (
    <div className="space-y-6">
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
              <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
              {stat.link && (
                <Link href={stat.link} className="text-xs text-blue-600 hover:underline mt-2 inline-block">
                  View all
                </Link>
              )}
            </div>
            <div className={`${stat.color} text-white p-4 rounded-lg`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Recent Inquiries</h3>
            <Link href="/admin/inquiries" className="text-sm text-bemitex-maroon hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {[1,2,3].map((i) => (
              <div key={i} className="flex justify-between items-center p-4 border border-gray-100 rounded-lg bg-gray-50">
                <div>
                  <p className="font-semibold text-gray-800">Rahul Enterprises (Mumbai)</p>
                  <p className="text-sm text-gray-500">Interested in: Wholesale Kurtis</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">New</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Video Calls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Upcoming Video Calls</h3>
            <Link href="/admin/bookings" className="text-sm text-bemitex-maroon hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {[1,2].map((i) => (
              <div key={i} className="flex justify-between items-center p-4 border border-gray-100 rounded-lg bg-gray-50">
                <div>
                  <p className="font-semibold text-gray-800">Priya Boutique</p>
                  <p className="text-sm text-gray-500">Tomorrow, 10:00 AM</p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">Pending</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
