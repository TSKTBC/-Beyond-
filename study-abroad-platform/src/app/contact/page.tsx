'use client'

import { Mail, Phone, MapPin, Send, Clock, MessageCircle, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    subject: '',
    message: '',
  })

  const inquiryTypes = [
    { value: 'general', label: '一般的なお問い合わせ' },
    { value: 'program', label: 'プログラムについて' },
    { value: 'application', label: '申し込み方法' },
    { value: 'cost', label: '費用について' },
    { value: 'visa', label: 'ビザ・手続き' },
    { value: 'other', label: 'その他' },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // ここでAPIにデータを送信
    // POST /api/contact
    if (process.env.NODE_ENV === 'development') {
      console.log('フォームデータ:', formData)
    }

    // 成功状態に変更
    setIsSubmitted(true)
  }

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.inquiryType &&
    formData.subject &&
    formData.message

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-gray-50 flex items-center justify-center py-12 px-4">
        <Card className="max-w-2xl w-full">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="text-green-600 mb-6">
              <CheckCircle2 className="w-20 h-20 mx-auto" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              送信完了
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              お問い合わせいただき、ありがとうございます。<br />
              内容を確認の上、2営業日以内にご返信させていただきます。
            </p>

            <div className="bg-blue-50 p-6 rounded-xl mb-8 text-left">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                受付内容
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">お名前:</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">メール:</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">お問い合わせ種別:</span>
                  <span className="font-medium">
                    {inquiryTypes.find(t => t.value === formData.inquiryType)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">受付番号:</span>
                  <span className="font-mono font-medium">INQ-{Date.now().toString().slice(-8)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Link href="/">
                  トップページへ
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
              >
                <Link href="/faq">
                  FAQを見る
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            お問い合わせ
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            留学に関するご質問やご相談は、お気軽にお問い合わせください。<br />
            専門スタッフが丁寧にご対応いたします。
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Cards */}
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">お電話</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        平日 9:00 - 18:00
                      </p>
                      <a
                        href="tel:0120-123-456"
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        0120-123-456
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">メール</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        24時間受付
                      </p>
                      <a
                        href="mailto:info@beyond-study.com"
                        className="text-purple-600 font-semibold hover:underline break-all"
                      >
                        info@beyond-study.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">オフィス</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        〒100-0001<br />
                        東京都千代田区千代田1-1-1<br />
                        Beyond留学センター
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">営業時間</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>平日: 9:00 - 18:00</p>
                        <p>土曜: 10:00 - 17:00</p>
                        <p className="text-gray-500">日祝: 定休日</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="bg-gradient-to-br from-gray-50 to-white">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                    その他のサポート
                  </h3>
                  <div className="space-y-3">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Link href="/consultation">
                        📞 無料相談を予約
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Link href="/faq">
                        ❓ よくある質問
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl">
                <CardContent className="pt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    お問い合わせフォーム
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="required">
                          お名前 <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="山田 太郎"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          className="mt-1"
                          data-testid="contact-name"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="required">
                          メールアドレス <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          className="mt-1"
                          data-testid="contact-email"
                          aria-describedby="email-help"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <Label htmlFor="phone">
                        電話番号 <span className="text-gray-500 text-sm">(任意)</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="090-1234-5678"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="mt-1"
                        data-testid="contact-phone"
                      />
                    </div>

                    {/* Inquiry Type */}
                    <div>
                      <Label htmlFor="inquiryType">
                        お問い合わせ種別 <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.inquiryType}
                        onValueChange={(value) => handleInputChange('inquiryType', value)}
                        required
                      >
                        <SelectTrigger className="mt-1" id="inquiryType">
                          <SelectValue placeholder="お問い合わせ内容を選択してください" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Subject */}
                    <div>
                      <Label htmlFor="subject">
                        件名 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="お問い合わせの件名を入力してください"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        required
                        className="mt-1"
                        data-testid="contact-subject"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <Label htmlFor="message">
                        お問い合わせ内容 <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="お問い合わせ内容を詳しくご記入ください"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                        rows={6}
                        className="mt-1"
                        data-testid="contact-message"
                        aria-describedby="message-help"
                      />
                      <p id="message-help" className="text-sm text-gray-500 mt-2">
                        できるだけ具体的にご記入いただくと、スムーズにご回答できます。
                      </p>
                    </div>

                    {/* Privacy Notice */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <strong>個人情報の取り扱いについて:</strong><br />
                        お預かりした個人情報は、お問い合わせへの回答およびサービスのご案内にのみ使用し、
                        第三者に開示することはありません。詳しくは
                        <Link href="/privacy" className="text-blue-600 hover:underline mx-1">
                          プライバシーポリシー
                        </Link>
                        をご確認ください。
                      </p>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 text-lg shadow-lg"
                      disabled={!isFormValid}
                    >
                      <Send className="w-5 h-5 mr-2" />
                      送信する
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            安心してご相談いただけます
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-2">迅速な対応</h3>
              <p className="text-sm text-gray-600">
                2営業日以内に必ず返信いたします
              </p>
            </div>
            <div>
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-semibold text-gray-900 mb-2">安全な管理</h3>
              <p className="text-sm text-gray-600">
                個人情報は厳重に管理しています
              </p>
            </div>
            <div>
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="font-semibold text-gray-900 mb-2">専門スタッフ</h3>
              <p className="text-sm text-gray-600">
                経験豊富なスタッフが対応します
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
