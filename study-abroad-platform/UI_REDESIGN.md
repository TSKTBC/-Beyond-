# UI Redesign - Beyond Study Abroad Platform

## 📋 概要

留学エージェント「beyond」のフロントエンドUI刷新プロジェクト。
既存機能を維持しつつ、教育系・旅行系のベストプラクティスを適用してユーザー体験を向上させます。

## 🎨 デザイン参照元

### [A] 教育系ランディングページ
- **テンプレート**: E-learning (Themewagon) / 教育カテゴリ
- **参照URL**: https://cool-pie-00bc53.netlify.app/
- **適用箇所**: ヒーロー構造、特徴セクション、CTA配置、FAQ構造
- **学ぶポイント**:
  - クリーンな情報階層
  - 段階的なCTA配置
  - 統計バッジの活用

### [B] 旅行系デザインシステム
- **テンプレート**: Travel Agency (Figma) / Tourlux
- **適用箇所**: 国カード、学校カード、検索UI、レビューカード
- **学ぶポイント**:
  - 写真重視のビジュアル構成
  - フィルター・絞り込みUI
  - カードグリッドレイアウト

### [C] Next.js構造
- **参照**: Vercel Templates / NextJSTemplates「Startup」
- **適用箇所**: ディレクトリ構成、コンポーネント分割
- **学ぶポイント**:
  - セクションベースのコンポーネント設計
  - 再利用可能なUI要素

## 🎯 情報設計

### 共通要素
- ✅ ブランド: beyond（既存のロゴ/カラー維持）
- ✅ ヘッダー: JP/EN言語トグル、グローバルナビ
- ✅ フッター: 会社情報、ポリシーリンク、CTA

### ページ別構成

#### Top (`/`)
- [ ] Hero: キャッチコピー + 実績バッジ（提携校数/渡航国数/満足度）
- [ ] 3 Value Props: 費用透明性/学校選定/全行程サポート
- [ ] Destinations スニペット（国カード×6）
- [ ] Schools スニペット（提携校カルーセル）
- [ ] Testimonials（お客様の声カード×3）
- [ ] CTA（無料相談ボタン）

#### Destinations (`/destinations`)
- [ ] フィルター: 地域/予算/語学/正規留学
- [ ] 国カード: 写真/平均費用/人気プログラム/査証タグ
- [ ] グリッドレイアウト（responsive）

#### Schools (`/schools`)
- [ ] 絞り込み: 専攻/期間/学費帯/奨学金
- [ ] 学校カード: ロゴ/概要/合格難易度/出願締切
- [ ] テーブルビュー（オプション）

#### Consult (`/consultation`)
- [ ] 相談フロー（6ステップタイムライン）
- [ ] 予約フォーム: 日付/希望国/目的/形式（オンライン/来社）

#### Estimator (`/quote`)
- [ ] 入力フォーム: 期間/国/滞在/学校種別/保険/航空券
- [ ] 出力カード: 費用内訳（学費/住居/保険/ビザ/航空券/手数料）
- [ ] 保存/PDF出力機能

#### FAQ (`/faq` - 新規作成予定)
- [ ] アコーディオン形式のQ&A
- [ ] カテゴリー別分類
- [ ] 相談前チェックリストCTA

#### Contact (`/contact` - 新規作成予定)
- [ ] 既存フォームのUI刷新（ID/name属性は変更禁止）
- [ ] バリデーション表示の改善
- [ ] reCAPTCHA統合維持

## 🚧 実装制約（壊してはいけないもの）

### 既存機能の維持
- ✅ `/contact` POSTエンドポイント
- ✅ `/api/contact` APIルート
- ✅ フォームバリデーション
- ✅ reCAPTCHA統合
- ✅ 送信後の `/thanks` リダイレクト
- ✅ 既存ページのルーティング（Schools/Destinations/Consult/Estimator/FAQ）
- ✅ i18nキー（多言語対応）

### HTML属性の維持
- ✅ フォームID、name属性
- ✅ data-testid属性
- ✅ aria-* アクセシビリティ属性
- ✅ コンポーネントProps名

## 📦 実装済み

### Phase 1: デザインシステム基盤
- ✅ デザイントークン作成 (`src/styles/tokens.css`)
  - カラーパレット（Primary/Secondary/Accent/Neutral）
  - スペーシングスケール
  - タイポグラフィスケール
  - ボーダーラジウス
  - シャドウ
  - アニメーション設定
- ✅ トークンのglobals.cssへの統合

## 📝 TODO (優先順位順)

### Phase 2: レイアウト基盤
- [ ] Container/Section共通コンポーネント
- [ ] Header/Footerの既存Props維持確認
- [ ] グリッドシステムのUtilityクラス

### Phase 3: Topページ刷新 (`feat/ui-top`)
- [ ] Heroセクションのビジュアル強化
- [ ] 統計バッジの配置最適化
- [ ] Value Propsセクション
- [ ] Destinationsスニペット
- [ ] Schoolsカルーセル
- [ ] Testimonialsカード
- [ ] CTAセクション

### Phase 4: Destinations/Schools (`feat/ui-destinations-schools`)
- [ ] フィルターUI実装
- [ ] 国カードコンポーネント
- [ ] 学校カードコンポーネント
- [ ] グリッドレイアウト
- [ ] 検索機能UI（ロジックは既存維持）

### Phase 5: Consult/Estimator (`feat/ui-consult-estimator`)
- [ ] タイムラインUI（相談フロー）
- [ ] 予約フォームレイアウト
- [ ] Estimator結果カード
- [ ] 入力フォームステップUI

### Phase 6: FAQ (`feat/ui-faq`)
- [ ] Disclosureコンポーネント（アクセシブル）
- [ ] FAQデータ構造
- [ ] アコーディオンアニメーション
- [ ] カテゴリーフィルター

### Phase 7: Contact (`feat/ui-contact`)
- [ ] フォームスタイル刷新（属性維持）
- [ ] バリデーションUIの改善
- [ ] サンクスページのデザイン統一

### Phase 8: 最終調整 (`feat/ui-polish`)
- [ ] Lighthouseパフォーマンスチェック
  - LCP (Largest Contentful Paint)
  - CLS (Cumulative Layout Shift)
  - FID (First Input Delay)
- [ ] アクセシビリティ監査
  - ラベル/aria属性
  - キーボードナビゲーション
  - カラーコントラスト比
- [ ] レスポンシブ確認（mobile/tablet/desktop）

## 🎨 デザイン指針

### ページ別スキン
| ページ | スタイル | 主要カラー |
|--------|---------|-----------|
| Top | 大胆ヒーロー、グラデーション | Primary + Secondary |
| Destinations | 写真重視、カードグリッド | Accent + Neutral |
| Schools | 表構造、タグシステム | Primary + Neutral |
| Consult | タイムライン、ステップ表示 | Secondary + Success |
| Estimator | フォーム中心、結果カード | Primary + Warning |
| FAQ | アコーディオン、シンプル | Neutral + Info |

### UIパターン
- **Utility-First**: Tailwind CSSで既存クラスを上書き
- **コンポーネント単位**: 各セクションを独立したコンポーネント化
- **画像最適化**: Next.js Image、alt必須、priority指定
- **アニメーション**: CSS transitionsでスムーズな体験

## 🔧 開発フロー

### ブランチ戦略
```
main
├── feat/ui-tokens (Phase 1) ✅
├── feat/ui-top (Phase 3)
├── feat/ui-destinations-schools (Phase 4)
├── feat/ui-consult-estimator (Phase 5)
├── feat/ui-faq (Phase 6)
├── feat/ui-contact (Phase 7)
└── feat/ui-polish (Phase 8)
```

### PR要件
- [ ] スクリーンショット添付（Before/After）
- [ ] 既存機能の動作確認
- [ ] アクセシビリティチェック
- [ ] レスポンシブ確認
- [ ] コードレビュー

## 📚 リソース

### ダミーデータ
- 画像: `/public/images/` 配下に配置
- 国データ: 既存データ構造を維持
- 学校データ: 既存APIレスポンス形式を維持

### テスト
- 既存のE2Eテストを壊さない
- 新規UIコンポーネントのStorybookを検討

## 📅 進捗管理

| Phase | Status | 開始日 | 完了日 |
|-------|--------|--------|--------|
| Phase 1: トークン | ✅ Done | 2025-09-30 | 2025-09-30 |
| Phase 2: レイアウト | ���� Next | - | - |
| Phase 3: Top | 📋 Planned | - | - |
| Phase 4: Destinations | 📋 Planned | - | - |
| Phase 5: Consult | 📋 Planned | - | - |
| Phase 6: FAQ | 📋 Planned | - | - |
| Phase 7: Contact | 📋 Planned | - | - |
| Phase 8: Polish | 📋 Planned | - | - |

---

**最終更新**: 2025-09-30
**担当**: Claude (Frontend Assistant)
**プロジェクト**: Beyond Study Abroad Platform UI Redesign