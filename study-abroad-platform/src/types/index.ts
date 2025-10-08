// 基本的な型定義

export interface School {
  id: string
  name: string
  slug: string
  description: string
  country: string
  city: string
  address?: string
  website?: string
  email?: string
  phone?: string
  stats: {
    averageRating: number
    reviewCount: number
    studentCount: number
  }
  images: string[]
  featured: boolean
  verified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface QuoteInput {
  schoolId: string
  weeks: number
  startDate: Date
  accommodationType: 'homestay' | 'dormitory' | 'apartment' | 'none'
  options: {
    airportPickup?: boolean
    insurance?: boolean
    examPrep?: boolean
  }
  email?: string
}

export interface QuoteResult {
  id: string
  school: School
  weeks: number
  startDate: Date
  accommodation: {
    type: string
    price: number
  }
  total: number
  currency: string
  exchangeRate: {
    rate: number
    date: Date
  }
  breakdown: Array<{
    category: string
    name: string
    amount: number
    total: number
    items: Array<{
      name: string
      amount: number
    }>
  }>
  savings: number
  validUntil: Date
}

export interface SearchFilters {
  countries?: string[]
  priceRange?: [number, number]
  startMonth?: string
  features?: string[]
  sortBy?: 'relevance' | 'price-asc' | 'rating'
  viewMode?: 'grid' | 'list'
}