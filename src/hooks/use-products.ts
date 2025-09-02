"use client";

import { useState, useEffect } from "react";
import type { Product } from "@/lib/types";
import { DUMMY_PRODUCTS } from "@/lib/dummy-data";

const STORAGE_KEY = "stockpile-products";

// A simple way to check if the stored data is the old gadget data.
const isOldData = (products: Product[]) => {
  return products.some(p => p.name.toLowerCase().includes('laptop'));
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedProductsJSON = window.localStorage.getItem(STORAGE_KEY);
      if (storedProductsJSON) {
        const storedProducts = JSON.parse(storedProductsJSON);
        // If the stored data is the old gadget data, clear it.
        if (isOldData(storedProducts)) {
           window.localStorage.removeItem(STORAGE_KEY);
           setProducts(DUMMY_PRODUCTS);
        } else {
          setProducts(storedProducts);
        }
      } else {
        setProducts(DUMMY_PRODUCTS);
      }
    } catch (error) {
      console.error("Failed to load products from local storage", error);
      setProducts(DUMMY_PRODUCTS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      } catch (error) {
        console.error("Failed to save products to local storage", error);
      }
    }
  }, [products, isLoading]);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const editProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateStock = (productId: string, change: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, quantity: Math.max(0, p.quantity + change) } : p
      )
    );
  };

  return {
    products,
    addProduct,
    editProduct,
    deleteProduct,
    updateStock,
    isLoading,
  };
};
