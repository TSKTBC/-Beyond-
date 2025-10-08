'use client'

import { Search, Filter, MapPin, Star, Clock, Users, DollarSign } from 'lucide-react'
import { useState, useEffect } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface School {
  id: string
  name: string
  country: string
  city: string
  type: string
  programs: string[]
  yearlyFee: number
  rating: number
  studentsCount: number
  foundedYear: number
  image: string
  description: string
  features: string[]
}

const mockSchools: School[] = [
  {
    id: '1',
    name: 'ILAC International College',
    country: 'カナダ',
    city: 'トロント',
    type: '語学学校',
    programs: ['一般英語', 'ビジネス英語', 'IELTS対策'],
    yearlyFee: 12000,
    rating: 4.5,
    studentsCount: 1200,
    foundedYear: 1997,
    image: '/images/schools/ilac.jpg',
    description: 'カナダ最大規模の語学学校。質の高い授業と充実したサポート体制が魅力。',
    features: ['24時間サポート', '日本人スタッフ常駐', 'キャリアサポート']
  },
  {
    id: '2',
    name: 'Langports Gold Coast',
    country: 'オーストラリア',
    city: 'ゴールドコースト',
    type: '語学学校',
    programs: ['一般英語', 'ケンブリッジ英検', 'ワーホリサポート'],
    yearlyFee: 15000,
    rating: 4.7,
    studentsCount: 800,
    foundedYear: 2004,
    image: '/images/schools/langports.jpg',
    description: '革新的な教育手法で知られる語学学校。個別カリキュラムで効率的に学習。',
    features: ['個別学習プラン', 'アクティビティ充実', 'ビーチアクセス']
  },
  {
    id: '3',
    name: 'Kings Education',
    country: 'アメリカ',
    city: 'ニューヨーク',
    type: '語学学校',
    programs: ['一般英語', '大学進学準備', 'ビジネス英語'],
    yearlyFee: 20000,
    rating: 4.3,
    studentsCount: 600,
    foundedYear: 1957,
    image: '/images/schools/kings.jpg',
    description: '60年以上の歴史を持つ老舗語学学校。大学進学実績が豊富。',
    features: ['大学進学サポート', '少人数制クラス', 'マンハッタン立地']
  },
  {
    id: '4',
    name: 'University of Toronto',
    country: 'カナダ',
    city: 'トロント',
    type: '大学',
    programs: ['学士課程', '修士課程', '博士課程'],
    yearlyFee: 45000,
    rating: 4.8,
    studentsCount: 97000,
    foundedYear: 1827,
    image: '/images/schools/uoft.jpg',
    description: 'カナダ最高峰の総合大学。世界ランキング上位の研究大学。',
    features: ['世界トップレベル', '豊富な研究機会', '充実した設備']
  },
  {
    id: '5',
    name: 'British Council',
    country: 'イギリス',
    city: 'ロンドン',
    type: '語学学校',
    programs: ['一般英語', 'IELTS対策', 'ビジネス英語'],
    yearlyFee: 18000,
    rating: 4.6,
    studentsCount: 500,
    foundedYear: 1934,
    image: '/images/schools/british-council.jpg',
    description: '英国政府が設立した語学教育機関。IELTS対策に定評。',
    features: ['政府認定機関', 'IELTS対策専門', '本格的なイギリス英語']
  },
  {
    id: '6',
    name: 'University of Sydney',
    country: 'オーストラリア',
    city: 'シドニー',
    type: '大学',
    programs: ['学士課程', '修士課程', 'ファウンデーション'],
    yearlyFee: 42000,
    rating: 4.7,
    studentsCount: 73000,
    foundedYear: 1850,
    image: '/images/schools/usyd.jpg',
    description: 'オーストラリア最古の大学。優秀な研究実績と国際的評価。',
    features: ['歴史ある名門大学', '美しいキャンパス', '充実した留学生サポート']
  }
]

export default function SchoolsPage() {
  const [schools] = useState<School[]>(mockSchools)
  const [filteredSchools, setFilteredSchools] = useState<School[]>(mockSchools)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedType, setSelectedType] = useState<string>('')
  const [maxFee, setMaxFee] = useState<number>(50000)
  const [showFilters, setShowFilters] = useState(false)

  const countries = [...new Set(schools.map(school => school.country))]
  const types = [...new Set(schools.map(school => school.type))]

  useEffect(() => {
    let filtered = schools

    if (searchTerm) {
      filtered = filtered.filter(school =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.country.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCountry) {
      filtered = filtered.filter(school => school.country === selectedCountry)
    }

    if (selectedType) {
      filtered = filtered.filter(school => school.type === selectedType)
    }

    filtered = filtered.filter(school => school.yearlyFee <= maxFee)

    setFilteredSchools(filtered)
  }, [searchTerm, selectedCountry, selectedType, maxFee, schools])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCountry('')
    setSelectedType('')
    setMaxFee(50000)
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">学校検索</h1>
          <p className="text-gray-600">
            世界200校以上の提携校から、あなたにぴったりの学校を見つけましょう。
          </p>
        </div>

        {/* 検索バー */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="学校名、都市名で検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:w-auto"
              >
                <Filter className="h-4 w-4 mr-2" />
                フィルター
              </Button>
            </div>

            {/* フィルター */}
            {showFilters && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <Label htmlFor="country">国・地域</Label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="すべての国" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">すべての国</SelectItem>
                      {countries.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="type">学校種別</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="すべての種別" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">すべての種別</SelectItem>
                      {types.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="fee">年間費用上限</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={maxFee}
                      onChange={(e) => setMaxFee(Number(e.target.value))}
                      min="0"
                      max="100000"
                      step="1000"
                    />
                    <span className="text-sm text-gray-500">USD</span>
                  </div>
                </div>

                <div className="md:col-span-3 flex justify-end">
                  <Button variant="outline" onClick={clearFilters}>
                    フィルターをクリア
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 検索結果 */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            {filteredSchools.length}件の学校が見つかりました
          </p>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">関連度順</SelectItem>
              <SelectItem value="fee-low">費用の安い順</SelectItem>
              <SelectItem value="fee-high">費用の高い順</SelectItem>
              <SelectItem value="rating">評価の高い順</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 学校一覧 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSchools.map((school) => (
            <Card key={school.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold">{school.name}</h3>
                      <Badge variant="secondary">{school.type}</Badge>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{school.city}, {school.country}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        <span>{school.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{school.studentsCount.toLocaleString()}名</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>設立{school.foundedYear}年</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-lg font-bold text-blue-600">
                      <DollarSign className="h-4 w-4" />
                      {school.yearlyFee.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">年間</div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{school.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">提供プログラム</h4>
                  <div className="flex flex-wrap gap-1">
                    {school.programs.map((program, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {program}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">特徴</h4>
                  <div className="flex flex-wrap gap-1">
                    {school.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">詳細を見る</Button>
                  <Button variant="outline">見積作成</Button>
                  <Button variant="outline" size="sm">♥</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSchools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              条件に合う学校が見つかりませんでした
            </h3>
            <p className="text-gray-500 mb-4">
              検索条件を変更して再度お試しください
            </p>
            <Button onClick={clearFilters}>検索条件をリセット</Button>
          </div>
        )}
      </div>
    </main>
  )
}