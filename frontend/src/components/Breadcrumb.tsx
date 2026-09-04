import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import JsonLd from "./JsonLd";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bemitexindia.com";

  const allItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    ...items,
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": allItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `${baseUrl}${item.href}` : `${baseUrl}`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav aria-label="Breadcrumb" className="py-3 px-4 text-xs sm:text-sm text-gray-500 bg-gray-50/80 border-b border-gray-100 mb-6">
        <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-1.5 sm:gap-2">
          {allItems.map((item, idx) => {
            const isLast = idx === allItems.length - 1;
            return (
              <div key={idx} className="flex items-center gap-1.5 sm:gap-2">
                {idx === 0 ? (
                  <Link
                    href="/"
                    className="flex items-center text-gray-500 hover:text-bemitex-maroon transition-colors"
                  >
                    <Home size={14} className="mr-1 inline-block" />
                    <span>Home</span>
                  </Link>
                ) : isLast || !item.href ? (
                  <span className="font-semibold text-bemitex-dark truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-500 hover:text-bemitex-maroon transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
                {!isLast && (
                  <ChevronRight size={14} className="text-gray-400 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}
