'use client'

import Image from "next/image"
import Link from "next/link"
import { GraduationCap, Award, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

interface School {
  id: string
  name: string
  location: string
  country: string
  image: string
  description: string
  specialties: string[]
  accreditation?: string
  establishedYear?: number
}

const FEATURED_SCHOOLS: School[] = [
  {
    id: "ubc",
    name: "University of British Columbia",
    location: "バンクーバー",
    country: "カナダ",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "世界ランキングトップ40の名門大学。美しいキャンパスで質の高い教育を提供",
    specialties: ["ビジネス", "工学", "環境科学"],
    accreditation: "カナダ政府認定",
    establishedYear: 1908
  },
  {
    id: "kings-education",
    name: "Kings Education",
    location: "ロンドン・ブライトン",
    country: "イギリス",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "60年以上の歴史を持つ語学学校グループ。大学進学サポートも充実",
    specialties: ["語学", "大学進学準備", "ビジネス英語"],
    accreditation: "British Council認定"
  },
  {
    id: "ilsc",
    name: "ILSC Language Schools",
    location: "バンクーバー・トロント",
    country: "カナダ",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "世界9都市に展開する大規模語学学校。130以上の多彩なプログラム",
    specialties: ["一般英語", "ビジネス", "試験対策"],
    accreditation: "Languages Canada認定"
  },
  {
    id: "unsw",
    name: "University of New South Wales",
    location: "シドニー",
    country: "オーストラリア",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "オーストラリアトップ8大学の一つ。革新的な研究で世界的に評価",
    specialties: ["IT・工学", "ビジネス", "医学"],
    accreditation: "TEQSA認定",
    establishedYear: 1949
  },
  {
    id: "kaplan",
    name: "Kaplan International",
    location: "世界各都市",
    country: "グローバル",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "80年以上の実績を持つ世界的な教育グループ。独自のK+学習システム",
    specialties: ["試験対策", "ビジネス英語", "アカデミック英語"],
    accreditation: "ACCET認定"
  },
  {
    id: "embassy",
    name: "Embassy English",
    location: "アメリカ・イギリス・カナダ",
    country: "グローバル",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "世界中に19校舎を展開。最新のテクノロジーを活用した学習環境",
    specialties: ["一般英語", "IELTS対策", "大学進学"],
    accreditation: "British Council認定"
  }
]

export function SchoolsCarousel() {
  return (
    <section
      className="py-20 bg-white"
      aria-labelledby="schools-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-sm font-semibold text-green-700 mb-4">
            <GraduationCap className="w-4 h-4" />
            提携校ネットワーク
          </div>
          <h2
            id="schools-heading"
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4"
          >
            🏫 世界200校以上の信頼できる提携校
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            厳選された教育機関であなたの目標達成をサポートします
          </p>
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {FEATURED_SCHOOLS.map((school) => (
            <Link
              key={school.id}
              href={`/schools#${school.id}`}
              className="group relative bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-green-300 hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <Image
                  src={school.image}
                  alt={`${school.name}キャンパス`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                {/* Country Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                  {school.country}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                  {school.name}
                </h3>

                <p className="text-sm text-gray-600 mb-4 flex items-center gap-1">
                  📍 {school.location}
                </p>

                <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-2">
                  {school.description}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {school.specialties.slice(0, 3).map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  {school.accreditation && (
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Award className="w-3 h-3 text-blue-600" />
                      <span>{school.accreditation}</span>
                    </div>
                  )}
                  {school.establishedYear && (
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Calendar className="w-3 h-3 text-purple-600" />
                      <span>創立 {school.establishedYear}年</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 text-green-600 font-semibold text-sm flex items-center justify-between">
                  <span>詳細を見る</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-6 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all"
            asChild
          >
            <Link href="/schools">
              提携校一覧を見る
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}