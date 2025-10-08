'use client'

import {
  BookOpen,
  Calendar,
  FileText,
  MessageSquare,
  Star,
  TrendingUp,
  Bell,
  Clock,
  User,
  CreditCard,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Plus
} from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

import { SmartLoginPrompt } from '@/components/auth/SmartLoginPrompt'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useLoginStrategy } from '@/hooks/useLoginStrategy'

interface DashboardStats {
  savedSchools: number
  scheduledConsultations: number
  activeApplications: number
  completionRate: number
  upcomingEvents: number
  unreadMessages: number
}

interface Application {
  id: string
  schoolName: string
  program: string
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected'
  progress: number
  nextDeadline?: string
}

interface Notification {
  id: string
  type: 'info' | 'warning' | 'success'
  title: string
  message: string
  time: string
  read: boolean
}

const mockApplications: Application[] = [
  {
    id: '1',
    schoolName: 'University of Toronto',
    program: 'Computer Science',
    status: 'under_review',
    progress: 85,
    nextDeadline: '2024-10-15'
  },
  {
    id: '2',
    schoolName: 'Kings Education NYC',
    program: 'General English',
    status: 'draft',
    progress: 45
  }
]

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: '書類提出期限',
    message: 'University of Torontoへの追加書類提出期限が近づいています',
    time: '2時間前',
    read: false
  },
  {
    id: '2',
    type: 'info',
    title: '新しいメッセージ',
    message: 'カウンセラーから新しいメッセージが届いています',
    time: '5時間前',
    read: false
  },
  {
    id: '3',
    type: 'success',
    title: '見積もり完成',
    message: 'カナダ語学学校の見積もりが完成しました',
    time: '1日前',
    read: true
  }
]

const statusLabels = {
  draft: '下書き',
  submitted: '提出済み',
  under_review: '審査中',
  approved: '承認済み',
  rejected: '却下'
}

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  submitted: 'bg-blue-100 text-blue-800',
  under_review: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const { strategy, dismissPrompt } = useLoginStrategy()

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 flex items-center justify-center relative overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-300/20 to-blue-300/20 rounded-full blur-3xl translate-y-32 -translate-x-32"></div>
        </div>

        <div className="text-center relative z-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mb-6 shadow-2xl">
            <span className="text-4xl animate-bounce">🎓</span>
          </div>
          <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 font-medium">✨ あなたのダッシュボードを準備中...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-amber-50/50 to-yellow-50/50 py-8 relative">
        {strategy.showPrompt && (
          <SmartLoginPrompt
            trigger="value-based"
            context="dashboard"
            onDismiss={() => redirect('/auth/signin')}
          />
        )}
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50/50 via-amber-50/50 to-yellow-50/50 py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* フレンドリーなウェルカムセクション */}
        <div className="mb-10">
          <div className="bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-2xl">
            {/* 温かい装飾 */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-8 -translate-x-8 blur-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg transform hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl animate-bounce">🌟</span>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-4xl font-extrabold mb-1">
                    おかえりなさい！
                  </h1>
                  <p className="text-lg sm:text-xl font-medium opacity-90">
                    {session?.user?.name}さん、今日も素敵な一日を 🤗
                  </p>
                </div>
              </div>
              <p className="text-base sm:text-lg opacity-90 mb-8 leading-relaxed font-medium">
                ✨ あなたの夢に向かって、また一歩進んでいきませんか？<br className="hidden sm:block" />
                新しい発見や成長が、きっと待っています。
              </p>

              {/* 温かい統計情報 */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <p className="text-white/80 text-sm">今日のやることリスト</p>
                      <p className="font-bold text-lg">3件の楽しいタスク</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📈</span>
                    <div>
                      <p className="text-white/80 text-sm">夢への進捗</p>
                      <p className="font-bold text-lg">75% もう少しで完成！</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* フレンドリーなクイックアクション */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button className="bg-white text-orange-600 hover:bg-orange-50 font-bold py-3 px-6 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300" asChild>
                  <Link href="/quote">
                    🚀 新しい見積もりを作成
                  </Link>
                </Button>
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white/20 font-bold py-3 px-6 rounded-full backdrop-blur-sm transform hover:scale-105 transition-all duration-300" asChild>
                  <Link href="/consultation">
                    💬 気軽に相談してみる
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300 group">
            <CardContent className="pt-4 pb-4 px-4">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-2 sm:mb-0 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">保存済み学校</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-700">12</p>
                  <p className="text-xs text-blue-600">+2 今月</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300 group">
            <CardContent className="pt-4 pb-4 px-4">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-xl flex items-center justify-center mb-2 sm:mb-0 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">予約済み相談</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-700">3</p>
                  <p className="text-xs text-green-600">来週 1件</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300 group">
            <CardContent className="pt-4 pb-4 px-4">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-2 sm:mb-0 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">申込み中</p>
                  <p className="text-xl sm:text-2xl font-bold text-purple-700">1</p>
                  <p className="text-xs text-purple-600">審査中</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-xl transition-all duration-300 group">
            <CardContent className="pt-4 pb-4 px-4">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-2 sm:mb-0 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">進捗率</p>
                  <p className="text-xl sm:text-2xl font-bold text-orange-700">75%</p>
                  <p className="text-xs text-orange-600">+5% 今月</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* 最近のアクティビティ */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>最近のアクティビティ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 rounded-full p-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">カナダ語学学校の見積もりを作成しました</p>
                      <p className="text-xs text-gray-500">2時間前</p>
                    </div>
                    <Badge variant="secondary">新規</Badge>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 rounded-full p-2">
                      <Calendar className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">留学カウンセリングを予約しました</p>
                      <p className="text-xs text-gray-500">1日前</p>
                    </div>
                    <Badge variant="outline">完了</Badge>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 rounded-full p-2">
                      <BookOpen className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">オーストラリア大学を保存しました</p>
                      <p className="text-xs text-gray-500">3日前</p>
                    </div>
                    <Badge variant="secondary">保存済み</Badge>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 rounded-full p-2">
                      <Star className="h-4 w-4 text-orange-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">トロント語学学校のレビューを投稿しました</p>
                      <p className="text-xs text-gray-500">1週間前</p>
                    </div>
                    <Badge variant="outline">★4.5</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* クイックアクション */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>クイックアクション</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <Button className="w-full justify-start text-sm sm:text-base py-2 sm:py-3" asChild>
                  <a href="/schools">
                    <BookOpen className="mr-2 h-4 w-4" />
                    学校を検索
                  </a>
                </Button>

                <Button variant="outline" className="w-full justify-start text-sm sm:text-base py-2 sm:py-3" asChild>
                  <a href="/quote">
                    <FileText className="mr-2 h-4 w-4" />
                    見積もり作成
                  </a>
                </Button>

                <Button variant="outline" className="w-full justify-start text-sm sm:text-base py-2 sm:py-3" asChild>
                  <a href="/quotes">
                    <FileText className="mr-2 h-4 w-4" />
                    保存済み見積もり
                  </a>
                </Button>

                <Button variant="outline" className="w-full justify-start text-sm sm:text-base py-2 sm:py-3" asChild>
                  <a href="/consultation">
                    <Calendar className="mr-2 h-4 w-4" />
                    相談予約
                  </a>
                </Button>

                <Button variant="outline" className="w-full justify-start text-sm sm:text-base py-2 sm:py-3" asChild>
                  <a href="/messages">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    メッセージ
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* 次のステップ */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>次のステップ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">英語試験スコア取得</p>
                      <p className="text-xs text-gray-500">IELTS 6.5目標</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">学校申込み</p>
                      <p className="text-xs text-gray-500">カナダ語学学校</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">ビザ申請</p>
                      <p className="text-xs text-gray-500">学生ビザ</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 保存済み学校 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>保存済み学校</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">ILAC International College</h3>
                  <Badge>カナダ</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">トロント・バンクーバー</p>
                <p className="text-xs text-gray-500 mb-3">語学学校 | ビジネスプログラム</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">年間費用: $12,000</span>
                  <Button size="sm" variant="outline">詳細</Button>
                </div>
              </div>

              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Langports Gold Coast</h3>
                  <Badge>オーストラリア</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">ゴールドコースト</p>
                <p className="text-xs text-gray-500 mb-3">語学学校 | 一般英語</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">年間費用: $15,000</span>
                  <Button size="sm" variant="outline">詳細</Button>
                </div>
              </div>

              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Kings Education</h3>
                  <Badge>アメリカ</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">ニューヨーク</p>
                <p className="text-xs text-gray-500 mb-3">語学学校 | 大学進学準備</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">年間費用: $20,000</span>
                  <Button size="sm" variant="outline">詳細</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}