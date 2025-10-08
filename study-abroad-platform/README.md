# StudyAbroad Platform

あなたにピッタリの留学先を、3ステップで見つける留学プラットフォーム

## 🚀 特徴

- **200校以上の提携校**から最適な留学先を検索
- **リアルタイム見積シミュレータ**で正確な費用計算
- **24時間以内返信保証**のプロフェッショナルサポート
- **オンライン完結**の申込みプロセス

## 🛠 技術スタック

### フロントエンド
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**

### バックエンド
- **Prisma** (ORM)
- **PostgreSQL** (Database)
- **Next.js API Routes**

### その他
- **ESLint** (Linting)
- **Prettier** (Code Formatting)

## 📁 プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root Layout
│   └── page.tsx           # Home Page
├── components/            # React Components
│   ├── features/          # Feature-specific components
│   ├── layout/            # Layout components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility libraries
│   ├── db.ts             # Prisma client
│   └── utils.ts          # Utility functions
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions

prisma/
├── schema.prisma         # Database schema
└── migrations/           # Database migrations
```

## 🚀 開発環境セットアップ

### 1. リポジトリクローン
```bash
git clone https://github.com/your-org/study-abroad-platform.git
cd study-abroad-platform
```

### 2. 依存関係インストール
```bash
npm install
```

### 3. 環境変数設定
```bash
cp .env.example .env.local
# .env.local を編集して必要な値を設定
```

### 4. データベースセットアップ
```bash
# PostgreSQLサーバーを起動（Docker使用例）
docker run --name postgres -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres

# Prismaクライアント生成
npm run db:generate

# データベースマイグレーション実行
npm run db:migrate

# シードデータ投入（オプション）
npm run db:seed
```

### 5. 開発サーバー起動
```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認できます。

## 📋 利用可能なスクリプト

### 開発
- `npm run dev` - 開発サーバーを起動
- `npm run build` - 本番用ビルドを作成
- `npm run start` - 本番用サーバーを起動

### コード品質
- `npm run lint` - ESLintでコードをチェック
- `npm run lint:fix` - ESLintで自動修正可能な問題を修正
- `npm run type-check` - TypeScriptの型チェック
- `npm run format` - Prettierでコードをフォーマット

### データベース
- `npm run db:generate` - Prismaクライアントを生成
- `npm run db:push` - スキーマ変更をデータベースにプッシュ
- `npm run db:migrate` - マイグレーションを実行
- `npm run db:seed` - シードデータを投入
- `npm run db:studio` - Prisma Studioを起動
- `npm run db:reset` - データベースをリセット

### テスト
- `npm run test` - テストを実行（未設定）

## 🎯 ロードマップ

### Phase 1: MVP (現在)
- [x] プロジェクトセットアップ
- [x] 基本的なUI/UXコンポーネント
- [x] データベーススキーマ設計
- [ ] 学校検索機能
- [ ] 見積シミュレータ
- [ ] 問い合わせ・相談予約機能

### Phase 2: 機能拡張
- [ ] ユーザー認証・マイページ
- [ ] 3校比較機能
- [ ] 電子契約・決済連携
- [ ] レビュー・体験談機能

### Phase 3: 最適化
- [ ] パフォーマンス改善
- [ ] SEO対策
- [ ] A/Bテスト実装
- [ ] PWA化

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

## 📝 ライセンス

このプロジェクトは [MIT ライセンス](LICENSE) の下でライセンスされています。

## 📞 サポート

何か質問や問題がある場合は、[Issues](https://github.com/your-org/study-abroad-platform/issues) を作成してください。

---

© 2024 StudyAbroad Platform. All rights reserved.
