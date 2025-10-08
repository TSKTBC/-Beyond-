'use client'

import { Users, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FadeIn } from '@/components/animations/FadeIn'
import { StaggerChildren, StaggerItem } from '@/components/animations/StaggerChildren'
import { SmartLoginPrompt } from '@/components/auth/SmartLoginPrompt'
import { EnhancedChatWidget } from '@/components/chat/EnhancedChatWidget'
import { DestinationsSnippet } from '@/components/sections/home/DestinationsSnippet'
import { InteractiveHero } from '@/components/sections/home/InteractiveHero'
import { SchoolsCarousel } from '@/components/sections/home/SchoolsCarousel'
import { VideoTestimonials } from '@/components/sections/home/VideoTestimonials'
import { Button } from "@/components/ui/button";
import { CountUp } from '@/components/ui/CountUp'
import { ExitIntentPopup } from '@/components/ui/ExitIntentPopup'
import { FAQAccordionItem } from '@/components/ui/FAQAccordion'
import { useLoginStrategy } from '@/hooks/useLoginStrategy'

export default function HomePage() {
  const { strategy, dismissPrompt } = useLoginStrategy()
  const stats = {
    partnerSchools: 200,
    totalUsers: 1234,
    satisfactionRate: 98
  }

  return (
    <main>
      {/* Interactive Hero Section with World Map */}
      <InteractiveHero />
      {/* About Section - Template Style */}
      <section className="py-20 bg-white" aria-labelledby="about-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left" duration={0.7}>
              <div>
              <h2 id="about-heading" className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                About Us
              </h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                私たちは、世界中の学生に最高の教育体験を提供することを使命としています。
                200校以上の提携校と共に、あなたの夢の実現をサポートします。
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                10年以上の経験を持つプロフェッショナルチームが、あなたの留学生活を全面的にバックアップ。
                語学学習から現地サポートまで、安心して学べる環境を提供します。
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors duration-300">
                  <CountUp end={200} suffix="+" className="text-3xl font-bold text-blue-600" />
                  <div className="text-sm text-gray-600">提携校</div>
                </div>
                <div className="bg-cyan-50 p-4 rounded-lg hover:bg-cyan-100 transition-colors duration-300">
                  <CountUp end={1200} suffix="+" className="text-3xl font-bold text-cyan-600" />
                  <div className="text-sm text-gray-600">成功した学生</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors duration-300">
                  <CountUp end={98} suffix="%" className="text-3xl font-bold text-blue-600" />
                  <div className="text-sm text-gray-600">満足度</div>
                </div>
                <div className="bg-cyan-50 p-4 rounded-lg hover:bg-cyan-100 transition-colors duration-300">
                  <CountUp end={15} className="text-3xl font-bold text-cyan-600" />
                  <div className="text-sm text-gray-600">対応国</div>
                </div>
              </div>
              </div>
            </FadeIn>
            <FadeIn direction="right" duration={0.7}>
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="グループで一緒に学習する学生たち"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Courses Section - Template Style */}
      <section className="py-20 bg-gray-50" aria-labelledby="courses-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="courses-heading" className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Popular Courses
            </h2>
            <p className="text-lg text-gray-600">
              あなたに最適なコースを見つけましょう
            </p>
          </div>

          <StaggerChildren className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.15}>
            {/* Course Card 1 */}
            <StaggerItem>
              <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="国際ビジネス管理コースのイメージ"
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    人気
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-cyan-600 text-sm font-semibold mb-2">ビジネス</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">国際ビジネス管理</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    グローバルビジネスの基礎から応用まで、実践的なスキルを習得できるプログラム
                  </p>
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">¥350,000</span>
                      <span className="text-sm text-gray-500">〜</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">3ヶ月プラン（授業料のみ）</div>
                    <button className="text-xs text-blue-600 hover:text-blue-700 underline mt-1">
                      総費用を見る
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>120名</span>
                    </div>
                    <Link href="/destinations" className="text-cyan-600 font-semibold hover:text-cyan-700">
                      詳細を見る →
                    </Link>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Course Card 2 */}
            <StaggerItem>
              <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="集中英語プログラムのイメージ"
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="text-blue-600 text-sm font-semibold mb-2">語学</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">集中英語プログラム</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    短期間で英語力を飛躍的に向上させる集中コース。TOEFL/IELTSにも対応
                  </p>
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">¥250,000</span>
                      <span className="text-sm text-gray-500">〜</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">1ヶ月プラン（授業料のみ）</div>
                    <button className="text-xs text-blue-600 hover:text-blue-700 underline mt-1">
                      総費用を見る
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>200名</span>
                    </div>
                    <Link href="/destinations" className="text-cyan-600 font-semibold hover:text-cyan-700">
                      詳細を見る →
                    </Link>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Course Card 3 */}
            <StaggerItem>
              <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="データサイエンス基礎コースのイメージ"
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    NEW
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-blue-600 text-sm font-semibold mb-2">IT・テクノロジー</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">データサイエンス基礎</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    AI時代に必須のデータ分析スキルを、実践的なプロジェクトを通じて学習
                  </p>
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">¥420,000</span>
                      <span className="text-sm text-gray-500">〜</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">6ヶ月プラン（授業料のみ）</div>
                    <button className="text-xs text-blue-600 hover:text-blue-700 underline mt-1">
                      総費用を見る
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>85名</span>
                    </div>
                    <Link href="/destinations" className="text-cyan-600 font-semibold hover:text-cyan-700">
                      詳細を見る →
                    </Link>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Course Card 4 - NEW */}
            <StaggerItem>
              <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="実践ビジネス英会話コースのイメージ"
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="text-cyan-600 text-sm font-semibold mb-2">ビジネス英語</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">実践ビジネス英会話</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    グローバルビジネスシーンで即戦力となる英語コミュニケーション力を養成
                  </p>
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">¥320,000</span>
                      <span className="text-sm text-gray-500">〜</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">2ヶ月プラン（授業料のみ）</div>
                    <button className="text-xs text-blue-600 hover:text-blue-700 underline mt-1">
                      総費用を見る
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>150名</span>
                    </div>
                    <Link href="/destinations" className="text-cyan-600 font-semibold hover:text-cyan-700">
                      詳細を見る →
                    </Link>
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerChildren>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 border-2 border-gray-300 hover:border-cyan-500 hover:bg-cyan-50 text-gray-700 hover:text-cyan-700 font-semibold transition-all duration-300"
              asChild
            >
              <Link href="/destinations">
                すべてのコースを見る ({stats.partnerSchools}校)
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it Works セクション */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-800">🚀 かんたん4ステップで始まる新しい世界</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">難しいことは一切ありません。あなたのペースで、一歩ずつ進んでいきましょう</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative group animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-30 group-hover:opacity-60 transform group-hover:scale-110"></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border border-emerald-100/50 group-hover:shadow-emerald-200/50">
                <div className="relative w-20 h-20 rounded-3xl mb-6 overflow-hidden shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                  <Image
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="留学相談"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/80 via-teal-500/80 to-cyan-500/80 flex items-center justify-center">
                    <span className="text-3xl text-white group-hover:animate-bounce">🤔</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    STEP 1
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-emerald-700 transition-colors duration-300">あなたの希望をお聞かせください</h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    🌍 行きたい国、期間、予算など...<br />
                    あなたの想いを教えてください。<span className="font-semibold text-emerald-600">たった30秒でOK</span>です。
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-30 group-hover:opacity-60 transform group-hover:scale-110"></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border border-teal-100/50 group-hover:shadow-teal-200/50">
                <div className="relative w-20 h-20 rounded-3xl mb-6 overflow-hidden shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                  <Image
                    src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="学校選択"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400/80 via-cyan-500/80 to-blue-500/80 flex items-center justify-center">
                    <span className="text-3xl text-white group-hover:animate-pulse">📊</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></span>
                    STEP 2
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-teal-700 transition-colors duration-300">ぴったりの学校を見つけましょう</h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    🏫 あなたに合った学校を推薦します。<br />
                    料金、カリキュラム、環境など、<span className="font-semibold text-teal-600">じっくり比較</span>してください。
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-30 group-hover:opacity-60 transform group-hover:scale-110"></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border border-cyan-100/50 group-hover:shadow-cyan-200/50">
                <div className="relative w-20 h-20 rounded-3xl mb-6 overflow-hidden shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                  <Image
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="カウンセラーサポート"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/80 via-blue-500/80 to-indigo-500/80 flex items-center justify-center">
                    <span className="text-3xl text-white group-hover:animate-wiggle">🤝</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></span>
                    STEP 3
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-cyan-700 transition-colors duration-300">専門家と一緒にプラン作成</h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    💬 経験豊富なカウンセラーが、<br />
                    あなたの不安や疑問に、<span className="font-semibold text-cyan-700">心を込めて</span>お答えします。
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group animate-fade-in-up" style={{animationDelay: '0.8s'}}>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-30 group-hover:opacity-60 transform group-hover:scale-110"></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border border-emerald-100/50 group-hover:shadow-emerald-200/50">
                <div className="relative w-20 h-20 rounded-3xl mb-6 overflow-hidden shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                  <Image
                    src="https://images.unsplash.com/photo-1436450412740-6b988f486c6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="留学開始"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/80 via-green-600/80 to-teal-600/80 flex items-center justify-center">
                    <span className="text-3xl text-white group-hover:animate-bounce">✈️</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></span>
                    STEP 4
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-emerald-700 transition-colors duration-300">いざ、新しい世界へ出発！</h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    🌍 すべての準備が整ったら出発です。<br />
                    現地でも、<span className="font-semibold text-emerald-700">24時間サポート</span>で安心です。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features セクション */}
      <section className="py-20 bg-gradient-to-b from-emerald-50/50 to-teal-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 text-gray-800 ">
              🌈 私たちが大切にしていること
            </h2>
            <p className="text-lg text-gray-600  max-w-3xl mx-auto leading-relaxed">
              一人ひとりの大切な夢をお預かりし、心を込めてサポートします。<br />
              10年以上の経験で築いてきた信頼関係と、温かいサポートが私たちの誇りです。
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 transform scale-150"></div>
                <div className="relative size-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center mx-auto shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                  <span className="text-3xl">💝</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">心からの安心サポート</h3>
              <p className="text-gray-600 leading-relaxed px-2 text-sm">
                🌏 世界のどこにいても、24時間日本語で相談できます。あなたが困った時、私たちがそばにいます。
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 transform scale-150"></div>
                <div className="relative size-20 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 text-white flex items-center justify-center mx-auto shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                  <span className="text-3xl">⚡</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">あなたのペースで進めます</h3>
              <p className="text-gray-600 leading-relaxed px-2 text-sm">
                ⏰ 急いでいません。ゆっくり考えたい方も、すぐに行きたい方も、あなたのタイミングで。
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 transform scale-150"></div>
                <div className="relative size-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center mx-auto shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                  <span className="text-3xl">🤗</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">留学経験者の仲間たち</h3>
              <p className="text-gray-600 leading-relaxed px-2 text-sm">
                🎓 私たちカウンセラーはみんな留学経験者。同じ不安や悩みを乗り越えた仲間です。
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 transform scale-150"></div>
                <div className="relative size-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center mx-auto shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                  <span className="text-3xl">🎯</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">無料カウンセリング</h3>
              <p className="text-gray-600 leading-relaxed px-2 text-sm">
                💰 初回カウンセリングは完全無料。納得いくまで何度でもご相談ください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Snippet */}
      <DestinationsSnippet />

      {/* Schools Carousel */}
      <SchoolsCarousel />

      {/* Video Testimonials - New! */}
      <VideoTestimonials />

      {/* 仲間たちの声セクション - Text Testimonials */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 text-gray-800 ">
              😊 仲間たちの素直な声
            </h2>
            <p className="text-lg text-gray-600  max-w-2xl mx-auto">
              みなさんと同じように、勇気を出して一歩を踏み出した仲間たちのリアルな体験談です。
            </p>
          </div>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.12}>
            <StaggerItem>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl blur-lg opacity-50 group-hover:opacity-70 transition-all duration-300 transform rotate-1"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300 border border-blue-100/50">
                <div className="flex items-center mb-6">
                  <div className="flex space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="text-4xl mb-4">😊</div>
                <p className="text-gray-700  mb-6 italic leading-relaxed font-medium">
                  「不安だった最初の頃、カウンセラーさんが毎日連絡してくださって...。まるで家族みたいに温かくて、本当に安心できました。」
                </p>
                <div className="flex items-center">
                  <div className="relative size-12 rounded-full mr-4 shadow-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                      alt="田中あやさん"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-500/30"></div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 ">田中 あやさん</p>
                    <p className="text-sm text-gray-600">🍁 カナダ・トロントで語学留学</p>
                  </div>
                </div>
              </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl blur-lg opacity-50 group-hover:opacity-70 transition-all duration-300 transform -rotate-1"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300 border border-green-100/50">
                <div className="flex items-center mb-6">
                  <div className="flex space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="text-4xl mb-4">😍</div>
                <p className="text-gray-700  mb-6 italic leading-relaxed font-medium">
                  「最初は英語が全然だめでしたが、小さなことでも一緒に喜んでくれて、だんだん自信がつきました。帰国後も連絡くださって嬉しいです！」
                </p>
                <div className="flex items-center">
                  <div className="relative size-12 rounded-full mr-4 shadow-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                      alt="佐藤ゆうさん"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-blue-500/30"></div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 ">佐藤 ゆうさん</p>
                    <p className="text-sm text-gray-600">🌏 オーストラリア・シドニーで大学進学</p>
                  </div>
                </div>
              </div>
              </div>
            </StaggerItem>

            <StaggerItem className="md:col-span-2 lg:col-span-1">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-red-100 rounded-3xl blur-lg opacity-50 group-hover:opacity-70 transition-all duration-300 transform rotate-0.5"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300 border border-pink-100/50">
                <div className="flex items-center mb-6">
                  <div className="flex space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="text-4xl mb-4">🥰</div>
                <p className="text-gray-700  mb-6 italic leading-relaxed font-medium">
                  「私の小さな夢を、こんなにも真剣に聞いてくださって...。一人で悔んでいたことも、一緒に考えてくださって。今は夢が現実になりました！」
                </p>
                <div className="flex items-center">
                  <div className="relative size-12 rounded-full mr-4 shadow-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                      alt="鈴木美希さん"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-400/30 to-red-500/30"></div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 ">鈴木 美希さん</p>
                    <p className="text-sm text-gray-600">🎭 アメリカ・ロサンゼルスでアート留学</p>
                  </div>
                </div>
              </div>
              </div>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>

      {/* Friendly CTA セクション */}
      <section className="py-24 bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 text-white relative overflow-hidden">
        {/* 温かい装飾 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-32 -translate-x-32 blur-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-8">
            <span className="text-5xl mb-6 block animate-bounce">🌱</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 leading-tight">
            さあ、あなたの新しい世界への<br className="hidden sm:block" />
            最初の一歩を踏み出しましょう！
          </h2>

          <p className="text-lg md:text-xl opacity-95 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
            🤗 不安や疑問、小さなことでも、なんでもお話しください。<br />
            私たちはあなたの味方です。一緒に素敵な留学を作り上げていきましょう！
          </p>

          {/* Social Proof */}
          <div className="mb-8 flex items-center justify-center gap-2 text-sm">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-cyan-500 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-red-500 border-2 border-white"></div>
            </div>
            <span className="opacity-90">今日すでに <strong>12名</strong> が無料相談を予約しました</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="xl" className="bg-white text-orange-600 hover:bg-orange-50 font-bold py-4 px-8 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300" asChild>
              <Link href="/consultation">
                💬 まずはお話ししませんか？
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="border-2 border-white text-white hover:bg-white/20 font-bold py-4 px-8 rounded-full backdrop-blur-sm transform hover:scale-105 transition-all duration-300" asChild>
              <Link href="/quote">
                ✨ 見積もりを作ってみる
              </Link>
            </Button>
          </div>

          <div className="mt-10 space-y-2">
            <div className="text-sm opacity-80">
              🎆 もちろん、すべて無料です！気軽にお声かけください
            </div>
            <div className="text-xs opacity-70">
              📞 平均対応時間：30分以内 | ⏰ 営業時間：9:00-21:00（年中無休）
            </div>
          </div>
        </div>
      </section>

      {/* Friendly FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 text-gray-800 ">
              🤔 みなさんがよく聞くこと
            </h2>
            <p className="text-lg text-gray-600  max-w-2xl mx-auto">
              同じような不安や疑問を持っている方がたくさんいらっしゃいます。
              安心してくださいね。
            </p>
          </div>
          <div className="space-y-4">
            <FAQAccordionItem
              icon="💰"
              question="「留学って、お金がたくさんかかるんですよね...？」"
              answer="😊 そんな心配、とてもよくわかります。国や期間によって大きく変わりますが、1ヶ月で約20-50万円。ただ、私たちはあなたの予算に合わせたプランを一緒に考えますよ！"
              defaultOpen={true}
            />

            <FAQAccordionItem
              icon="😰"
              question="「英語、全然できないんです...。大丈夫でしょうか？」"
              answer="😌 大丈夫！みんなそこからスタートです。初心者クラスから丁寧にサポートしますし、現地の先生も日本人の特徴を理解してくださいます。一歩ずつ一緒に進んでいきましょう！"
            />

            <FAQAccordionItem
              icon="😥"
              question="「一人で海外にいるの、不安で...。現地で困ったらどうしよう？」"
              answer="🤗 その不安、すごくよくわかります。でも安心してください。24時間365日、日本語で相談できるサポートデスクがあります。小さなことでも、いつでも連絡してくださいね。"
            />

            <FAQAccordionItem
              icon="📅"
              question="「いつから準備を始めればいいですか？」"
              answer="✨ 理想は出発の6ヶ月前ですが、3ヶ月前でも大丈夫です！ビザ取得や学校手配には時間がかかるため、早めのご相談をおすすめします。"
            />

            <FAQAccordionItem
              icon="🎓"
              question="「どの国がおすすめですか？」"
              answer="🌏 目的によって異なります！英語習得ならカナダ・オーストラリア、ビジネスならアメリカ、文化体験ならヨーロッパがおすすめ。無料カウンセリングで最適な国をご提案します。"
            />

            <FAQAccordionItem
              icon="🏠"
              question="「滞在先はどうなりますか？」"
              answer="🏡 ホームステイ、学生寮、シェアハウスなど選択肢が豊富です。現地の生活を体験したい方はホームステイ、自由な時間が欲しい方は学生寮がおすすめです。"
            />
          </div>
        </div>
      </section>

      {/* 統計的に最適化されたログインプロンプト */}
      {strategy.showPrompt && (
        <SmartLoginPrompt
          trigger={strategy.trigger}
          context={strategy.context}
          onDismiss={dismissPrompt}
        />
      )}

      {/* Exit Intent Popup */}
      <ExitIntentPopup />

      {/* Enhanced AI Chat Widget with Notion MCP */}
      <EnhancedChatWidget />
    </main>
  )
}
