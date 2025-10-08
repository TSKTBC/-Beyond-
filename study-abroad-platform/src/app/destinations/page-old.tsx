import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダーセクション */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">留学先ガイド</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            世界15カ国の留学先情報を詳しくご紹介。
            あなたにぴったりの留学先を見つけてください。
          </p>
        </div>

        {/* 人気の留学先 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* アメリカ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <span className="text-3xl mr-3">🇺🇸</span>
                アメリカ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">おすすめポイント</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 世界トップレベルの大学・研究機関</li>
                    <li>• 多様性に富んだ国際的な環境</li>
                    <li>• 豊富な奨学金制度</li>
                    <li>• 実践的なインターンシップ機会</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">人気都市</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>ニューヨーク</div>
                    <div>ロサンゼルス</div>
                    <div>ボストン</div>
                    <div>サンフランシスコ</div>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded text-xs">
                  <div><strong>語学要件:</strong> TOEFL 80+ / IELTS 6.5+</div>
                  <div><strong>年間費用目安:</strong> 300-600万円</div>
                  <div><strong>ビザ:</strong> F-1学生ビザ</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* カナダ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <span className="text-3xl mr-3">🇨🇦</span>
                カナダ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">おすすめポイント</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 治安が良く、親日的な国民性</li>
                    <li>• 英語とフランス語の2言語習得可能</li>
                    <li>• ワーキングホリデー制度あり</li>
                    <li>• 移民制度が充実</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">人気都市</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>トロント</div>
                    <div>バンクーバー</div>
                    <div>モントリオール</div>
                    <div>カルガリー</div>
                  </div>
                </div>
                <div className="bg-red-50 p-3 rounded text-xs">
                  <div><strong>語学要件:</strong> IELTS 6.0+ / TOEFL 80+</div>
                  <div><strong>年間費用目安:</strong> 250-400万円</div>
                  <div><strong>ビザ:</strong> 学生ビザ / ワーホリビザ</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* イギリス */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <span className="text-3xl mr-3">🇬🇧</span>
                イギリス
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-purple-600 mb-2">おすすめポイント</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 伝統ある名門大学群</li>
                    <li>• 英語発祥の地でクイーンズイングリッシュ</li>
                    <li>• ヨーロッパ各国へのアクセス良好</li>
                    <li>• 短期間で学位取得可能</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-600 mb-2">人気都市</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>ロンドン</div>
                    <div>オックスフォード</div>
                    <div>ケンブリッジ</div>
                    <div>エディンバラ</div>
                  </div>
                </div>
                <div className="bg-purple-50 p-3 rounded text-xs">
                  <div><strong>語学要件:</strong> IELTS 6.5+ / TOEFL 90+</div>
                  <div><strong>年間費用目安:</strong> 350-500万円</div>
                  <div><strong>ビザ:</strong> Tier 4学生ビザ</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* オーストラリア */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <span className="text-3xl mr-3">🇦🇺</span>
                オーストラリア
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-orange-600 mb-2">おすすめポイント</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 温暖な気候と自然豊かな環境</li>
                    <li>• 学生ビザでアルバイト可能</li>
                    <li>• 実践的な職業教育制度（TAFE）</li>
                    <li>• 多文化共生社会</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-600 mb-2">人気都市</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>シドニー</div>
                    <div>メルボルン</div>
                    <div>ブリスベン</div>
                    <div>パース</div>
                  </div>
                </div>
                <div className="bg-orange-50 p-3 rounded text-xs">
                  <div><strong>語学要件:</strong> IELTS 6.0+ / TOEFL 80+</div>
                  <div><strong>年間費用目安:</strong> 280-450万円</div>
                  <div><strong>ビザ:</strong> 学生ビザ / ワーホリビザ</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ヨーロッパ諸国 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">ヨーロッパ諸国</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-2">🇩🇪</div>
                <h3 className="font-semibold mb-2">ドイツ</h3>
                <p className="text-sm text-gray-600 mb-2">
                  工学・技術分野に強み。多くの大学で学費無料。
                </p>
                <div className="text-xs text-gray-500">
                  人気都市: ベルリン、ミュンヘン、ハンブルク
                </div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-2">🇫🇷</div>
                <h3 className="font-semibold mb-2">フランス</h3>
                <p className="text-sm text-gray-600 mb-2">
                  芸術・文化・料理の本場。EU内で学費が比較的安い。
                </p>
                <div className="text-xs text-gray-500">
                  人気都市: パリ、リヨン、マルセイユ
                </div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-2">🇪🇸</div>
                <h3 className="font-semibold mb-2">スペイン</h3>
                <p className="text-sm text-gray-600 mb-2">
                  スペイン語習得とヨーロッパ文化体験。生活費が安い。
                </p>
                <div className="text-xs text-gray-500">
                  人気都市: マドリード、バルセロナ、セビリア
                </div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-2">🇮🇹</div>
                <h3 className="font-semibold mb-2">イタリア</h3>
                <p className="text-sm text-gray-600 mb-2">
                  芸術・デザイン・料理を学ぶのに最適。歴史ある大学多数。
                </p>
                <div className="text-xs text-gray-500">
                  人気都市: ローマ、ミラノ、フィレンツェ
                </div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-2">🇳🇱</div>
                <h3 className="font-semibold mb-2">オランダ</h3>
                <p className="text-sm text-gray-600 mb-2">
                  英語で学位取得可能。国際的なビジネス環境。
                </p>
                <div className="text-xs text-gray-500">
                  人気都市: アムステルダム、ロッテルダム
                </div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-2">🇨🇭</div>
                <h3 className="font-semibold mb-2">スイス</h3>
                <p className="text-sm text-gray-600 mb-2">
                  ホテル・観光業の世界的教育機関。多言語環境。
                </p>
                <div className="text-xs text-gray-500">
                  人気都市: チューリッヒ、ジュネーブ、ローザンヌ
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* その他の国々 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">その他の人気留学先</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-2">🇳🇿</div>
                <h3 className="font-semibold mb-2">ニュージーランド</h3>
                <p className="text-sm text-gray-600">
                  自然豊かで治安良好。少人数制の質の高い教育。
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-2">🇮🇪</div>
                <h3 className="font-semibold mb-2">アイルランド</h3>
                <p className="text-sm text-gray-600">
                  英語圏で学費が比較的安い。IT産業が盛ん。
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-2">🇲🇹</div>
                <h3 className="font-semibold mb-2">マルタ</h3>
                <p className="text-sm text-gray-600">
                  地中海の美しい島国。英語学習に最適。
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-2">🇸🇬</div>
                <h3 className="font-semibold mb-2">シンガポール</h3>
                <p className="text-sm text-gray-600">
                  アジアの金融・ビジネスハブ。多民族国家。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 留学先選択のポイント */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">留学先選択のポイント</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-600">学習面での検討事項</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                    希望する専攻分野の充実度
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                    大学・学校のランキングと評判
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                    語学要件と入学難易度
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                    卒業後の就職・進学実績
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                    奨学金制度の有無
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-600">生活面での検討事項</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                    治安と安全性
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                    生活費と物価水準
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                    気候と自然環境
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                    文化・言語環境
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                    アルバイト・就労の可能性
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 費用比較 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">国別費用比較（年間目安）</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">国名</th>
                    <th className="text-right py-2">学費</th>
                    <th className="text-right py-2">生活費</th>
                    <th className="text-right py-2">合計</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b">
                    <td className="py-2">🇺🇸 アメリカ</td>
                    <td className="text-right">200-400万円</td>
                    <td className="text-right">100-200万円</td>
                    <td className="text-right font-medium">300-600万円</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">🇬🇧 イギリス</td>
                    <td className="text-right">200-350万円</td>
                    <td className="text-right">150-150万円</td>
                    <td className="text-right font-medium">350-500万円</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">🇨🇦 カナダ</td>
                    <td className="text-right">150-250万円</td>
                    <td className="text-right">100-150万円</td>
                    <td className="text-right font-medium">250-400万円</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">🇦🇺 オーストラリア</td>
                    <td className="text-right">180-300万円</td>
                    <td className="text-right">100-150万円</td>
                    <td className="text-right font-medium">280-450万円</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">🇩🇪 ドイツ</td>
                    <td className="text-right">0-50万円</td>
                    <td className="text-right">80-120万円</td>
                    <td className="text-right font-medium">80-170万円</td>
                  </tr>
                  <tr>
                    <td className="py-2">🇫🇷 フランス</td>
                    <td className="text-right">20-150万円</td>
                    <td className="text-right">80-120万円</td>
                    <td className="text-right font-medium">100-270万円</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              ※ 費用は為替レートや学校により変動します。詳細は個別にお見積りいたします。
            </p>
          </CardContent>
        </Card>

        {/* 留学先相談 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">留学先選びのご相談</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-3">無料カウンセリング実施中</h3>
                <p className="text-sm text-blue-700 mb-4">
                  あなたの目標や予算、興味に合わせて最適な留学先をご提案いたします。
                  経験豊富なカウンセラーが親身になってサポートします。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium">個別カウンセリング内容</div>
                    <ul className="text-blue-600 space-y-1 mt-2">
                      <li>• 目標・希望の詳細ヒアリング</li>
                      <li>• 最適な国・都市のご提案</li>
                      <li>• 学校・プログラム選定</li>
                      <li>• 費用シミュレーション</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium">相談方法</div>
                    <ul className="text-blue-600 space-y-1 mt-2">
                      <li>• 対面相談（東京・大阪）</li>
                      <li>• オンライン相談</li>
                      <li>• 電話相談</li>
                      <li>• メール相談</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">お申込み・お問い合わせ</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl mb-2">📞</div>
                    <div className="font-medium">電話相談</div>
                    <div className="text-sm text-gray-600 mt-1">03-1234-5678</div>
                    <div className="text-xs text-gray-500">平日 9:00-18:00</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl mb-2">💻</div>
                    <div className="font-medium">オンライン予約</div>
                    <div className="text-sm text-gray-600 mt-1">24時間受付</div>
                    <div className="text-xs text-gray-500">カレンダーから選択</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl mb-2">📧</div>
                    <div className="font-medium">メール相談</div>
                    <div className="text-sm text-gray-600 mt-1">destinations@studyabroad-platform.com</div>
                    <div className="text-xs text-gray-500">24時間以内に返信</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}