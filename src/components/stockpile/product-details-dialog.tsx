"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Package className="h-6 w-6 text-emerald-600" />
            {product?.name}
          </DialogTitle>
          <DialogDescription>Product Details</DialogDescription>
        </DialogHeader>

        <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
          <Image
            src={product.image || "https://placehold.co/400x400.png"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Category</label>
              <div className="mt-1">
                <Badge variant="outline" className="text-emerald-600 bg-emerald-50">
                  {product.category}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Price</label>
             <p className="mt-1 text-lg font-semibold">
  ₦{product?.price?.toLocaleString() ?? "0"}
</p>

            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Current Stock</label>
            <p className="mt-1 text-lg font-semibold">{product?.stock} units</p>
          </div>

          {product?.description && (
            <div>
              <label className="text-sm font-medium text-gray-500">Description</label>
              <p className="mt-1 text-gray-700">{product?.description}</p>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-500">Product ID</label>
            <p className="mt-1 font-mono text-sm text-gray-600">{product?.id}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
