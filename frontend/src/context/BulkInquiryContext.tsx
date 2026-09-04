"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface InquiryItem {
  id: number;
  name: string;
  slug: string;
  fabric: string;
  moq: number;
  price_per_piece: number;
  category_name?: string;
  main_image: string;
  quantity: number;
}

interface BulkInquiryContextType {
  items: InquiryItem[];
  addToInquiry: (product: Omit<InquiryItem, "quantity">, quantity?: number) => void;
  removeFromInquiry: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearInquiry: () => void;
  totalItems: number;
  totalPcs: number;
  totalAmount: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const BulkInquiryContext = createContext<BulkInquiryContextType | undefined>(undefined);

export function BulkInquiryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<InquiryItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bemitex_bulk_inquiry");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Could not load bulk inquiry cart", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("bemitex_bulk_inquiry", JSON.stringify(items));
      } catch (e) {
        console.warn("Could not save bulk inquiry cart", e);
      }
    }
  }, [items, isLoaded]);

  const addToInquiry = (product: Omit<InquiryItem, "quantity">, quantity?: number) => {
    const qtyToAdd = quantity && quantity > 0 ? quantity : Math.max(product.moq || 1, 1);
    
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      } else {
        return [
          ...prev,
          {
            ...product,
            quantity: qtyToAdd,
            main_image: product.main_image || "/products/prod_anarkali.jpg",
          },
        ];
      }
    });

    setIsDrawerOpen(true);
  };

  const removeFromInquiry = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromInquiry(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearInquiry = () => {
    setItems([]);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const totalItems = items.length;
  const totalPcs = items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  const totalAmount = items.reduce((sum, item) => {
    const p = typeof item.price_per_piece === "number" ? item.price_per_piece : parseFloat(item.price_per_piece) || 0;
    return sum + p * (Number(item.quantity) || 0);
  }, 0);

  return (
    <BulkInquiryContext.Provider
      value={{
        items,
        addToInquiry,
        removeFromInquiry,
        updateQuantity,
        clearInquiry,
        totalItems,
        totalPcs,
        totalAmount,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </BulkInquiryContext.Provider>
  );
}

export function useBulkInquiry() {
  const context = useContext(BulkInquiryContext);
  if (!context) {
    throw new Error("useBulkInquiry must be used within a BulkInquiryProvider");
  }
  return context;
}
