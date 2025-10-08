'use client'

import { Bot } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'


export function FloatingActionButton() {
  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-3">
      {/* AI相談ボタン */}
      <Button
        size="lg"
        className="size-16 rounded-full shadow-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white floating-pulse hover-lift border-2 border-white"
        asChild
      >
        <Link href="/consultation" aria-label="AI相談">
          <Bot className="size-7" />
        </Link>
      </Button>
    </div>
  )
}