'use client'

import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Globe,
  Target,
  Edit,
  Save,
  Camera,
  X
} from 'lucide-react'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  nationality: string
  address: string
  bio: string
  studyGoals: string[]
  languageLevel: 'beginner' | 'intermediate' | 'advanced'
  preferredDestinations: string[]
  studyPurpose: string
  profileImage?: string
}

interface StudyHistory {
  id: string
  schoolName: string
  program: string
  duration: string
  status: 'completed' | 'current' | 'planned'
  startDate: string
  endDate?: string
}

const mockProfile: UserProfile = {
  id: '1',
  name: '田中 太郎',
  email: 'tanaka.taro@example.com',
  phone: '090-1234-5678',
  dateOfBirth: '1998-05-15',
  nationality: '日本',
  address: '東京都渋谷区',
  bio: '大学生です。将来は国際的なビジネスで活躍したいと考えており、英語力向上のため語学留学を希望しています。',
  studyGoals: ['IELTS 7.0取得', '日常会話マスター', 'ビジネス英語習得'],
  languageLevel: 'intermediate',
  preferredDestinations: ['カナダ', 'オーストラリア', 'イギリス'],
  studyPurpose: '大学卒業後の就職活動に向けて、実践的な英語力を身につけたい'
}

const mockStudyHistory: StudyHistory[] = [
  {
    id: '1',
    schoolName: 'ILAC International College',
    program: 'General English',
    duration: '12週間',
    status: 'completed',
    startDate: '2023-09-01',
    endDate: '2023-11-30'
  },
  {
    id: '2',
    schoolName: 'University of Toronto',
    program: 'Academic English',
    duration: '6ヶ月',
    status: 'planned',
    startDate: '2024-09-01'
  }
]

const languageLevelLabels = {
  beginner: '初級',
  intermediate: '中級',
  advanced: '上級'
}

const statusLabels = {
  completed: '修了',
  current: '在学中',
  planned: '予定'
}

const statusColors = {
  completed: 'bg-green-100 text-green-800',
  current: 'bg-blue-100 text-blue-800',
  planned: 'bg-orange-100 text-orange-800'
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<UserProfile>(mockProfile)
  const [editingProfile, setEditingProfile] = useState<UserProfile>(mockProfile)
  const [studyHistory] = useState<StudyHistory[]>(mockStudyHistory)

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 flex items-center justify-center relative overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-300/20 to-blue-300/20 rounded-full blur-3xl translate-y-32 -translate-x-32"></div>
        </div>

        <div className="text-center relative z-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mb-6 shadow-2xl">
            <span className="text-4xl animate-bounce">👤</span>
          </div>
          <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 font-medium">✨ プロフィールを読み込み中...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin')
  }

  const handleEdit = () => {
    setEditingProfile({ ...profile })
    setIsEditing(true)
  }

  const handleSave = () => {
    setProfile({ ...editingProfile })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditingProfile({ ...profile })
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditingProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayChange = (field: 'studyGoals' | 'preferredDestinations', value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item)
    setEditingProfile(prev => ({
      ...prev,
      [field]: items
    }))
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-4 sm:py-8 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* プロフィールヘッダー */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white">
                  {profile.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="h-14 w-14 text-white" />
                    </div>
                  )}
                </div>
                <button className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-3 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110">
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {profile.name}
                    </h1>
                    <p className="text-gray-600 mb-2">{profile.email}</p>
                    <Badge className="mb-4">
                      レベル: {languageLevelLabels[profile.languageLevel]}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    {!isEditing ? (
                      <Button onClick={handleEdit} className="flex items-center gap-2">
                        <Edit className="h-4 w-4" />
                        編集
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button onClick={handleSave} className="flex items-center gap-2">
                          <Save className="h-4 w-4" />
                          保存
                        </Button>
                        <Button onClick={handleCancel} variant="outline" className="flex items-center gap-2">
                          <X className="h-4 w-4" />
                          キャンセル
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-gray-600">{profile.bio}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 基本情報 */}
          <Card>
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">氏名</label>
                  {isEditing ? (
                    <Input
                      value={editingProfile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>{profile.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス</label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={editingProfile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{profile.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">電話番号</label>
                  {isEditing ? (
                    <Input
                      value={editingProfile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{profile.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">生年月日</label>
                  {isEditing ? (
                    <Input
                      type="date"
                      value={editingProfile.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{new Date(profile.dateOfBirth).toLocaleDateString('ja-JP')}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">国籍</label>
                  {isEditing ? (
                    <Input
                      value={editingProfile.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <span>{profile.nationality}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">住所</label>
                  {isEditing ? (
                    <Input
                      value={editingProfile.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{profile.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 留学情報 */}
          <Card>
            <CardHeader>
              <CardTitle>留学情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">自己紹介</label>
                {isEditing ? (
                  <Textarea
                    rows={3}
                    value={editingProfile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="自己紹介を入力してください"
                  />
                ) : (
                  <p className="text-gray-600">{profile.bio}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">留学目的</label>
                {isEditing ? (
                  <Textarea
                    rows={2}
                    value={editingProfile.studyPurpose}
                    onChange={(e) => handleInputChange('studyPurpose', e.target.value)}
                    placeholder="留学の目的を入力してください"
                  />
                ) : (
                  <p className="text-gray-600">{profile.studyPurpose}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">語学レベル</label>
                {isEditing ? (
                  <select
                    value={editingProfile.languageLevel}
                    onChange={(e) => handleInputChange('languageLevel', e.target.value as any)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="beginner">初級</option>
                    <option value="intermediate">中級</option>
                    <option value="advanced">上級</option>
                  </select>
                ) : (
                  <Badge>{languageLevelLabels[profile.languageLevel]}</Badge>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">学習目標</label>
                {isEditing ? (
                  <Input
                    value={editingProfile.studyGoals.join(', ')}
                    onChange={(e) => handleArrayChange('studyGoals', e.target.value)}
                    placeholder="目標をカンマ区切りで入力"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.studyGoals.map((goal, index) => (
                      <Badge key={index} variant="outline">
                        <Target className="h-3 w-3 mr-1" />
                        {goal}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">希望留学先</label>
                {isEditing ? (
                  <Input
                    value={editingProfile.preferredDestinations.join(', ')}
                    onChange={(e) => handleArrayChange('preferredDestinations', e.target.value)}
                    placeholder="希望国をカンマ区切りで入力"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.preferredDestinations.map((destination, index) => (
                      <Badge key={index} variant="secondary">
                        <Globe className="h-3 w-3 mr-1" />
                        {destination}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 留学履歴 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>留学履歴</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studyHistory.map((history) => (
                <div key={history.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{history.schoolName}</h3>
                      <Badge className={statusColors[history.status]}>
                        {statusLabels[history.status]}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-1">{history.program}</p>
                    <p className="text-sm text-gray-500 mb-2">期間: {history.duration}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>開始: {new Date(history.startDate).toLocaleDateString('ja-JP')}</span>
                      {history.endDate && (
                        <span>終了: {new Date(history.endDate).toLocaleDateString('ja-JP')}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}