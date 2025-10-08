'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import type { QuoteFormData } from '@/types/quote'

interface QuoteStep1Props {
  data: Partial<QuoteFormData>
  onUpdate: (data: Partial<QuoteFormData>) => void
  onNext: () => void
  onBack: () => void
}

export function QuoteStep1({ data, onUpdate, onNext }: QuoteStep1Props) {
  const [weeks, setWeeks] = useState(data.weeks || 12)

  const handleNext = () => {
    onUpdate({ weeks })
    onNext()
  }

  const formatDuration = (weeks: number) => {
    if (weeks < 4) return `${weeks}週間`
    const months = Math.round(weeks / 4)
    return `${weeks}週間 (約${months}ヶ月)`
  }

  const getEstimateRange = (weeks: number) => {
    const basePrice = 50000 // 基本価格（仮）
    const min = Math.floor((basePrice * weeks * 0.8) / 10000) * 10000
    const max = Math.floor((basePrice * weeks * 1.3) / 10000) * 10000
    return `¥${min.toLocaleString()} - ¥${max.toLocaleString()}`
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">留学期間を選んでください</h2>
        <p className="text-gray-600">
          希望する留学期間を設定してください。長期になるほど、週あたりの費用が安くなります。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-blue-600">
            {formatDuration(weeks)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Slider
              value={[weeks]}
              onValueChange={(value) => setWeeks(value[0])}
              min={2}
              max={52}
              step={1}
              className="w-full"
            />

            <div className="flex justify-between text-sm text-gray-500">
              <span>2週間</span>
              <span>1年 (52週間)</span>
            </div>

            {/* 人気の期間 */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { weeks: 4, label: '1ヶ月' },
                { weeks: 12, label: '3ヶ月' },
                { weeks: 24, label: '半年' },
                { weeks: 48, label: '1年' }
              ].map((option) => (
                <Button
                  key={option.weeks}
                  variant={weeks === option.weeks ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setWeeks(option.weeks)}
                  className="text-xs"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 概算費用プレビュー */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm text-blue-700 mb-2">概算費用（目安）</p>
            <p className="text-2xl font-bold text-blue-900">
              {getEstimateRange(weeks)}
            </p>
            <p className="text-xs text-blue-600 mt-2">
              ※ 学費・宿泊費・諸費用込み。為替レートにより変動します。
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" disabled>
          戻る
        </Button>
        <Button onClick={handleNext}>
          次へ：開始時期を選ぶ
        </Button>
      </div>
    </div>
  )
}