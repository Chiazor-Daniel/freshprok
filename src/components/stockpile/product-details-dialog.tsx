"use client";

import * as React from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import type { Product } from "@/lib/types";
import Image from "next/image";

interface ProductDetailsDialogProps {
  product: Product | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailsDialog({
  product,
  isOpen,
  onOpenChange,
}: ProductDetailsDialogProps) {
  if (!product) return null;

  // ---- Safe fallbacks ----
  const name = product.name ?? "Unnamed product";
  const category = product.category ?? "Uncategorized";
  const priceNum = Number(
    typeof product.price === "number" ? product.price : (product.price ?? 0)
  );
  const priceText = isFinite(priceNum) ? priceNum.toLocaleString() : "0";
  const stockNum = Number(product.stock ?? 0);
  const description = product.description?.trim();
  const id = product.id ?? "N/A";
  const imgSrc = product.image || "https://placehold.co/800x600.svg?text=No+Image";

  return (
    <Dialog open={!!isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Package className="h-6 w-6 text-emerald-600" />
            {name}
          </DialogTitle>
          <DialogDescription>Product Details</DialogDescription>
        </DialogHeader>

        <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
          <Image
            src={imgSrc}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
            unoptimized
            priority
          />
        </div>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Category</label>
              <div className="mt-1">
                <Badge variant="outline" className="text-emerald-600 bg-emerald-50">
                  {category}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Price</label>
              <p className="mt-1 text-lg font-semibold">₦{priceText}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Current Stock</label>
            <p className="mt-1 text-lg font-semibold">{isFinite(stockNum) ? stockNum : 0} units</p>
          </div>

          {description && (
            <div>
              <label className="text-sm font-medium text-gray-500">Description</label>
              <p className="mt-1 text-gray-700">{description}</p>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-500">Product ID</label>
            <p className="mt-1 font-mono text-sm text-gray-600">{id}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
