'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, DollarSign, Users, TrendingUp, Globe, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { stats, formatStats, statsLabels } from '@/config/stats'

// 星の位置を生成（ハイドレーションエラー回避・パフォーマンス改善）
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
  position: { x: number; y: number }
  averageCost: string
  students: number
  trending: boolean
  flag: string
  popularPrograms: string[]
  description: string
}

const DESTINATIONS: Destination[] = [
  {
    id: 'canada',
    name: 'カナダ',
    country: 'Canada',
    position: { x: 18, y: 22 }, // 北アメリカ大陸上部
    averageCost: '¥1.2M - ¥2.5M',
    students: 450,
    trending: true,
    flag: '🇨🇦',
    popularPrograms: ['語学留学', 'Co-op', '大学進学'],
    description: '安全で多文化な環境で学ぶ'
  },
  {
    id: 'usa',
    name: 'アメリカ',
    country: 'United States',
    position: { x: 20, y: 35 }, // 北アメリカ大陸中央
    averageCost: '¥2.0M - ¥4.0M',
    students: 380,
    trending: true,
    flag: '🇺🇸',
    popularPrograms: ['語学留学', 'MBA', '大学留学'],
    description: '世界最高水準の教育を受ける'
  },
  {
    id: 'uk',
    name: 'イギリス',
    country: 'United Kingdom',
    position: { x: 47, y: 25 }, // ヨーロッパ
    averageCost: '¥1.8M - ¥3.5M',
    students: 320,
    trending: false,
    flag: '🇬🇧',
    popularPrograms: ['語学留学', '大学院', 'アート'],
    description: '伝統と革新が融合する学びの地'
  },
  {
    id: 'australia',
    name: 'オーストラリア',
    country: 'Australia',
    position: { x: 78, y: 75 }, // オーストラリア大陸中央
    averageCost: '¥1.5M - ¥3.0M',
    students: 410,
    trending: true,
    flag: '🇦🇺',
    popularPrograms: ['語学留学', 'ワーホリ', '専門留学'],
    description: '自然豊かな環境で成長する'
  },
  {
    id: 'newzealand',
    name: 'ニュージーランド',
    country: 'New Zealand',
    position: { x: 90, y: 82 }, // NZは離して配置
    averageCost: '¥1.0M - ¥2.2M',
    students: 210,
    trending: false,
    flag: '🇳🇿',
    popularPrograms: ['語学留学', 'ファーム', '大学'],
    description: '美しい自然と温かい人々'
  },
  {
    id: 'malta',
    name: 'マルタ',
    country: 'Malta',
    position: { x: 51, y: 42 }, // ヨーロッパ南部（地中海）
    averageCost: '¥0.8M - ¥1.8M',
    students: 150,
    trending: true,
    flag: '🇲🇹',
    popularPrograms: ['語学留学', 'リゾート留学'],
    description: '地中海のリゾートで学ぶ'
  }
]

export function InteractiveHero() {
  const [hoveredDestination, setHoveredDestination] = useState<Destination | null>(null)
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  const HERO_MESSAGES = [
    {
      title: 'Learning Today,',
      titleAccent: 'Leading Tomorrow',
      subtitle: '世界200校以上の信頼できる提携校と共に、あなたの夢を実現します'
    },
    {
      title: 'Discover Your Path,',
      titleAccent: 'Shape Your Future',
      subtitle: 'グローバルな視点で、あなたのキャリアを次のステージへ'
    }
  ]

  useEffect(() => {
    setIsMounted(true)
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_MESSAGES.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [])

  // マーカーをクリックまたはタップした時の処理
  const handleDestinationClick = (destination: Destination) => {
    if (selectedDestination?.id === destination.id) {
      setSelectedDestination(null)
    } else {
      setSelectedDestination(destination)
      setHoveredDestination(null) // モバイルでのツールチップを閉じる
    }
  }

  // マーカーのタップ/クリック処理（モバイル対応）
  const handleMarkerInteraction = (destination: Destination) => {
    // モバイルではタップでツールチップ表示
    if (window.innerWidth < 1024) {
      if (hoveredDestination?.id === destination.id) {
        setHoveredDestination(null)
      } else {
        setHoveredDestination(destination)
      }
    }
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* アニメーション背景 - 星 */}
      <div className="absolute inset-0 opacity-40">
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

      {/* グリッド背景 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* 左側：ヒーローメッセージ */}
          <div className="text-white space-y-6 sm:space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-sm font-semibold mb-6"
                >
                  <Globe className="w-4 h-4" />
                  世界15カ国・200校以上の提携校
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
                  {HERO_MESSAGES[currentSlide].title}
                  <br />
                  <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                    {HERO_MESSAGES[currentSlide].titleAccent}
                  </span>
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl text-blue-100 leading-relaxed mb-8 max-w-xl">
                  {HERO_MESSAGES[currentSlide].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CTAボタン */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="px-10 py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xl font-bold rounded-full shadow-2xl transition-all duration-300 hover:shadow-orange-500/50 hover:scale-105"
                asChild
              >
                <Link href="/consultation">
                  無料相談を予約
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="px-8 py-6 text-white hover:bg-white/10 text-lg font-semibold rounded-full transition-all duration-300 backdrop-blur-sm border-2 border-white/30 hover:border-white/50"
                asChild
              >
                <Link href="/estimator">
                  費用を見積もる
                </Link>
              </Button>
            </div>

            {/* クイック統計 - 動的データ */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-white mb-1">{formatStats.partnerSchools(stats.partnerSchools)}</p>
                <p className="text-xs text-blue-200">{statsLabels.partnerSchools}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-white mb-1">{formatStats.successfulStudents(stats.successfulStudents)}</p>
                <p className="text-xs text-blue-200">{statsLabels.successfulStudents}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-white mb-1">{formatStats.satisfactionRate(stats.satisfactionRate)}</p>
                <p className="text-xs text-blue-200">{statsLabels.satisfactionRate}</p>
              </div>
            </div>
          </div>

          {/* 右側：インタラクティブ世界地図 */}
          <div className="relative order-first lg:order-last">
            {/* モバイル用の説明 */}
            <div className="lg:hidden mb-4 text-center">
              <p className="text-white/90 text-sm sm:text-base font-medium">
                マーカーをタップして留学先を探索 🌍
              </p>
            </div>

            <motion.div
              initial={isMounted ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-2xl sm:rounded-3xl shadow-2xl border border-blue-400/20 overflow-visible"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(30, 58, 138, 0.6) 0%, rgba(30, 41, 59, 0.8) 100%)'
              }}
            >
              {/* 海のグラデーション効果 */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-blue-800/50 to-indigo-900/60 rounded-2xl sm:rounded-3xl"></div>

              {/* 本格的な世界地図の背景 */}
              <div className="absolute inset-0 opacity-40">
                <svg viewBox="0 0 1000 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* 北アメリカ大陸 - より詳細 */}
                  <path d="M 140,90 L 160,75 L 180,70 L 200,65 L 220,75 L 240,70 L 260,60 L 280,70 L 295,85 L 305,100 L 310,120 L 308,140 L 300,160 L 290,180 L 280,195 L 270,210 L 255,225 L 235,235 L 210,238 L 185,232 L 165,220 L 148,205 L 138,185 L 130,160 L 128,135 L 132,110 Z"
                    fill="url(#landGradient)" stroke="currentColor" strokeWidth="1.2" className="text-cyan-300/50" filter="url(#glow)" />

                  {/* 中央アメリカ */}
                  <path d="M 210,238 L 230,245 L 245,260 L 255,280 L 258,295 L 252,308 L 240,315 L 225,318 L 210,310 L 200,295 L 195,275 L 198,255 Z"
                    fill="url(#landGradient)" stroke="currentColor" strokeWidth="1" className="text-cyan-300/50" filter="url(#glow)" />

                  {/* 南アメリカ大陸 - より詳細 */}
                  <path d="M 240,320 L 258,328 L 272,345 L 280,370 L 285,400 L 282,430 L 275,460 L 265,485 L 250,505 L 230,518 L 210,515 L 195,505 L 185,485 L 180,460 L 178,430 L 182,400 L 190,370 L 202,345 L 218,328 Z"
                    fill="url(#landGradient)" stroke="currentColor" strokeWidth="1.2" className="text-cyan-300/50" filter="url(#glow)" />

                  {/* ヨーロッパ - より詳細 */}
                  <path d="M 445,115 L 465,108 L 485,105 L 505,108 L 522,115 L 538,125 L 548,140 L 552,158 L 548,175 L 538,188 L 520,195 L 500,198 L 480,195 L 462,188 L 448,175 L 440,158 L 438,140 Z"
                    fill="url(#landGradient)" stroke="currentColor" strokeWidth="1.2" className="text-cyan-300/50" filter="url(#glow)" />

                  {/* アフリカ大陸 - より詳細 */}
                  <path d="M 475,205 L 495,195 L 515,192 L 535,195 L 552,205 L 565,220 L 575,245 L 580,275 L 582,310 L 578,345 L 570,380 L 558,410 L 540,430 L 518,442 L 495,445 L 475,440 L 458,425 L 448,405 L 442,380 L 440,350 L 443,320 L 450,290 L 460,260 L 468,230 Z"
                    fill="url(#landGradient)" stroke="currentColor" strokeWidth="1.2" className="text-cyan-300/50" filter="url(#glow)" />

                  {/* アジア大陸 - より詳細 */}
                  <path d="M 550,85 L 580,78 L 610,75 L 640,80 L 670,90 L 700,105 L 728,125 L 750,145 L 765,165 L 775,185 L 778,205 L 772,225 L 758,240 L 738,250 L 715,255 L 690,252 L 665,245 L 640,235 L 615,220 L 590,200 L 570,180 L 555,160 L 545,135 L 542,110 Z"
                    fill="url(#landGradient)" stroke="currentColor" strokeWidth="1.2" className="text-cyan-300/50" filter="url(#glow)" />

                  {/* 東南アジア・インド */}
                  <path d="M 665,245 L 685,255 L 705,268 L 720,285 L 728,305 L 725,325 L 715,340 L 700,348 L 680,345 L 665,335 L 655,318 L 652,298 L 655,278 Z"
                    fill="url(#landGradient)" stroke="currentColor" strokeWidth="1" className="text-cyan-300/50" filter="url(#glow)" />

                  {/* オーストラリア大陸 - より詳細 */}
                  <path d="M 742,425 L 765,420 L 790,418 L 815,422 L 838,432 L 858,448 L 870,468 L 875,488 L 872,508 L 860,522 L 840,530 L 815,532 L 790,528 L 768,518 L 750,502 L 740,482 L 735,460 Z"
                    fill="url(#landGradient)" stroke="currentColor" strokeWidth="1.2" className="text-cyan-300/50" filter="url(#glow)" />

                  {/* ニュージーランド */}
                  <path d="M 895,485 L 905,480 L 912,490 L 910,505 L 900,512 L 890,508 L 888,495 Z"
                    fill="url(#landGradient)" stroke="currentColor" strokeWidth="0.8" className="text-cyan-300/50" filter="url(#glow)" />

                  {/* 接続線（航路イメージ） */}
                  <g opacity="0.3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="5,5" className="text-cyan-300">
                    <path d="M 220,150 Q 350,100 480,140" />
                    <path d="M 280,180 Q 400,250 520,280" />
                    <path d="M 520,160 Q 640,200 700,180" />
                    <path d="M 700,200 Q 750,350 800,460" />
                  </g>
                </svg>
              </div>

              {/* 経緯線グリッド */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg viewBox="0 0 1000 600" className="w-full h-full">
                  {/* 経線 */}
                  {[...Array(10)].map((_, i) => (
                    <line key={`v-${i}`} x1={i * 100 + 100} y1="0" x2={i * 100 + 100} y2="600" stroke="currentColor" strokeWidth="0.5" className="text-blue-200" />
                  ))}
                  {/* 緯線 */}
                  {[...Array(6)].map((_, i) => (
                    <line key={`h-${i}`} x1="0" y1={i * 100 + 50} x2="1000" y2={i * 100 + 50} stroke="currentColor" strokeWidth="0.5" className="text-blue-200" />
                  ))}
                </svg>
              </div>

              {/* 目的地マーカー */}
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
                  onClick={() => handleDestinationClick(destination)}
                  onTouchStart={() => handleMarkerInteraction(destination)}
                >
                  {/* パルス円 - タップエリア拡大 */}
                  <div className="relative p-2 -m-2">
                    <div className="absolute inset-0 w-12 h-12 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
                    <div className={`relative w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-xl border-2 transition-all duration-300 ${
                      selectedDestination?.id === destination.id
                        ? 'border-orange-400 scale-125 ring-4 ring-orange-400/30'
                        : 'border-white group-hover:scale-125'
                    }`}>
                      <span className="text-2xl">{destination.flag}</span>
                      {destination.trending && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center animate-bounce">
                          <TrendingUp className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ホバー時のツールチップ - レスポンシブ位置調整 */}
                  <AnimatePresence>
                    {hoveredDestination?.id === destination.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute bottom-full mb-4 w-64 sm:w-72 bg-white text-gray-900 rounded-2xl shadow-2xl p-4 z-20 ${
                          destination.position.x > 70 ? 'right-0' : destination.position.x < 30 ? 'left-0' : 'left-1/2 -translate-x-1/2'
                        }`}
                        style={{ pointerEvents: 'none' }}
                      >
                        <div className={`absolute bottom-0 translate-y-1/2 rotate-45 w-4 h-4 bg-white ${
                          destination.position.x > 70 ? 'right-6' : destination.position.x < 30 ? 'left-6' : 'left-1/2 -translate-x-1/2'
                        }`}></div>
                        <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                          {destination.flag} {destination.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">{destination.description}</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="font-semibold">{destination.averageCost}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-4 h-4 text-blue-600" />
                            <span>{destination.students}名が留学中</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {destination.popularPrograms.slice(0, 2).map((program, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
                              >
                                {program}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500 lg:hidden">
                          タップして詳細を表示
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>

            {/* 選択した目的地の詳細 - 改善版 */}
            <AnimatePresence>
              {selectedDestination && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 bg-white text-gray-900 rounded-2xl p-5 sm:p-6 shadow-2xl border-2 border-blue-400/30"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2 flex-wrap">
                        {selectedDestination.flag} {selectedDestination.name}
                        {selectedDestination.trending && (
                          <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full">
                            人気急上昇中
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-600 mt-2 text-sm sm:text-base">{selectedDestination.description}</p>
                    </div>
                    <button
                      onClick={() => setSelectedDestination(null)}
                      className="text-gray-400 hover:text-gray-600 text-xl ml-2 transition-colors p-1"
                      aria-label="閉じる"
                    >
                      ✕
                    </button>
                  </div>

                  {/* 詳細情報 */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <div>
                        <div className="text-xs text-gray-500">費用目安</div>
                        <div className="font-semibold text-gray-900">{selectedDestination.averageCost}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-blue-600" />
                      <div>
                        <div className="text-xs text-gray-500">留学中</div>
                        <div className="font-semibold text-gray-900">{selectedDestination.students}名</div>
                      </div>
                    </div>
                  </div>

                  {/* 人気プログラム */}
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">人気プログラム</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedDestination.popularPrograms.map((program, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-sm rounded-full font-medium border border-blue-200"
                        >
                          {program}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* アクションボタン */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <Link
                      href={`/destinations#${selectedDestination.id}`}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold text-center transition-all shadow-md hover:shadow-lg"
                    >
                      詳細を見る
                    </Link>
                    <Link
                      href="/estimator"
                      className="flex-1 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-lg font-semibold text-center transition-all"
                    >
                      費用を見積もる
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

    </section>
  )
}
