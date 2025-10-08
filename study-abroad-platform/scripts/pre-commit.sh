#!/bin/bash

# プリコミットフック - コミット前の品質チェック
# Git hooks/pre-commitに設定するか、npm run pre-commitで実行

set -e

echo "🔍 プリコミットチェックを実行中..."

# カラー設定
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. ステージされたファイルがあるかチェック
if ! git diff --cached --quiet; then
    echo "📝 ステージされたファイルを確認中..."

    # TypeScriptファイルがステージされているかチェック
    STAGED_TS_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx)$' || true)

    if [ -n "$STAGED_TS_FILES" ]; then
        echo "🔧 TypeScript/React ファイルがステージされています"

        # TypeScript型チェック
        echo "📝 型チェック中..."
        if ! npm run type-check; then
            echo -e "${RED}❌ 型エラーが見つかりました。修正してからコミットしてください。${NC}"
            exit 1
        fi

        # ESLintチェック & 自動修正
        echo "🔍 ESLintチェック中..."
        if ! npm run lint:fix; then
            echo -e "${YELLOW}⚠️  ESLintでエラーが見つかりました。自動修正を試みましたが、手動修正が必要な場合があります。${NC}"
        fi

        # フォーマット
        echo "💄 コードフォーマット中..."
        npm run format

        # ファイルを再度ステージング（フォーマット後）
        for file in $STAGED_TS_FILES; do
            if [ -f "$file" ]; then
                git add "$file"
            fi
        done
    fi

    echo -e "${GREEN}✅ プリコミットチェック完了${NC}"
else
    echo "ℹ️  ステージされたファイルがありません"
fi

echo -e "${GREEN}🎉 コミット準備完了！${NC}"