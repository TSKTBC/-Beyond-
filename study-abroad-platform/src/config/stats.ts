// プラットフォームの統計データ
// このファイルを編集して実際の数値を更新できます

export interface PlatformStats {
  partnerSchools: number
  successfulStudents: number
  satisfactionRate: number
  lastUpdated: string
}

// 実際の統計データ
// 顧客評価や実績に応じて更新してください
export const stats: PlatformStats = {
  // 提携校数
  partnerSchools: 200,

  // 成功した留学生数（帰国後の評価を含む）
  successfulStudents: 1200,

  // 満足度（パーセンテージ）
  satisfactionRate: 98,

  // 最終更新日
  lastUpdated: '2025-01-01'
}

// 統計データの表示フォーマット
export const formatStats = {
  partnerSchools: (value: number) => `${value}+`,
  successfulStudents: (value: number) => `${value.toLocaleString()}+`,
  satisfactionRate: (value: number) => `${value}%`
}

// 統計データの説明
export const statsLabels = {
  partnerSchools: '提携校',
  successfulStudents: '成功者',
  satisfactionRate: '満足度'
}
