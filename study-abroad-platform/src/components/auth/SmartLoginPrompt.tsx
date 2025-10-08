'use client'

import { X, Sparkles, Clock, Users, Shield } from 'lucide-react'
import Link from 'next/link'
// import { useSession } from 'next-auth/react' // 一時的に無効化
import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface SmartLoginPromptProps {
  trigger?: 'time-based' | 'action-based' | 'value-based'
  context?: string
  onDismiss?: () => void
}

export function SmartLoginPrompt({
  trigger = 'value-based',
  context = 'general',
  onDismiss
}: SmartLoginPromptProps) {
  const session = null // 一時的にuseSessionを無効化
  const [isVisible, setIsVisible] = useState(false)
  const [interactions, setInteractions] = useState(0)

  useEffect(() => {
    if (session) return

    const shouldShow = () => {
      switch (trigger) {
        case 'time-based':
          // 30秒後に表示（統計的に最適な時間）
          setTimeout(() => setIsVisible(true), 30000)
          break

        case 'action-based':
          // 3つのアクション後に表示（エンゲージメント後）
          if (interactions >= 3) {
            setIsVisible(true)
          }
          break

        case 'value-based':
          // 価値提案後すぐに表示
          setTimeout(() => setIsVisible(true), 2000)
          break
      }
    }

    shouldShow()
  }, [session, trigger, interactions])

  // インタラクション追跡
  useEffect(() => {
    const trackInteractions = () => {
      const buttons = document.querySelectorAll('button, a[href]')
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          setInteractions(prev => prev + 1)
        })
      })
    }

    trackInteractions()
  }, [])

  if (session || !isVisible) return null

  const getPromptContent = () => {
    switch (context) {
      case 'quote':
        return {
          icon: <Sparkles className="h-8 w-8 text-emerald-500" />,
          title: '見積もりを保存しませんか？',
          description: 'アカウントを作成すると、作成した見積もりを保存して後で確認できます。',
          benefits: ['見積もりの保存', '比較機能', '専門カウンセラーとの相談']
        }

      case 'consultation':
        return {
          icon: <Clock className="h-8 w-8 text-blue-500" />,
          title: '相談予約をスムーズに',
          description: 'ログインすると、相談履歴の確認や次回予約が簡単になります。',
          benefits: ['予約履歴の確認', 'リマインダー通知', 'パーソナライズされた提案']
        }

      case 'dashboard':
        return {
          icon: <Users className="h-8 w-8 text-purple-500" />,
          title: 'あなた専用の留学プランを',
          description: 'ダッシュボードで留学準備の進捗を一元管理できます。',
          benefits: ['進捗の可視化', '個別サポート', 'カスタマイズされた情報']
        }

      default:
        return {
          icon: <Shield className="h-8 w-8 text-orange-500" />,
          title: 'より良い留学体験を',
          description: 'アカウントを作成すると、パーソナライズされたサポートを受けられます。',
          benefits: ['個別カウンセリング', '進捗管理', '優先サポート']
        }
    }
  }

  const content = getPromptContent()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <Card className="max-w-md w-full shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
        <CardContent className="p-0">
          <div className="relative">
            <button
              onClick={() => {
                setIsVisible(false)
                onDismiss?.()
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-8 text-center">
              {/* アイコン */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-6 shadow-lg">
                {content.icon}
              </div>

              {/* タイトル */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {content.title}
              </h3>

              {/* 説明 */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {content.description}
              </p>

              {/* 特典リスト */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 mb-6">
                <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  ログインの特典
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {content.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* アクションボタン */}
              <div className="space-y-3">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <Button asChild className="relative w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <Link href="/auth/signin">
                      🚀 ログインして始める
                    </Link>
                  </Button>
                </div>

                <div className="text-center">
                  <span className="text-sm text-gray-500">アカウントをお持ちでない場合は </span>
                  <Link
                    href="/auth/signup"
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                  >
                    新規登録
                  </Link>
                </div>

                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsVisible(false)
                    onDismiss?.()
                  }}
                  className="w-full text-gray-500 hover:text-gray-700"
                >
                  後で登録する
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}