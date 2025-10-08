'use client'

import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import {
  FileText,
  Calendar,
  MapPin,
  Clock,
  Download,
  Trash2,
  Eye,
  Plus
} from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SavedQuote {
  id: string
  weeks: number
  startDate: string
  accommodationType: string
  totalAmount: number
  currency: string
  validUntil: string
  status: string
  createdAt: string
  school: {
    name: string
    country: string
    city: string
  }
}

const statusLabels = {
  DRAFT: '下書き',
  SAVED: '保存済み',
  SHARED: '共有済み',
  CONVERTED: '申込み済み'
}

const statusColors = {
  DRAFT: 'bg-gray-100 text-gray-800',
  SAVED: 'bg-blue-100 text-blue-800',
  SHARED: 'bg-green-100 text-green-800',
  CONVERTED: 'bg-purple-100 text-purple-800'
}

const accommodationLabels = {
  homestay: 'ホームステイ',
  dormitory: '学生寮',
  apartment: 'アパートメント',
  none: '自己手配'
}

export default function SavedQuotesPage() {
  const { data: session, status } = useSession()
  const [quotes, setQuotes] = useState<SavedQuote[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/auth/signin')
    }

    if (status === 'authenticated') {
      fetchQuotes()
    }
  }, [status])

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/quotes')
      if (response.ok) {
        const data = await response.json()
        setQuotes(data.quotes)
      } else {
        setError('見積もりの取得に失敗しました')
      }
    } catch (err) {
      setError('見積もりの取得に失敗しました')
      console.error('Failed to fetch quotes:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (quoteId: string) => {
    if (!confirm('この見積もりを削除してもよろしいですか？')) return

    try {
      const response = await fetch(`/api/quotes/${quoteId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setQuotes(quotes.filter(q => q.id !== quoteId))
      } else {
        alert('削除に失敗しました')
      }
    } catch (err) {
      alert('削除に失敗しました')
      console.error('Failed to delete quote:', err)
    }
  }

  const formatCurrency = (amount: number) => `¥${Math.round(amount).toLocaleString()}`

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin')
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">保存済み見積もり</h1>
            <p className="text-gray-600 mt-2">
              過去に作成した見積もりの一覧です。
            </p>
          </div>
          <Button asChild>
            <Link href="/quote">
              <Plus className="h-4 w-4 mr-2" />
              新しい見積もり
            </Link>
          </Button>
        </div>

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* 見積もり一覧 */}
        {quotes.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                保存済み見積もりがありません
              </h3>
              <p className="text-gray-600 mb-6">
                まずは見積もりを作成してみましょう。
              </p>
              <Button asChild>
                <Link href="/quote">
                  <Plus className="h-4 w-4 mr-2" />
                  見積もりを作成
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quotes.map((quote) => (
              <Card key={quote.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={`${statusColors[quote.status as keyof typeof statusColors]} border border-white/20 shadow-sm`}>
                      {statusLabels[quote.status as keyof typeof statusLabels]}
                    </Badge>
                    <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {format(new Date(quote.createdAt), 'M/d', { locale: ja })}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-lg">🏫</span>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {quote.school.name}
                      </CardTitle>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{quote.school.city}, {quote.school.country}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {formatCurrency(quote.totalAmount)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {quote.weeks}週間 | {accommodationLabels[quote.accommodationType as keyof typeof accommodationLabels]}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        開始予定:
                      </span>
                      <span>{format(new Date(quote.startDate), 'yyyy/M/d', { locale: ja })}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        有効期限:
                      </span>
                      <span className={new Date(quote.validUntil) < new Date() ? 'text-red-600' : ''}>
                        {format(new Date(quote.validUntil), 'M/d', { locale: ja })}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      詳細
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(quote.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* ヒント */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-medium text-blue-900 mb-2">💡 ヒント</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 見積もりの有効期限は作成から30日間です</li>
              <li>• 期限切れの見積もりも履歴として残ります</li>
              <li>• 詳細ページから再計算や修正ができます</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}