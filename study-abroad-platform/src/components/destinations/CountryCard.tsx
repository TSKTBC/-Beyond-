'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, DollarSign, BookOpen, TrendingUp, Users, Award } from 'lucide-react'

interface CountryCardProps {
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
  studentCount?: number
  trending?: boolean
  featured?: boolean
}

export function CountryCard({
  id,
  name,
  nameEn,
  flag,
  image,
  description,
  highlights,
  popularCities,
  costRange,
  languageRequirement,
  visaType,
  studentCount,
  trending,
  featured
}: CountryCardProps) {
  return (
    <Link
      href={`/destinations/${id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
    >
      {/* Image Header */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={`${name}での留学風景`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="flex gap-2">
            {trending && (
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                <TrendingUp className="w-3 h-3" />
                人気
              </div>
            )}
            {featured && (
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                <Award className="w-3 h-3" />
                おすすめ
              </div>
            )}
          </div>
          <div className="text-5xl drop-shadow-lg">{flag}</div>
        </div>

        {/* Country Name */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-3xl font-extrabold text-white mb-1 drop-shadow-lg">
            {name}
          </h3>
          <p className="text-white/90 text-sm font-medium drop-shadow">{nameEn}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Highlights */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            おすすめポイント
          </h4>
          <div className="flex flex-wrap gap-2">
            {highlights.slice(0, 3).map((highlight, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Popular Cities */}
        <div className="mb-4">
          <div className="flex items-center gap-1 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            <MapPin className="w-3 h-3" />
            人気都市
          </div>
          <div className="flex flex-wrap gap-2">
            {popularCities.slice(0, 4).map((city, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">年間費用</div>
              <div className="text-sm font-semibold text-gray-900">{costRange}</div>
            </div>
          </div>

          {studentCount && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500">留学生数</div>
                <div className="text-sm font-semibold text-gray-900">{studentCount}+</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              {languageRequirement}
            </div>
            <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
              詳細を見る
              <span>→</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}