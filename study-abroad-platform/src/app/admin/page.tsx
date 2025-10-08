'use client'

import { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
  Users,
  School,
  Calendar,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { LoadingPage, LoadingCard } from '@/components/ui/loading'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'


interface AdminUser {
  role?: string
  [key: string]: unknown
}

interface DashboardStats {
  totalUsers: number
  totalSchools: number
  totalConsultations: number
  totalRevenue: number
  monthlyGrowth: number
}

interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
  lastLogin: string
  status: 'active' | 'inactive'
}

interface Consultation {
  id: string
  user: string
  date: string
  time: string
  type: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  counselor: string
}

const mockStats: DashboardStats = {
  totalUsers: 1234,
  totalSchools: 245,
  totalConsultations: 567,
  totalRevenue: 15000000,
  monthlyGrowth: 12.5
}

const mockUsers: User[] = [
  {
    id: '1',
    name: '田中太郎',
    email: 'tanaka@example.com',
    role: 'STUDENT',
    createdAt: '2024-01-15',
    lastLogin: '2024-09-20',
    status: 'active'
  },
  {
    id: '2',
    name: '佐藤花子',
    email: 'sato@example.com',
    role: 'STUDENT',
    createdAt: '2024-02-10',
    lastLogin: '2024-09-19',
    status: 'active'
  },
  {
    id: '3',
    name: '山田次郎',
    email: 'yamada@example.com',
    role: 'COUNSELOR',
    createdAt: '2024-01-20',
    lastLogin: '2024-09-21',
    status: 'active'
  }
]

const mockConsultations: Consultation[] = [
  {
    id: '1',
    user: '田中太郎',
    date: '2024-09-25',
    time: '14:00',
    type: '一般的な留学相談',
    status: 'confirmed',
    counselor: '山田次郎'
  },
  {
    id: '2',
    user: '佐藤花子',
    date: '2024-09-26',
    time: '10:00',
    type: '学校選択のアドバイス',
    status: 'pending',
    counselor: '未割当'
  },
  {
    id: '3',
    user: '鈴木一郎',
    date: '2024-09-24',
    time: '16:00',
    type: 'ビザ申請サポート',
    status: 'completed',
    counselor: '山田次郎'
  }
]

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 管理者権限チェック
    if (status === 'authenticated' && (session?.user as AdminUser)?.role !== 'ADMIN') {
      redirect('/dashboard')
    }

    // データ読み込み
    const loadData = async () => {
      setIsLoading(true)
      // 実際のAPIコールをシミュレート
      await new Promise(resolve => setTimeout(resolve, 1000))

      setStats(mockStats)
      setUsers(mockUsers)
      setConsultations(mockConsultations)
      setIsLoading(false)
    }

    if (status === 'authenticated') {
      loadData()
    }
  }, [session, status])

  if (status === 'loading') {
    return <LoadingPage title="管理画面を読み込み中..." />
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin')
  }

  if ((session?.user as AdminUser)?.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default',
      inactive: 'secondary',
      pending: 'secondary',
      confirmed: 'default',
      completed: 'outline',
      cancelled: 'destructive'
    } as const

    const labels = {
      active: 'アクティブ',
      inactive: '非アクティブ',
      pending: '保留中',
      confirmed: '確定',
      completed: '完了',
      cancelled: 'キャンセル'
    }

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    )
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <LoadingCard key={i} />
          ))
        ) : (
          <>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">総ユーザー数</p>
                    <p className="text-2xl font-bold">{stats?.totalUsers.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <School className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">提携校数</p>
                    <p className="text-2xl font-bold">{stats?.totalSchools}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">相談件数</p>
                    <p className="text-2xl font-bold">{stats?.totalConsultations}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">月間売上</p>
                    <p className="text-2xl font-bold">¥{stats?.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* 最近のアクティビティ */}
      <Card>
        <CardHeader>
          <CardTitle>最近のアクティビティ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 rounded-full p-2">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">新規ユーザー登録: 田中太郎さん</p>
                <p className="text-xs text-gray-500">5分前</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 rounded-full p-2">
                <Calendar className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">相談予約: 佐藤花子さん</p>
                <p className="text-xs text-gray-500">15分前</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 rounded-full p-2">
                <MessageSquare className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">問い合わせ受信</p>
                <p className="text-xs text-gray-500">30分前</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">ユーザー管理</h2>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          新規追加
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="ユーザーを検索..." className="pl-10" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべての役割</SelectItem>
            <SelectItem value="STUDENT">学生</SelectItem>
            <SelectItem value="COUNSELOR">カウンセラー</SelectItem>
            <SelectItem value="ADMIN">管理者</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-4 font-medium">ユーザー</th>
                  <th className="text-left p-4 font-medium">役割</th>
                  <th className="text-left p-4 font-medium">登録日</th>
                  <th className="text-left p-4 font-medium">最終ログイン</th>
                  <th className="text-left p-4 font-medium">ステータス</th>
                  <th className="text-left p-4 font-medium">アクション</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="p-4">{user.role}</td>
                    <td className="p-4">{user.createdAt}</td>
                    <td className="p-4">{user.lastLogin}</td>
                    <td className="p-4">{getStatusBadge(user.status)}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderConsultations = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">相談管理</h2>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          手動予約
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="相談を検索..." className="pl-10" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべてのステータス</SelectItem>
            <SelectItem value="pending">保留中</SelectItem>
            <SelectItem value="confirmed">確定</SelectItem>
            <SelectItem value="completed">完了</SelectItem>
            <SelectItem value="cancelled">キャンセル</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-4 font-medium">ユーザー</th>
                  <th className="text-left p-4 font-medium">日時</th>
                  <th className="text-left p-4 font-medium">相談内容</th>
                  <th className="text-left p-4 font-medium">担当者</th>
                  <th className="text-left p-4 font-medium">ステータス</th>
                  <th className="text-left p-4 font-medium">アクション</th>
                </tr>
              </thead>
              <tbody>
                {consultations.map((consultation) => (
                  <tr key={consultation.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{consultation.user}</td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{consultation.date}</div>
                        <div className="text-sm text-gray-500">{consultation.time}</div>
                      </div>
                    </td>
                    <td className="p-4">{consultation.type}</td>
                    <td className="p-4">{consultation.counselor}</td>
                    <td className="p-4">{getStatusBadge(consultation.status)}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">管理画面</h1>
          <p className="text-gray-600">システムの管理と監視</p>
        </div>

        {/* タブナビゲーション */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: '概要', icon: TrendingUp },
              { id: 'users', name: 'ユーザー', icon: Users },
              { id: 'consultations', name: '相談', icon: Calendar },
              { id: 'schools', name: '学校', icon: School },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              )
            })}
          </nav>
        </div>

        {/* タブコンテンツ */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'consultations' && renderConsultations()}
        {activeTab === 'schools' && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-600 mb-2">学校管理</h3>
            <p className="text-gray-500">この機能は準備中です</p>
          </div>
        )}
      </div>
    </main>
  )
}