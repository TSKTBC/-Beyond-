'use client'

import { SmartLoginPrompt } from '@/components/auth/SmartLoginPrompt'
import { QuoteWizard } from '@/components/features/quote/QuoteWizard'
import { useLoginStrategy } from '@/hooks/useLoginStrategy'
import type { School } from '@/types/quote'

// モックデータ（後でAPIから取得）
const mockSchool: School = {
  id: 'school-1',
  name: 'Toronto Language Academy',
  country: 'Canada',
  city: 'Toronto',
  description: 'トロントの中心部にある国際的な語学学校。少人数制クラスで質の高い授業を提供。',
  images: [
    '/images/schools/toronto-academy-1.jpg',
    '/images/schools/toronto-academy-2.jpg'
  ],
  pricing: {
    basePrice: 350, // CAD per week
    currency: 'CAD',
    fees: {
      registration: 150,
      materials: 50,
      technology: 25
    },
    accommodation: {
      homestay: { price: 280, deposit: 200 },
      dormitory: { price: 320, deposit: 300 },
      apartment: { price: 450, deposit: 500 }
    }
  }
}

export default function QuotePage() {
  const { strategy, dismissPrompt } = useLoginStrategy()

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-300/20 to-emerald-300/20 rounded-full blur-3xl translate-y-32 -translate-x-32"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
            <span className="text-3xl text-white animate-bounce">💰</span>
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            留学費用を見積もりしましょう
          </h1>
          <p className="text-lg text-gray-700 font-medium">
            ✨ 4つの簡単なステップで、正確な留学費用を計算できます
          </p>
        </div>

        <QuoteWizard school={mockSchool} />

        {/* 統計的に最適化されたログインプロンプト */}
        {strategy.showPrompt && (
          <SmartLoginPrompt
            trigger={strategy.trigger}
            context={strategy.context}
            onDismiss={dismissPrompt}
          />
        )}
      </div>
    </main>
  )
}