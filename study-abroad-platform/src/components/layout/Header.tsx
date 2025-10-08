'use client'

import { Menu, User, LogOut } from 'lucide-react'
import Link from 'next/link'
// import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'

export function Header() {
  // const { data: session, status } = useSession()
  const session = null // デモモード用
  const status = 'unauthenticated' as const // デモモード用
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { href: '/community', title: '留学コミュニティ', description: 'ブログ・SNS・投稿作成が一つに', emoji: '🏘️' },
    { href: '/estimator', title: '見積もり', description: '30秒で無料見積もり', emoji: '💰' },
    { href: '/destinations', title: '留学先', description: '各国の留学先情報', emoji: '🌍' },
    { href: '/partners', title: '提携校', description: '世界200校以上の提携校', emoji: '🏫' },
    { href: '/events', title: 'イベント', description: '留学説明会・セミナー', emoji: '📅' },
  ]

  const companyMenuItems = [
    { href: '/philosophy', title: '経営理念', emoji: '💡' },
    { href: '/team', title: '社員紹介', emoji: '👥' },
    { href: '/contact', title: 'お問い合わせ', emoji: '📧' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-md">
              <span className="text-white font-bold text-sm animate-pulse">🎓</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              beyond
            </span>
            <span className="text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">✨</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href="/estimator"
              className="px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-lg transition-all duration-300 flex items-center gap-1 shadow-md"
            >
              <span>💰</span>
              見積もり
            </Link>
            <Link
              href="/destinations"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-300"
            >
              留学先
            </Link>
            <Link
              href="/philosophy"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-300"
            >
              経営理念
            </Link>
            <Link
              href="/team"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-300"
            >
              社員紹介
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* モバイルでは無料相談ボタンを隠す */}
          <Button size="sm" variant="outline" asChild className="hidden sm:flex">
            <Link href="/consultation">無料相談</Link>
          </Button>


          {status === 'loading' ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
          ) : false ? ( // デモモード: 常にログインしていない状態
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
                    <AvatarFallback>
                      {session.user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="flex-col items-start">
                  <div className="font-medium">{session.user?.name}</div>
                  <div className="text-xs text-muted-foreground">{session.user?.email}</div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <User className="mr-2 h-4 w-4" />
                    ダッシュボード
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    プロフィール
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  ログアウト
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" asChild className="text-xs px-2 sm:px-3 sm:text-sm">
              <Link href="/auth/signin">ログイン</Link>
            </Button>
          )}

          {/* 3本線メニュー */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="p-2 lg:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">メニューを開く</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <SheetTitle className="sr-only">メニュー</SheetTitle>
              <div className="flex flex-col h-full">
                {/* ヘッダー */}
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold">beyond</h2>
                  <p className="text-sm text-muted-foreground">留学サポートプラットフォーム</p>
                </div>

                {/* メインナビゲーション */}
                <div className="flex-1 p-6">
                  <nav className="space-y-2">
                    {menuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-50 transition-colors group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-2xl">{item.emoji}</span>
                        <div className="flex-1">
                          <div className="font-medium text-sm group-hover:text-emerald-700 transition-colors">
                            {item.title}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </nav>

                  {/* 企業情報メニュー */}
                  <div className="mt-8 pt-6 border-t">
                    <h3 className="text-sm font-medium mb-3 text-muted-foreground">企業情報</h3>
                    <nav className="space-y-2">
                      {companyMenuItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors group"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="text-xl">{item.emoji}</span>
                          <div className="font-medium text-sm group-hover:text-emerald-700 transition-colors">
                            {item.title}
                          </div>
                        </Link>
                      ))}
                    </nav>
                  </div>

                  {/* モバイル専用アクション */}
                  <div className="mt-8 pt-6 border-t">
                    <h3 className="text-sm font-medium mb-3 text-muted-foreground">今すぐ始める</h3>
                    <div className="space-y-2">
                      <Link
                        href="/consultation"
                        className="flex items-center justify-center p-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 transition-colors shadow-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="font-medium text-sm">無料相談予約</div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
