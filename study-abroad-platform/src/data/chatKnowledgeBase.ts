// チャットボット用ナレッジベース（FAQ + 3ステップ + 特徴）

export interface ChatResponse {
  id: string
  category: 'faq' | 'process' | 'features' | 'general'
  keywords: string[]
  question: string
  answer: string
  relatedLinks?: { text: string; href: string }[]
}

export const chatKnowledgeBase: ChatResponse[] = [
  // FAQ系
  {
    id: 'faq-cost',
    category: 'faq',
    keywords: ['お金', '費用', '料金', '値段', '価格', 'コスト', '予算'],
    question: '留学って、お金がたくさんかかるんですよね...？',
    answer: '😊 そんな心配、とてもよくわかります。国や期間によって大きく変わりますが、1ヶ月で約20-50万円。ただ、私たちはあなたの予算に合わせたプランを一緒に考えますよ！無料見積もりで詳細をご確認いただけます。',
    relatedLinks: [
      { text: '見積もりを作成', href: '/quote' },
      { text: 'コース一覧を見る', href: '/destinations' }
    ]
  },
  {
    id: 'faq-english',
    category: 'faq',
    keywords: ['英語', '語学力', '英会話', 'できない', '初心者', 'レベル'],
    question: '英語、全然できないんです...。大丈夫でしょうか？',
    answer: '😌 大丈夫！みんなそこからスタートです。初心者クラスから丁寧にサポートしますし、現地の先生も日本人の特徴を理解してくださいます。一歩ずつ一緒に進んでいきましょう！',
    relatedLinks: [
      { text: '語学コースを見る', href: '/destinations' },
      { text: '無料相談を予約', href: '/consultation' }
    ]
  },
  {
    id: 'faq-support',
    category: 'faq',
    keywords: ['不安', '困った', 'サポート', '現地', 'トラブル', '一人', '孤独'],
    question: '一人で海外にいるの、不安で...。現地で困ったらどうしよう？',
    answer: '🤗 その不安、すごくよくわかります。でも安心してください。24時間365日、日本語で相談できるサポートデスクがあります。小さなことでも、いつでも連絡してくださいね。',
    relatedLinks: [
      { text: 'サポート体制を見る', href: '/consultation' }
    ]
  },
  {
    id: 'faq-timing',
    category: 'faq',
    keywords: ['いつ', 'タイミング', '準備', '期間', '何ヶ月前'],
    question: 'いつから準備を始めればいいですか？',
    answer: '✨ 理想は出発の6ヶ月前ですが、3ヶ月前でも大丈夫です！ビザ取得や学校手配には時間がかかるため、早めのご相談をおすすめします。',
    relatedLinks: [
      { text: '今すぐ相談予約', href: '/consultation' }
    ]
  },
  {
    id: 'faq-country',
    category: 'faq',
    keywords: ['国', 'おすすめ', 'どこ', '選び方', '人気'],
    question: 'どの国がおすすめですか？',
    answer: '🌏 目的によって異なります！英語習得ならカナダ・オーストラリア、ビジネスならアメリカ、文化体験ならヨーロッパがおすすめ。無料カウンセリングで最適な国をご提案します。',
    relatedLinks: [
      { text: '国別コースを見る', href: '/destinations' },
      { text: 'カウンセリング予約', href: '/consultation' }
    ]
  },
  {
    id: 'faq-accommodation',
    category: 'faq',
    keywords: ['滞在', '住む', 'ホームステイ', '寮', 'アパート', '宿泊'],
    question: '滞在先はどうなりますか？',
    answer: '🏡 ホームステイ、学生寮、シェアハウスなど選択肢が豊富です。現地の生活を体験したい方はホームステイ、自由な時間が欲しい方は学生寮がおすすめです。',
    relatedLinks: [
      { text: '詳細を相談する', href: '/consultation' }
    ]
  },

  // プロセス系（3ステップ）
  {
    id: 'process-step1',
    category: 'process',
    keywords: ['手順', '流れ', 'ステップ', '始め方', '相談', 'ヒアリング'],
    question: 'どうやって始めればいいですか？',
    answer: '🚀 かんたん3ステップです！\n\nSTEP1: あなたの希望をお聞かせください（30秒でOK）\nSTEP2: ぴったりの学校を見つけましょう\nSTEP3: 経験豊富なカウンセラーが心を込めてサポート\n\n今すぐ無料相談から始められます！',
    relatedLinks: [
      { text: '無料相談を予約', href: '/consultation' },
      { text: '見積もりを作成', href: '/quote' }
    ]
  },

  // 特徴系
  {
    id: 'features-247',
    category: 'features',
    keywords: ['24時間', '対応時間', 'サポート時間', '営業時間'],
    question: 'いつでも相談できますか？',
    answer: '💝 はい！24時間365日、日本語でサポートします。世界のどこにいても、困った時に私たちがそばにいます。平均対応時間は30分以内です。',
    relatedLinks: [
      { text: '今すぐ相談', href: '/consultation' }
    ]
  },
  {
    id: 'features-experience',
    category: 'features',
    keywords: ['実績', '経験', '信頼', '実績'],
    question: 'どれくらいの実績がありますか？',
    answer: '🌈 10年以上の経験で、1,200名以上の学生をサポートしてきました。満足度98%、200校以上の提携校があります。カウンセラー全員が留学経験者なので、気持ちがわかります。',
    relatedLinks: [
      { text: '体験談を見る', href: '/' }
    ]
  },

  // 一般的な挨拶
  {
    id: 'general-greeting',
    category: 'general',
    keywords: ['こんにちは', 'はじめまして', 'お願いします', 'よろしく'],
    question: 'こんにちは',
    answer: 'こんにちは！留学サポートのBEYONDです 😊\n\nどんなことでもお気軽にご質問ください。例えば...\n・費用について知りたい\n・どの国がおすすめ？\n・英語が苦手でも大丈夫？\n・手続きの流れは？\n\nなど、なんでもお答えします！',
  },
  {
    id: 'general-help',
    category: 'general',
    keywords: ['助けて', 'わからない', '質問', '聞きたい'],
    question: '何を聞けばいいかわかりません',
    answer: '大丈夫ですよ！よくある質問をいくつかご紹介しますね 🤗\n\n・留学費用はいくらかかりますか？\n・英語ができなくても大丈夫ですか？\n・どの国がおすすめですか？\n・いつから準備すればいいですか？\n・サポート体制はどうなっていますか？\n\nこれら以外でも、どんな小さなことでもお聞きください！',
  }
]

// キーワードマッチング関数
export function findBestMatch(userInput: string): ChatResponse | null {
  const input = userInput.toLowerCase()

  // 完全一致を優先
  for (const response of chatKnowledgeBase) {
    if (response.keywords.some(keyword => input.includes(keyword))) {
      return response
    }
  }

  return null
}

// デフォルトレスポンス
export const defaultResponse: ChatResponse = {
  id: 'default',
  category: 'general',
  keywords: [],
  question: 'その他の質問',
  answer: 'ご質問ありがとうございます！\n\nより詳しくお答えするため、無料カウンセリングをご利用いただくか、具体的なキーワード（例：費用、国、英語、サポートなど）を含めてご質問いただけますか？\n\nまたは、お電話でのご相談も承っております 📞',
  relatedLinks: [
    { text: '無料相談を予約', href: '/consultation' },
    { text: '見積もりを作成', href: '/quote' }
  ]
}
