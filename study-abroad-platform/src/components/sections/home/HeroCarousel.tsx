'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

const HERO_SLIDES = [
  {
    id: 1,
    image: '/ヒーロー.png',
    title: 'Learning Today,',
    titleAccent: 'Leading Tomorrow',
    subtitle: '世界200校以上の信頼できる提携校と共に、あなたの夢を実現します'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop',
    title: 'Study Abroad,',
    titleAccent: 'Transform Your Future',
    subtitle: 'グローバルな視点で、あなたのキャリアを次のステージへ'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&h=1080&fit=crop',
    title: 'Experience the World,',
    titleAccent: 'Grow Beyond Limits',
    subtitle: '異文化体験を通じて、新しい自分を発見しよう'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1920&h=1080&fit=crop',
    title: 'Your Journey Starts,',
    titleAccent: 'Here and Now',
    subtitle: '一歩踏み出す勇気が、人生を変える瞬間になる'
  }
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 5000) // 5秒ごとに切り替え

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section
      className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden"
      aria-label="ヒーローセクション"
    >
      {/* Background Images Carousel */}
      <div className="absolute inset-0 w-full h-full">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={`${slide.titleAccent}のイメージ`}
              fill
              className="object-cover"
              priority={index === 0}
              loading={index === 0 ? undefined : 'lazy'}
              quality={85}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Hero Content - Centered */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-20 md:py-24">
        <AnimatePresence mode="wait">
          {HERO_SLIDES.map((slide, index) =>
            index === currentSlide ? (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                {/* Main Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
                >
                  {slide.title}
                  <br />
                  <span className="text-cyan-300">{slide.titleAccent}</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed"
                >
                  {slide.subtitle}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <Button
                    size="lg"
                    className="px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xl font-bold rounded-full shadow-2xl transition-all duration-300 hover:shadow-orange-500/50 hover:scale-105"
                    asChild
                    aria-label="今すぐ無料相談を予約する"
                  >
                    <Link href="/consultation">
                      無料相談を予約
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="px-8 py-4 text-white hover:bg-white/10 text-lg font-semibold rounded-full transition-all duration-300 backdrop-blur-sm border border-white/30"
                    asChild
                    aria-label="留学費用を見積もる"
                  >
                    <Link href="/estimator">
                      費用を見積もる
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3" role="tablist" aria-label="スライド選択">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`スライド ${index + 1} に移動`}
            aria-current={index === currentSlide ? 'true' : 'false'}
            role="tab"
          />
        ))}
      </div>
    </section>
  )
}
