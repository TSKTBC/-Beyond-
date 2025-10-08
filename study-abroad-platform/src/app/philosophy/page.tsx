'use client'

import { Heart, Target, Users, Globe, Lightbulb, Award } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PhilosophyPage() {
  const coreValues = [
    { icon: Heart, title: '学習者ファースト', color: 'from-rose-400 to-pink-500' },
    { icon: Target, title: '透明性と誠実性', color: 'from-emerald-400 to-teal-500' },
    { icon: Lightbulb, title: '継続的な学習と成長', color: 'from-amber-400 to-orange-500' },
    { icon: Award, title: 'イノベーション', color: 'from-blue-400 to-indigo-500' },
    { icon: Users, title: '多様性と包括性', color: 'from-purple-400 to-pink-500' },
    { icon: Globe, title: '社会への還元', color: 'from-cyan-400 to-blue-500' },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50/50 via-white to-teal-50/30">
      {/* ヒーローセクション */}
      <section className="relative py-20 bg-gradient-to-r from-emerald-500 to-teal-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            私たちの経営理念
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 leading-relaxed">
            すべては、あなたの夢を叶えるために。<br />
            Beyond − 限界を超えて、新しい自分へ。
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ミッションステートメント */}
        <div className="mb-12">
          <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-2xl">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
              <p className="text-xl leading-relaxed text-center text-emerald-50">
                世界を舞台に活躍する人材を育成し、グローバル社会の発展に貢献する
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ミッション */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-600">ミッション</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold mb-4">留学の壁を取り払い、誰もが世界に挑戦できる社会を創る</h3>
            <p className="text-gray-600 leading-relaxed">
              留学には多くの不安や障壁が存在します。言語の壁、費用の不透明さ、情報の複雑さ、手続きの煩雑さ。
              私たちはテクノロジーとヒューマンタッチを組み合わせたサービスで、これらの壁を一つずつ取り払います。
              年齢、経験、経済状況に関係なく、すべての人が世界への扉を開けるようサポートすることが私たちのミッションです。
            </p>
          </CardContent>
        </Card>

        {/* ビジョン */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-600">ビジョン</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold mb-4">2030年、日本発の国際教育プラットフォームとして世界をリードする</h3>
            <div className="space-y-4 text-gray-600">
              <p className="leading-relaxed">
                2030年までに、アジア太平洋地域最大の国際教育プラットフォームとして、
                年間10万人の学習者をサポートし、世界1,000校以上の教育機関との
                パートナーシップを構築することを目指しています。
              </p>
              <p className="leading-relaxed">
                単なる留学仲介に留まらず、出発前の語学学習から帰国後のキャリアサポートまで、
                一貫した国際教育エコシステムを提供し、
                グローバル人材育成のスタンダードを作り上げます。
              </p>
            </div>
          </CardContent>
        </Card>

        {/* バリュー */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
              6つのコアバリュー
            </h2>
            <p className="text-lg text-gray-600">
              私たちが大切にしている価値観と行動指針
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                  {index === 0 && <p className="text-gray-600">すべての判断の中心に学習者を置き、彼らの成長と成功を最優先に考えます。</p>}
                  {index === 1 && <p className="text-gray-600">費用、サービス内容、リスクまで、すべてを正直に開示します。</p>}
                  {index === 2 && <p className="text-gray-600">国際教育の最新動向を常にキャッチアップし、学び続ける組織文化を大切にします。</p>}
                  {index === 3 && <p className="text-gray-600">従来のやり方に捉われず、テクノロジーを活用して留学体験を革新し続けます。</p>}
                  {index === 4 && <p className="text-gray-600">あらゆる背景を持つ人々を尊重し、多様な価値観が共存する環境を作ります。</p>}
                  {index === 5 && <p className="text-gray-600">事業を通じて社会課題の解決に貢献し、持続可能な未来の実現に取り組みます。</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 代表メッセージ */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-600">代表取締役からのメッセージ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-gray-200 aspect-square rounded-lg flex items-center justify-center text-gray-500">
                  <span className="text-6xl">👤</span>
                </div>
                <div className="text-center mt-4">
                  <div className="font-semibold">田中 太郎</div>
                  <div className="text-sm text-gray-600">代表取締役CEO</div>
                </div>
              </div>
              <div className="md:w-2/3 space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  私自身、大学時代にカナダに留学した経験があります。そこで得た語学力、異文化理解、
                  そして何より「世界は思っているより身近で、挑戦すれば道は開ける」という確信が、
                  今の私の人生を大きく変えました。
                </p>
                <p className="leading-relaxed">
                  しかし、留学を検討する多くの方が、情報の複雑さや手続きの煩雑さに戸惑い、
                  せっかくの挑戦を諦めてしまうのを見てきました。この現状を変えたい、
                  もっと多くの人に世界への扉を開いてほしいという想いから、
                  StudyAbroad Platformを創業しました。
                </p>
                <p className="leading-relaxed">
                  私たちは、留学が特別な人だけのものではなく、
                  誰もがアクセスできる成長の機会であることを証明し続けます。
                  一人ひとりの夢の実現をサポートし、より良い未来を共に創造していきましょう。
                </p>
                <div className="text-right pt-4">
                  <div className="text-lg">田中 太郎</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}