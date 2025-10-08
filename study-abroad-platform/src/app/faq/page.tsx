'use client'

import { MessageCircle, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { FaqSection, type FaqItem } from '@/components/faq/FaqAccordion'
import { Button } from '@/components/ui/button'

const FAQ_CATEGORIES = [
  { id: 'all', label: 'すべて', icon: '📚' },
  { id: 'application', label: '申し込み', icon: '📝' },
  { id: 'cost', label: '費用', icon: '💰' },
  { id: 'visa', label: 'ビザ', icon: '🛂' },
  { id: 'accommodation', label: '滞在先', icon: '🏠' },
  { id: 'support', label: 'サポート', icon: '🤝' },
]

const FAQ_DATA: FaqItem[] = [
  // 申し込み関連
  {
    id: 'app-1',
    question: '留学相談は無料ですか？',
    answer: 'はい、留学相談は完全無料です。経験豊富なカウンセラーが、あなたの目標や予算に合わせた最適な留学プランをご提案します。オンライン・対面どちらでも対応可能です。',
    category: 'application'
  },
  {
    id: 'app-2',
    question: '申し込みから渡航までどれくらいの期間が必要ですか？',
    answer: '留学プログラムや渡航先により異なりますが、一般的には3〜6ヶ月程度の準備期間を推奨しています。ビザ取得、航空券手配、滞在先確保などを含めた余裕のあるスケジュールで準備を進めます。',
    category: 'application'
  },
  {
    id: 'app-3',
    question: '英語力に自信がないのですが留学できますか？',
    answer: 'もちろん可能です。語学学校では初級レベルから対応しており、渡航前の英語学習サポートも提供しています。現地で基礎から学べるプログラムも多数ご用意しています。',
    category: 'application'
  },
  {
    id: 'app-4',
    question: '何歳から留学できますか？年齢制限はありますか？',
    answer: '中学生から社会人・シニアまで幅広い年齢層の方が留学されています。プログラムによって推奨年齢は異なりますが、基本的に年齢制限はありません。',
    category: 'application'
  },

  // 費用関連
  {
    id: 'cost-1',
    question: '留学費用の支払い方法を教えてください',
    answer: '銀行振込、クレジットカード、分割払いに対応しています。詳細なお支払いスケジュールは、お申し込み時にご案内いたします。分割払いの条件については個別にご相談ください。',
    category: 'cost'
  },
  {
    id: 'cost-2',
    question: '見積もりに含まれない費用はありますか？',
    answer: '見積もりには授業料、滞在費、サポート費用が含まれます。航空券、海外保険、ビザ申請費、現地での生活費（食費・交通費など）は別途必要です。詳細は無料見積もり時にご説明します。',
    category: 'cost'
  },
  {
    id: 'cost-3',
    question: 'キャンセル料はいつから発生しますか？',
    answer: 'キャンセル料は渡航日からの日数によって変動します。一般的に、渡航30日前までは総額の20%、14日前までは50%、それ以降は100%となります。詳細は契約書をご確認ください。',
    category: 'cost'
  },
  {
    id: 'cost-4',
    question: '奨学金制度はありますか？',
    answer: '一部の教育機関では奨学金制度を提供しています。また、日本の各種留学奨学金（JASSO、トビタテ留学JAPANなど）の申請サポートも行っています。詳しくはカウンセラーにご相談ください。',
    category: 'cost'
  },

  // ビザ関連
  {
    id: 'visa-1',
    question: 'ビザ申請のサポートはありますか？',
    answer: 'はい、ビザ申請の必要書類準備から申請手続きまで完全サポートいたします。各国の最新ビザ情報に精通したスタッフが、スムーズな取得をお手伝いします。',
    category: 'visa'
  },
  {
    id: 'visa-2',
    question: 'ビザが取得できなかった場合はどうなりますか？',
    answer: 'ビザが取得できなかった場合、プログラム費用は全額返金いたします（一部手数料を除く）。ただし、書類不備や虚偽申請など、お客様側に原因がある場合は対象外となります。',
    category: 'visa'
  },
  {
    id: 'visa-3',
    question: 'ビザ取得にはどのくらいの期間がかかりますか？',
    answer: '国や時期によって異なりますが、一般的に2週間〜2ヶ月程度です。カナダやオーストラリアは比較的早く、アメリカは面接が必要なため時間がかかる場合があります。',
    category: 'visa'
  },

  // 滞在先関連
  {
    id: 'acc-1',
    question: 'ホームステイと学生寮、どちらがおすすめですか？',
    answer: '目的によって異なります。語学力向上や現地文化を体験したい方にはホームステイ、独立した生活や他国の学生と交流したい方には学生寮がおすすめです。カウンセリングで詳しくご案内します。',
    category: 'accommodation'
  },
  {
    id: 'acc-2',
    question: '滞在先の変更は可能ですか？',
    answer: 'はい、現地到着後の滞在先変更も可能です。ホームステイで相性が合わない場合や、学生寮への移動を希望される場合など、現地サポートスタッフが対応いたします。',
    category: 'accommodation'
  },
  {
    id: 'acc-3',
    question: '食事は提供されますか？',
    answer: 'ホームステイでは朝夕2食または3食付きが一般的です。学生寮はキッチン付き（自炊）または食堂利用となります。プランによって異なるため、詳細はお問い合わせください。',
    category: 'accommodation'
  },

  // サポート関連
  {
    id: 'sup-1',
    question: '現地でのサポートはありますか？',
    answer: 'はい、主要都市には現地サポートオフィスがあり、24時間緊急連絡対応も可能です。到着時のオリエンテーション、銀行口座開設、携帯電話契約などのサポートも行います。',
    category: 'support'
  },
  {
    id: 'sup-2',
    question: '緊急時の連絡先を教えてください',
    answer: '渡航前に24時間対応の緊急連絡先をお知らせします。また、現地オフィスの連絡先、提携病院情報、日本大使館・領事館の連絡先もご案内いたします。',
    category: 'support'
  },
  {
    id: 'sup-3',
    question: '帰国後のサポートはありますか？',
    answer: 'はい、帰国後のキャリア相談や就職サポート、留学経験を活かした進路アドバイスなども提供しています。留学経験者コミュニティへの参加も可能です。',
    category: 'support'
  },
  {
    id: 'sup-4',
    question: '保護者も相談に参加できますか？',
    answer: 'もちろん可能です。未成年の方の留学では、保護者の方とご一緒の相談を推奨しています。オンライン相談も対応しているため、遠方の方もお気軽にご参加ください。',
    category: 'support'
  },
]

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // フィルタリングロジック
  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            よくあるご質問
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            留学に関する疑問にお答えします。解決しない場合はお気軽にご相談ください。
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="キーワードで検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <FaqSection
            categories={FAQ_CATEGORIES}
            items={filteredFaqs}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* No Results */}
          {filteredFaqs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg mb-4">
                該当する質問が見つかりませんでした
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory('all')
                }}
              >
                検索条件をリセット
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
            <MessageCircle className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">
              まだ不安なことがありますか？
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              専門カウンセラーが無料でご相談に応じます。<br />
              あなたの留学の疑問や不安を一緒に解決しましょう。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-6 text-lg rounded-xl shadow-lg"
              >
                <Link href="/consultation">
                  無料相談を予約する
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-xl"
              >
                <Link href="/contact">
                  お問い合わせ
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold mb-1">24時間</div>
                  <div className="text-sm text-blue-100">緊急サポート</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">95%</div>
                  <div className="text-sm text-blue-100">顧客満足度</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">10年</div>
                  <div className="text-sm text-blue-100">サポート実績</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
