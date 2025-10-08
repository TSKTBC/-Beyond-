// 見積機能の型定義

export interface QuoteStep1Data {
  weeks: number;
}

export interface QuoteStep2Data {
  startDate: Date;
}

export interface QuoteStep3Data {
  accommodationType: 'homestay' | 'dormitory' | 'apartment' | 'none';
  options: {
    airportPickup?: boolean;
    insurance?: boolean;
    examPrep?: boolean;
  };
}

export interface QuoteStep4Data {
  email?: string;
  name?: string;
  phone?: string;
}

export interface QuoteFormData extends QuoteStep1Data, QuoteStep2Data, QuoteStep3Data, QuoteStep4Data {
  schoolId: string;
}

export interface QuoteCalculationResult {
  tuition: number;
  accommodation: number;
  fees: number;
  options: number;
  subtotal: number;
  discounts: number;
  total: number;
  currency: string;
  exchangeRate: number;
  breakdown: Array<{
    category: string;
    items: Array<{
      name: string;
      amount: number;
      unit?: string;
    }>;
    subtotal: number;
  }>;
}

export interface School {
  id: string;
  name: string;
  country: string;
  city: string;
  description: string;
  images: string[];
  pricing: {
    basePrice: number;
    currency: string;
    fees: {
      registration: number;
      materials: number;
      technology: number;
    };
    accommodation: {
      homestay: { price: number; deposit: number };
      dormitory: { price: number; deposit: number };
      apartment: { price: number; deposit: number };
    };
  };
}