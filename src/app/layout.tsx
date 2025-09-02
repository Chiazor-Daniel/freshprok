import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { LayoutDashboard, Package, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FreshStock Pro',
  description: 'Modern inventory management made simple.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <SidebarProvider>
          <Sidebar className="glass-card border-r-0">
            <SidebarContent className="bg-transparent">
              <SidebarHeader>
                <div className="flex items-center gap-4 p-6">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-xl shadow-md">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold gradient-text">FreshStock</h2>
                    <p className="text-xs text-emerald-600 font-medium">GROCERY PRO</p>
                  </div>
                </div>
              </SidebarHeader>
              <SidebarMenu className="px-6 space-y-2">
                <SidebarMenuItem>
                  <Link href="/" passHref>
                    <SidebarMenuButton tooltip="Dashboard" className="rounded-lg py-3 px-3 hover:bg-emerald-50 transition-all duration-200">
                      <LayoutDashboard className="h-5 w-5 text-emerald-600" />
                      <span className="font-medium text-gray-700">Dashboard</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/products" passHref>
                    <SidebarMenuButton tooltip="Products" className="rounded-lg py-3 px-3 hover:bg-emerald-50 transition-all duration-200">
                      <Package className="h-5 w-5 text-emerald-600" />
                      <span className="font-medium text-gray-700">Grocery Items</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <header className="p-4 border-b border-emerald-200/30 md:hidden">
              <SidebarTrigger className="hover:bg-emerald-100/50 rounded-lg transition-all duration-200" />
            </header>
            <main className="p-6">{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
