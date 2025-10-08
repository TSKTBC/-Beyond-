'use client'

import { Book, Calendar, Clock, Star, Users, Play, CheckCircle, Target } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface Course {
  id: string
  title: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  lessons: number
  rating: number
  students: number
  price: number
  category: 'ielts' | 'toefl' | 'general' | 'business' | 'conversation'
  features: string[]
}

const courses: Course[] = [
  {
    id: '1',
    title: 'IELTS対策コース - 基礎から実践まで',
    description: 'IELTS初心者から中級者を対象とした包括的な対策コース。4技能すべてを効率的に学習できます。',
    level: 'intermediate',
    duration: '12週間',
    lessons: 48,
    rating: 4.8,
    students: 324,
    price: 29800,
    category: 'ielts',
    features: ['模擬試験5回', '個別フィードバック', 'スピーキング練習', 'ライティング添削']
  },
  {
    id: '2',
    title: '日常英会話マスターコース',
    description: '海外生活で必要な日常英会話を実践的に学べるコース。ロールプレイが豊富で楽しく学習できます。',
    level: 'beginner',
    duration: '8週間',
    lessons: 32,
    rating: 4.6,
    students: 512,
    price: 19800,
    category: 'conversation',
    features: ['ロールプレイ演習', 'ネイティブ講師', '24時間質問サポート', '発音矯正']
  },
  {
    id: '3',
    title: 'TOEFL iBT 高得点突破講座',
    description: 'TOEFL iBTで100点以上を目指すための上級コース。実践問題と戦略的アプローチを学習します。',
    level: 'advanced',
    duration: '16週間',
    lessons: 64,
    rating: 4.9,
    students: 156,
    price: 45800,
    category: 'toefl',
    features: ['実践問題演習', '戦略的学習法', '個別カウンセリング', 'スコア保証制度']
  }
]

const levelLabels = {
  beginner: '初級',
  intermediate: '中級',
  advanced: '上級'
}

const levelColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800'
}

const categoryLabels = {
  ielts: 'IELTS',
  toefl: 'TOEFL',
  general: '総合英語',
  business: 'ビジネス英語',
  conversation: '英会話'
}

export default function LearningPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredCourses = courses.filter(course => {
    const levelMatch = selectedLevel === 'all' || course.level === selectedLevel
    const categoryMatch = selectedCategory === 'all' || course.category === selectedCategory
    return levelMatch && categoryMatch
  })
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-rose-300/20 to-pink-300/20 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-red-300/20 to-rose-300/20 rounded-full blur-3xl translate-y-32 -translate-x-32"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-500 rounded-3xl mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
            <span className="text-3xl text-white animate-bounce">📚</span>
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
            オンライン英語学習
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            ✨ 留学準備に必要な英語力を効率的に身につけられるオンラインコースです。<br />
            経験豊富な講師陣による質の高いレッスンをご提供します。
          </p>
        </div>

        {/* フィルター */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                レベル
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">すべて</option>
                <option value="beginner">初級</option>
                <option value="intermediate">中級</option>
                <option value="advanced">上級</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                カテゴリ
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">すべて</option>
                <option value="ielts">IELTS</option>
                <option value="toefl">TOEFL</option>
                <option value="general">総合英語</option>
                <option value="business">ビジネス英語</option>
                <option value="conversation">英会話</option>
              </select>
            </div>
          </div>
        </div>

        {/* おすすめコース */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">おすすめコース</h2>
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">該当するコースが見つかりません。</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 relative flex items-center justify-center">
                    <Play className="h-12 w-12 text-blue-600" />
                    <div className="absolute top-4 left-4">
                      <Badge className={levelColors[course.level]}>
                        {levelLabels[course.level]}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary">
                        {categoryLabels[course.category]}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">
                      {course.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {course.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Book className="h-4 w-4" />
                        <span>{course.lessons}レッスン</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{course.students}人が受講中</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">コース特徴：</div>
                      <div className="flex flex-wrap gap-1">
                        {course.features.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="text-2xl font-bold text-blue-600">
                        ¥{course.price.toLocaleString()}
                      </div>
                      <Button asChild>
                        <Link href={`/learning/${course.id}`}>
                          詳細を見る
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* 学習の特徴 */}
        <Card className="mt-16 mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">学習の特徴</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">自分のペースで学習</h3>
                <p className="text-gray-600">
                  24時間いつでもアクセス可能。忙しい社会人や学生でも無理なく続けられます。
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">経験豊富な講師陣</h3>
                <p className="text-gray-600">
                  留学指導経験豊富なネイティブ講師と日本人講師による丁寧な指導です。
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">実践的なカリキュラム</h3>
                <p className="text-gray-600">
                  留学先で実際に使える英語力を身につけられる実践重視の内容です。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 学習者の声 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">学習者の声</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">
                    田中
                  </div>
                  <div>
                    <div className="font-medium">田中さん（大学生）</div>
                    <div className="text-sm text-gray-600">IELTS対策コース受講</div>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-700">
                  「3ヶ月でIELTSスコアが5.5から7.0まで上がりました！
                  特にライティングとスピーキングの実践的な指導が役立ちました。」
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-green-600 font-bold mr-3">
                    佐藤
                  </div>
                  <div>
                    <div className="font-medium">佐藤さん（会社員）</div>
                    <div className="text-sm text-gray-600">ビジネス英語コース受講</div>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                  <Star className="h-4 w-4 text-gray-300" />
                </div>
                <p className="text-sm text-gray-700">
                  「仕事が忙しい中でも、自分のペースで学習できました。
                  プレゼンテーションスキルが向上し、海外出張でも自信を持って話せるようになりました。」
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 無料体験の案内 */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">まずは無料体験から</h2>
          <p className="text-xl mb-6">
            すべてのコースで無料体験レッスンをご用意しています。
            まずはお試しください。
          </p>
          <Button size="lg" variant="secondary">
            無料体験に申し込む
          </Button>
        </div>
      </div>
    </div>
  )
}