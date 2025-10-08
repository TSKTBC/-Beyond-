'use client'

import { MapPin, Star, Users, Award, Search } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface School {
  id: string
  name: string
  country: string
  city: string
  type: 'university' | 'language' | 'college' | 'high_school'
  rating: number
  students: number
  established: number
  description: string
  programs: string[]
  features: string[]
  imageUrl: string
}

const schools: School[] = [
  {
    id: '1',
    name: 'University of California Los Angeles (UCLA)',
    country: 'アメリカ',
    city: 'ロサンゼルス',
    type: 'university',
    rating: 4.9,
    students: 45000,
    established: 1919,
    description: '世界トップレベルの研究大学。幅広い学部・大学院プログラムを提供。',
    programs: ['工学', 'ビジネス', '医学', '芸術'],
    features: ['トップランキング', '研究重視', '多様性', 'キャンパス生活'],
    imageUrl: 'https://images.unsplash.com/photo-1623928047267-ba2bb1b03b96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    name: 'Kings Education',
    country: 'アメリカ',
    city: 'ニューヨーク',
    type: 'language',
    rating: 4.7,
    students: 2500,
    established: 1990,
    description: '30年以上の実績を持つ語学教育のパイオニア。大学進学準備に定評。',
    programs: ['一般英語', 'IELTS対策', 'TOEFL対策', '大学進学準備'],
    features: ['小クラス制', '個別サポート', '進学実績', '現代的施設'],
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    name: 'University of Toronto',
    country: 'カナダ',
    city: 'トロント',
    type: 'university',
    rating: 4.8,
    students: 97000,
    established: 1827,
    description: 'カナダ最高峰の総合大学。研究・教育ともに世界的評価。',
    programs: ['医学', '工学', 'コンピューターサイエンス', '文学'],
    features: ['世界ランキング上位', '研究Excellence', '多文化環境', '充実した設備'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    name: 'University of Oxford',
    country: 'イギリス',
    city: 'オックスフォード',
    type: 'university',
    rating: 5.0,
    students: 24000,
    established: 1096,
    description: '世界最古の英語圏大学。卓越した学術環境と伝統。',
    programs: ['哲学', '政治学', '経済学', '法学'],
    features: ['歴史と伝統', 'Tutorial制', '世界的名声', '卒業生ネットワーク'],
    imageUrl: 'https://images.unsplash.com/photo-1520637836862-4d197d17c6a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
]

const typeLabels = {
  university: '大学',
  language: '語学学校',
  college: 'カレッジ',
  high_school: '高校'
}

const typeColors = {
  university: 'bg-blue-100 text-blue-800',
  language: 'bg-green-100 text-green-800',
  college: 'bg-purple-100 text-purple-800',
  high_school: 'bg-orange-100 text-orange-800'
}

export default function PartnersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')

  const filteredSchools = schools.filter(school => {
    const nameMatch = school.name.toLowerCase().includes(searchTerm.toLowerCase())
    const countryMatch = selectedCountry === 'all' || school.country === selectedCountry
    const typeMatch = selectedType === 'all' || school.type === selectedType
    return nameMatch && countryMatch && typeMatch
  })
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-300/20 to-emerald-300/20 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-300/20 to-green-300/20 rounded-full blur-3xl translate-y-32 -translate-x-32"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
            <span className="text-3xl text-white animate-bounce">🏫</span>
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            提携校のご紹介
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            ✨ 世界15カ国、200校以上の厳選された教育機関と提携し、<br />
            あなたの留学目標に最適な学習環境をご提供します。
          </p>
        </div>

        {/* 検索・フィルター */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-5 w-5" />
            <h2 className="text-lg font-semibold">学校を探す</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                学校名で検索
              </label>
              <Input
                type="text"
                placeholder="学校名を入力..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                国・地域
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">すべて</option>
                <option value="アメリカ">アメリカ</option>
                <option value="カナダ">カナダ</option>
                <option value="イギリス">イギリス</option>
                <option value="オーストラリア">オーストラリア</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                学校種別
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">すべて</option>
                <option value="university">大学</option>
                <option value="language">語学学校</option>
                <option value="college">カレッジ</option>
                <option value="high_school">高校</option>
              </select>
            </div>
          </div>
        </div>

        {/* 学校一覧 */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 px-4 sm:px-0">おすすめ提携校</h2>
          {filteredSchools.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">該当する学校が見つかりません。</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSchools.map((school) => (
                <Card key={school.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-lg">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={school.imageUrl}
                      alt={`${school.name}のキャンパス`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Award className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>

                    <div className="absolute top-4 left-4">
                      <Badge className={`${typeColors[school.type]} backdrop-blur-sm border border-white/20`}>
                        {typeLabels[school.type]}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{school.rating}</span>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">
                      {school.name}
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{school.city}, {school.country}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {school.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{school.students.toLocaleString()}名</span>
                      </div>
                      <div>
                        <span>設立: {school.established}年</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">主要プログラム:</div>
                      <div className="flex flex-wrap gap-1">
                        {school.programs.slice(0, 3).map((program, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {program}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">特徴:</div>
                      <div className="flex flex-wrap gap-1">
                        {school.features.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full">
                      詳細を見る
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* 統計情報 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">提携校ネットワーク</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
                <div className="text-sm text-gray-600">提携校数</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">15</div>
                <div className="text-sm text-gray-600">対象国・地域</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
                <div className="text-sm text-gray-600">学生満足度</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">10,000+</div>
                <div className="text-sm text-gray-600">年間留学生数</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* お問い合わせ */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">提携校についてのご相談</h2>
          <p className="text-xl mb-6">
            あなたの目標に最適な提携校をご提案いたします。
            専門カウンセラーが詳細な情報をお伝えします。
          </p>
          <Button size="lg" variant="secondary">
            無料相談を予約する
          </Button>
        </div>
      </div>
    </div>
  )
}