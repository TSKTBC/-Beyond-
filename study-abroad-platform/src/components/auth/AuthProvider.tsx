'use client'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // 一時的にSessionProviderを無効化してBasicな動作を確保
  return <>{children}</>
}