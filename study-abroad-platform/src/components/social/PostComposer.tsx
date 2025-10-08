'use client'

import { Image, Video, MapPin, Smile, X, Globe, Users, Lock } from 'lucide-react'
import { useState, useRef } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { User } from '@/types/social'

interface PostComposerProps {
  user: User
  onPost: (content: string, images: File[], privacy: 'public' | 'followers' | 'private', location?: string) => void
  placeholder?: string
  replyTo?: { id: string; author: string }
  onCancel?: () => void
  initialContent?: string
  fromBlog?: boolean
}

export function PostComposer({ user, onPost, placeholder = "今何してる？留学の体験をシェアしよう！", replyTo, onCancel, initialContent, fromBlog }: PostComposerProps) {
  const [content, setContent] = useState(initialContent || '')
  const [images, setImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [privacy, setPrivacy] = useState<'public' | 'followers' | 'private'>('public')
  const [location, setLocation] = useState('')
  const [showLocationInput, setShowLocationInput] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length + images.length > 4) {
      alert('最大4枚まで投稿できます')
      return
    }

    const newImages = [...images, ...files]
    setImages(newImages)

    // プレビュー作成
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviews(prev => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    const newPreviews = previews.filter((_, i) => i !== index)
    setImages(newImages)
    setPreviews(newPreviews)
  }

  const handlePost = async () => {
    if (!content.trim() && images.length === 0) return

    setIsPosting(true)
    try {
      await onPost(content, images, privacy, location || undefined)
      setContent('')
      setImages([])
      setPreviews([])
      setLocation('')
      setShowLocationInput(false)
    } catch (error) {
      console.error('投稿に失敗しました:', error)
    } finally {
      setIsPosting(false)
    }
  }

  const charCount = content.length
  const maxChars = 280

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        {replyTo && (
          <div className="mb-4 text-sm text-gray-600">
            <span>{replyTo.author}さんへの返信</span>
          </div>
        )}

        {fromBlog && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center text-sm text-blue-700">
              <span className="mr-2">📝</span>
              <span className="font-medium">ブログ記事から共有</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              ブログ記事の内容が自動で入力されています。編集して投稿してください。
            </p>
          </div>
        )}

        <div className="flex space-x-3">
          <Avatar className="w-12 h-12 flex-shrink-0">
            <AvatarImage src={user.avatar} alt={user.displayName} />
            <AvatarFallback>{user.displayName[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-4">
            {/* 投稿内容 */}
            <div>
              <Textarea
                placeholder={placeholder}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[100px] border-none resize-none text-lg placeholder:text-gray-500 focus-visible:ring-0"
                maxLength={maxChars}
              />

              {/* 文字数カウンター */}
              <div className="flex justify-end mt-2">
                <span className={`text-sm ${charCount > maxChars * 0.9 ? 'text-red-500' : 'text-gray-400'}`}>
                  {charCount}/{maxChars}
                </span>
              </div>
            </div>

            {/* 画像プレビュー */}
            {previews.length > 0 && (
              <div className={`grid gap-2 ${
                previews.length === 1 ? 'grid-cols-1' :
                previews.length === 2 ? 'grid-cols-2' :
                'grid-cols-2'
              }`}>
                {previews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`プレビュー ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-8 h-8 bg-gray-900/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-900/80"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 位置情報入力 */}
            {showLocationInput && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="位置情報を入力..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 px-2 py-1 text-sm border rounded-md"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowLocationInput(false)
                    setLocation('')
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* ツールバーと投稿ボタン */}
            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex items-center space-x-1">
                {/* 画像アップロード */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={images.length >= 4}
                  className="text-blue-500 hover:bg-blue-50"
                >
                  <Image className="h-4 w-4" />
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                />

                {/* 動画アップロード（将来実装） */}
                <Button variant="ghost" size="sm" disabled className="text-blue-500 hover:bg-blue-50">
                  <Video className="h-4 w-4" />
                </Button>

                {/* 位置情報 */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLocationInput(!showLocationInput)}
                  className="text-blue-500 hover:bg-blue-50"
                >
                  <MapPin className="h-4 w-4" />
                </Button>

                {/* 絵文字（将来実装） */}
                <Button variant="ghost" size="sm" disabled className="text-blue-500 hover:bg-blue-50">
                  <Smile className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-3">
                {/* プライバシー設定 */}
                <Select value={privacy} onValueChange={(value: 'public' | 'followers' | 'private') => setPrivacy(value)}>
                  <SelectTrigger className="w-auto">
                    <div className="flex items-center space-x-1">
                      {privacy === 'public' && <Globe className="h-4 w-4" />}
                      {privacy === 'followers' && <Users className="h-4 w-4" />}
                      {privacy === 'private' && <Lock className="h-4 w-4" />}
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4" />
                        <span>全体に公開</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="followers">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>フォロワーのみ</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="private">
                      <div className="flex items-center space-x-2">
                        <Lock className="h-4 w-4" />
                        <span>自分のみ</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

                {/* キャンセルボタン */}
                {onCancel && (
                  <Button variant="outline" size="sm" onClick={onCancel}>
                    キャンセル
                  </Button>
                )}

                {/* 投稿ボタン */}
                <Button
                  onClick={handlePost}
                  disabled={(!content.trim() && images.length === 0) || isPosting || charCount > maxChars}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6"
                >
                  {isPosting ? '投稿中...' : replyTo ? '返信' : '投稿'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}