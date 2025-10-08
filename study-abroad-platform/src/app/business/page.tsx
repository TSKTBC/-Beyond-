import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダーセクション */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">事業内容</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            私たちは国際教育の分野において、テクノロジーとヒューマンタッチを融合させた
            包括的なサービスを提供しています。
          </p>
        </div>

        {/* 事業概要 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="text-center">
            <CardContent className="pt-8">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-2">15カ国</h3>
              <p className="text-gray-600 text-sm">対応国・地域数</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-8">
              <div className="text-4xl mb-4">🏫</div>
              <h3 className="text-xl font-semibold mb-2">200校以上</h3>
              <p className="text-gray-600 text-sm">提携教育機関</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-8">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">1,234名</h3>
              <p className="text-gray-600 text-sm">年間サポート実績</p>
            </CardContent>
          </Card>
        </div>

        {/* 主力事業 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">1. 留学プラットフォーム事業</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-blue-600">StudyAbroad Platform</h4>
                <p className="text-gray-600 mb-4">
                  オンラインで留学先の検索から見積作成、申込みまでを完結できる
                  日本初の包括的留学プラットフォームです。
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                    学校検索・比較機能
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                    リアルタイム見積シミュレータ
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                    オンライン申込・書類管理
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                    24時間相談サポート
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-blue-600">主な対応プログラム</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="font-medium">語学留学</div>
                    <div className="font-medium">ワーキングホリデー</div>
                    <div className="font-medium">大学・大学院留学</div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">専門学校留学</div>
                    <div className="font-medium">インターンシップ</div>
                    <div className="font-medium">親子留学</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">2. 国際教育コンサルティング事業</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-green-600">個人向けサービス</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-green-500 rounded-full mr-2 mt-2"></span>
                    <div>
                      <div className="font-medium">留学カウンセリング</div>
                      <div>専任カウンセラーによる個別相談</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-green-500 rounded-full mr-2 mt-2"></span>
                    <div>
                      <div className="font-medium">ビザ申請サポート</div>
                      <div>複雑な手続きを専門スタッフがサポート</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-green-500 rounded-full mr-2 mt-2"></span>
                    <div>
                      <div className="font-medium">渡航前オリエンテーション</div>
                      <div>現地生活の準備から文化適応まで</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-green-500 rounded-full mr-2 mt-2"></span>
                    <div>
                      <div className="font-medium">現地サポート</div>
                      <div>24時間緊急サポート、現地オフィス</div>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-green-600">法人向けサービス</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-green-500 rounded-full mr-2 mt-2"></span>
                    <div>
                      <div className="font-medium">企業研修プログラム</div>
                      <div>グローバル人材育成のための海外研修</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-green-500 rounded-full mr-2 mt-2"></span>
                    <div>
                      <div className="font-medium">海外大学との提携支援</div>
                      <div>日本企業と海外大学のパートナーシップ構築</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-green-500 rounded-full mr-2 mt-2"></span>
                    <div>
                      <div className="font-medium">国際教育戦略立案</div>
                      <div>企業のグローバル戦略をサポート</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">3. 語学学習サポート事業</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-purple-600">渡航前サポート</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 mt-2"></span>
                    <div>
                      <div className="font-medium">オンライン英語コース</div>
                      <div>留学前の基礎力向上プログラム</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 mt-2"></span>
                    <div>
                      <div className="font-medium">英語試験対策</div>
                      <div>IELTS、TOEFL、TOEIC対策コース</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 mt-2"></span>
                    <div>
                      <div className="font-medium">スピーキング強化</div>
                      <div>ネイティブ講師とのマンツーマンレッスン</div>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-purple-600">帰国後サポート</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 mt-2"></span>
                    <div>
                      <div className="font-medium">キャリアカウンセリング</div>
                      <div>留学経験を活かした就職・転職支援</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 mt-2"></span>
                    <div>
                      <div className="font-medium">英語力維持プログラム</div>
                      <div>留学で身につけた語学力の維持・向上</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 mt-2"></span>
                    <div>
                      <div className="font-medium">卒業生ネットワーク</div>
                      <div>同じ経験を持つ仲間とのコミュニティ</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* パートナーシップ */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">パートナーシップ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-orange-600">教育機関</h4>
                <p className="text-sm text-gray-600 mb-3">
                  世界15カ国200校以上の厳選された教育機関と提携
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• 語学学校</li>
                  <li>• 専門学校</li>
                  <li>• 大学・大学院</li>
                  <li>• 職業訓練校</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-orange-600">企業・団体</h4>
                <p className="text-sm text-gray-600 mb-3">
                  国内外の企業、NPO、政府機関との連携
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• 航空会社</li>
                  <li>• 保険会社</li>
                  <li>• 宿泊施設</li>
                  <li>• 現地サポート機関</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-orange-600">技術パートナー</h4>
                <p className="text-sm text-gray-600 mb-3">
                  最新テクノロジーを活用したサービス向上
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• AI・機械学習</li>
                  <li>• 決済システム</li>
                  <li>• CRM・SFA</li>
                  <li>• クラウドサービス</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 品質への取り組み */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">品質への取り組み</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-red-600">認証・資格</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    J-CROSS（一般社団法人海外留学協議会）加盟
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    ISO27001（情報セキュリティマネジメント）認証
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    プライバシーマーク認定
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-red-600">顧客満足度</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">総合満足度</span>
                    <span className="font-bold text-lg text-red-600">98%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">リピート率</span>
                    <span className="font-bold text-lg text-red-600">85%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">友人紹介率</span>
                    <span className="font-bold text-lg text-red-600">72%</span>
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