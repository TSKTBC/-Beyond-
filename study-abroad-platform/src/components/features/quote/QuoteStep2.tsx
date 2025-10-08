'use client'

import { format, addMonths } from 'date-fns'
import { ja } from 'date-fns/locale'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { QuoteFormData } from '@/types/quote'

interface QuoteStep2Props {
  data: Partial<QuoteFormData>
  onUpdate: (data: Partial<QuoteFormData>) => void
  onNext: () => void
  onBack: () => void
}

export function QuoteStep2({ data, onUpdate, onNext, onBack }: QuoteStep2Props) {
  const [startDate, setStartDate] = useState(data.startDate || addMonths(new Date(), 2))

  const handleNext = () => {
    onUpdate({ startDate })
    onNext()
  }

  // 人気の開始時期オプション
  const popularDates = [
    { date: addMonths(new Date(), 1), label: '来月' },
    { date: addMonths(new Date(), 2), label: '2ヶ月後' },
    { date: addMonths(new Date(), 3), label: '3ヶ月後' },
    { date: addMonths(new Date(), 6), label: '半年後' }
  ]

  const getSeasonInfo = (date: Date) => {
    const month = date.getMonth() + 1
    if (month >= 3 && month <= 5) return { season: '春', color: 'text-green-600', info: '新学期シーズン。新しいクラスメイトと出会えます。' }
    if (month >= 6 && month <= 8) return { season: '夏', color: 'text-orange-600', info: '夏休みシーズン。観光やアクティビティが豊富です。' }
    if (month >= 9 && month <= 11) return { season: '秋', color: 'text-amber-600', info: '新学期シーズン。勉強に集中できる季節です。' }
    return { season: '冬', color: 'text-blue-600', info: '年末年始を海外で過ごせます。クリスマスイベント等があります。' }
  }

  const seasonInfo = getSeasonInfo(startDate)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">開始時期を選んでください</h2>
        <p className="text-gray-600">
          留学開始希望日を選択してください。早期申込み割引の対象期間もあります。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {format(startDate, 'yyyy年M月d日', { locale: ja })}
            </div>
            <div className={`text-lg ${seasonInfo.color}`}>
              {seasonInfo.season}シーズン
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* 人気の時期ボタン */}
            <div className="grid grid-cols-2 gap-3">
              {popularDates.map((option, index) => (
                <Button
                  key={index}
                  variant={format(startDate, 'yyyy-MM-dd') === format(option.date, 'yyyy-MM-dd') ? 'default' : 'outline'}
                  onClick={() => setStartDate(option.date)}
                  className="h-auto p-4"
                >
                  <div className="text-center">
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-xs opacity-70">
                      {format(option.date, 'M/d', { locale: ja })}
                    </div>
                  </div>
                </Button>
              ))}
            </div>

            {/* カスタム日付入力 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                または、具体的な日付を入力
              </label>
              <input
                type="date"
                value={format(startDate, 'yyyy-MM-dd')}
                onChange={(e) => setStartDate(new Date(e.target.value))}
                min={format(addMonths(new Date(), 1), 'yyyy-MM-dd')}
                max={format(addMonths(new Date(), 12), 'yyyy-MM-dd')}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 季節情報 */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm text-amber-700 mb-2">この時期について</p>
            <p className="text-amber-900">
              {seasonInfo.info}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 早期申込み割引情報 */}
      {startDate > addMonths(new Date(), 3) && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-green-700 mb-2">🎉 早期申込み割引対象</p>
              <p className="text-green-900">
                3ヶ月以上前のお申込みで<strong>5%割引</strong>が適用されます！
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          戻る
        </Button>
        <Button onClick={handleNext}>
          次へ：宿泊・オプションを選ぶ
        </Button>
      </div>
    </div>
  )
}