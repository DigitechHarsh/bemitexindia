"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  Video, 
  LogOut, 
  Menu,
  X
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Avoid hydration mismatch for pathname dependent logic
  useEffect(() => {
    setIsClient(true);
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/admin" },
    { name: "Products", icon: <Package size={20} />, href: "/admin/products" },
    { name: "Inquiries", icon: <MessageSquare size={20} />, href: "/admin/inquiries" },
    { name: "Video Bookings", icon: <Video size={20} />, href: "/admin/bookings" },
  ];

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    // Implement logout logic (e.g., clear localStorage/cookies)
    router.push("/admin/login");
  };

  if (!isClient) return null;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans z-[100] relative">
      {/* Overlay for mobile sidebar */}
      {!isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 bg-bemitex-dark text-white w-64 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col ${
          isSidebarOpen ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-800">
          <span className="text-xl font-bold font-serif text-bemitex-gold">Bemitex Admin</span>
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(true)}>
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-1 px-3">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                    isActive 
                      ? "bg-bemitex-maroon text-white font-medium" 
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                  onClick={() => window.innerWidth < 768 && setIsSidebarOpen(true)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-md text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
          <div className="mt-4 px-4">
             <Link href="/" className="text-sm text-gray-500 hover:text-white underline">
               Back to Website
             </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center px-6 shrink-0">
          <button 
            className="text-gray-500 hover:text-gray-700 md:hidden mr-4"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">
            {menuItems.find(i => i.href === pathname)?.name || "Dashboard"}
          </h1>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
