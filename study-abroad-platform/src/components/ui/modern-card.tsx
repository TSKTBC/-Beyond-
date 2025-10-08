'use client'

import { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface ModernCardProps {
  children: ReactNode
  className?: string
  gradient?: 'blue' | 'purple' | 'green' | 'orange' | 'pink'
  hover?: boolean
  glow?: boolean
}

const gradients = {
  blue: 'from-blue-500 to-indigo-600',
  purple: 'from-purple-500 to-pink-600',
  green: 'from-green-500 to-teal-600',
  orange: 'from-orange-500 to-red-600',
  pink: 'from-pink-500 to-rose-600'
}

export function ModernCard({
  children,
  className,
  gradient,
  hover = true,
  glow = false
}: ModernCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl border bg-white dark:bg-gray-900 shadow-lg transition-all duration-300",
      hover && "hover:shadow-xl hover:-translate-y-1",
      glow && "shadow-2xl",
      className
    )}>
      {gradient && (
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-5",
          gradients[gradient]
        )} />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

interface GradientCardProps {
  children: ReactNode
  className?: string
  gradient: 'blue' | 'purple' | 'green' | 'orange' | 'pink'
  textColor?: 'white' | 'dark'
}

export function GradientCard({
  children,
  className,
  gradient,
  textColor = 'white'
}: GradientCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      `bg-gradient-to-br ${gradients[gradient]}`,
      textColor === 'white' ? 'text-white' : 'text-gray-900',
      className
    )}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 translate-y-12 -translate-x-12" />

      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  )
}

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  className
}: StatsCardProps) {
  return (
    <ModernCard className={cn("p-6", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {icon && (
          <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
            {icon}
          </div>
        )}
      </div>

      {trend && (
        <div className="flex items-center mt-4">
          <span className={cn(
            "text-sm font-medium",
            trend.isPositive ? "text-green-600" : "text-red-600"
          )}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
          <span className="text-sm text-gray-500 ml-2">from last month</span>
        </div>
      )}
    </ModernCard>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
  gradient?: 'blue' | 'purple' | 'green' | 'orange' | 'pink'
  className?: string
}

export function FeatureCard({
  title,
  description,
  icon,
  gradient = 'blue',
  className
}: FeatureCardProps) {
  return (
    <ModernCard className={cn("p-6 text-center group", className)} hover>
      <div className={cn(
        "w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110",
        gradients[gradient]
      )}>
        <div className="text-white">
          {icon}
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>

      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </ModernCard>
  )
}