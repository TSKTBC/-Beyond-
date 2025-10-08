# 本番公開前のセキュリティチェックリスト

## 環境変数・設定
- [ ] `.env.local` から本番用 `.env.production` への移行
- [ ] `NEXTAUTH_SECRET` を安全な値に変更（32文字以上の暗号化された値）
- [ ] 本番データベースURLの設定
- [ ] Stripe本番キー（live keys）の設定
- [ ] AWS本番環境の認証情報設定

## 認証・セキュリティ
- [ ] NextAuth v5の設定確認（現在のエラーを修正）
- [ ] HTTPS強制設定
- [ ] CORS設定の確認
- [ ] CSP（Content Security Policy）の設定
- [ ] Rate Limiting の実装

## API・データベース
- [ ] 本番データベースのセットアップ
- [ ] データベースマイグレーションの実行
- [ ] API routes のセキュリティ検証
- [ ] 入力データの検証・サニタイゼーション

## 監視・ログ
- [ ] Sentry設定（エラー監視）
- [ ] Google Analytics設定
- [ ] 本番ログ設定
- [ ] パフォーマンス監視

## その他
- [ ] TypeScript/ESLintエラーの解決
- [ ] 未使用のコンソールログの削除
- [ ] 本番ビルドテスト
- [ ] セキュリティヘッダーの設定

## 現在の問題点

### 緊急度高
1. NextAuth v5のimportエラー（`getServerSession`が利用できない）
2. TypeScript/ESLintエラー（特にAPI routes）
3. 開発用のダミーデータ・キーが残っている

### 推奨対応
1. `getServerSession`を NextAuth v5 の新しいAPIに更新
2. eslintconfig の ignores プロパティへの移行
3. セキュアな本番環境変数の設定