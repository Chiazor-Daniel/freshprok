"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DollarSign, Package, Package2, TrendingUp, Star } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { useProducts } from "@/hooks/use-products";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { products, isLoading } = useProducts();

  const totalProducts = products.length;
  const totalStock = products.reduce(
    (acc, product) => acc + (product.quantity ?? 0),
    0
  );
  const totalValue = products.reduce(
    (acc, product) => acc + (product.quantity ?? 0) * (product.price ?? 0),
    0
  );

  const categoryDistribution = React.useMemo(() => {
    if (!products || products.length === 0) return [];
    const categoryCount = products.reduce((acc, product) => {
      if (product.category) { // Only count if category exists
        acc[product.category] = (acc[product.category] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryCount).map(([name, value]) => ({
      name,
      value,
    }));
  }, [products]);

  const chartConfig = {
    value: {
      label: "Products",
    },
    ...categoryDistribution.reduce((acc, category) => {
      acc[category.name] = { label: category.name };
      return acc;
    }, {} as any),
  };

  const COLORS = [
    "#8B5CF6",
    "#06B6D4",
    "#10B981",
    "#F59E0B",
    "#EF4444",
  ];

  if (isLoading) {
    return (
      <div className="flex-1 space-y-8">
        <div className="mb-8">
          <Skeleton className="h-12 w-64 mb-2" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Skeleton className="h-[500px] col-span-4 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold gradient-text mb-2">Grocery Dashboard</h1>
        <p className="text-gray-600 text-lg">Fresh insights into your grocery inventory</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="stats-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Total Items</CardTitle>
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg">
              <Package className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-1">{totalProducts}</div>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              Unique grocery items
            </p>
          </CardContent>
        </Card>
        
        <Card className="stats-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Total Quantity</CardTitle>
            <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg">
              <Package2 className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-1">{totalStock}</div>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              Total units across all items
            </p>
          </CardContent>
        </Card>
        
        <Card className="stats-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">
              Grocery Value
            </CardTitle>
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              ₦{totalValue.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              Total inventory value
            </p>
          </CardContent>
        </Card>
        
        <Card className="stats-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Categories</CardTitle>
            <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg">
              <Star className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-1">{categoryDistribution.length}</div>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              Product categories
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6">
        <Card className="grocery-card border-0">
          <CardHeader>
            <CardTitle className="text-2xl font-bold gradient-text mb-1">Category Distribution</CardTitle>
            <CardDescription className="text-gray-600">
              Visual breakdown of your grocery inventory by category
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[400px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={categoryDistribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={140}
                  strokeWidth={2}
                  stroke="#fff"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <ChartLegend
                  content={<ChartLegendContent nameKey="name" />}
                  className="-translate-y-4 flex-wrap gap-4 [&>*]:basis-1/4 [&>*]:justify-center text-sm font-medium"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
