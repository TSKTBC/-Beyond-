import { ShieldCheck, Users, Star } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

interface TrustBarProps {
  stats: {
    partnerSchools: number
    totalUsers: number
    satisfactionRate: number
  }
}

export function TrustBar({ stats }: TrustBarProps) {
  return (
    <section className="py-14 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border ring-1 ring-border/60 bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-6 md:p-8 text-center">
          <div>
            <ShieldCheck className="mx-auto mb-2 text-primary" />
            <div className="text-3xl font-extrabold text-foreground">
              {stats.partnerSchools}校以上
            </div>
            <div className="text-sm text-muted-foreground">提携校</div>
          </div>

          <div>
            <Users className="mx-auto mb-2 text-primary" />
            <div className="text-3xl font-extrabold text-foreground">
              {stats.totalUsers.toLocaleString()}名
            </div>
            <div className="text-sm text-muted-foreground">利用者</div>
          </div>

          <div>
            <Star className="mx-auto mb-2 text-primary" />
            <div className="text-3xl font-extrabold text-foreground">
              {stats.satisfactionRate}%
            </div>
            <div className="text-sm text-muted-foreground">満足度</div>
          </div>

          <div className="flex flex-col items-center">
            <Badge variant="secondary" className="mb-2">
              24時間以内返信保証
            </Badge>
            <div className="text-sm text-muted-foreground">サポート品質</div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
