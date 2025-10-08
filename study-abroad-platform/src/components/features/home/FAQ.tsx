'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: '留学手続きにはどのくらいの期間がかかりますか？',
    answer: '通常2-3ヶ月程度ですが、学校や国によって異なります。お急ぎの場合は最短1週間での手続きも可能です。まずは無料相談でご相談ください。'
  },
  {
    question: '費用はどのくらいかかりますか？',
    answer: '留学先、期間、滞在方法によって大きく異なります。カナダ・オーストラリアの場合、1ヶ月あたり20-40万円程度が目安です。詳細な見積は無料で作成いたします。'
  },
  {
    question: '英語力に自信がないのですが、留学できますか？',
    answer: '英語初心者の方でも大丈夫です。レベルに応じたクラス分けがあり、基礎から学べるコースをご用意しています。出発前の英語学習サポートも行っています。'
  },
  {
    question: '現地でのサポートはありますか？',
    answer: '24時間対応の現地サポートデスクがあります。緊急時の対応、生活相談、学習相談など、日本語でサポートいたします。'
  },
  {
    question: 'ビザの取得は難しいですか？',
    answer: 'ビザ申請も当社がサポートします。必要書類の準備から申請手続きまで、経験豊富なスタッフが丁寧にサポートいたします。'
  },
  {
    question: '滞在先はどのように決まりますか？',
    answer: 'ホームステイ、学生寮、シェアハウスなど、ご希望に応じて最適な滞在先をご提案します。現地の安全性や通学の便利さを考慮して選定しています。'
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            よくあるご質問
          </h2>
          <p className="text-xl text-muted-foreground">
            留学に関する疑問にお答えします
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 fade-in-up hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="size-5 text-primary transition-transform duration-200" />
                  ) : (
                    <ChevronDown className="size-5 text-gray-400 transition-transform duration-200" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 fade-in-up" style={{ animationDelay: '0.8s' }}>
          <p className="text-muted-foreground mb-6">
            他にご質問がございましたら、お気軽にお問い合わせください
          </p>
          <button className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20">
            お問い合わせする
          </button>
        </div>
      </div>
    </section>
  )
}