import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダーセクション */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">サービス詳細</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            留学前の準備から帰国後のキャリアサポートまで、
            一人ひとりの夢を実現する包括的なサービスをご提供します。
          </p>
        </div>

        {/* サービス一覧 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* 留学相談・カウンセリング */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">留学相談・カウンセリング</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  経験豊富な専門カウンセラーが、あなたの目標や状況に合わせて
                  最適な留学プランをご提案します。
                </p>
                <div>
                  <h4 className="font-semibold mb-2">サービス内容</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 個別カウンセリング（初回無料）</li>
                    <li>• 留学目標の明確化</li>
                    <li>• 国・都市・学校選定</li>
                    <li>• 学習プラン作成</li>
                    <li>• 費用シミュレーション</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-3 rounded text-xs">
                  <div><strong>料金:</strong> 初回無料、継続相談 月額5,000円</div>
                  <div><strong>形式:</strong> 対面・オンライン・電話対応</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 学校申込み・手続き代行 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-green-600">学校申込み・手続き代行</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  複雑な申請書類の作成から入学手続きまで、
                  全ての手続きを専門スタッフが代行いたします。
                </p>
                <div>
                  <h4 className="font-semibold mb-2">サービス内容</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 入学申請書類作成・提出</li>
                    <li>• 英文書類の翻訳・認証</li>
                    <li>• 学校との連絡・交渉</li>
                    <li>• 入学許可書取得</li>
                    <li>• 授業料送金代行</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-3 rounded text-xs">
                  <div><strong>料金:</strong> 50,000円〜（学校により変動）</div>
                  <div><strong>期間:</strong> 申請から入学許可まで2-8週間</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ビザ申請サポート */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-purple-600">ビザ申請サポート</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  各国のビザ要件に精通した専門スタッフが、
                  確実なビザ取得をサポートします。
                </p>
                <div>
                  <h4 className="font-semibold mb-2">サービス内容</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• ビザ要件の確認・説明</li>
                    <li>• 申請書類の準備・チェック</li>
                    <li>• 大使館・領事館との連絡</li>
                    <li>• 面接対策（必要な場合）</li>
                    <li>• 申請代行・受取代行</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-3 rounded text-xs">
                  <div><strong>料金:</strong> 30,000円〜（国により変動）</div>
                  <div><strong>成功率:</strong> 98%（過去3年実績）</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 宿泊先手配 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">宿泊先手配</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  厳選されたホームステイファミリーや学生寮、
                  シェアハウスなど最適な宿泊先をご紹介します。
                </p>
                <div>
                  <h4 className="font-semibold mb-2">宿泊先オプション</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• ホームステイ（食事付き・なし）</li>
                    <li>• 学生寮・レジデンス</li>
                    <li>• シェアハウス・アパート</li>
                    <li>• 短期滞在ホテル・ゲストハウス</li>
                    <li>• 一人暮らし物件紹介</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-3 rounded text-xs">
                  <div><strong>料金:</strong> 手配料20,000円〜</div>
                  <div><strong>サポート:</strong> 到着後の住居変更も対応</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 渡航前オリエンテーション */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-red-600">渡航前オリエンテーション</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  現地での生活をスムーズにスタートできるよう、
                  実践的な情報とアドバイスをお伝えします。
                </p>
                <div>
                  <h4 className="font-semibold mb-2">オリエンテーション内容</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 現地の生活情報・文化</li>
                    <li>• 緊急時の対応方法</li>
                    <li>• 銀行口座開設・携帯契約</li>
                    <li>• 交通機関の利用方法</li>
                    <li>• 現地日本人コミュニティ情報</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-3 rounded text-xs">
                  <div><strong>開催:</strong> 毎月第3土曜日・渡航1ヶ月前</div>
                  <div><strong>形式:</strong> グループセッション・個別対応</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 現地サポート */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-teal-600">現地サポート</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  現地到着から滞在中まで、24時間体制で
                  安心・安全な留学生活をサポートします。
                </p>
                <div>
                  <h4 className="font-semibold mb-2">サポート内容</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 空港出迎え・初日案内</li>
                    <li>• 24時間緊急サポート</li>
                    <li>• 定期カウンセリング</li>
                    <li>• 学校・ホストファミリーとの仲介</li>
                    <li>• 病院同行・各種手続きサポート</li>
                  </ul>
                </div>
                <div className="bg-teal-50 p-3 rounded text-xs">
                  <div><strong>拠点:</strong> 主要都市に現地オフィス設置</div>
                  <div><strong>対応:</strong> 日本語・英語バイリンガルスタッフ</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 英語学習サポート */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-indigo-600">英語学習サポート</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  渡航前の準備から帰国後の継続学習まで、
                  一貫した英語学習をサポートします。
                </p>
                <div>
                  <h4 className="font-semibold mb-2">学習プログラム</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 渡航前英語準備コース</li>
                    <li>• IELTS・TOEFL試験対策</li>
                    <li>• オンライン個別指導</li>
                    <li>• 帰国後英語力維持プログラム</li>
                    <li>• ビジネス英語コース</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 p-3 rounded text-xs">
                  <div><strong>講師:</strong> ネイティブ・日本人バイリンガル講師</div>
                  <div><strong>形式:</strong> 個別・グループ・オンライン</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 帰国後キャリアサポート */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-pink-600">帰国後キャリアサポート</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  留学経験を活かしたキャリア形成を、
                  専門カウンセラーがサポートします。
                </p>
                <div>
                  <h4 className="font-semibold mb-2">サポート内容</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• キャリアカウンセリング</li>
                    <li>• 履歴書・職務経歴書作成支援</li>
                    <li>• 面接対策・練習</li>
                    <li>• 求人情報紹介</li>
                    <li>• 卒業生ネットワーク紹介</li>
                  </ul>
                </div>
                <div className="bg-pink-50 p-3 rounded text-xs">
                  <div><strong>実績:</strong> 就職成功率87%（帰国後6ヶ月以内）</div>
                  <div><strong>期間:</strong> 帰国後1年間無料サポート</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* サービス料金体系 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">料金体系</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">パッケージプラン</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-6 text-center">
                    <h4 className="text-xl font-bold text-blue-600 mb-2">ベーシックプラン</h4>
                    <div className="text-2xl font-bold mb-4">150,000円</div>
                    <ul className="text-sm text-left space-y-2">
                      <li>✓ 留学相談・カウンセリング</li>
                      <li>✓ 学校申込み代行</li>
                      <li>✓ 基本的な渡航前サポート</li>
                      <li>✓ 現地緊急サポート</li>
                    </ul>
                    <div className="text-xs text-gray-500 mt-4">短期留学（3ヶ月以内）向け</div>
                  </div>
                  <div className="border-2 border-blue-500 rounded-lg p-6 text-center bg-blue-50">
                    <h4 className="text-xl font-bold text-blue-600 mb-2">スタンダードプラン</h4>
                    <div className="text-2xl font-bold mb-4">250,000円</div>
                    <ul className="text-sm text-left space-y-2">
                      <li>✓ ベーシックプラン全サービス</li>
                      <li>✓ ビザ申請サポート</li>
                      <li>✓ 宿泊先手配</li>
                      <li>✓ 英語学習サポート</li>
                      <li>✓ 現地定期カウンセリング</li>
                    </ul>
                    <div className="text-xs text-gray-500 mt-4">長期留学（6ヶ月〜1年）向け</div>
                  </div>
                  <div className="border rounded-lg p-6 text-center">
                    <h4 className="text-xl font-bold text-blue-600 mb-2">プレミアムプラン</h4>
                    <div className="text-2xl font-bold mb-4">400,000円</div>
                    <ul className="text-sm text-left space-y-2">
                      <li>✓ スタンダードプラン全サービス</li>
                      <li>✓ 個別英語指導（月8回）</li>
                      <li>✓ 24時間専任サポート</li>
                      <li>✓ 帰国後キャリアサポート</li>
                      <li>✓ 保護者向けレポート</li>
                    </ul>
                    <div className="text-xs text-gray-500 mt-4">正規留学・大学院留学向け</div>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">料金に関する注意事項</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• 学校の授業料・宿泊費・渡航費は別途必要です</li>
                  <li>• 為替レートにより費用が変動する場合があります</li>
                  <li>• 分割払い・学費ローンのご相談も承ります</li>
                  <li>• 詳細な見積もりは無料で作成いたします</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* お客様サポート */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">お客様サポート体制</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-600">サポート時間</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>平日（月〜金）</span>
                    <span>9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>土曜日</span>
                    <span>10:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>緊急サポート</span>
                    <span>24時間対応</span>
                  </div>
                  <div className="flex justify-between">
                    <span>オンライン相談</span>
                    <span>土日祝日も対応</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-600">連絡方法</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="w-16">電話</span>
                    <span>03-1234-5678</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-16">メール</span>
                    <span>support@studyabroad-platform.com</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-16">LINE</span>
                    <span>@studyabroad-platform</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-16">オンライン</span>
                    <span>Zoom・Skype対応</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* サービス開始までの流れ */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">サービス開始までの流れ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div className="font-medium text-sm">無料相談</div>
                <div className="text-xs text-gray-500 mt-1">目標・希望をヒアリング</div>
              </div>
              <div className="hidden md:block text-gray-300">→</div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <div className="font-medium text-sm">プラン提案</div>
                <div className="text-xs text-gray-500 mt-1">最適なサービスをご提案</div>
              </div>
              <div className="hidden md:block text-gray-300">→</div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <div className="font-medium text-sm">契約・お支払い</div>
                <div className="text-xs text-gray-500 mt-1">サービス契約締結</div>
              </div>
              <div className="hidden md:block text-gray-300">→</div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 font-bold">4</span>
                </div>
                <div className="font-medium text-sm">サポート開始</div>
                <div className="text-xs text-gray-500 mt-1">留学準備スタート</div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <div className="bg-blue-50 p-4 rounded-lg inline-block">
                <div className="font-medium text-blue-800 mb-2">まずは無料相談から始めませんか？</div>
                <div className="text-sm text-blue-600">
                  お電話・オンライン・メールでお気軽にお問い合わせください
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}