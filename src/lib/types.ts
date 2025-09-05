// lib/types.ts
export interface Product {
  id: string
  name: string
  category?: string
  price?: number
  stock?: number   // ✅ added
  description?: string
  image?: string
  quantity?: number // ❌ removed
}
