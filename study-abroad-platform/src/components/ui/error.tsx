import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "./button"
import { Card, CardContent } from "./card"

interface ErrorMessageProps {
  title?: string
  message?: string
  action?: () => void
  actionLabel?: string
  variant?: "default" | "destructive" | "warning"
  className?: string
}

export function ErrorMessage({
  title = "エラーが発生しました",
  message = "申し訳ございませんが、予期しないエラーが発生しました。しばらく後に再度お試しください。",
  action,
  actionLabel = "再試行",
  variant = "default",
  className
}: ErrorMessageProps) {
  const variantStyles = {
    default: "border-red-200 bg-red-50 text-red-800",
    destructive: "border-red-500 bg-red-500 text-white",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-800"
  }

  const iconStyles = {
    default: "text-red-500",
    destructive: "text-red-200",
    warning: "text-yellow-500"
  }

  return (
    <Card className={cn("border-2", variantStyles[variant], className)}>
      <CardContent className="pt-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className={cn("h-5 w-5 mt-0.5 flex-shrink-0", iconStyles[variant])} />
          <div className="flex-1">
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm opacity-90 mb-4">{message}</p>
            {action && (
              <Button
                onClick={action}
                variant={variant === "destructive" ? "secondary" : "outline"}
                size="sm"
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                {actionLabel}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface ErrorPageProps {
  title?: string
  message?: string
  showHomeButton?: boolean
  showBackButton?: boolean
  onRetry?: () => void
  onBack?: () => void
  onHome?: () => void
}

export function ErrorPage({
  title = "ページが見つかりません",
  message = "お探しのページは移動または削除された可能性があります。",
  showHomeButton = true,
  showBackButton = true,
  onRetry,
  onBack,
  onHome
}: ErrorPageProps) {
  const handleHome = () => {
    if (onHome) {
      onHome()
    } else {
      window.location.href = "/"
    }
  }

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      window.history.back()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-red-500 text-6xl mb-6">
          <AlertTriangle className="mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-8">{message}</p>

        <div className="space-y-3">
          {onRetry && (
            <Button onClick={onRetry} className="w-full gap-2">
              <RefreshCw className="h-4 w-4" />
              再試行
            </Button>
          )}

          <div className="flex gap-3">
            {showBackButton && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                戻る
              </Button>
            )}

            {showHomeButton && (
              <Button
                variant="outline"
                onClick={handleHome}
                className="flex-1 gap-2"
              >
                <Home className="h-4 w-4" />
                ホーム
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface FormErrorProps {
  message: string
  className?: string
}

export function FormError({ message, className }: FormErrorProps) {
  return (
    <div className={cn("flex items-center space-x-2 text-red-600 text-sm", className)}>
      <AlertTriangle className="h-4 w-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  )
}

interface NetworkErrorProps {
  onRetry?: () => void
  className?: string
}

export function NetworkError({ onRetry, className }: NetworkErrorProps) {
  return (
    <ErrorMessage
      title="接続エラー"
      message="インターネット接続を確認して、再度お試しください。"
      action={onRetry}
      actionLabel="再接続"
      variant="warning"
      className={className}
    />
  )
}

interface NotFoundErrorProps {
  resource?: string
  className?: string
}

export function NotFoundError({ resource = "ページ", className }: NotFoundErrorProps) {
  return (
    <ErrorMessage
      title={`${resource}が見つかりません`}
      message={`お探しの${resource}は存在しないか、移動された可能性があります。`}
      action={() => window.location.href = "/"}
      actionLabel="ホームに戻る"
      className={className}
    />
  )
}