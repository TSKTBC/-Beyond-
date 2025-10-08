'use client'

import { useState } from 'react'
import { Play, X } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import Image from 'next/image'

interface VideoTestimonial {
  id: string
  name: string
  country: string
  destination: string
  thumbnailUrl: string
  videoUrl: string
  quote: string
  program: string
}

const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: '1',
    name: '田中 あや',
    country: '🇨🇦 カナダ',
    destination: 'トロント',
    thumbnailUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    quote: '最初は不安でしたが、カウンセラーさんのサポートで夢が叶いました！',
    program: '語学留学 6ヶ月'
  },
  {
    id: '2',
    name: '佐藤 ゆう',
    country: '🇦🇺 オーストラリア',
    destination: 'シドニー',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    quote: '英語力がゼロからTOEIC850点まで成長できました！',
    program: '大学進学プログラム'
  },
  {
    id: '3',
    name: '鈴木 美希',
    country: '🇺🇸 アメリカ',
    destination: 'ロサンゼルス',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    quote: 'アート留学で本当にやりたいことが見つかりました！',
    program: 'アート専門留学'
  },
  {
    id: '4',
    name: '山田 太郎',
    country: '🇬🇧 イギリス',
    destination: 'ロンドン',
    thumbnailUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    quote: 'ビジネス英語を学び、外資系企業に就職できました！',
    program: 'ビジネス英語コース'
  }
]

export function VideoTestimonials() {
  const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(null)

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-sm font-semibold text-purple-700 mb-4">
            🎥 動画で見る
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            留学経験者のリアルな声
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            実際に留学を経験した先輩たちの生の声をお届けします
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VIDEO_TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
              onClick={() => setSelectedVideo(testimonial)}
            >
              {/* Thumbnail with Play Button Overlay */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={testimonial.thumbnailUrl}
                  alt={`${testimonial.name}さんの留学体験談`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <Play className="w-8 h-8 text-purple-600 ml-1" />
                  </div>
                </div>

                {/* Country Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                  {testimonial.country}
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-white/90 text-sm mb-2">
                    {testimonial.destination}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full">
                    {testimonial.program}
                  </span>
                </div>
                <p className="text-gray-700 text-sm italic line-clamp-2">
                  "{testimonial.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            あなたも先輩たちに続きませんか？
          </p>
          <a
            href="/consultation"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            無料相談で留学の第一歩を踏み出す
            <span className="text-xl">→</span>
          </a>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={selectedVideo !== null} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0 bg-black">
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute -top-12 right-0 z-50 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all"
            aria-label="閉じる"
          >
            <X className="w-6 h-6 text-gray-900" />
          </button>

          {selectedVideo && (
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={selectedVideo.videoUrl}
                title={`${selectedVideo.name}さんの留学体験談`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {selectedVideo && (
            <div className="bg-white p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedVideo.name}さん
              </h3>
              <p className="text-gray-600 mb-3">
                {selectedVideo.country} {selectedVideo.destination} / {selectedVideo.program}
              </p>
              <p className="text-gray-700 italic">
                "{selectedVideo.quote}"
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
