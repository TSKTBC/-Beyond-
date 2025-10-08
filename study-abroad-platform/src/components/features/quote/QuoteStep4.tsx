'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { QuoteFormData } from '@/types/quote'

interface QuoteStep4Props {
  data: Partial<QuoteFormData>
  onUpdate: (data: Partial<QuoteFormData>) => void
  onNext: () => void
  onSkip: () => void
  onBack: () => void
  isCalculating: boolean
}

export function QuoteStep4({ data, onUpdate, onNext, onSkip, onBack, isCalculating }: QuoteStep4Props) {
  const [email, setEmail] = useState(data.email || '')
  const [name, setName] = useState(data.name || '')
  const [phone, setPhone] = useState(data.phone || '')

  const handleSubmit = () => {
    onUpdate({ email, name, phone })
    onNext()
  }

  const handleSkip = () => {
    onUpdate({ email: '', name: '', phone: '' })
    onSkip()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">連絡先情報（任意）</h2>
        <p className="text-gray-600">
          メールアドレスを入力すると、見積結果を保存・共有できます。また、詳細な留学相談も可能になります。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">連絡先情報を入力</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              見積結果の保存や今後の相談でご連絡いたします
            </p>
          </div>

          <div>
            <Label htmlFor="name">お名前（任意）</Label>
            <Input
              id="name"
              placeholder="山田 太郎"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="phone">電話番号（任意）</Label>
            <Input
              id="phone"
              placeholder="090-1234-5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              緊急時の連絡や電話相談でのみ使用します
            </p>
          </div>
        </CardContent>
      </Card>

      {/* メール登録のメリット */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-medium text-blue-900 mb-2">メール登録のメリット</h4>
          <ul className="space-y-1 text-sm text-blue-800">
            <li className="flex items-center">
              <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
              見積結果をPDFでダウンロード・保存
            </li>
            <li className="flex items-center">
              <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
              見積を家族や友人と簡単に共有
            </li>
            <li className="flex items-center">
              <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
              専任カウンセラーによる無料相談
            </li>
            <li className="flex items-center">
              <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
              最新の留学情報・キャンペーン情報
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* プライバシー情報 */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <h4 className="font-medium text-gray-700 mb-2">プライバシーについて</h4>
          <p className="text-sm text-gray-600">
            ご入力いただいた情報は、見積の保存・提供と留学相談のみに使用し、
            第三者への提供や営業目的での利用は一切行いません。
            詳しくは<a href="/privacy" className="text-blue-600 underline">プライバシーポリシー</a>をご確認ください。
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" onClick={onBack} disabled={isCalculating}>
          戻る
        </Button>

        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <Button
            variant="outline"
            onClick={handleSkip}
            disabled={isCalculating}
            className="flex-1"
          >
            {isCalculating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                計算中...
              </>
            ) : (
              'スキップして結果を見る'
            )}
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={isCalculating || !email}
            className="flex-1"
          >
            {isCalculating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                計算中...
              </>
            ) : (
              '保存して結果を見る'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}