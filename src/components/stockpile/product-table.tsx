"use client";

import * as React from "react";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Plus,
  Minus,
  TrendingUp,
  TrendingDown,
  Package,
  Eye,
} from "lucide-react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onView: (product: Product) => void;
  onUpdateStock: (id: string, change: number) => void;
  recentlyUpdated: string | null;
}

const StockManager = ({ onUpdateStock }: { onUpdateStock: (change: number) => void }) => {
  const [amount, setAmount] = React.useState(1);
  return (
    <div className="space-y-4 p-2">
      <div className="space-y-2">
        <Label htmlFor="stock-amount" className="text-sm font-semibold">Amount</Label>
        <Input
          id="stock-amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value, 10) || 1))}
          className="w-full rounded-lg"
        />
      </div>
      <div className="flex justify-between gap-2">
        <Button
          variant="outline"
          className="w-full bg-green-50 border-green-200 text-green-700 hover:bg-green-100 rounded-lg"
          onClick={() => onUpdateStock(amount)}
        >
          <TrendingUp className="mr-2 h-4 w-4" /> Add
        </Button>
        <Button
          variant="outline"
          className="w-full bg-red-50 border-red-200 text-red-700 hover:bg-red-100 rounded-lg"
          onClick={() => onUpdateStock(-amount)}
        >
          <TrendingDown className="mr-2 h-4 w-4" /> Remove
        </Button>
      </div>
    </div>
  );
};

const getStockStatus = (quantity: number) => {
  if (quantity === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-800 border-red-200" };
  if (quantity < 10) return { label: "Low Stock", color: "bg-yellow-100 text-yellow-800 border-yellow-200" };
  if (quantity < 50) return { label: "In Stock", color: "bg-blue-100 text-blue-800 border-blue-200" };
  return { label: "Well Stocked", color: "bg-green-100 text-green-800 border-green-200" };
};

export function ProductTable({
  products,
  onEdit,
  onDelete,
  onView,
  onUpdateStock,
  recentlyUpdated,
}: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="grocery-card rounded-2xl flex flex-col items-center justify-center p-16 text-center">
        <div className="p-4 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full mb-4">
          <Package className="h-8 w-8 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2 gradient-text">No Grocery Items Found</h3>
        <p className="text-gray-600 mb-6">
          Start building your fresh grocery inventory today.
        </p>
        <Button className="modern-button">
          <Plus className="mr-2 h-4 w-4" />
          Add Your First Item
        </Button>
      </div>
    );
  }

  return (
    <div className="grocery-card rounded-2xl border-0 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-emerald-100/50 hover:bg-transparent">
            <TableHead className="w-[100px] font-semibold text-gray-800 text-sm py-4">Image</TableHead>
            <TableHead className="w-[35%] font-semibold text-gray-800 text-sm">Item Name</TableHead>
            <TableHead className="font-semibold text-gray-800 text-sm">Category</TableHead>
            <TableHead className="text-right font-semibold text-gray-800 text-sm">Unit Price (₦)</TableHead>
            <TableHead className="text-right font-semibold text-gray-800 text-sm">Quantity</TableHead>
            <TableHead className="text-right font-semibold text-gray-800 text-sm">Total Value (₦)</TableHead>
            <TableHead className="text-center font-semibold text-gray-800 text-sm">Status</TableHead>
            <TableHead className="w-[100px] text-center font-semibold text-gray-800 text-sm">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="border-b border-emerald-50/50 table-row-hover">
              <TableCell className="py-4">
                <Image
                  src={product.image || "https://placehold.co/100x100.png"}
                  alt={product.name}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover shadow-sm border border-emerald-100"
                  data-ai-hint="product image"
                />
              </TableCell>
              <TableCell className="py-4">
                <div className="font-semibold text-gray-900 text-lg">{product.name}</div>
              </TableCell>
              <TableCell className="py-4">
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200 rounded-full px-3 py-1 font-medium text-sm">
                  {product.category}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-semibold text-gray-900 py-4">
                ₦{(product.price || 0).toLocaleString()}
              </TableCell>
              <TableCell
                className={cn(
                  "text-right font-semibold text-lg py-4 transition-all duration-500",
                  recentlyUpdated === product.id && "text-emerald-600 bg-emerald-50 rounded-lg"
                )}
              >
                {product.quantity}
              </TableCell>
              <TableCell className="text-right font-semibold text-gray-900 py-4">
                ₦{((product.price || 0) * (product.quantity || 0)).toLocaleString()}
              </TableCell>
              <TableCell className="text-center py-4">
                <Badge 
                  className={cn(
                    "rounded-full px-3 py-1 text-sm font-medium border",
                    getStockStatus(product.quantity).color
                  )}
                >
                  {getStockStatus(product.quantity).label}
                </Badge>
              </TableCell>
              <TableCell className="text-center py-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-emerald-100/50 transition-all duration-200">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4 text-emerald-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="grocery-card border-emerald-200/50 rounded-lg">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start font-medium h-10 px-3 rounded-lg hover:bg-emerald-50 text-emerald-700">
                          Manage Stock
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-72 grocery-card border-emerald-200/50 rounded-lg" align="end">
                         <StockManager onUpdateStock={(change) => onUpdateStock(product.id, change)} />
                      </PopoverContent>
                    </Popover>
                    <DropdownMenuItem onClick={() => onView(product)} className="rounded-lg hover:bg-emerald-50 font-medium text-emerald-700 py-2">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(product)} className="rounded-lg hover:bg-emerald-50 font-medium text-emerald-700 py-2">
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start font-medium h-10 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg py-2"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="grocery-card border-emerald-200/50 rounded-2xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-xl font-bold gradient-text">Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-600">
                            This action cannot be undone. This will permanently
                            delete the item "{product.name}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-lg font-medium">Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => onDelete(product.id)}
                            className="bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-all duration-200"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
