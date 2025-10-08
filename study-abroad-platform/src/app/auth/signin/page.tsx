'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('メールアドレスまたはパスワードが正しくありません')
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch {
      setError('ログインに失敗しました。もう一度お試しください。')
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-300/20 to-amber-300/20 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-yellow-300/20 to-orange-300/20 rounded-full blur-3xl translate-y-32 -translate-x-32"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* ロゴとタイトル */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
            <span className="text-3xl text-white animate-bounce">🎓</span>
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">おかえりなさい！</h1>
          <p className="text-gray-600 font-medium">あなたの留学の夢を続けましょう ✨</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-gray-800">ログイン</CardTitle>
            <p className="text-gray-600 text-sm mt-2">あなたのアカウントにアクセス</p>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">📧 メールアドレス</Label>
                <div className="relative group">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@example.com"
                    className="h-12 pl-4 pr-4 bg-white/50 border-2 border-orange-100 focus:border-orange-300 focus:ring-4 focus:ring-orange-100 transition-all duration-300 rounded-xl font-medium placeholder:text-gray-400 group-hover:shadow-lg"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">🔒 パスワード</Label>
                <div className="relative group">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="パスワードを入力"
                    className="h-12 pl-4 pr-4 bg-white/50 border-2 border-orange-100 focus:border-orange-300 focus:ring-4 focus:ring-orange-100 transition-all duration-300 rounded-xl font-medium placeholder:text-gray-400 group-hover:shadow-lg"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                  <span>⚠️</span>
                  {error}
                </div>
              )}

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <Button
                  type="submit"
                  className="relative w-full h-14 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 border-0"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ログイン中...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      🚀 ログインして始める
                    </span>
                  )}
                </Button>
              </div>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">または</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🔑</span>
                <h4 className="font-bold text-blue-800">テスト用アカウント</h4>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white/70 p-3 rounded-xl border border-blue-100">
                  <div className="font-semibold text-blue-800 mb-1">👤 一般ユーザー</div>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div><strong>Email:</strong> test@example.com</div>
                    <div><strong>Password:</strong> password</div>
                  </div>
                </div>
                <div className="bg-white/70 p-3 rounded-xl border border-blue-100">
                  <div className="font-semibold text-blue-800 mb-1">👑 管理者</div>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div><strong>Email:</strong> admin@example.com</div>
                    <div><strong>Password:</strong> admin</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">まだアカウントをお持ちでないですか？</p>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-colors duration-300"
              >
                ✨ 新しい世界への最初の一歩を踏み出す
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}