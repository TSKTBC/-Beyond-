'use client'

import { Twitter, Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const currentYear = new Date().getFullYear()

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribed(true)
    setEmail('')
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  const footerLinks = {
    services: [
      { title: '留学相談', href: '/consultation' },
      { title: '学校検索', href: '/schools' },
      { title: '見積作成', href: '/quote' },
      { title: 'ビザサポート', href: '/services#visa' },
    ],
    destinations: [
      { title: 'カナダ留学', href: '/destinations/canada' },
      { title: 'オーストラリア留学', href: '/destinations/australia' },
      { title: 'アメリカ留学', href: '/destinations/usa' },
      { title: 'イギリス留学', href: '/destinations/uk' },
    ],
    support: [
      { title: 'よくある質問', href: '/faq' },
      { title: 'お問い合わせ', href: '/contact' },
      { title: 'サポート', href: '/support' },
      { title: 'コミュニティ', href: '/community' },
    ],
    company: [
      { title: '会社概要', href: '/company' },
      { title: '採用情報', href: '/careers' },
      { title: 'プライバシーポリシー', href: '/privacy' },
      { title: '利用規約', href: '/terms' },
    ]
  }

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-16 fade-in-up">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">留学の最新情報をお届け</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              留学準備に役立つ情報や特別オファーを受け取りませんか？
              月1回程度、厳選された情報をお送りします。
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="メールアドレスを入力"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
              />
              <Button
                type="submit"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-6"
                disabled={isSubscribed}
              >
                {isSubscribed ? '登録完了！' : (
                  <>
                    <Send className="size-4 mr-2" />
                    登録
                  </>
                )}
              </Button>
            </form>

            {isSubscribed && (
              <p className="text-green-300 text-sm mt-3 fade-in">
                ✓ メールアドレスが登録されました！
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                beyond
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                あなたの夢の留学を実現するパートナーとして、200校以上の提携校から最適な留学先をご提案します。
                専門カウンセラーが丁寧にサポートいたします。
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center group hover:text-blue-400 transition-colors">
                <div className="p-2 bg-blue-500/20 rounded-lg mr-3 group-hover:bg-blue-500/30 transition-colors">
                  <Phone className="size-4 text-blue-400" />
                </div>
                <span className="text-gray-300">0120-123-456</span>
              </div>
              <div className="flex items-center group hover:text-blue-400 transition-colors">
                <div className="p-2 bg-blue-500/20 rounded-lg mr-3 group-hover:bg-blue-500/30 transition-colors">
                  <Mail className="size-4 text-blue-400" />
                </div>
                <span className="text-gray-300">info@beyond-platform.com</span>
              </div>
              <div className="flex items-center group hover:text-blue-400 transition-colors">
                <div className="p-2 bg-blue-500/20 rounded-lg mr-3 group-hover:bg-blue-500/30 transition-colors">
                  <MapPin className="size-4 text-blue-400" />
                </div>
                <span className="text-gray-300">東京都千代田区千代田1-1-1</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' }
              ].map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="p-3 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="size-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="fade-in-up" style={{animationDelay: '0.1s'}}>
            <h4 className="text-lg font-semibold mb-6 text-white relative">
              サービス
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mt-2" />
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <ArrowRight className="size-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div className="fade-in-up" style={{animationDelay: '0.2s'}}>
            <h4 className="text-lg font-semibold mb-6 text-white relative">
              留学先
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mt-2" />
            </h4>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <ArrowRight className="size-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="fade-in-up" style={{animationDelay: '0.3s'}}>
            <h4 className="text-lg font-semibold mb-6 text-white relative">
              サポート
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mt-2" />
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <ArrowRight className="size-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="fade-in-up" style={{animationDelay: '0.4s'}}>
            <h4 className="text-lg font-semibold mb-6 text-white relative">
              会社情報
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mt-2" />
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <ArrowRight className="size-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} beyond. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-gray-500 text-xs">Made with ❤️ in Japan</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
