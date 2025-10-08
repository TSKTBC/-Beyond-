'use client'

import { Calendar, Clock, MapPin, Users, Filter } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: 'seminar' | 'consultation' | 'webinar' | 'workshop'
  capacity: number
  registered: number
  price: number
  isOnline: boolean
}

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'アメリカ大学留学セミナー',
    description: 'アメリカの大学制度、入学要件、奨学金制度について専門カウンセラーが詳しく解説します。',
    date: '2024-10-15',
    time: '19:00-20:30',
    location: 'オンライン（Zoom）',
    type: 'seminar',
    capacity: 50,
    registered: 23,
    price: 0,
    isOnline: true
  },
  {
    id: '2',
    title: 'カナダワーキングホリデー説明会',
    description: '2025年カナダワーキングホリデーの申請手続き、仕事探し、生活情報を経験者が体験談を交えてお話しします。',
    date: '2024-10-20',
    time: '14:00-16:00',
    location: 'beyond本社セミナールーム',
    type: 'seminar',
    capacity: 30,
    registered: 27,
    price: 0,
    isOnline: false
  },
  {
    id: '3',
    title: 'IELTS対策ワークショップ',
    description: 'IELTS各セクションの効果的な学習法と実践テクニックを1日集中で学習します。',
    date: '2024-10-26',
    time: '10:00-17:00',
    location: 'beyond本社 / オンライン',
    type: 'workshop',
    capacity: 20,
    registered: 8,
    price: 3000,
    isOnline: false
  },
  {
    id: '4',
    title: 'オーストラリア留学体験談セミナー',
    description: '実際にオーストラリアへ留学された方の体験談を聞くセミナーです。',
    date: '2024-11-02',
    time: '15:00-16:30',
    location: 'オンライン（Zoom）',
    type: 'webinar',
    capacity: 100,
    registered: 15,
    price: 0,
    isOnline: true
  }
]

const eventTypeLabels = {
  seminar: '説明会',
  consultation: '個別相談',
  webinar: 'ウェビナー',
  workshop: 'ワークショップ'
}

const eventTypeColors = {
  seminar: 'bg-blue-100 text-blue-800',
  consultation: 'bg-green-100 text-green-800',
  webinar: 'bg-purple-100 text-purple-800',
  workshop: 'bg-orange-100 text-orange-800'
}

export default function EventsPage() {
  const [selectedType, setSelectedType] = useState<string>('all')
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)
  const [showFreeOnly, setShowFreeOnly] = useState(false)

  const filteredEvents = upcomingEvents.filter(event => {
    const typeMatch = selectedType === 'all' || event.type === selectedType
    const onlineMatch = !showOnlineOnly || event.isOnline
    const priceMatch = !showFreeOnly || event.price === 0
    return typeMatch && onlineMatch && priceMatch
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    })
  }

  const getAvailabilityStatus = (event: Event) => {
    const availableSpots = event.capacity - event.registered
    if (availableSpots <= 0) return { text: '満席', color: 'text-red-600', bgColor: 'bg-red-50' }
    if (availableSpots <= 3) return { text: `残り${availableSpots}席`, color: 'text-orange-600', bgColor: 'bg-orange-50' }
    return { text: `${availableSpots}席空き`, color: 'text-green-600', bgColor: 'bg-green-50' }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-300/20 to-purple-300/20 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-300/20 to-violet-300/20 rounded-full blur-3xl translate-y-32 -translate-x-32"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-500 rounded-3xl mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
            <span className="text-3xl text-white animate-bounce">📅</span>
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
            留学イベント・説明会
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            ✨ 留学に関する説明会、個別相談会、体験談セミナーなど、様々なイベントを開催しています。<br />
            あなたの留学準備をサポートします。
          </p>
        </div>

        {/* フィルター */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5" />
            <h2 className="text-lg font-semibold">イベント検索</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                イベントタイプ
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">すべて</option>
                <option value="seminar">説明会</option>
                <option value="consultation">個別相談</option>
                <option value="webinar">ウェビナー</option>
                <option value="workshop">ワークショップ</option>
              </select>
            </div>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showOnlineOnly}
                  onChange={(e) => setShowOnlineOnly(e.target.checked)}
                  className="mr-2"
                />
                オンラインのみ
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showFreeOnly}
                  onChange={(e) => setShowFreeOnly(e.target.checked)}
                  className="mr-2"
                />
                無料のみ
              </label>
            </div>
          </div>
        </div>

        {/* イベント一覧 */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">該当するイベントが見つかりません。</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => {
              const availability = getAvailabilityStatus(event)

              return (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 relative flex items-center justify-center">
                    <div className="text-4xl">
                      {event.type === 'seminar' && '🎓'}
                      {event.type === 'consultation' && '💬'}
                      {event.type === 'webinar' && '💻'}
                      {event.type === 'workshop' && '📚'}
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className={eventTypeColors[event.type]}>
                        {eventTypeLabels[event.type]}
                      </Badge>
                    </div>
                    {event.isOnline && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary">オンライン</Badge>
                      </div>
                    )}
                    {event.price === 0 && (
                      <div className="absolute bottom-4 right-4">
                        <Badge className="bg-green-100 text-green-800">無料</Badge>
                      </div>
                    )}
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">
                      {event.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {event.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className={availability.color}>
                          {availability.text}
                        </span>
                      </div>
                      {event.price > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">💰</span>
                          <span className="font-medium">¥{event.price.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    <Button
                      className="w-full"
                      disabled={event.registered >= event.capacity}
                    >
                      {event.registered >= event.capacity ? '満席' : '予約する'}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* お問い合わせセクション */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            個別相談をご希望の方へ
          </h2>
          <p className="text-gray-600 mb-6">
            ご都合の良い日時で個別相談を承ります。
            お気軽にお問い合わせください。
          </p>
          <Button size="lg" asChild>
            <a href="/consultation">無料個別相談を予約</a>
          </Button>
        </div>
      </div>
    </div>
  )
}