'use client'

import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { QuoteFormData, School } from '@/types/quote'

interface QuoteStep3Props {
  school: School
  data: Partial<QuoteFormData>
  onUpdate: (data: Partial<QuoteFormData>) => void
  onNext: () => void
  onBack: () => void
}

export function QuoteStep3({ school, data, onUpdate, onNext, onBack }: QuoteStep3Props) {
  const [accommodationType, setAccommodationType] = useState(data.accommodationType || 'homestay')
  const [options, setOptions] = useState(data.options || {})

  const handleNext = () => {
    onUpdate({ accommodationType, options })
    onNext()
  }

  const toggleOption = (optionKey: string) => {
    setOptions(prev => ({
      ...prev,
      [optionKey]: !prev[optionKey as keyof typeof prev]
    }))
  }

  const accommodationOptions = [
    {
      value: 'homestay',
      label: 'ホームステイ',
      description: '現地家庭で生活。語学力向上に最適',
      price: school.pricing.accommodation.homestay.price,
      popular: true,
      benefits: ['現地文化を体験', '24時間英語環境', '食事付き']
    },
    {
      value: 'dormitory',
      label: '学生寮',
      description: '他国の学生と交流。友達作りやすい',
      price: school.pricing.accommodation.dormitory.price,
      popular: false,
      benefits: ['国際的な友達', '学校まで近い', 'イベント豊富']
    },
    {
      value: 'apartment',
      label: 'アパートメント',
      description: 'プライベート重視。自炊可能',
      price: school.pricing.accommodation.apartment.price,
      popular: false,
      benefits: ['プライバシー確保', '自炊可能', '自由度が高い']
    },
    {
      value: 'none',
      label: '自分で手配',
      description: '宿泊先は自己手配',
      price: 0,
      popular: false,
      benefits: ['完全自由', 'コスト調整可能', '場所を自由選択']
    }
  ]

  const additionalOptions = [
    {
      key: 'airportPickup',
      label: '空港送迎',
      price: 15000,
      description: '到着時の空港から宿泊先までの送迎サービス'
    },
    {
      key: 'insurance',
      label: '海外保険',
      price: 5000,
      description: '留学期間中の医療・傷害保険（週あたり）',
      unit: '週'
    },
    {
      key: 'examPrep',
      label: '試験対策コース',
      price: 20000,
      description: 'TOEIC/IELTS等の試験対策専門クラス（追加）'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">宿泊とオプションを選んでください</h2>
        <p className="text-gray-600">
          宿泊タイプと追加オプションを選択してください。後から変更も可能です。
        </p>
      </div>

      {/* 宿泊タイプ選択 */}
      <div>
        <h3 className="text-lg font-semibold mb-4">宿泊タイプ</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accommodationOptions.map((option) => (
            <Card
              key={option.value}
              className={`cursor-pointer transition-all hover:shadow-md ${
                accommodationType === option.value
                  ? 'ring-2 ring-blue-500 bg-blue-50'
                  : ''
              }`}
              onClick={() => setAccommodationType(option.value as any)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{option.label}</CardTitle>
                  {option.popular && <Badge className="bg-orange-100 text-orange-800">人気</Badge>}
                </div>
                <p className="text-sm text-gray-600">{option.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-right">
                    <span className="text-xl font-bold text-blue-600">
                      {option.price === 0 ? '¥0' : `¥${option.price.toLocaleString()}`}
                    </span>
                    {option.price > 0 && <span className="text-sm text-gray-500">/週</span>}
                  </div>
                  <ul className="space-y-1">
                    {option.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-xs text-gray-600">
                        <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 追加オプション */}
      <div>
        <h3 className="text-lg font-semibold mb-4">追加オプション（任意）</h3>
        <div className="space-y-3">
          {additionalOptions.map((option) => (
            <Card
              key={option.key}
              className={`cursor-pointer transition-all ${
                options[option.key as keyof typeof options]
                  ? 'bg-blue-50 border-blue-200'
                  : ''
              }`}
              onClick={() => toggleOption(option.key)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                        options[option.key as keyof typeof options]
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {options[option.key as keyof typeof options] && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{option.label}</h4>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-blue-600">
                      ¥{option.price.toLocaleString()}
                    </span>
                    {option.unit && <span className="text-sm text-gray-500">/{option.unit}</span>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 選択サマリー */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <h4 className="font-medium mb-3">選択内容サマリー</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>宿泊タイプ:</span>
              <span className="font-medium">
                {accommodationOptions.find(opt => opt.value === accommodationType)?.label}
              </span>
            </div>
            <div className="flex justify-between">
              <span>追加オプション:</span>
              <span className="font-medium">
                {Object.keys(options).filter(key => options[key as keyof typeof options]).length || 0}件
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          戻る
        </Button>
        <Button onClick={handleNext}>
          次へ：連絡先を入力
        </Button>
      </div>
    </div>
  )
}