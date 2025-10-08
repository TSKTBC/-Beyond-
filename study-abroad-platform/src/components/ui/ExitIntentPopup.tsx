'use client'

import { useEffect, useState } from 'react'
import { X, Download, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'

interface ExitIntentPopupProps {
  onClose?: () => void
}

export function ExitIntentPopup({ onClose }: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Check if already shown in this session
    const shown = sessionStorage.getItem('exitPopupShown')
    if (shown) {
      setHasShown(true)
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from top of page
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true)
        setHasShown(true)
        sessionStorage.setItem('exitPopupShown', 'true')
      }
    }

    // Add small delay to avoid triggering immediately
    const timeoutId = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 3000)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasShown])

  const handleClose = () => {
    setIsOpen(false)
    onClose?.()
  }

  const handleDownload = () => {
    // TODO: Implement actual download logic
    console.log('Download guide')
    handleClose()
  }

  const handleConsultation = () => {
    // TODO: Navigate to consultation page
    window.location.href = '/consultation'
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all"
          aria-label="閉じる"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Left side - Image */}
          <div className="relative h-64 md:h-auto bg-gradient-to-br from-blue-600 to-purple-600 p-8 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold mb-2">ちょっと待って！</h3>
              <p className="text-lg opacity-90">留学の夢、諦めないでください</p>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="p-8">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-4">
                無料の留学完全ガイドを<br />
                プレゼント！
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">国別の費用比較</h4>
                  <p className="text-sm text-gray-600">各国の詳細な留学費用をまとめました</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">失敗しない学校選び</h4>
                  <p className="text-sm text-gray-600">プロが教える学校選びのポイント</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">ビザ申請の完全ガイド</h4>
                  <p className="text-sm text-gray-600">複雑なビザ手続きをわかりやすく解説</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-6 rounded-lg shadow-xl"
                onClick={handleDownload}
              >
                <Download className="w-5 h-5 mr-2" />
                無料ガイドをダウンロード
              </Button>

              <Button
                variant="outline"
                className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-6 rounded-lg"
                onClick={handleConsultation}
              >
                <Mail className="w-5 h-5 mr-2" />
                無料相談を予約する
              </Button>
            </div>

            {/* Trust indicator */}
            <p className="text-xs text-gray-500 text-center mt-4">
              🔒 個人情報は厳重に管理します
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
