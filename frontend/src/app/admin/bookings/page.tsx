"use client";

import { useState } from "react";
import { Video, Calendar, Clock, Check, X, Phone } from "lucide-react";

export default function AdminBookings() {
  const [bookings] = useState([
    { id: 1, name: "Sneha Collections", phone: "+91 8888888888", date: "2023-11-01", time: "Morning (10 AM - 1 PM)", interest: "Bridal Gowns", status: "Pending" },
    { id: 2, name: "Aisha Boutique", phone: "+91 7777777777", date: "2023-11-02", time: "Afternoon (1 PM - 4 PM)", interest: "Cotton Kurtis", status: "Confirmed" },
  ]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center gap-2">
        <Video className="text-green-500" />
        <h2 className="text-xl font-bold text-gray-800">Video Call Bookings</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm">
              <th className="p-4 font-semibold border-b">ID</th>
              <th className="p-4 font-semibold border-b">Client Info</th>
              <th className="p-4 font-semibold border-b">Date & Time</th>
              <th className="p-4 font-semibold border-b">Looking for</th>
              <th className="p-4 font-semibold border-b">Status</th>
              <th className="p-4 font-semibold border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-gray-50">
                <td className="p-4 text-gray-500">#{booking.id}</td>
                <td className="p-4">
                  <div className="font-medium text-gray-800">{booking.name}</div>
                  <a href={`tel:${booking.phone}`} className="flex items-center gap-1 text-blue-600 hover:underline text-sm mt-1">
                    <Phone size={12} /> {booking.phone}
                  </a>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1 text-gray-800 font-medium"><Calendar size={14} className="text-gray-400" /> {booking.date}</div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-1"><Clock size={14} className="text-gray-400" /> {booking.time}</div>
                </td>
                <td className="p-4 text-gray-600 max-w-[200px] truncate">{booking.interest}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="p-4 flex items-center gap-2">
                  <button className="p-1.5 text-green-600 hover:bg-green-50 rounded" title="Confirm/Complete">
                    <Check size={18} />
                  </button>
                  <button className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Cancel">
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
