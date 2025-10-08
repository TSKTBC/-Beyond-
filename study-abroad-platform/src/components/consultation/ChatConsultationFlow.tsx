'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, Sparkles, Calendar, Clock } from 'lucide-react'
import { findBestMatch, defaultResponse } from '@/data/chatKnowledgeBase'
import { Button } from '@/components/ui/button'

interface Message {
  id: string
  type: 'bot' | 'user' | 'system'
  content: string
  timestamp: Date
  options?: string[]
  action?: 'collect-info' | 'show-calendar' | 'complete'
}

const consultationTypes = [
  '一般的な留学相談',
  '学校選択のアドバイス',
  'ビザ申請サポート',
  '費用・予算相談',
  'キャリア・進路相談',
]

export function ChatConsultationFlow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'こんにちは！BEYOND留学サポートです 😊\n\nまずは、どのような相談をご希望ですか？',
      timestamp: new Date(),
      options: consultationTypes
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [consultationData, setConsultationData] = useState({
    type: '',
    preferredDate: '',
    preferredTime: '',
    name: '',
    email: '',
    phone: '',
    additionalInfo: ''
  })
  const [flowStep, setFlowStep] = useState<'type' | 'questions' | 'schedule' | 'info' | 'complete'>('type')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addBotMessage = (content: string, options?: string[], action?: Message['action']) => {
    setIsTyping(true)
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content,
        timestamp: new Date(),
        options,
        action
      }
      setMessages(prev => [...prev, newMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    // フローに基づいた応答
    if (flowStep === 'questions') {
      const matchedResponse = findBestMatch(text)
      if (matchedResponse) {
        addBotMessage(matchedResponse.answer)
        setTimeout(() => {
          addBotMessage(
            '他にご質問はありますか？それとも、無料相談の予約に進みますか？',
            ['予約に進む', 'もっと質問したい']
          )
        }, 2000)
      } else {
        addBotMessage(defaultResponse.answer)
      }
    }
  }

  const handleOptionClick = (option: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: option,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])

    // ステップごとの処理
    if (flowStep === 'type') {
      setConsultationData(prev => ({ ...prev, type: option }))
      setFlowStep('questions')
      addBotMessage(
        `${option}についてですね！\n\nよくいただく質問をいくつかご紹介します。気になることがあれば、お気軽にお聞きください：\n\n・費用はいくらかかりますか？\n・どの国がおすすめですか？\n・英語ができなくても大丈夫ですか？\n・準備期間はどのくらい必要ですか？\n\nまたは、直接無料相談を予約することもできます！`,
        ['予約に進む', '質問したい']
      )
    } else if (flowStep === 'questions') {
      if (option === '予約に進む') {
        setFlowStep('schedule')
        addBotMessage(
          '承知しました！それでは、ご希望の日時を教えてください 📅\n\n例: 「明日の14時」「来週の火曜日」など',
          undefined,
          'show-calendar'
        )
      } else if (option === 'もっと質問したい') {
        addBotMessage('もちろんです！どんなことでもお聞きください 🤗')
      }
    }
  }

  const handleSchedule = (date: string, time: string) => {
    setConsultationData(prev => ({ ...prev, preferredDate: date, preferredTime: time }))
    setFlowStep('info')
    addBotMessage(
      `${date} ${time}で承りました！\n\n最後に、ご連絡先を教えていただけますか？`,
      undefined,
      'collect-info'
    )
  }

  const handleInfoSubmit = (name: string, email: string, phone: string) => {
    setConsultationData(prev => ({ ...prev, name, email, phone }))
    setFlowStep('complete')
    const confirmationMessage: Message = {
      id: Date.now().toString(),
      type: 'system',
      content: `✅ 予約が完了しました！\n\n【予約詳細】\n相談内容: ${consultationData.type}\n日時: ${consultationData.preferredDate} ${consultationData.preferredTime}\nお名前: ${name}\n\n予約確認メールを送信しました。当日お待ちしております！`,
      timestamp: new Date(),
      action: 'complete'
    }
    setMessages(prev => [...prev, confirmationMessage])
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* チャットウィンドウ */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">無料相談チャット</h2>
              <p className="text-sm opacity-90">簡単3ステップで予約完了 • 平均2分</p>
            </div>
          </div>
        </div>

        {/* メッセージエリア */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div key={message.id}>
              <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : message.type === 'system'
                      ? 'bg-green-50 border-2 border-green-300 text-green-800'
                      : 'bg-white shadow-md border border-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>

                  {/* オプションボタン */}
                  {message.options && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          className="block w-full text-left text-sm bg-cyan-50 hover:bg-cyan-100 text-cyan-700 px-3 py-2 rounded-lg transition-colors font-medium"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* 日時選択UI */}
                  {message.action === 'show-calendar' && flowStep === 'schedule' && (
                    <div className="mt-3 space-y-2">
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                          const date = e.target.value
                          addBotMessage('時間を選択してください：')
                          // 簡易実装
                        }}
                        className="w-full p-2 border rounded-lg text-gray-800"
                      />
                      <select
                        onChange={(e) => {
                          const time = e.target.value
                          const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement
                          if (dateInput.value && time) {
                            handleSchedule(dateInput.value, time)
                          }
                        }}
                        className="w-full p-2 border rounded-lg text-gray-800"
                      >
                        <option value="">時間を選択</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                      </select>
                    </div>
                  )}

                  {/* 情報入力UI */}
                  {message.action === 'collect-info' && flowStep === 'info' && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        const formData = new FormData(e.currentTarget)
                        handleInfoSubmit(
                          formData.get('name') as string,
                          formData.get('email') as string,
                          formData.get('phone') as string
                        )
                      }}
                      className="mt-3 space-y-2"
                    >
                      <input
                        name="name"
                        type="text"
                        placeholder="お名前"
                        required
                        className="w-full p-2 border rounded-lg text-gray-800"
                      />
                      <input
                        name="email"
                        type="email"
                        placeholder="メールアドレス"
                        required
                        className="w-full p-2 border rounded-lg text-gray-800"
                      />
                      <input
                        name="phone"
                        type="tel"
                        placeholder="電話番号"
                        required
                        className="w-full p-2 border rounded-lg text-gray-800"
                      />
                      <Button type="submit" className="w-full">
                        予約を確定する
                      </Button>
                    </form>
                  )}

                  {message.action === 'complete' && (
                    <div className="mt-3 space-y-2">
                      <Button onClick={() => window.location.href = '/dashboard'} className="w-full">
                        ダッシュボードへ
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white shadow-md border border-gray-200 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 入力エリア */}
        {flowStep === 'questions' && (
          <div className="p-4 border-t border-gray-200 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage(inputValue)
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="質問を入力してください..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                送信
              </button>
            </form>
          </div>
        )}
      </div>

      {/* 補助情報 */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>💬 チャットで気軽に相談できます • 📞 お急ぎの方: 03-1234-5678</p>
      </div>
    </div>
  )
}
