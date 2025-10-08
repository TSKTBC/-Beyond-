'use client'

import { Mail, Linkedin, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function TeamPage() {
  const teamMembers = [
    {
      name: '田中 健太',
      role: '代表取締役 CEO',
      experience: 'ハーバード大学MBA',
      bio: 'アメリカ・イギリスでの留学経験を活かし、日本の若者に質の高い留学支援を提供することを使命としています。',
      emoji: '👨‍💼',
      specialties: ['留学相談', '経営戦略', '国際教育']
    },
    {
      name: '佐藤 美咲',
      role: 'COO / カウンセリング責任者',
      experience: 'カナダ・トロント大学 教育学修士',
      bio: '10年以上のカウンセリング経験を持ち、学生一人ひとりに寄り添った丁寧なサポートを心がけています。',
      emoji: '👩‍🏫',
      specialties: ['学生サポート', 'キャリア相談', '進路指導']
    },
    {
      name: '山田 拓也',
      role: 'CTO / テクノロジー責任者',
      experience: 'スタンフォード大学 CS',
      bio: '最新テクノロジーを活用し、より効率的でユーザーフレンドリーな留学プラットフォームの開発に注力しています。',
      emoji: '👨‍💻',
      specialties: ['開発戦略', 'AI/ML', '教育技術']
    },
    {
      name: '鈴木 優子',
      role: '留学カウンセラー',
      experience: 'オーストラリア留学経験 + 教育心理学',
      bio: '特に語学留学や大学進学を希望する方々への親身なカウンセリングが得意です。',
      emoji: '👩‍🎓',
      specialties: ['語学留学指導', '大学選定支援', 'ビザ申請']
    },
    {
      name: '高橋 誠',
      role: 'マーケター',
      experience: 'イギリス・ロンドン大学ビジネス + デジタルマーケ',
      bio: '留学の魅力を多くの人に伝えるため、データドリブンなマーケティング施策を実施しています。',
      emoji: '👨‍💼',
      specialties: ['デジタルマーケ', 'SNS運用', 'イベント企画']
    },
    {
      name: '中村 恵',
      role: 'デザイナー',
      experience: 'アメリカ・パーソンズ美術大学 芸術学',
      bio: '美しく使いやすいUIデザインで、ユーザーに寄り添った体験を創造することを大切にしています。',
      emoji: '👩‍🎨',
      specialties: ['UI/UXデザイン', 'ブランディング', 'クリエイティブ戦略']
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 via-white to-teal-50/30">
      {/* ヒーローセクション */}
      <section className="relative py-20 bg-gradient-to-r from-emerald-500 to-teal-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            私たちについて
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 leading-relaxed">
            世界で学ぶ喜びを、すべての人に。<br />
            あなたの夢を実現するパートナーであり続けます。
          </p>
        </div>
      </section>

      {/* チームメンバー */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
              経験豊富なチーム
            </h2>
            <p className="text-lg text-gray-600">
              世界各国での留学経験を持つプロフェッショナルが、あなたをサポートします
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-8 text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white flex items-center justify-center text-6xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {member.emoji}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-emerald-100 font-semibold">{member.role}</p>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-emerald-700 font-semibold mb-2">
                      <Globe className="w-4 h-4" />
                      留学経験
                    </div>
                    <p className="text-sm text-gray-600">{member.experience}</p>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                    {member.bio}
                  </p>

                  <div className="border-t pt-4">
                    <p className="text-xs font-semibold text-gray-500 mb-2">専門分野</p>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, idx) => (
                        <span key={idx} className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 私たちの強み */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
              私たちの強み
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: '世界で学ぶ喜び',
                description: '自分自身が世界各地で学んだ経験から、留学のすばらしさを心からあなたに伝えられます。'
              },
              {
                title: '豊富なネットワーク',
                description: '200校以上の信頼できる提携校とのネットワークを活かし、あなたに最適な学校を見つけます。'
              },
              {
                title: '一人ひとりに寄り添う',
                description: '大切なお一人お一人のご要望に寄り添い、最適なプランをご提案します。'
              },
              {
                title: '最新技術と安心サポート',
                description: '現地でも24時間サポート体制を整え、安心して学べる環境をご提供します。'
              },
            ].map((strength, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{strength.title}</h3>
                <p className="text-gray-600">{strength.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            まずはお気軽にご相談ください
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            経験豊富なチームが、あなたの夢の実現をサポートします
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/estimator"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              30秒で費用見積もり
            </a>
            <a
              href="/consultation"
              className="px-8 py-4 bg-white border-2 border-emerald-500 text-emerald-700 font-bold rounded-lg hover:bg-emerald-50 transition-all"
            >
              無料相談予約
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
