import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダーセクション */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">採用情報</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            私たちと一緒に、世界中の学習者の夢を実現するためのプラットフォームを
            創り上げませんか。
          </p>
        </div>

        {/* 募集要項 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">現在募集中のポジション</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* エンジニア */}
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-600">
                  フルスタックエンジニア
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <div className="font-medium mb-2">職務内容</div>
                    <ul className="space-y-1 text-gray-600">
                      <li>• 留学プラットフォームの開発・運用</li>
                      <li>• Next.js/React を使ったフロントエンド開発</li>
                      <li>• Node.js/TypeScript によるバックエンド開発</li>
                      <li>• AWS を活用したクラウドインフラ構築</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium mb-2">求める経験・スキル</div>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Web開発経験 3年以上</li>
                      <li>• React/TypeScript の実務経験</li>
                      <li>• データベース設計・運用経験</li>
                      <li>• 英語での技術文書読解能力</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  雇用形態: 正社員 | 年収: 600万円〜1000万円 | 勤務地: 東京本社・リモート可
                </div>
              </div>

              {/* デザイナー */}
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold mb-3 text-green-600">
                  UI/UXデザイナー
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <div className="font-medium mb-2">職務内容</div>
                    <ul className="space-y-1 text-gray-600">
                      <li>• プラットフォームのUI/UX設計</li>
                      <li>• ユーザージャーニーマップの作成</li>
                      <li>• プロトタイプ作成・ユーザビリティテスト</li>
                      <li>• デザインシステムの構築・運用</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium mb-2">求める経験・スキル</div>
                    <ul className="space-y-1 text-gray-600">
                      <li>• UI/UXデザイン経験 3年以上</li>
                      <li>• Figma/Adobe XD等の実務経験</li>
                      <li>• HTML/CSS の基礎知識</li>
                      <li>• ユーザーリサーチ経験</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  雇用形態: 正社員 | 年収: 500万円〜800万円 | 勤務地: 東京本社・リモート可
                </div>
              </div>

              {/* カウンセラー */}
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold mb-3 text-purple-600">
                  留学カウンセラー
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <div className="font-medium mb-2">職務内容</div>
                    <ul className="space-y-1 text-gray-600">
                      <li>• 留学希望者への個別カウンセリング</li>
                      <li>• 留学プランの提案・見積作成</li>
                      <li>• 学校とのやり取り・申込手続きサポート</li>
                      <li>• 渡航前オリエンテーション実施</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium mb-2">求める経験・スキル</div>
                    <ul className="space-y-1 text-gray-600">
                      <li>• 留学・教育業界経験 2年以上</li>
                      <li>• 英語力（TOEIC800点以上目安）</li>
                      <li>• カウンセリング・接客経験</li>
                      <li>• 留学経験者歓迎</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  雇用形態: 正社員 | 年収: 400万円〜600万円 | 勤務地: 東京本社・大阪支社
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 働く環境 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">働く環境</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-orange-600">福利厚生</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-orange-500 rounded-full mr-2"></span>
                    社会保険完備（健康保険・厚生年金・雇用保険・労災保険）
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-orange-500 rounded-full mr-2"></span>
                    交通費全額支給
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-orange-500 rounded-full mr-2"></span>
                    住宅手当（月3万円まで）
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-orange-500 rounded-full mr-2"></span>
                    語学学習支援制度
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-orange-500 rounded-full mr-2"></span>
                    年1回の海外研修制度
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-orange-600">勤務制度</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-orange-500 rounded-full mr-2"></span>
                    フレックスタイム制（コアタイム10:00-15:00）
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-orange-500 rounded-full mr-2"></span>
                    リモートワーク制度
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-orange-500 rounded-full mr-2"></span>
                    年間休日125日
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-orange-500 rounded-full mr-2"></span>
                    夏季・年末年始休暇
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-orange-500 rounded-full mr-2"></span>
                    育児・介護休業制度
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 選考プロセス */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">選考プロセス</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div className="font-medium text-sm">書類選考</div>
                <div className="text-xs text-gray-500 mt-1">3営業日以内</div>
              </div>
              <div className="hidden md:block text-gray-300">→</div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <div className="font-medium text-sm">一次面接</div>
                <div className="text-xs text-gray-500 mt-1">オンライン面接</div>
              </div>
              <div className="hidden md:block text-gray-300">→</div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <div className="font-medium text-sm">適性検査</div>
                <div className="text-xs text-gray-500 mt-1">性格・能力診断</div>
              </div>
              <div className="hidden md:block text-gray-300">→</div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">4</span>
                </div>
                <div className="font-medium text-sm">最終面接</div>
                <div className="text-xs text-gray-500 mt-1">役員面接</div>
              </div>
              <div className="hidden md:block text-gray-300">→</div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div className="font-medium text-sm">内定</div>
                <div className="text-xs text-gray-500 mt-1">条件面談</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 社員の声 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">社員の声</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">
                    A
                  </div>
                  <div>
                    <div className="font-medium">エンジニア（3年目）</div>
                    <div className="text-sm text-gray-600">フルスタック開発</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  「最新技術を使った開発ができる環境で、常に学習が求められる刺激的な職場です。
                  留学を支援するという社会意義のある仕事に携われることにやりがいを感じています。」
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-green-600 font-bold mr-4">
                    B
                  </div>
                  <div>
                    <div className="font-medium">カウンセラー（2年目）</div>
                    <div className="text-sm text-gray-600">留学サポート</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  「毎日違う相談者の方とお話しし、一人ひとりの夢の実現をサポートできることに
                  大きな喜びを感じています。自分自身の留学経験も活かせる職場です。」
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 応募方法 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">応募方法</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">応募書類</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                    履歴書（写真貼付）
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                    職務経歴書
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                    ポートフォリオ（エンジニア・デザイナーのみ）
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">応募先</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm space-y-1">
                    <div><strong>Email:</strong> recruit@studyabroad-platform.com</div>
                    <div><strong>件名:</strong> [応募職種名]への応募</div>
                    <div><strong>TEL:</strong> 03-1234-5680（採用担当直通）</div>
                    <div className="text-xs text-gray-600 mt-2">
                      ※ ご応募いただいた書類は返却いたしませんので、予めご了承ください。
                    </div>
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