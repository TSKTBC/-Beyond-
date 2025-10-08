'use client'

import { Calculator, Home, Shield, FileText, Users, BookOpen, Check } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

export default function EstimatorPage() {
  const [formData, setFormData] = useState({
    country: '',
    duration: '3',
    accommodationType: '',
    insuranceType: 'none',
    visaSupport: false,
    afterCareSupport: false,
    englishLearning: 'free',
  })

  const [estimatedCost, setEstimatedCost] = useState<number | null>(null)

  // 料金計算ロジック
  const calculateEstimate = () => {
    let total = 0
    const duration = parseInt(formData.duration)

    // 基本料金（国別）
    const countryBaseCost: { [key: string]: number } = {
      'usa': 300000,
      'uk': 280000,
      'canada': 250000,
      'australia': 260000,
      'newzealand': 230000,
      'philippines': 150000,
    }
    total += (countryBaseCost[formData.country] || 0) * duration

    // 宿泊タイプ
    const accommodationCost: { [key: string]: number } = {
      'homestay': 80000,
      'dormitory': 70000,
      'sharehouse': 60000,
    }
    total += (accommodationCost[formData.accommodationType] || 0) * duration

    // 保険
    const insuranceCost: { [key: string]: number } = {
      'none': 0,
      'standard': 5000 * duration,
      'advanced': 8000 * duration,
      'premium': 12000 * duration,
    }
    total += insuranceCost[formData.insuranceType]

    // ビザ代行
    if (formData.visaSupport) total += 50000

    // アフターフォロー
    if (formData.afterCareSupport) total += 30000 * duration

    // 英語学習（有償の場合）
    if (formData.englishLearning === 'paid') total += 15000 * duration

    setEstimatedCost(total)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 via-white to-teal-50/30">
      {/* ヒーローセクション */}
      <section className="py-16 bg-gradient-to-r from-emerald-500 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Calculator className="w-16 h-16 text-white mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            30秒で無料見積もり
          </h1>
          <p className="text-xl text-emerald-100">
            あなたの留学プランに必要な費用を今すぐ確認
          </p>
        </div>
      </section>

      {/* 見積もりフォーム */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">留学プランを選択してください</CardTitle>
              <CardDescription>必要な項目を選択すると、自動的に見積もりが計算されます</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* 留学先の国 */}
              <div className="space-y-2">
                <Label htmlFor="country" className="text-lg font-semibold flex items-center gap-2">
                  <span className="text-2xl">🌍</span>
                  留学先の国
                </Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="国を選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usa">🇺🇸 アメリカ</SelectItem>
                    <SelectItem value="uk">🇬🇧 イギリス</SelectItem>
                    <SelectItem value="canada">🇨🇦 カナダ</SelectItem>
                    <SelectItem value="australia">🇦🇺 オーストラリア</SelectItem>
                    <SelectItem value="newzealand">🇳🇿 ニュージーランド</SelectItem>
                    <SelectItem value="philippines">🇵🇭 フィリピン</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 期間（1〜12ヶ月） */}
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-lg font-semibold flex items-center gap-2">
                  <span className="text-2xl">📅</span>
                  留学期間
                </Label>
                <div className="flex gap-4">
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    max="12"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="h-12 text-lg"
                  />
                  <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                    <SelectTrigger className="h-12 flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(12)].map((_, i) => (
                        <SelectItem key={i + 1} value={String(i + 1)}>
                          {i + 1}ヶ月
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-gray-500">1〜12ヶ月の範囲で入力または選択してください</p>
              </div>

              {/* 宿泊タイプ */}
              <div className="space-y-2">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <Home className="w-6 h-6 text-emerald-600" />
                  宿泊タイプ
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: 'homestay', label: 'ホームステイ', desc: '現地家庭で生活', price: '¥80,000/月' },
                    { value: 'dormitory', label: '学校寮', desc: '学校提供の寮', price: '¥70,000/月' },
                    { value: 'sharehouse', label: 'シェアハウス', desc: '複数人でシェア', price: '¥60,000/月' },
                  ].map((option) => (
                    <Card
                      key={option.value}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        formData.accommodationType === option.value
                          ? 'ring-2 ring-emerald-500 bg-emerald-50'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleInputChange('accommodationType', option.value)}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl mb-2">🏠</div>
                        <h3 className="font-bold text-lg mb-1">{option.label}</h3>
                        <p className="text-sm text-gray-600 mb-2">{option.desc}</p>
                        <p className="text-emerald-600 font-semibold">{option.price}</p>
                        {formData.accommodationType === option.value && (
                          <Check className="w-6 h-6 text-emerald-600 mx-auto mt-2" />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* 保険種類 */}
              <div className="space-y-2">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <Shield className="w-6 h-6 text-emerald-600" />
                  保険種類
                </Label>
                <Select value={formData.insuranceType} onValueChange={(value) => handleInputChange('insuranceType', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">選択しない（¥0）</SelectItem>
                    <SelectItem value="standard">スタンダード（¥5,000/月）</SelectItem>
                    <SelectItem value="advanced">アドバンス（¥8,000/月）</SelectItem>
                    <SelectItem value="premium">プレミアム（¥12,000/月）</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ビザ代行 */}
              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-emerald-600" />
                  <div>
                    <Label htmlFor="visaSupport" className="text-lg font-semibold cursor-pointer">
                      ビザ代行サポート
                    </Label>
                    <p className="text-sm text-gray-600">専門スタッフがビザ申請を代行（¥50,000）</p>
                  </div>
                </div>
                <Switch
                  id="visaSupport"
                  checked={formData.visaSupport}
                  onCheckedChange={(checked) => handleInputChange('visaSupport', checked)}
                />
              </div>

              {/* アフターフォロー */}
              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-emerald-600" />
                  <div>
                    <Label htmlFor="afterCareSupport" className="text-lg font-semibold cursor-pointer">
                      アフターフォローサポート
                    </Label>
                    <p className="text-sm text-gray-600">24時間日本語サポート（¥30,000/月）</p>
                  </div>
                </div>
                <Switch
                  id="afterCareSupport"
                  checked={formData.afterCareSupport}
                  onCheckedChange={(checked) => handleInputChange('afterCareSupport', checked)}
                />
              </div>

              {/* 英語学習 */}
              <div className="space-y-2">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-emerald-600" />
                  英語学習サポート
                </Label>
                <Select value={formData.englishLearning} onValueChange={(value) => handleInputChange('englishLearning', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">無料プラン（基本教材のみ）</SelectItem>
                    <SelectItem value="paid">有償プラン（¥15,000/月 - 1対1レッスン付き）</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 見積もりボタン */}
              <Button
                onClick={calculateEstimate}
                className="w-full h-14 text-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                disabled={!formData.country || !formData.accommodationType}
              >
                <Calculator className="w-5 h-5 mr-2" />
                見積もりを計算する
              </Button>

              {/* 見積もり結果 */}
              {estimatedCost !== null && (
                <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                  <CardContent className="p-8 text-center">
                    <p className="text-lg mb-2">概算費用</p>
                    <p className="text-5xl font-extrabold mb-4">
                      ¥{estimatedCost.toLocaleString()}
                    </p>
                    <p className="text-emerald-100 mb-6">
                      {formData.duration}ヶ月間の合計金額（税込）
                    </p>
                    <Button
                      variant="secondary"
                      className="bg-white text-emerald-600 hover:bg-emerald-50"
                      onClick={() => window.location.href = '/consultation'}
                    >
                      この内容で無料相談を申し込む
                    </Button>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
