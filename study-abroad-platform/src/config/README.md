# 統計データの更新方法

このディレクトリには、プラットフォームの統計データが含まれています。

## stats.ts

ヒーローセクションに表示される統計データを管理します。

### 更新手順

1. `/src/config/stats.ts` を開きます
2. `stats` オブジェクトの値を更新します：

```typescript
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
```

### データの説明

- **partnerSchools**: 提携している学校の総数
- **successfulStudents**: これまでに留学を完了した学生の総数
- **satisfactionRate**: 帰国後の学生アンケートによる満足度（パーセンテージ）
- **lastUpdated**: データの最終更新日（YYYY-MM-DD形式）

### 顧客評価の反映

顧客が帰国して評価を提供した場合：

1. `successfulStudents` の数を増やす
2. 満足度アンケートの結果に基づいて `satisfactionRate` を更新
3. `lastUpdated` を現在の日付に更新

### 例：新しい学生が帰国して評価を提供

```typescript
export const stats: PlatformStats = {
  partnerSchools: 205,  // 新しい提携校が5校追加
  successfulStudents: 1250,  // 50人の学生が新たに留学完了
  satisfactionRate: 97,  // 満足度が少し変動
  lastUpdated: '2025-03-15'  // 更新日を変更
}
```

### 注意事項

- 数値は実際のデータに基づいて更新してください
- 満足度は0-100の範囲で指定してください
- 変更後、サーバーは自動的に再起動され、新しい値が反映されます
