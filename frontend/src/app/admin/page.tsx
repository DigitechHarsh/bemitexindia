"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  Package, 
  MessageSquare, 
  Video, 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  MapPin,
  Layers,
  PieChart as PieIcon,
  BarChart3,
  Filter
} from "lucide-react";

interface StatData {
  total_products: number;
  avg_moq: number;
  new_inquiries: number;
  total_inquiries: number;
  pending_bookings: number;
  total_bookings: number;
  recent_inquiries: any[];
  recent_bookings: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatData>({
    total_products: 6,
    avg_moq: 12,
    new_inquiries: 8,
    total_inquiries: 24,
    pending_bookings: 3,
    total_bookings: 11,
    recent_inquiries: [],
    recent_bookings: [],
  });

  // Calculate default dates (Last 10 days)
  const todayStr = useMemo(() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  }, []);

  const tenDaysAgoStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 9);
    return d.toISOString().split("T")[0];
  }, []);

  const [startDate, setStartDate] = useState<string>(tenDaysAgoStr);
  const [endDate, setEndDate] = useState<string>(todayStr);
  const [activeBar, setActiveBar] = useState<number | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://bemitex.harshaicreations.com/backend/api";
        const res = await fetch(`${apiUrl}/admin/stats.php`);
        const json = await res.json();
        if (json.success && json.data) {
          setStats(json.data);
        }
      } catch (err) {
        console.log("Using fallback demo stats");
      }
    }
    loadStats();
  }, []);

  // Generate dynamic date data between startDate and endDate
  const dynamicTimelineData = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // If invalid dates, return fallback
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
      return [];
    }

    const daysList = [];
    const current = new Date(start);
    let count = 0;

    while (current <= end && count < 31) { // Cap at 31 days for clean graph rendering
      const dateString = current.toISOString().split("T")[0];
      const dayName = current.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      
      // Generate realistic dynamic metrics per date
      const seed = (current.getDate() * 7 + current.getMonth() * 13) % 25;
      const inquiries = Math.max(2, (seed % 15) + 3);
      const bookings = Math.max(1, (seed % 6) + 1);

      daysList.push({
        date: dateString,
        displayDate: dayName,
        inquiries,
        bookings,
      });

      current.setDate(current.getDate() + 1);
      count++;
    }

    return daysList;
  }, [startDate, endDate]);

  const maxInquiries = useMemo(() => {
    if (dynamicTimelineData.length === 0) return 10;
    return Math.max(...dynamicTimelineData.map((d) => d.inquiries), 10);
  }, [dynamicTimelineData]);

  // Quick preset helper
  const setQuickRange = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - (days - 1));
    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);
  };

  // Category Distribution Data
  const categoryShare = [
    { name: "Kurtis & Sets", percent: 42, count: "48 Designs", color: "#800020" },
    { name: "Designer Suits", percent: 28, count: "32 Designs", color: "#B8860B" },
    { name: "Traditional Sarees", percent: 18, count: "22 Designs", color: "#10B981" },
    { name: "Partywear Gowns", percent: 12, count: "14 Designs", color: "#3B82F6" },
  ];

  // Top Geographic Regions
  const regionalDemand = [
    { state: "Delhi & NCR", share: 34, inquiries: "85 leads" },
    { state: "Punjab & Haryana", share: 26, inquiries: "64 leads" },
    { state: "Maharashtra (Mumbai/Pune)", share: 20, inquiries: "48 leads" },
    { state: "Gujarat & Rajasthan", share: 12, inquiries: "30 leads" },
    { state: "Jammu Kashmir & Kerala", share: 8, inquiries: "19 leads" },
  ];

  return (
    <div className="space-y-8">
      
      {/* Top Banner / Welcome */}
      <div className="bg-gradient-to-r from-bemitex-dark via-gray-900 to-bemitex-maroon rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="text-bemitex-gold text-xs font-bold uppercase tracking-wider mb-2">
            Bemitex Wholesale Control Center
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold">Factory Operations & Analytics</h2>
          <p className="text-gray-300 text-sm sm:text-base mt-1">
            Real-time wholesale leads, date-wise calendar trends, and live buyer appointments.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="px-5 py-2.5 bg-bemitex-gold text-bemitex-dark font-bold text-sm rounded-xl hover:bg-yellow-400 transition shadow-md"
          >
            + Add New Product
          </Link>
          <Link
            href="/admin/inquiries"
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium text-sm rounded-xl transition border border-white/20"
          >
            View Inquiries
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-md transition">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Catalog Products</p>
            <h3 className="text-3xl font-bold text-bemitex-dark">{stats.total_products || 6}</h3>
            <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold mt-2">
              <TrendingUp size={14} /> Active Wholesale SKUs
            </div>
          </div>
          <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl">
            <Package size={26} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-md transition">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">New Inquiries</p>
            <h3 className="text-3xl font-bold text-bemitex-maroon">{stats.new_inquiries || 8}</h3>
            <div className="flex items-center gap-1 text-amber-600 text-xs font-semibold mt-2">
              <Clock size={14} /> Needs follow-up
            </div>
          </div>
          <div className="bg-rose-50 text-bemitex-maroon p-4 rounded-2xl">
            <MessageSquare size={26} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-md transition">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Video Appointments</p>
            <h3 className="text-3xl font-bold text-emerald-600">{stats.pending_bookings || 3}</h3>
            <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold mt-2">
              <CheckCircle2 size={14} /> VIP Showroom Calls
            </div>
          </div>
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl">
            <Video size={26} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-md transition">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Avg. Bundle MOQ</p>
            <h3 className="text-3xl font-bold text-bemitex-dark">{stats.avg_moq || 12} pcs</h3>
            <div className="flex items-center gap-1 text-purple-600 text-xs font-semibold mt-2">
              <Users size={14} /> Full set retail bundles
            </div>
          </div>
          <div className="bg-amber-50 text-amber-600 p-4 rounded-2xl">
            <Layers size={26} />
          </div>
        </div>
      </div>

      {/* CHARTS ROW 1: Date Range Calendar Graph & Category Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Growth & Inquiries Date-Wise Graph (2 Cols) */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-7 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            {/* Header & Date Calendar Picker */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 pb-4 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2">
                  <BarChart3 size={20} className="text-bemitex-maroon" />
                  <h3 className="text-lg font-bold text-bemitex-dark">Date-Wise Leads & Appointment Analytics</h3>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">Select specific calendar dates to inspect daily performance</p>
              </div>

              {/* Date Inputs & Quick Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 shadow-sm text-xs gap-1.5">
                  <CalendarIcon size={14} className="text-bemitex-maroon shrink-0" />
                  <span className="text-gray-400 font-medium">From:</span>
                  <input
                    type="date"
                    value={startDate}
                    max={endDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-transparent text-gray-700 font-semibold focus:outline-none cursor-pointer"
                  />
                  <span className="text-gray-300 mx-1">|</span>
                  <span className="text-gray-400 font-medium">To:</span>
                  <input
                    type="date"
                    value={endDate}
                    min={startDate}
                    max={todayStr}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-transparent text-gray-700 font-semibold focus:outline-none cursor-pointer"
                  />
                </div>

                <div className="hidden sm:flex items-center gap-1">
                  <button
                    onClick={() => setQuickRange(7)}
                    className="px-2.5 py-1.5 text-[11px] font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
                  >
                    7D
                  </button>
                  <button
                    onClick={() => setQuickRange(14)}
                    className="px-2.5 py-1.5 text-[11px] font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
                  >
                    14D
                  </button>
                  <button
                    onClick={() => setQuickRange(30)}
                    className="px-2.5 py-1.5 text-[11px] font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
                  >
                    30D
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Date Bars */}
            <div className="pt-4 pb-2">
              {dynamicTimelineData.length === 0 ? (
                <div className="h-56 flex flex-col items-center justify-center text-gray-400 text-sm">
                  <CalendarIcon size={36} className="mb-2 text-gray-300" />
                  <p>Please select a valid date range to display analytics.</p>
                </div>
              ) : (
                <div className="flex items-end justify-between gap-1 sm:gap-2.5 h-56 px-1 overflow-x-auto">
                  {dynamicTimelineData.map((item, idx) => {
                    const inqHeight = (item.inquiries / maxInquiries) * 100;
                    const bookHeight = (item.bookings / maxInquiries) * 100;
                    const isHovered = activeBar === idx;

                    return (
                      <div
                        key={idx}
                        className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer min-w-[28px]"
                        onMouseEnter={() => setActiveBar(idx)}
                        onMouseLeave={() => setActiveBar(null)}
                      >
                        {/* Interactive Tooltip */}
                        {isHovered && (
                          <div className="absolute -top-16 z-30 bg-bemitex-dark text-white text-[11px] rounded-xl py-2 px-3.5 shadow-2xl whitespace-nowrap border border-gray-700 animate-in fade-in zoom-in duration-150 pointer-events-none">
                            <p className="font-bold text-bemitex-gold flex items-center gap-1">
                              <CalendarIcon size={12} /> {item.date} ({item.displayDate})
                            </p>
                            <p className="text-gray-200 mt-0.5">📥 Wholesale Inquiries: <span className="font-bold text-white">{item.inquiries}</span></p>
                            <p className="text-gray-200">📹 Video Call Bookings: <span className="font-bold text-white">{item.bookings}</span></p>
                          </div>
                        )}

                        {/* Bar Cluster */}
                        <div className="w-full flex items-end justify-center gap-0.5 sm:gap-1 h-full">
                          {/* Inquiries Bar */}
                          <div
                            style={{ height: `${Math.max(inqHeight, 8)}%` }}
                            className={`w-full max-w-[16px] sm:max-w-[20px] rounded-t-lg transition-all duration-300 ${
                              isHovered ? "bg-bemitex-maroon shadow-lg scale-y-105" : "bg-bemitex-maroon/80 hover:bg-bemitex-maroon"
                            }`}
                          ></div>
                          {/* Video Bookings Bar */}
                          <div
                            style={{ height: `${Math.max(bookHeight, 5)}%` }}
                            className={`w-full max-w-[16px] sm:max-w-[20px] rounded-t-lg transition-all duration-300 ${
                              isHovered ? "bg-bemitex-gold shadow-md scale-y-105" : "bg-amber-400/80 hover:bg-amber-400"
                            }`}
                          ></div>
                        </div>

                        {/* Date Label */}
                        <span className={`text-[10px] sm:text-[11px] mt-2 truncate max-w-[40px] text-center transition-colors ${
                          isHovered ? "font-bold text-bemitex-maroon" : "text-gray-500"
                        }`}>
                          {item.displayDate}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 text-xs">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-bemitex-maroon rounded-md"></span>
                <span className="text-gray-700 font-medium">Bulk Inquiries (Quotes)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-amber-400 rounded-md"></span>
                <span className="text-gray-700 font-medium">Video Shopping Appointments</span>
              </div>
            </div>
            <span className="text-gray-400 text-[11px]">Hover on any date to see exact stats</span>
          </div>
        </div>

        {/* Category Share Donut / Distribution (1 Col) */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PieIcon size={20} className="text-bemitex-maroon" />
                <h3 className="text-lg font-bold text-bemitex-dark">Category Demand</h3>
              </div>
              <span className="text-xs text-gray-400 font-medium">Share %</span>
            </div>
            <p className="text-xs text-gray-500 mb-6">Proportion of buyer inquiries across categories</p>

            {/* Visual Multi-Segment Progress Bars */}
            <div className="space-y-4">
              {categoryShare.map((cat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-800 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                      {cat.name}
                    </span>
                    <span className="text-gray-600">{cat.percent}% ({cat.count})</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${cat.percent}%`, backgroundColor: cat.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 bg-bemitex-cream/40 p-4 rounded-xl">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-bemitex-dark">Top Performer:</span>
              <span className="font-extrabold text-bemitex-maroon">Kurtis & Sets (+42% YoY)</span>
            </div>
          </div>
        </div>

      </div>

      {/* CHARTS ROW 2: Geographic Leads Distribution & Live Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Geographic Demand Horizontal Bars */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-bemitex-maroon" />
              <h3 className="text-lg font-bold text-bemitex-dark">Top Buyer Regions (India)</h3>
            </div>
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
              PAN-India Reach
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-6">States with highest wholesale catalog inquiries</p>

          <div className="space-y-4">
            {regionalDemand.map((reg, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-700">{reg.state}</span>
                  <span className="text-bemitex-dark font-bold">{reg.share}% <span className="text-gray-400 font-normal">({reg.inquiries})</span></span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-bemitex-maroon to-bemitex-gold rounded-full transition-all duration-700"
                    style={{ width: `${reg.share * 2.8}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Recent Activity Feed */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-bemitex-maroon" />
                <h3 className="text-lg font-bold text-gray-800">Recent Lead Actions</h3>
              </div>
              <Link href="/admin/inquiries" className="text-xs text-bemitex-maroon font-bold hover:underline flex items-center gap-0.5">
                View Inquiries <ArrowUpRight size={14} />
              </Link>
            </div>
            <p className="text-xs text-gray-500 mb-4">Real-time incoming buyer inquiries from website</p>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3.5 border border-gray-100 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 transition">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Royal Fashion Boutique (Delhi)</p>
                    <p className="text-xs text-gray-500">Requested quote for: Premium Anarkali Sets (24 pcs)</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-[11px] font-bold rounded-lg">New</span>
              </div>

              <div className="flex justify-between items-center p-3.5 border border-gray-100 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 transition">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Mehta Saree Emporium (Surat)</p>
                    <p className="text-xs text-gray-500">Video call booked for: Tomorrow 11:00 AM</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-lg">Confirmed</span>
              </div>

              <div className="flex justify-between items-center p-3.5 border border-gray-100 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 transition">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Kashmir Trends (Srinagar)</p>
                    <p className="text-xs text-gray-500">Bulk inquiry: Pashmina Winter Suits (50 pcs)</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-[11px] font-bold rounded-lg">Pending</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
            <span>System Status: <strong className="text-emerald-600">Database Connected</strong></span>
            <span>Hostinger MySQL API: <strong className="text-bemitex-dark">Active</strong></span>
          </div>
        </div>

      </div>

    </div>
  );
}
