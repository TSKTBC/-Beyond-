'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface FAQItem {
  question: string
  answer: string
  category: string
}

// Simulated FAQ data (in production, fetch from Notion MCP)
const SAMPLE_FAQS: FAQItem[] = [
  {
    question: '留学費用はどのくらいかかりますか',
    answer: '留学費用は国や期間によって異なりますが、一般的に1ヶ月で20-50万円程度です。詳しい見積もりは無料相談でお伝えできます。',
    category: '費用'
  },
  {
    question: '英語が話せなくても大丈夫ですか',
    answer: 'はい、大丈夫です！初心者向けのクラスから始められますし、現地の先生も日本人の特徴を理解しています。安心してください。',
    category: '語学力'
  },
  {
    question: 'ビザの申請は難しいですか',
    answer: 'ビザ申請のサポートも行っています。必要書類の準備から申請まで、専門スタッフが丁寧にサポートしますのでご安心ください。',
    category: 'ビザ'
  },
  {
    question: 'いつから準備を始めればいいですか',
    answer: '理想は出発の6ヶ月前ですが、3ヶ月前でも対応可能です。早めのご相談をおすすめします。',
    category: '準備'
  },
  {
    question: 'どの国がおすすめですか',
    answer: '目的によって異なります！英語習得ならカナダ・オーストラリア、ビジネスならアメリカ、文化体験ならヨーロッパがおすすめです。無料カウンセリングで最適な国をご提案します。',
    category: '国選び'
  }
]

export function EnhancedChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'こんにちは！留学について何でもお気軽にご質問ください。😊\n\nよくある質問：\n• 留学費用について\n• 必要な語学力\n• ビザ申請\n• 準備期間',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simple keyword matching (in production, use Notion MCP with AI)
  const findAnswer = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    for (const faq of SAMPLE_FAQS) {
      const keywords = faq.question.toLowerCase().split(' ')
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return faq.answer
      }
    }

    return '申し訳ございません。その質問については、専門のカウンセラーが詳しくお答えいたします。無料相談をご予約いただけますか？\n\n[無料相談を予約する](/consultation)'
  }

  /*
  // Production implementation with Notion MCP:
  const fetchFAQs = async () => {
    try {
      const response = await fetch('/api/mcp/notion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool: 'query_database',
          args: {
            databaseId: process.env.NEXT_PUBLIC_NOTION_FAQ_DB_ID,
            sorts: [{ property: 'priority', direction: 'descending' }]
          }
        })
      })
      const data = await response.json()
      return data.results
    } catch (error) {
      console.error('Failed to fetch FAQs:', error)
      return []
    }
  }
  */

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const answer = findAnswer(input)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: answer,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          aria-label="チャットを開く"
        >
          <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
            AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">留学AIアシスタント</h3>
                <p className="text-xs text-white/80">24時間対応</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="閉じる"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-purple-600 text-white'
                }`}>
                  {message.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-900 shadow-sm border border-gray-200'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-blue-100' : 'text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-200">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="メッセージを入力..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5 text-white" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              powered by Notion MCP + AI
            </p>
          </div>
        </div>
      )}
    </>
  )
}
