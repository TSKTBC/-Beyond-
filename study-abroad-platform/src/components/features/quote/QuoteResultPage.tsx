'use client'

import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Save, Download, Scale, Phone, Check } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import type { QuoteFormData, QuoteCalculationResult, School } from '@/types/quote'

interface QuoteResultPageProps {
  school: School
  formData: QuoteFormData
  result: QuoteCalculationResult
  onBack: () => void
  onStartOver: () => void
}

export function QuoteResultPage({ school, formData, result, onBack, onStartOver }: QuoteResultPageProps) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const formatCurrency = (amount: number) => `¥${amount.toLocaleString()}`

  const handleSaveQuote = async () => {
    if (!session) {
      toast({
        title: "ログインが必要です",
        description: "見積もりを保存するにはログインしてください",
        variant: "destructive"
      })
      return
    }

    setIsSaving(true)

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          schoolId: formData.schoolId,
          weeks: formData.weeks,
          startDate: formData.startDate,
          accommodationType: formData.accommodationType,
          options: formData.options,
          totalAmount: result.total,
          currency: result.currency,
          exchangeRate: result.exchangeRate,
          breakdown: result.breakdown,
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        })
      })

      if (response.ok) {
        const data = await response.json()
        setIsSaved(true)
        toast({
          title: "見積もりを保存しました",
          description: "ダッシュボードから後で確認できます",
          variant: "default"
        })
      } else {
        throw new Error('Failed to save quote')
      }
    } catch (error) {
      console.error('Failed to save quote:', error)
      toast({
        title: "保存に失敗しました",
        description: "しばらく時間をおいてから再度お試しください",
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  const getAccommodationName = (type: string) => {
    switch (type) {
      case 'homestay': return 'ホームステイ'
      case 'dormitory': return '学生寮'
      case 'apartment': return 'アパートメント'
      case 'none': return '自己手配'
      default: return type
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* ヘッダー: 総額強調 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-4 sm:p-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">お見積結果</h1>
        <div className="mb-3 sm:mb-4">
          <span className="text-3xl sm:text-5xl font-bold block">{formatCurrency(result.total)}</span>
          {result.discounts > 0 && (
            <Badge variant="secondary" className="mt-2 sm:mt-0 sm:ml-4 bg-green-100 text-green-800">
              {formatCurrency(result.discounts)}お得!
            </Badge>
          )}
        </div>
        <div className="text-base sm:text-lg opacity-90 px-2">
          {school.name} | {formData.weeks}週間 | {getAccommodationName(formData.accommodationType)}
        </div>
        <div className="text-xs sm:text-sm opacity-75 mt-2">
          {format(formData.startDate, 'yyyy年M月d日', { locale: ja })}開始
        </div>
      </div>

      {/* 学校情報 */}
      <Card>
        <CardHeader>
          <CardTitle>学校情報</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">{school.name}</h3>
              <p className="text-gray-600 mb-2">{school.city}, {school.country}</p>
              <p className="text-sm text-gray-500">{school.description}</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>期間:</span>
                <span className="font-medium">{formData.weeks}週間</span>
              </div>
              <div className="flex justify-between">
                <span>開始日:</span>
                <span className="font-medium">
                  {format(formData.startDate, 'yyyy/M/d', { locale: ja })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>宿泊タイプ:</span>
                <span className="font-medium">{getAccommodationName(formData.accommodationType)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 料金内訳 */}
      <Card>
        <CardHeader>
          <CardTitle>料金内訳</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {result.breakdown.map((category, index) => (
              <AccordionItem key={index} value={`category-${index}`}>
                <AccordionTrigger>
                  <div className="flex justify-between w-full mr-4">
                    <span>{category.category}</span>
                    <span className="font-semibold">{formatCurrency(category.subtotal)}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-2">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between py-1 border-b border-gray-100 last:border-0">
                        <span className="text-sm text-gray-600">
                          {item.name} {item.unit && `(${item.unit})`}
                        </span>
                        <span className="text-sm font-medium">{formatCurrency(item.amount)}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">合計</span>
              <span className="text-2xl font-bold text-blue-600">{formatCurrency(result.total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 為替情報 */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-2">
            <div className="bg-amber-100 rounded-full p-1">
              <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-amber-800">為替レートについて</h4>
              <p className="text-sm text-amber-700 mt-1">
                1 {result.currency} = ¥{result.exchangeRate} で計算しています。
                為替レートは日々変動するため、実際の金額は申込み時のレートによって変わります。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* アクションボタン */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Button variant="outline" className="h-auto p-4 hover:bg-blue-50 border-2 hover:border-blue-200 transition-all duration-300 group">
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <Download className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-sm font-medium">見積書PDF</div>
          </div>
        </Button>
        <Button
          variant={isSaved ? "default" : "outline"}
          className={`h-auto p-4 border-2 transition-all duration-300 group ${
            isSaved
              ? "bg-green-500 hover:bg-green-600 border-green-500"
              : "hover:bg-green-50 hover:border-green-200"
          }`}
          onClick={handleSaveQuote}
          disabled={isSaving || isSaved}
        >
          <div className="text-center">
            <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center transition-colors ${
              isSaved
                ? "bg-white/20"
                : "bg-green-100 group-hover:bg-green-200"
            }`}>
              {isSaved ? (
                <Check className="h-4 w-4 text-white" />
              ) : (
                <Save className="h-4 w-4 text-green-600" />
              )}
            </div>
            <div className={`text-sm font-medium ${isSaved ? "text-white" : ""}`}>
              {isSaving ? "保存中..." : isSaved ? "保存済み" : "見積を保存"}
            </div>
          </div>
        </Button>
        <Button variant="outline" className="h-auto p-4 hover:bg-purple-50 border-2 hover:border-purple-200 transition-all duration-300 group">
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-2 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <Scale className="h-4 w-4 text-purple-600" />
            </div>
            <div className="text-sm font-medium">他校と比較</div>
          </div>
        </Button>
        <Button className="h-auto p-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Phone className="h-4 w-4 text-white" />
            </div>
            <div className="text-sm font-medium text-white">無料相談</div>
          </div>
        </Button>
      </div>

      {/* 次のステップ提案 */}
      <Card>
        <CardHeader>
          <CardTitle>おすすめの次のステップ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="text-green-500 text-xl">✅</div>
            <div>
              <h4 className="font-semibold">無料相談で詳しく説明</h4>
              <p className="text-sm text-gray-600">
                ビザ・保険・現地サポートなど、気になる点をプロに相談できます
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="text-orange-500 text-xl">⏰</div>
            <div>
              <h4 className="font-semibold">見積の有効期限は7日間</h4>
              <p className="text-sm text-gray-600">
                為替変動リスクを避けるため、お早めのご検討をおすすめします
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ナビゲーションボタン */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          前のステップに戻る
        </Button>
        <Button variant="outline" onClick={onStartOver} className="flex-1">
          最初からやり直す
        </Button>
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
          この条件で相談予約
        </Button>
      </div>
    </div>
  )
}