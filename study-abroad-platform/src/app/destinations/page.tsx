'use client'

import { Globe, TrendingUp } from 'lucide-react'
import { useState } from 'react'

import { CountryCard } from '@/components/destinations/CountryCard'
import { FilterBar } from '@/components/ui/FilterBar'

interface Destination {
  id: string
  name: string
  nameEn: string
  flag: string
  image: string
  description: string
  highlights: string[]
  popularCities: string[]
  costRange: string
  languageRequirement: string
  visaType: string
  region: string
  studyType: string[]
  budgetLevel: string
  studentCount?: number
  trending?: boolean
  featured?: boolean
}

const DESTINATIONS: Destination[] = [
  {
    id: 'canada',
    name: 'カナダ',
    nameEn: 'Canada',
    flag: '🇨🇦',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: '治安が良く、親日的な国民性。英語とフランス語の2言語習得が可能で、ワーキングホリデー制度も充実しています。',
    highlights: ['治安良好', '多文化共生', 'ワーホリ可'],
    popularCities: ['トロント', 'バンクーバー', 'モントリオール', 'カルガリー'],
    costRange: '250-400万円',
    languageRequirement: 'IELTS 6.0+ / TOEFL 80+',
    visaType: '学生ビザ / ワーホリビザ',
    region: 'north-america',
    studyType: ['language', 'university', 'coop'],
    budgetLevel: 'medium',
    studentCount: 800,
    trending: true,
    featured: true
  },
  {
    id: 'australia',
    name: 'オーストラリア',
    nameEn: 'Australia',
    flag: '🇦🇺',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: '温暖な気候と自然豊かな環境で学べます。学生ビザでアルバイトが可能で、実践的な職業教育制度（TAFE）も充実。',
    highlights: ['温暖な気候', 'アルバイト可', '自然豊か'],
    popularCities: ['シドニー', 'メルボルン', 'ブリスベン', 'パース'],
    costRange: '280-450万円',
    languageRequirement: 'IELTS 6.0+ / TOEFL 80+',
    visaType: '学生ビザ / ワーホリビザ',
    region: 'oceania',
    studyType: ['language', 'university', 'vocational'],
    budgetLevel: 'medium',
    studentCount: 650,
    trending: true
  },
  {
    id: 'uk',
    name: 'イギリス',
    nameEn: 'United Kingdom',
    flag: '🇬🇧',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: '伝統ある名門大学群と本場の英語環境。ヨーロッパ各国へのアクセスが良好で、短期間で学位取得が可能です。',
    highlights: ['名門大学', '本場の英語', '欧州近い'],
    popularCities: ['ロンドン', 'オックスフォード', 'ケンブリッジ', 'エディンバラ'],
    costRange: '350-500万円',
    languageRequirement: 'IELTS 6.5+ / TOEFL 90+',
    visaType: 'Tier 4学生ビザ',
    region: 'europe',
    studyType: ['language', 'university', 'postgraduate'],
    budgetLevel: 'high',
    studentCount: 550,
    featured: true
  },
  {
    id: 'usa',
    name: 'アメリカ',
    nameEn: 'United States',
    flag: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: '世界トップレベルの大学と研究機関が集まる国。多様性に富んだ国際的な環境で、豊富な奨学金制度があります。',
    highlights: ['世界最高峰', '奨学金充実', '多様性'],
    popularCities: ['ニューヨーク', 'ロサンゼルス', 'ボストン', 'サンフランシスコ'],
    costRange: '300-600万円',
    languageRequirement: 'TOEFL 80+ / IELTS 6.5+',
    visaType: 'F-1学生ビザ',
    region: 'north-america',
    studyType: ['language', 'university', 'mba'],
    budgetLevel: 'high',
    studentCount: 1200,
    trending: true
  },
  {
    id: 'newzealand',
    name: 'ニュージーランド',
    nameEn: 'New Zealand',
    flag: '🇳🇿',
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: '大自然に囲まれた落ち着いた環境で集中して学べます。治安が良く、フレンドリーな国民性が魅力です。',
    highlights: ['大自然', '治安良好', '少人数制'],
    popularCities: ['オークランド', 'ウェリントン', 'クライストチャーチ', 'クイーンズタウン'],
    costRange: '200-350万円',
    languageRequirement: 'IELTS 5.5+ / TOEFL 70+',
    visaType: '学生ビザ / ワーホリビザ',
    region: 'oceania',
    studyType: ['language', 'university', 'farm'],
    budgetLevel: 'low',
    studentCount: 320
  },
  {
    id: 'ireland',
    name: 'アイルランド',
    nameEn: 'Ireland',
    flag: '🇮🇪',
    image: 'https://images.unsplash.com/photo-1590759668628-05b5322f2a4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'フレンドリーな国民性とヨーロッパの玄関口。英語圏で学費が比較的安く、IT産業が盛んです。',
    highlights: ['学費安い', 'IT産業', '欧州近い'],
    popularCities: ['ダブリン', 'コーク', 'ゴールウェイ', 'リムリック'],
    costRange: '200-380万円',
    languageRequirement: 'IELTS 6.0+ / TOEFL 80+',
    visaType: '学生ビザ / ワーホリビザ',
    region: 'europe',
    studyType: ['language', 'it', 'working-holiday'],
    budgetLevel: 'medium',
    studentCount: 280
  },
  {
    id: 'germany',
    name: 'ドイツ',
    nameEn: 'Germany',
    flag: '🇩🇪',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: '工学・技術分野に強み。多くの公立大学で学費が無料または低額で、質の高い教育を受けられます。',
    highlights: ['学費無料', '工学強い', '歴史文化'],
    popularCities: ['ベルリン', 'ミュンヘン', 'ハンブルク', 'フランクフルト'],
    costRange: '80-170万円',
    languageRequirement: 'ドイツ語B1+ or 英語プログラムあり',
    visaType: '学生ビザ',
    region: 'europe',
    studyType: ['university', 'engineering', 'art'],
    budgetLevel: 'low',
    studentCount: 420
  },
  {
    id: 'malta',
    name: 'マルタ',
    nameEn: 'Malta',
    flag: '🇲🇹',
    image: 'https://images.unsplash.com/photo-1543731068-f829b0c2f5e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: '地中海の美しい島国で英語を学ぶ。温暖な気候とリゾート地の雰囲気の中、費用を抑えて語学留学ができます。',
    highlights: ['費用安い', 'リゾート', '温暖気候'],
    popularCities: ['バレッタ', 'スリーマ', 'セントジュリアンズ'],
    costRange: '150-250万円',
    languageRequirement: '初級から可',
    visaType: '90日以内ビザ不要 / 学生ビザ',
    region: 'europe',
    studyType: ['language'],
    budgetLevel: 'low',
    studentCount: 180
  }
]

const FILTER_GROUPS = [
  {
    id: 'region',
    label: '地域',
    options: [
      { id: 'north-america', label: '北米', value: 'north-america' },
      { id: 'europe', label: 'ヨーロッパ', value: 'europe' },
      { id: 'oceania', label: 'オセアニア', value: 'oceania' },
      { id: 'asia', label: 'アジア', value: 'asia' }
    ]
  },
  {
    id: 'studyType',
    label: '留学タイプ',
    options: [
      { id: 'language', label: '語学留学', value: 'language' },
      { id: 'university', label: '大学留学', value: 'university' },
      { id: 'working-holiday', label: 'ワーキングホリデー', value: 'working-holiday' },
      { id: 'vocational', label: '専門留学', value: 'vocational' }
    ]
  },
  {
    id: 'budget',
    label: '予算',
    options: [
      { id: 'low', label: '～250万円', value: 'low' },
      { id: 'medium', label: '250～400万円', value: 'medium' },
      { id: 'high', label: '400万円～', value: 'high' }
    ]
  }
]

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<Record<string, string[]>>({})

  // Filter logic
  const filteredDestinations = DESTINATIONS.filter(dest => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        dest.name.toLowerCase().includes(query) ||
        dest.nameEn.toLowerCase().includes(query) ||
        dest.popularCities.some(city => city.toLowerCase().includes(query))
      if (!matchesSearch) return false
    }

    // Region filter
    if (filters.region?.length > 0) {
      if (!filters.region.includes(dest.region)) return false
    }

    // Study type filter
    if (filters.studyType?.length > 0) {
      const hasMatchingType = filters.studyType.some(type =>
        dest.studyType.includes(type)
      )
      if (!hasMatchingType) return false
    }

    // Budget filter
    if (filters.budget?.length > 0) {
      if (!filters.budget.includes(dest.budgetLevel)) return false
    }

    return true
  })

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
              <Globe className="w-4 h-4" />
              世界15カ国以上の留学先
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              🌍 あなたにぴったりの留学先を見つけよう
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              世界中から厳選した留学先。あなたの目標、予算、興味に合わせて最適な国を選びましょう
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Bar */}
        <FilterBar
          onSearch={setSearchQuery}
          onFilterChange={setFilters}
          filterGroups={FILTER_GROUPS}
        />

        {/* Results Summary */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredDestinations.length}件の留学先
            </h2>
            <p className="text-gray-600 mt-1">
              あなたの条件に合った留学先を表示しています
            </p>
          </div>
          {filteredDestinations.some(d => d.trending) && (
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-semibold">
              <TrendingUp className="w-4 h-4" />
              人気の留学先あり
            </div>
          )}
        </div>

        {/* Destinations Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map(destination => (
              <CountryCard key={destination.id} {...destination} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              条件に合う留学先が見つかりませんでした
            </h3>
            <p className="text-gray-600 mb-6">
              検索条件を変更してもう一度お試しください
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setFilters({})
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              フィルターをクリア
            </button>
          </div>
        )}
      </div>
    </main>
  )
}