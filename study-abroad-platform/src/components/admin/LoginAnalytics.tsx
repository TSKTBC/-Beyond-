'use client'

import { TrendingUp, Users, MousePointer, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface LoginMetrics {
  totalPrompts: number
  conversions: number
  conversionRate: number
  avgTimeToShow: number
  bestTrigger: string
  pagePerformance: Array<{
    page: string
    prompts: number
    conversions: number
    rate: number
  }>
  triggerPerformance: Array<{
    trigger: string
    prompts: number
    conversions: number
    rate: number
  }>
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']

export function LoginAnalytics() {
  const [metrics, setMetrics] = useState<LoginMetrics | null>(null)

  useEffect(() => {
    // 実際の実装では、APIからデータを取得
    // ここではモックデータを使用
    const mockMetrics: LoginMetrics = {
      totalPrompts: 1247,
      conversions: 386,
      conversionRate: 30.95,
      avgTimeToShow: 28.5,
      bestTrigger: 'value-based',
      pagePerformance: [
        { page: '/quote', prompts: 423, conversions: 156, rate: 36.88 },
        { page: '/consultation', prompts: 332, conversions: 98, rate: 29.52 },
        { page: '/dashboard', prompts: 234, conversions: 78, rate: 33.33 },
        { page: '/', prompts: 258, conversions: 54, rate: 20.93 }
      ],
      triggerPerformance: [
        { trigger: 'value-based', prompts: 567, conversions: 198, rate: 34.92 },
        { trigger: 'action-based', prompts: 387, conversions: 115, rate: 29.71 },
        { trigger: 'time-based', prompts: 293, conversions: 73, rate: 24.91 }
      ]
    }

    setMetrics(mockMetrics)
  }, [])

  if (!metrics) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 概要メトリクス */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">総プロンプト数</p>
                <p className="text-2xl font-bold text-blue-900">{metrics.totalPrompts.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">コンバージョン数</p>
                <p className="text-2xl font-bold text-green-900">{metrics.conversions.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">コンバージョン率</p>
                <p className="text-2xl font-bold text-orange-900">{metrics.conversionRate.toFixed(1)}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <MousePointer className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">平均表示時間</p>
                <p className="text-2xl font-bold text-purple-900">{metrics.avgTimeToShow}秒</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ページ別パフォーマンス */}
        <Card>
          <CardHeader>
            <CardTitle>ページ別コンバージョン率</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={metrics.pagePerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="page"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    name === 'rate' ? `${Number(value).toFixed(1)}%` : value,
                    name === 'rate' ? 'コンバージョン率' :
                    name === 'conversions' ? 'コンバージョン数' : 'プロンプト数'
                  ]}
                />
                <Bar dataKey="rate" fill="#3b82f6" name="rate" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* トリガー別パフォーマンス */}
        <Card>
          <CardHeader>
            <CardTitle>トリガー別パフォーマンス</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={metrics.triggerPerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ trigger, rate }) => `${trigger}: ${rate.toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="conversions"
                >
                  {metrics.triggerPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'コンバージョン数']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 詳細テーブル */}
      <Card>
        <CardHeader>
          <CardTitle>詳細パフォーマンス</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">ページ/トリガー</th>
                  <th className="text-right p-2">プロンプト数</th>
                  <th className="text-right p-2">コンバージョン数</th>
                  <th className="text-right p-2">率</th>
                  <th className="text-right p-2">改善提案</th>
                </tr>
              </thead>
              <tbody>
                {metrics.pagePerformance.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{item.page}</td>
                    <td className="p-2 text-right">{item.prompts}</td>
                    <td className="p-2 text-right">{item.conversions}</td>
                    <td className="p-2 text-right">
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.rate >= 35 ? 'bg-green-100 text-green-800' :
                        item.rate >= 25 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.rate.toFixed(1)}%
                      </span>
                    </td>
                    <td className="p-2 text-right text-xs text-gray-600">
                      {item.rate < 25 ? '価値提案を強化' :
                       item.rate < 35 ? 'タイミングを最適化' :
                       '良好なパフォーマンス'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 統計的インサイト */}
      <Card>
        <CardHeader>
          <CardTitle>統計的インサイト & 推奨事項</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">🎯 最適化のポイント</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• <strong>{metrics.bestTrigger}</strong> トリガーが最も効果的（{metrics.triggerPerformance.find(t => t.trigger === metrics.bestTrigger)?.rate.toFixed(1)}%）</li>
                <li>• 見積もりページのコンバージョン率が最高（{metrics.pagePerformance[0].rate.toFixed(1)}%）</li>
                <li>• 平均表示時間は統計的に最適範囲内（25-30秒）</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">📈 改善提案</h4>
              <ul className="space-y-1 text-sm text-green-800">
                <li>• ホームページでより具体的な価値提案を追加</li>
                <li>• アクションベーストリガーの発動条件を調整（3→2インタラクション）</li>
                <li>• A/Bテスト：プロンプトデザインのバリエーション追加</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}