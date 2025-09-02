"use client";

import * as React from "react";
import { Plus, Search, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductDialog } from "@/components/stockpile/product-dialog";
import { ProductTable } from "@/components/stockpile/product-table";
import { useProducts } from "@/hooks/use-products";
import type { Product } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPage() {
  const {
    products,
    addProduct,
    editProduct,
    updateStock,
    deleteProduct,
    isLoading,
  } = useProducts();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [productToEdit, setProductToEdit] = React.useState<Product | null>(
    null
  );
  const [recentlyUpdated, setRecentlyUpdated] = React.useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredProducts = React.useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleOpenDialog = (product?: Product) => {
    setProductToEdit(product || null);
    setIsDialogOpen(true);
  };

  const handleSaveProduct = (productData: Product) => {
    if (productToEdit) {
      editProduct(productData);
    } else {
      const newProduct = {
        ...productData,
        id: new Date().toISOString(),
        price: productData.price || 0,
      };
      addProduct(newProduct);
    }
    setIsDialogOpen(false);
    setProductToEdit(null);
  };

  const handleUpdateStock = (productId: string, change: number) => {
    updateStock(productId, change);
    setRecentlyUpdated(productId);
    setTimeout(() => setRecentlyUpdated(null), 1500);
  };

  return (
    <div className="space-y-8">
      <header className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Grocery Inventory
            </h1>
            <p className="text-gray-600 text-lg">Manage your fresh groceries</p>
          </div>
          <Button 
            onClick={() => handleOpenDialog()} 
            className="modern-button"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Grocery Item
          </Button>
        </div>
        
        <div className="flex items-center gap-4 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
            <Input
              placeholder="Search grocery items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 premium-input"
            />
          </div>
          <Button variant="outline" className="rounded-lg border-emerald-200 bg-white hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200">
            <Filter className="h-4 w-4 text-emerald-600" />
          </Button>
        </div>
      </header>
      
      <main>
        {isLoading ? (
          <div className="grocery-card rounded-2xl p-8 space-y-4">
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
        ) : (
          <ProductTable
            products={filteredProducts}
            onEdit={handleOpenDialog}
            onDelete={deleteProduct}
            onUpdateStock={handleUpdateStock}
            recentlyUpdated={recentlyUpdated}
          />
        )}
      </main>

      <ProductDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveProduct}
        productToEdit={productToEdit}
      />
    </div>
  );
}
