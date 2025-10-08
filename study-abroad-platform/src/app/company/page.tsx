import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダーセクション */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">企業情報</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            私たちStudyAbroadは、一人ひとりの夢を実現する留学サポートを通じて、
            国際社会で活躍する人材の育成に貢献しています。
          </p>
        </div>

        {/* 会社概要 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">会社概要</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="font-medium text-gray-700">会社名</div>
                  <div className="col-span-2">株式会社StudyAbroad Platform</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="font-medium text-gray-700">設立</div>
                  <div className="col-span-2">2020年4月1日</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="font-medium text-gray-700">資本金</div>
                  <div className="col-span-2">1億円</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="font-medium text-gray-700">従業員数</div>
                  <div className="col-span-2">120名（2024年9月現在）</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="font-medium text-gray-700">代表取締役</div>
                  <div className="col-span-2">田中 太郎</div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="font-medium text-gray-700">本社所在地</div>
                  <div className="col-span-2">
                    〒100-0001<br />
                    東京都千代田区千代田1-1-1<br />
                    StudyAbroadビル10F
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="font-medium text-gray-700">事業内容</div>
                  <div className="col-span-2">
                    留学プラットフォーム事業<br />
                    国際教育コンサルティング<br />
                    語学学習サポート事業
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="font-medium text-gray-700">提携校数</div>
                  <div className="col-span-2">世界15カ国 200校以上</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 沿革 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">沿革</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="w-20 flex-shrink-0 font-bold text-blue-600">2020年</div>
                <div>
                  <div className="font-semibold">4月</div>
                  <div className="text-gray-600 mt-1">株式会社StudyAbroad Platform設立</div>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-20 flex-shrink-0 font-bold text-blue-600">2021年</div>
                <div>
                  <div className="font-semibold">3月</div>
                  <div className="text-gray-600 mt-1">カナダ・オーストラリアの語学学校20校と提携開始</div>
                  <div className="font-semibold mt-3">8月</div>
                  <div className="text-gray-600 mt-1">留学プラットフォーム「StudyAbroad」正式リリース</div>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-20 flex-shrink-0 font-bold text-blue-600">2022年</div>
                <div>
                  <div className="font-semibold">1月</div>
                  <div className="text-gray-600 mt-1">アメリカ・イギリスの提携校拡大（累計50校）</div>
                  <div className="font-semibold mt-3">9月</div>
                  <div className="text-gray-600 mt-1">見積シミュレータ機能リリース</div>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-20 flex-shrink-0 font-bold text-blue-600">2023年</div>
                <div>
                  <div className="font-semibold">4月</div>
                  <div className="text-gray-600 mt-1">大阪支社開設</div>
                  <div className="font-semibold mt-3">11月</div>
                  <div className="text-gray-600 mt-1">提携校数100校突破、累計利用者1,000名達成</div>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-20 flex-shrink-0 font-bold text-blue-600">2024年</div>
                <div>
                  <div className="font-semibold">2月</div>
                  <div className="text-gray-600 mt-1">ニュージーランド・アイルランドへ展開</div>
                  <div className="font-semibold mt-3">9月</div>
                  <div className="text-gray-600 mt-1">提携校数200校突破、次世代プラットフォーム開発開始</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* アクセス */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">アクセス</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">本社</h3>
                <div className="space-y-2 text-sm">
                  <div>〒100-0001</div>
                  <div>東京都千代田区千代田1-1-1</div>
                  <div>StudyAbroadビル10F</div>
                  <div className="mt-4">
                    <div className="font-medium">アクセス</div>
                    <div>JR東京駅より徒歩5分</div>
                    <div>地下鉄大手町駅より徒歩3分</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">大阪支社</h3>
                <div className="space-y-2 text-sm">
                  <div>〒530-0001</div>
                  <div>大阪府大阪市北区梅田2-2-2</div>
                  <div>梅田センタービル15F</div>
                  <div className="mt-4">
                    <div className="font-medium">アクセス</div>
                    <div>JR大阪駅より徒歩8分</div>
                    <div>阪急梅田駅より徒歩5分</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* お問い合わせ */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">お問い合わせ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">一般のお客様</h3>
                <div className="space-y-2 text-sm">
                  <div>TEL: 03-1234-5678</div>
                  <div>Email: info@studyabroad-platform.com</div>
                  <div>受付時間: 平日 9:00-18:00</div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">報道・メディア関係者様</h3>
                <div className="space-y-2 text-sm">
                  <div>TEL: 03-1234-5679</div>
                  <div>Email: press@studyabroad-platform.com</div>
                  <div>受付時間: 平日 10:00-17:00</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}