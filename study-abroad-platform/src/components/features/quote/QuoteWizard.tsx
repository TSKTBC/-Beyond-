'use client'

// import { useRouter } from 'next/navigation' // 現在未使用
import { useState } from 'react'

import { Progress } from '@/components/ui/progress'
import type { QuoteFormData, QuoteCalculationResult, School } from '@/types/quote'

import { QuoteResultPage } from './QuoteResultPage'
import { QuoteStep1 } from './QuoteStep1'
import { QuoteStep2 } from './QuoteStep2'
import { QuoteStep3 } from './QuoteStep3'
import { QuoteStep4 } from './QuoteStep4'


interface QuoteWizardProps {
  school: School
}

export function QuoteWizard({ school }: QuoteWizardProps) {
  // const router = useRouter() // 現在未使用
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<QuoteFormData>>({
    schoolId: school.id,
    weeks: 12,
    accommodationType: 'homestay',
    options: {}
  })
  const [calculationResult, setCalculationResult] = useState<QuoteCalculationResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const totalSteps = 4

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsCalculating(true)

    try {
      // 見積計算のAPIを呼び出し（モックデータで代用）
      await new Promise(resolve => setTimeout(resolve, 1500)) // ローディング演出

      const accommodationPerWeek =
        formData.accommodationType === 'homestay'
          ? school.pricing.accommodation.homestay.price
          : formData.accommodationType === 'dormitory'
          ? school.pricing.accommodation.dormitory.price
          : formData.accommodationType === 'apartment'
          ? school.pricing.accommodation.apartment.price
          : 0;

      const mockResult: QuoteCalculationResult = {
        tuition: formData.weeks! * school.pricing.basePrice,
        accommodation: formData.weeks! * accommodationPerWeek,
        fees: school.pricing.fees.registration + school.pricing.fees.materials + school.pricing.fees.technology,
        options: Object.keys(formData.options || {}).length * 5000,
        subtotal: 0,
        discounts: 0,
        total: 0,
        currency: school.pricing.currency,
        exchangeRate: 150, // 1USD = 150JPY と仮定
        breakdown: [
          {
            category: '学費',
            items: [
              { name: '授業料', amount: formData.weeks! * school.pricing.basePrice, unit: `${formData.weeks}週` }
            ],
            subtotal: formData.weeks! * school.pricing.basePrice
          },
          {
            category: '宿泊費',
            items: [
              {
                name: formData.accommodationType === 'homestay' ? 'ホームステイ' :
                      formData.accommodationType === 'dormitory' ? '学生寮' : 'アパートメント',
                amount: formData.weeks! * accommodationPerWeek,
                unit: `${formData.weeks}週`
              }
            ],
            subtotal: formData.weeks! * accommodationPerWeek
          }
        ]
      }

      // 合計計算
      mockResult.subtotal = mockResult.tuition + mockResult.accommodation + mockResult.fees + mockResult.options
      mockResult.total = mockResult.subtotal - mockResult.discounts

      setCalculationResult(mockResult)
      setCurrentStep(5) // 結果表示ステップ
    } catch (error) {
      console.error('見積計算に失敗しました:', error) // エラーログは本番でも必要
    } finally {
      setIsCalculating(false)
    }
  }

  const updateFormData = (data: Partial<QuoteFormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  if (currentStep === 5 && calculationResult) {
    return (
      <QuoteResultPage
        school={school}
        formData={formData as QuoteFormData}
        result={calculationResult}
        onBack={() => setCurrentStep(4)}
        onStartOver={() => {
          setCurrentStep(1)
          setCalculationResult(null)
        }}
      />
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      {/* プログレスバー */}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-600">
            {Math.round((currentStep / totalSteps) * 100)}%
          </span>
        </div>
        <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
      </div>

      {/* 学校情報 */}
      <div className="bg-blue-50 p-3 sm:p-4 rounded-lg mb-6 sm:mb-8">
        <h2 className="text-base sm:text-lg font-semibold text-blue-900">{school.name}</h2>
        <p className="text-sm sm:text-base text-blue-700">{school.city}, {school.country}</p>
      </div>

      {/* ステップコンテンツ */}
      {currentStep === 1 && (
        <QuoteStep1
          data={formData}
          onUpdate={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}

      {currentStep === 2 && (
        <QuoteStep2
          data={formData}
          onUpdate={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}

      {currentStep === 3 && (
        <QuoteStep3
          school={school}
          data={formData}
          onUpdate={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}

      {currentStep === 4 && (
        <QuoteStep4
          data={formData}
          onUpdate={updateFormData}
          onNext={handleNext}
          onSkip={handleSubmit}
          onBack={handleBack}
          isCalculating={isCalculating}
        />
      )}
    </div>
  )
}
