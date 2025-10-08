'use client'

import { usePathname } from 'next/navigation'
// import { useSession } from 'next-auth/react' // 一時的に無効化
import { useState, useEffect, useCallback } from 'react'

interface LoginStrategy {
  showPrompt: boolean
  trigger: 'time-based' | 'action-based' | 'value-based'
  context: string
  priority: number
}

interface UserBehavior {
  pageViews: number
  timeOnSite: number
  interactions: number
  lastVisit?: Date
  previousPrompts: number
}

export function useLoginStrategy() {
  const session = null // 一時的にuseSessionを無効化
  const pathname = usePathname()
  const [userBehavior, setUserBehavior] = useState<UserBehavior>({
    pageViews: 0,
    timeOnSite: 0,
    interactions: 0,
    previousPrompts: 0
  })
  const [strategy, setStrategy] = useState<LoginStrategy>({
    showPrompt: false,
    trigger: 'value-based',
    context: 'general',
    priority: 0
  })

  // ユーザー行動の追跡
  useEffect(() => {
    if (session) return

    const startTime = Date.now()
    let interactionCount = 0

    // ローカルストレージから過去のデータを取得
    const storedBehavior = localStorage.getItem('user-behavior')
    if (storedBehavior) {
      const parsed = JSON.parse(storedBehavior)
      setUserBehavior(prev => ({ ...prev, ...parsed, lastVisit: new Date(parsed.lastVisit) }))
    }

    // ページビューを増加
    setUserBehavior(prev => ({ ...prev, pageViews: prev.pageViews + 1 }))

    // インタラクション追跡
    const trackInteraction = () => {
      interactionCount++
      setUserBehavior(prev => ({ ...prev, interactions: prev.interactions + 1 }))
    }

    // イベントリスナーを追加
    document.addEventListener('click', trackInteraction)
    document.addEventListener('scroll', trackInteraction, { once: true })
    document.addEventListener('keydown', trackInteraction)

    // ページ滞在時間を追跡
    const interval = setInterval(() => {
      setUserBehavior(prev => ({ ...prev, timeOnSite: prev.timeOnSite + 1 }))
    }, 1000)

    return () => {
      clearInterval(interval)
      document.removeEventListener('click', trackInteraction)
      document.removeEventListener('scroll', trackInteraction)
      document.removeEventListener('keydown', trackInteraction)

      // データを保存
      const finalBehavior = {
        ...userBehavior,
        timeOnSite: userBehavior.timeOnSite + Math.floor((Date.now() - startTime) / 1000),
        interactions: userBehavior.interactions + interactionCount,
        lastVisit: new Date()
      }
      localStorage.setItem('user-behavior', JSON.stringify(finalBehavior))
    }
  }, [session, pathname])

  // 戦略的なログインプロンプト表示の決定
  const calculateOptimalStrategy = useCallback((): LoginStrategy => {
    if (session || userBehavior.previousPrompts >= 3) {
      return { showPrompt: false, trigger: 'value-based', context: 'general', priority: 0 }
    }

    // ページ別の戦略
    const pageStrategies: Record<string, Partial<LoginStrategy>> = {
      '/quote': {
        trigger: 'action-based',
        context: 'quote',
        priority: 9 // 見積もりは最高優先度
      },
      '/consultation': {
        trigger: 'time-based',
        context: 'consultation',
        priority: 8
      },
      '/dashboard': {
        trigger: 'value-based',
        context: 'dashboard',
        priority: 7
      },
      '/profile': {
        trigger: 'value-based',
        context: 'profile',
        priority: 6
      }
    }

    const pageStrategy = pageStrategies[pathname] || {
      trigger: 'time-based' as const,
      context: 'general',
      priority: 3
    }

    // 統計的判定ロジック
    const shouldShow = () => {
      // 新規訪問者（優先表示）
      if (userBehavior.pageViews <= 2 && userBehavior.timeOnSite < 30) {
        return pageStrategy.priority > 5
      }

      // エンゲージメント高（3回以上のインタラクション）
      if (userBehavior.interactions >= 3) {
        return pageStrategy.trigger === 'action-based'
      }

      // 滞在時間長（30秒以上）
      if (userBehavior.timeOnSite >= 30) {
        return pageStrategy.trigger === 'time-based'
      }

      // 価値のあるページでの即座表示
      if (pageStrategy.priority >= 7) {
        return pageStrategy.trigger === 'value-based'
      }

      return false
    }

    return {
      showPrompt: shouldShow(),
      trigger: pageStrategy.trigger!,
      context: pageStrategy.context!,
      priority: pageStrategy.priority!
    }
  }, [userBehavior, pathname, session])

  useEffect(() => {
    const newStrategy = calculateOptimalStrategy()
    setStrategy(newStrategy)
  }, [calculateOptimalStrategy])

  const dismissPrompt = useCallback(() => {
    setStrategy(prev => ({ ...prev, showPrompt: false }))
    setUserBehavior(prev => ({ ...prev, previousPrompts: prev.previousPrompts + 1 }))

    // 拒否回数を保存
    const behaviorData = JSON.parse(localStorage.getItem('user-behavior') || '{}')
    behaviorData.previousPrompts = (behaviorData.previousPrompts || 0) + 1
    localStorage.setItem('user-behavior', JSON.stringify(behaviorData))
  }, [])

  const getConversionProbability = useCallback((): number => {
    // 統計的コンバージョン確率計算
    let probability = 0.15 // ベースライン 15%

    // エンゲージメントによる増加
    if (userBehavior.interactions >= 5) probability += 0.25
    else if (userBehavior.interactions >= 3) probability += 0.15
    else if (userBehavior.interactions >= 1) probability += 0.10

    // 滞在時間による増加
    if (userBehavior.timeOnSite >= 120) probability += 0.20
    else if (userBehavior.timeOnSite >= 60) probability += 0.15
    else if (userBehavior.timeOnSite >= 30) probability += 0.10

    // リピート訪問による増加
    if (userBehavior.pageViews >= 5) probability += 0.15
    else if (userBehavior.pageViews >= 3) probability += 0.10

    // 過去の拒否による減少
    probability -= userBehavior.previousPrompts * 0.20

    // ページ価値による調整
    if (strategy.priority >= 8) probability += 0.10
    else if (strategy.priority >= 6) probability += 0.05

    return Math.max(0.05, Math.min(0.85, probability))
  }, [userBehavior, strategy.priority])

  return {
    strategy,
    userBehavior,
    dismissPrompt,
    conversionProbability: getConversionProbability()
  }
}