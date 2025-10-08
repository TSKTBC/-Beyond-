'use client'

import { Shield, Award, Users, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const badges = [
  { icon: Shield, label: '10年の実績', color: 'text-cyan-400' },
  { icon: Award, label: '満足度98%', color: 'text-yellow-400' },
  { icon: Users, label: '1,200+ 成功者', color: 'text-green-400' },
  { icon: CheckCircle, label: '200+ 提携校', color: 'text-blue-400' }
]

export function TrustBadges() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-8"
      role="list"
      aria-label="信頼性バッジ"
    >
      {badges.map((badge, index) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-white/20"
          role="listitem"
        >
          <badge.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${badge.color}`} aria-hidden="true" />
          <span className="text-white text-xs sm:text-sm font-semibold">{badge.label}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}
