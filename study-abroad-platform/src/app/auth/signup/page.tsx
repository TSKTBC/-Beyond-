'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('パスワードが一致しません')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError('パスワードは8文字以上で入力してください')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '登録に失敗しました')
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/auth/signin?message=登録が完了しました。ログインしてください。')
      }, 2000)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : '登録に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center py-12 px-4 relative overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-300/20 to-green-300/20 rounded-full blur-3xl -translate-y-32 -translate-x-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-teal-300/20 to-emerald-300/20 rounded-full blur-3xl translate-y-32 translate-x-32"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
        </div>

        <Card className="max-w-md w-full relative z-10 shadow-2xl border-0 bg-white/80 backdrop-blur-xl">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full mb-6 shadow-2xl">
                <span className="text-5xl text-white animate-bounce">✓</span>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">登録完了！</h2>
              <p className="text-gray-700 text-lg mb-6 font-medium">
                🎉 アカウントの作成が完了しました！<br />
                ✨ ログインページに移動します...
              </p>
              <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-indigo-300/20 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-300/20 to-blue-300/20 rounded-full blur-3xl translate-y-32 -translate-x-32"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* ロゴとタイトル */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
            <span className="text-3xl text-white animate-bounce">🚀</span>
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">新しい冒険を始めよう！</h1>
          <p className="text-gray-600 font-medium">留学の夢への第一歩を踏み出そう ✨</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-gray-800">新規登録</CardTitle>
            <p className="text-gray-600 text-sm mt-2">あなただけのアカウントを作成</p>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-gray-700">👤 お名前</Label>
                <div className="relative group">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="山田太郎"
                    className="h-12 pl-4 pr-4 bg-white/50 border-2 border-blue-100 focus:border-blue-300 focus:ring-4 focus:ring-blue-100 transition-all duration-300 rounded-xl font-medium placeholder:text-gray-400 group-hover:shadow-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">📧 メールアドレス</Label>
                <div className="relative group">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@example.com"
                    className="h-12 pl-4 pr-4 bg-white/50 border-2 border-blue-100 focus:border-blue-300 focus:ring-4 focus:ring-blue-100 transition-all duration-300 rounded-xl font-medium placeholder:text-gray-400 group-hover:shadow-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">🔒 パスワード</Label>
                <div className="relative group">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="8文字以上で入力"
                    className="h-12 pl-4 pr-4 bg-white/50 border-2 border-blue-100 focus:border-blue-300 focus:ring-4 focus:ring-blue-100 transition-all duration-300 rounded-xl font-medium placeholder:text-gray-400 group-hover:shadow-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">🔐 パスワード確認</Label>
                <div className="relative group">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="パスワードを再入力"
                    className="h-12 pl-4 pr-4 bg-white/50 border-2 border-blue-100 focus:border-blue-300 focus:ring-4 focus:ring-blue-100 transition-all duration-300 rounded-xl font-medium placeholder:text-gray-400 group-hover:shadow-lg"
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <Button
                  type="submit"
                  className="relative w-full h-14 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 border-0"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      登録中...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      🌟 アカウント作成して始める
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

            <div className="text-center">
              <p className="text-gray-600 mb-4">すでにアカウントをお持ちですか？</p>
              <Link
                href="/auth/signin"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-300"
              >
                🔑 ログインはこちら
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}