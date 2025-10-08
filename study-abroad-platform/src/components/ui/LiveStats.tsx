'use client'

import { useEffect, useState } from 'react'
import { Users, MessageCircle, Calendar } from 'lucide-react'

interface LiveStatsData {
  activeConsultations: number
  todayBookings: number
  onlineUsers: number
}

export function LiveStats() {
  const [stats, setStats] = useState<LiveStatsData>({
    activeConsultations: 8,
    todayBookings: 12,
    onlineUsers: 45
  })

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        activeConsultations: Math.max(5, Math.min(15, prev.activeConsultations + (Math.random() > 0.5 ? 1 : -1))),
        todayBookings: prev.todayBookings + (Math.random() > 0.7 ? 1 : 0),
        onlineUsers: Math.max(30, Math.min(80, prev.onlineUsers + (Math.random() > 0.5 ? 2 : -2)))
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // In production, replace with actual Supabase MCP integration:
  /*
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Using Supabase MCP to get real-time data
        const response = await fetch('/api/mcp/supabase', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tool: 'query_database',
            args: {
              table: 'consultations',
              select: 'count',
              filters: { status: 'active' }
            }
          })
        })
        const data = await response.json()
        setStats(prev => ({ ...prev, activeConsultations: data.count }))
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 10000)
    return () => clearInterval(interval)
  }, [])
  */

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
      {/* Active Consultations */}
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <MessageCircle className="w-4 h-4 text-white" />
        <span className="text-white/90">
          現在 <strong className="text-white">{stats.activeConsultations}</strong> 名が相談中
        </span>
      </div>

      {/* Today's Bookings */}
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
        <Calendar className="w-4 h-4 text-yellow-300" />
        <span className="text-white/90">
          本日 <strong className="text-yellow-300">{stats.todayBookings}</strong> 件の予約
        </span>
      </div>

      {/* Online Users */}
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
        <Users className="w-4 h-4 text-blue-300" />
        <span className="text-white/90">
          <strong className="text-blue-300">{stats.onlineUsers}</strong> 名が閲覧中
        </span>
      </div>
    </div>
  )
}
