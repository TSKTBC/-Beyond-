'use client'

import { Sparkles, MessageCircle, Clock, Users, Shield } from 'lucide-react'

import { ChatConsultationFlow } from '@/components/consultation/ChatConsultationFlow'

export default function ConsultationPage() {
  const features = [
    {
      icon: MessageCircle,
      title: 'チャットで簡単予約',
      description: '会話形式で必要な情報を入力するだけ'
    },
    {
      icon: Clock,
      title: '平均2分で完了',
      description: '煩雑なフォーム入力は不要です'
    },
    {
      icon: Shield,
      title: '24時間365日対応',
      description: 'いつでもお気軽にご相談ください'
    },
    {
      icon: Users,
      title: '1,200+の実績',
      description: '満足度98%のサポート体制'
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-12 h-12 text-cyan-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">💬 無料相談チャット</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            チャット形式で簡単予約！留学の専門カウンセラーがあなたの疑問や不安にお答えします
          </p>
        </div>

        {/* 特徴カード */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-white p-4 rounded-xl shadow-md text-center">
                <Icon className="w-8 h-8 mx-auto mb-2 text-cyan-500" />
                <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* チャットコンポーネント */}
        <ChatConsultationFlow />
      </div>
    </main>
  )
}