"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, User, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate authentication
    setTimeout(() => {
      if (username === "admin" && password === "password") {
        router.push("/admin");
      } else {
        setError("Invalid username or password");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-bemitex-dark flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        
        <div className="bg-bemitex-cream p-8 text-center border-b border-gray-200">
          <div className="mx-auto w-20 h-20 bg-white rounded-full p-2 shadow-sm mb-4 relative">
             <Image
                src="/logo.jpg"
                alt="Bemitex Logo"
                fill
                className="object-contain rounded-full"
              />
          </div>
          <h1 className="text-2xl font-serif font-bold text-bemitex-dark">Bemitex Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to manage your wholesale platform</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm text-center border border-red-100">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 w-full rounded-md border border-gray-300 py-2.5 focus:ring-bemitex-maroon focus:border-bemitex-maroon outline-none" 
                  placeholder="admin" 
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full rounded-md border border-gray-300 py-2.5 focus:ring-bemitex-maroon focus:border-bemitex-maroon outline-none" 
                  placeholder="••••••••" 
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-bemitex-maroon text-white py-3 rounded-md font-bold text-lg hover:bg-bemitex-maroon/90 transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              {isLoading ? (
                <><Loader2 className="animate-spin" size={20} /> Authenticating...</>
              ) : (
                "Sign In"
              )}
            </button>
            <p className="text-xs text-center text-gray-400">Default: admin / password</p>
          </form>
        </div>
      </div>
    </div>
  );
}
