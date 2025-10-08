#!/bin/bash

# 留学プラットフォーム - 品質チェック自動化スクリプト
# 使用方法: npm run quality-check

set -e

echo "🚀 品質チェックを開始します..."

# カラー設定
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. TypeScript型チェック
echo "📝 TypeScript型チェックを実行中..."
if npm run type-check; then
    echo -e "${GREEN}✅ TypeScript型チェック: 成功${NC}"
else
    echo -e "${RED}❌ TypeScript型チェック: 失敗${NC}"
    exit 1
fi

# 2. ESLintチェック & 自動修正
echo "🔍 ESLintチェック & 自動修正を実行中..."
if npm run lint:fix; then
    echo -e "${GREEN}✅ ESLintチェック: 成功${NC}"
else
    echo -e "${YELLOW}⚠️  ESLintチェック: 警告がありますが続行します${NC}"
fi

# 3. ビルドテスト
echo "🏗️  ビルドテストを実行中..."
if npm run build; then
    echo -e "${GREEN}✅ ビルドテスト: 成功${NC}"
else
    echo -e "${RED}❌ ビルドテスト: 失敗${NC}"
    exit 1
fi

# 4. Prettierフォーマット
echo "💄 コードフォーマットを実行中..."
if npm run format; then
    echo -e "${GREEN}✅ コードフォーマット: 成功${NC}"
else
    echo -e "${YELLOW}⚠️  コードフォーマット: 一部ファイルでフォーマットできませんでした${NC}"
fi

# 5. 依存関係の脆弱性チェック
echo "🔒 依存関係の脆弱性チェックを実行中..."
if npm audit --audit-level=high; then
    echo -e "${GREEN}✅ 脆弱性チェック: 高危険度の脆弱性は見つかりませんでした${NC}"
else
    echo -e "${YELLOW}⚠️  脆弱性チェック: 高危険度の脆弱性が見つかりました。npm audit fixを実行してください${NC}"
fi

# 6. 追加の品質メトリクス
echo "📊 品質メトリクスを確認中..."

# ファイル数
TS_FILES=$(find src -name "*.ts" -o -name "*.tsx" | wc -l | tr -d ' ')
echo "  📁 TypeScriptファイル数: ${TS_FILES}"

# 行数
TOTAL_LINES=$(find src -name "*.ts" -o -name "*.tsx" -exec cat {} \; | wc -l | tr -d ' ')
echo "  📏 総コード行数: ${TOTAL_LINES}"

# TODO数
TODO_COUNT=$(find src -name "*.ts" -o -name "*.tsx" -exec grep -l "TODO\|FIXME" {} \; 2>/dev/null | wc -l | tr -d ' ')
echo "  📝 TODO/FIXMEが含まれるファイル数: ${TODO_COUNT}"

echo ""
echo -e "${GREEN}🎉 品質チェックが完了しました！${NC}"
echo ""
echo "📋 次に実行できるコマンド:"
echo "  npm run dev        # 開発サーバー起動"
echo "  npm run test       # テスト実行"
echo "  npm run start      # 本番ビルドでサーバー起動"
echo ""