'use client'

import { useState } from 'react'
import { MapPin, DollarSign, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'

// Generate static star positions to avoid hydration errors
const STAR_POSITIONS = Array.from({ length: 50 }, (_, i) => ({
  left: (i * 17.3) % 100,
  top: (i * 23.7) % 100,
  animationDelay: (i * 0.13) % 3,
  animationDuration: 2 + (i * 0.07) % 3
}))

interface Destination {
  id: string
  name: string
  country: string
  position: { x: number; y: number } // Percentage positions
  averageCost: string
  students: number
  trending: boolean
  flag: string
  popularPrograms: string[]
}

const DESTINATIONS: Destination[] = [
  {
    id: 'canada',
    name: 'カナダ',
    country: 'Canada',
    position: { x: 20, y: 25 },
    averageCost: '¥1.2M - ¥2.5M',
    students: 450,
    trending: true,
    flag: '🇨🇦',
    popularPrograms: ['語学留学', 'Co-op', '大学進学']
  },
  {
    id: 'usa',
    name: 'アメリカ',
    country: 'United States',
    position: { x: 22, y: 35 },
    averageCost: '¥2.0M - ¥4.0M',
    students: 380,
    trending: true,
    flag: '🇺🇸',
    popularPrograms: ['語学留学', 'MBA', '大学留学']
  },
  {
    id: 'uk',
    name: 'イギリス',
    country: 'United Kingdom',
    position: { x: 48, y: 22 },
    averageCost: '¥1.8M - ¥3.5M',
    students: 320,
    trending: false,
    flag: '🇬🇧',
    popularPrograms: ['語学留学', '大学院', 'アート']
  },
  {
    id: 'ireland',
    name: 'アイルランド',
    country: 'Ireland',
    position: { x: 45, y: 20 },
    averageCost: '¥1.3M - ¥2.8M',
    students: 180,
    trending: false,
    flag: '🇮🇪',
    popularPrograms: ['語学留学', 'IT', 'ワーホリ']
  },
  {
    id: 'australia',
    name: 'オーストラリア',
    country: 'Australia',
    position: { x: 82, y: 75 },
    averageCost: '¥1.5M - ¥3.0M',
    students: 410,
    trending: true,
    flag: '🇦🇺',
    popularPrograms: ['語学留学', 'ワーホリ', '専門留学']
  },
  {
    id: 'newzealand',
    name: 'ニュージーランド',
    country: 'New Zealand',
    position: { x: 88, y: 82 },
    averageCost: '¥1.0M - ¥2.2M',
    students: 210,
    trending: false,
    flag: '🇳🇿',
    popularPrograms: ['語学留学', 'ファーム', '大学']
  },
  {
    id: 'malta',
    name: 'マルタ',
    country: 'Malta',
    position: { x: 52, y: 38 },
    averageCost: '¥0.8M - ¥1.8M',
    students: 150,
    trending: true,
    flag: '🇲🇹',
    popularPrograms: ['語学留学', 'リゾート留学']
  }
]

export function InteractiveWorldMap() {
  const [hoveredDestination, setHoveredDestination] = useState<Destination | null>(null)
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 opacity-30">
        {STAR_POSITIONS.map((star, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.animationDelay}s`,
              animationDuration: `${star.animationDuration}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-sm font-semibold mb-4">
            🗺️ インタラクティブマップ
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            世界中から選べる留学先
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            気になる国をクリックして詳細を確認しましょう
          </p>
        </div>

        {/* World Map Container */}
        <div className="relative w-full aspect-[2/1] bg-gradient-to-br from-blue-950 to-slate-900 rounded-3xl shadow-2xl border border-blue-400/20 overflow-hidden">
          {/* Simplified world map SVG background */}
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 1000 500" className="w-full h-full">
              <path
                d="M 100,200 Q 150,180 200,200 T 300,200 L 350,250 L 400,230 L 450,250 L 500,220 L 550,240 L 600,210 L 650,230 L 700,200 L 750,220 L 800,240 L 850,220 L 900,240"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-blue-300"
              />
            </svg>
          </div>

          {/* Destination Markers */}
          {DESTINATIONS.map((destination) => (
            <div
              key={destination.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${destination.position.x}%`,
                top: `${destination.position.y}%`
              }}
              onMouseEnter={() => setHoveredDestination(destination)}
              onMouseLeave={() => setHoveredDestination(null)}
              onClick={() => setSelectedDestination(destination)}
            >
              {/* Pulsing circle */}
              <div className="relative">
                <div className="absolute inset-0 w-12 h-12 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-xl border-2 border-white group-hover:scale-125 transition-transform duration-300">
                  <span className="text-2xl">{destination.flag}</span>
                  {destination.trending && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Hover Tooltip */}
              {hoveredDestination?.id === destination.id && (
                <div className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 w-64 bg-white text-gray-900 rounded-2xl shadow-2xl p-4 pointer-events-none animate-fade-in z-20">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-4 h-4 bg-white"></div>
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    {destination.flag} {destination.name}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span>{destination.averageCost}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>{destination.students}名が留学中</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {destination.popularPrograms.map((program, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                        >
                          {program}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="mt-3 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transition-all">
                    詳細を見る →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Selected Destination Detail */}
        {selectedDestination && (
          <div className="mt-8 bg-white text-gray-900 rounded-2xl p-6 shadow-2xl animate-fade-in">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  {selectedDestination.flag} {selectedDestination.name}
                  {selectedDestination.trending && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full">
                      人気急上昇中
                    </span>
                  )}
                </h3>
                <p className="text-gray-600 mt-1">{selectedDestination.country}</p>
              </div>
              <button
                onClick={() => setSelectedDestination(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-green-700 mb-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-semibold">平均費用</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{selectedDestination.averageCost}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-blue-700 mb-2">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">留学中</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{selectedDestination.students}名</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-purple-700 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold">人気プログラム</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{selectedDestination.popularPrograms[0]}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/destinations#${selectedDestination.id}`}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold text-center transition-all"
              >
                詳細を見る
              </Link>
              <Link
                href="/estimator"
                className="flex-1 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-lg font-semibold text-center transition-all"
              >
                見積もりを取る
              </Link>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-white mb-1">15</p>
            <p className="text-sm text-blue-200">対応国</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-white mb-1">200+</p>
            <p className="text-sm text-blue-200">提携校</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-white mb-1">1,200+</p>
            <p className="text-sm text-blue-200">成功者</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-white mb-1">98%</p>
            <p className="text-sm text-blue-200">満足度</p>
          </div>
        </div>
      </div>
    </section>
  )
}
