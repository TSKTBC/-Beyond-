'use client'

import Image from "next/image"
import Link from "next/link"
import { MapPin, TrendingUp, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Destination {
  id: string
  name: string
  nameEn: string
  image: string
  description: string
  averageCost: string
  popularPrograms: string[]
  trending?: boolean
}

const POPULAR_DESTINATIONS: Destination[] = [
  {
    id: "canada",
    name: "カナダ",
    nameEn: "Canada",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "多文化共生と安全な環境で学べる人気No.1の留学先",
    averageCost: "¥1.2M - ¥2.5M",
    popularPrograms: ["語学留学", "Co-op留学", "大学進学"],
    trending: true
  },
  {
    id: "australia",
    name: "オーストラリア",
    nameEn: "Australia",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "温暖な気候と世界トップレベルの教育水準",
    averageCost: "¥1.5M - ¥3.0M",
    popularPrograms: ["語学留学", "ワーホリ", "専門留学"],
    trending: true
  },
  {
    id: "uk",
    name: "イギリス",
    nameEn: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "歴史と伝統が息づく本場の英語を学ぶ",
    averageCost: "¥1.8M - ¥3.5M",
    popularPrograms: ["語学留学", "大学院留学", "アート留学"]
  },
  {
    id: "usa",
    name: "アメリカ",
    nameEn: "United States",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "多様な文化と世界最高峰の大学が集まる国",
    averageCost: "¥2.0M - ¥4.0M",
    popularPrograms: ["語学留学", "大学留学", "MBA"],
    trending: true
  },
  {
    id: "newzealand",
    name: "ニュージーランド",
    nameEn: "New Zealand",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "大自然に囲まれた落ち着いた環境で集中して学ぶ",
    averageCost: "¥1.0M - ¥2.2M",
    popularPrograms: ["語学留学", "ファーム体験", "大学留学"]
  },
  {
    id: "ireland",
    name: "アイルランド",
    nameEn: "Ireland",
    image: "https://images.unsplash.com/photo-1590759668628-05b5322f2a4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "フレンドリーな国民性とヨーロッパの玄関口",
    averageCost: "¥1.3M - ¥2.8M",
    popularPrograms: ["語学留学", "IT留学", "ワーホリ"]
  }
]

export function DestinationsSnippet() {
  return (
    <section
      className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      aria-labelledby="destinations-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-sm font-semibold text-blue-700 mb-4">
            <MapPin className="w-4 h-4" />
            人気の留学先
          </div>
          <h2
            id="destinations-heading"
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4"
          >
            🌍 あなたはどこで学びたいですか？
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            世界15カ国から、あなたにぴったりの留学先を見つけましょう
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {POPULAR_DESTINATIONS.map((destination) => (
            <Link
              key={destination.id}
              href={`/destinations#${destination.id}`}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Trending Badge */}
              {destination.trending && (
                <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                  <TrendingUp className="w-3 h-3" />
                  人気
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={destination.image}
                  alt={`${destination.name}での留学風景`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Country Name Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-white/90">{destination.nameEn}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  {destination.description}
                </p>

                {/* Popular Programs */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.popularPrograms.map((program, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                    >
                      {program}
                    </span>
                  ))}
                </div>

                {/* Cost */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-semibold">{destination.averageCost}</span>
                  </div>
                  <span className="text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                    詳しく見る →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all"
            asChild
          >
            <Link href="/destinations">
              すべての留学先を見る
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}