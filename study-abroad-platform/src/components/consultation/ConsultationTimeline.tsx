'use client'

import { Check } from 'lucide-react'

interface TimelineStep {
  id: number
  title: string
  description: string
  icon: string
}

interface ConsultationTimelineProps {
  currentStep?: number
}

const STEPS: TimelineStep[] = [
  {
    id: 1,
    title: '現状ヒアリング',
    description: 'あなたの希望や目標を詳しくお聞きします',
    icon: '🎯'
  },
  {
    id: 2,
    title: '最適プランご提案',
    description: '最適な留学先・学校をご提案します',
    icon: '💡'
  },
  {
    id: 3,
    title: '出願サポート',
    description: '書類準備からビザ取得までサポート',
    icon: '📝'
  },
  {
    id: 4,
    title: '渡航前準備',
    description: '航空券・保険・滞在先の手配をサポート',
    icon: '✈️'
  },
  {
    id: 5,
    title: '現地サポート',
    description: '現地での生活や学習をサポート',
    icon: '🌍'
  },
  {
    id: 6,
    title: '帰国後フォロー',
    description: '帰国後のキャリア相談もお任せください',
    icon: '🎓'
  }
]

export function ConsultationTimeline({ currentStep = 1 }: ConsultationTimelineProps) {
  return (
    <div className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl px-6">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          🤝 あなたの留学を6つのステップで完全サポート
        </h2>
        <p className="text-gray-600">
          経験豊富なカウンセラーが、出発前から帰国後まで伴走します
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200"></div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step, index) => {
              const isActive = step.id <= currentStep
              const isCurrent = step.id === currentStep

              return (
                <div key={step.id} className="relative">
                  {/* Step Card */}
                  <div
                    className={`relative bg-white rounded-xl p-6 shadow-md transition-all duration-300 ${
                      isCurrent
                        ? 'ring-2 ring-blue-500 shadow-lg scale-105'
                        : isActive
                        ? 'shadow-lg'
                        : 'opacity-70'
                    }`}
                  >
                    {/* Step Number Badge */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {isActive && step.id < currentStep ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          step.id
                        )}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="text-center mt-4 mb-3">
                      <span className="text-4xl">{step.icon}</span>
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3
                        className={`font-bold text-lg mb-2 ${
                          isActive ? 'text-gray-900' : 'text-gray-600'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed ${
                          isActive ? 'text-gray-600' : 'text-gray-500'
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Current Indicator */}
                    {isCurrent && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>

                  {/* Mobile Connection Line */}
                  {index < STEPS.length - 1 && (
                    <div className="md:hidden flex justify-center my-4">
                      <div
                        className={`w-1 h-8 rounded ${
                          step.id < currentStep
                            ? 'bg-gradient-to-b from-blue-400 to-indigo-400'
                            : 'bg-gray-200'
                        }`}
                      ></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <p className="text-sm text-gray-600 mb-4">
          💝 すべてのサポートが<span className="font-bold text-blue-600">完全無料</span>です
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Check className="w-4 h-4 text-green-600" />
            24時間サポート
          </div>
          <div className="flex items-center gap-1">
            <Check className="w-4 h-4 text-green-600" />
            日本語対応
          </div>
          <div className="flex items-center gap-1">
            <Check className="w-4 h-4 text-green-600" />
            専任カウンセラー
          </div>
        </div>
      </div>
    </div>
  )
}