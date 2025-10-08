'use client'

import { Heart, MessageCircle, Repeat2, Share, Bookmark, MoreHorizontal, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Post } from '@/types/social'

interface PostCardProps {
  post: Post
  currentUserId?: string
  onLike: (postId: string) => void
  onRepost: (postId: string) => void
  onComment: (postId: string) => void
  onBookmark: (postId: string) => void
  onShare: (postId: string) => void
  showThread?: boolean
}

export function PostCard({
  post,
  currentUserId,
  onLike,
  onRepost,
  onComment,
  onBookmark,
  onShare,
  showThread = false
}: PostCardProps) {
  const [isLiking, setIsLiking] = useState(false)
  const [isReposting, setIsReposting] = useState(false)

  const handleLike = async () => {
    if (isLiking) return
    setIsLiking(true)
    try {
      await onLike(post.id)
    } finally {
      setIsLiking(false)
    }
  }

  const handleRepost = async () => {
    if (isReposting) return
    setIsReposting(true)
    try {
      await onRepost(post.id)
    } finally {
      setIsReposting(false)
    }
  }

  const formatTime = (timestamp: string) => {
    const now = new Date()
    const postTime = new Date(timestamp)
    const diff = now.getTime() - postTime.getTime()

    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) {
      return minutes <= 0 ? 'たった今' : `${minutes}分前`
    } else if (hours < 24) {
      return `${hours}時間前`
    } else if (days < 7) {
      return `${days}日前`
    } else {
      return postTime.toLocaleDateString('ja-JP', {
        month: 'short',
        day: 'numeric'
      })
    }
  }

  const formatNumber = (num: number) => {
    if (num < 1000) return num.toString()
    if (num < 1000000) return `${(num / 1000).toFixed(1)}K`
    return `${(num / 1000000).toFixed(1)}M`
  }

  return (
    <Card className="w-full hover:bg-gray-50/50 transition-colors">
      <CardContent className="p-4">
        {/* リポスト表示 */}
        {post.type === 'repost' && (
          <div className="flex items-center mb-3 text-sm text-gray-600">
            <Repeat2 className="h-4 w-4 mr-2" />
            <span>{post.author.displayName}がリポストしました</span>
          </div>
        )}

        {/* 返信表示 */}
        {post.repliedTo && (
          <div className="mb-3 pb-3 border-b border-gray-100">
            <div className="text-sm text-gray-600 mb-2">
              返信先: @{post.repliedTo.author.username}
            </div>
            <div className="text-sm text-gray-500 bg-gray-50 p-2 rounded">
              {post.repliedTo.content.length > 100
                ? `${post.repliedTo.content.substring(0, 100)}...`
                : post.repliedTo.content}
            </div>
          </div>
        )}

        <div className="flex space-x-3">
          {/* アバター */}
          <Link href={`/profile/${post.author.username}`} className="flex-shrink-0">
            <Avatar className="w-12 h-12 hover:opacity-80 transition-opacity">
              <AvatarImage src={post.author.avatar} alt={post.author.displayName} />
              <AvatarFallback>{post.author.displayName[0]}</AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex-1 min-w-0">
            {/* ヘッダー */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 min-w-0">
                <Link
                  href={`/profile/${post.author.username}`}
                  className="font-bold text-gray-900 hover:underline truncate"
                >
                  {post.author.displayName}
                </Link>
                {post.author.verified && (
                  <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">✓</span>
                  </div>
                )}
                <span className="text-gray-500 text-sm truncate">@{post.author.username}</span>
                <span className="text-gray-500">·</span>
                <span className="text-gray-500 text-sm flex-shrink-0">
                  {formatTime(post.createdAt)}
                </span>
              </div>

              {/* メニューボタン */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {currentUserId === post.author.id ? (
                    <>
                      <DropdownMenuItem>投稿を編集</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">投稿を削除</DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem>@{post.author.username}をフォロー</DropdownMenuItem>
                      <DropdownMenuItem>投稿を報告</DropdownMenuItem>
                      <DropdownMenuItem>@{post.author.username}をミュート</DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* 本文 */}
            <div className="mb-3">
              <p className="text-gray-900 whitespace-pre-wrap break-words">
                {post.content}
              </p>

              {/* タグ */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-blue-500 cursor-pointer hover:underline"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 画像 */}
            {post.images && post.images.length > 0 && (
              <div className={`mb-3 rounded-2xl overflow-hidden ${
                post.images.length === 1 ? 'grid grid-cols-1' :
                post.images.length === 2 ? 'grid grid-cols-2 gap-1' :
                post.images.length === 3 ? 'grid grid-cols-2 gap-1' :
                'grid grid-cols-2 gap-1'
              }`}>
                {post.images?.map((image, index) => (
                  <div
                    key={index}
                    className={`relative ${
                      post.images && post.images.length === 3 && index === 0 ? 'row-span-2' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`投稿画像 ${index + 1}`}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
                      onClick={() => {
                        // 画像拡大モーダルを開く（将来実装）
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* 位置情報 */}
            {post.location && (
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{post.location}</span>
              </div>
            )}

            {/* ブログ記事参照 */}
            {post.blogPostRef && (
              <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center text-blue-700 text-sm font-medium mb-1">
                      <span className="mr-2">📝</span>
                      関連記事
                    </div>
                    <p className="text-blue-800 font-medium text-sm line-clamp-1">
                      {post.blogPostRef.title}
                    </p>
                    <p className="text-blue-600 text-xs mt-1">
                      コミュニティ内で確認
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* アクションボタン */}
            <div className="flex items-center justify-between max-w-md mt-3">
              {/* コメント */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onComment(post.id)}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 hover:bg-blue-50 p-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">{formatNumber(post.comments)}</span>
              </Button>

              {/* リポスト */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRepost}
                disabled={isReposting}
                className={`flex items-center space-x-1 p-2 ${
                  post.isReposted
                    ? 'text-green-600 hover:text-green-700 hover:bg-green-50'
                    : 'text-gray-600 hover:text-green-500 hover:bg-green-50'
                }`}
              >
                <Repeat2 className="h-4 w-4" />
                <span className="text-sm">{formatNumber(post.reposts)}</span>
              </Button>

              {/* いいね */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                disabled={isLiking}
                className={`flex items-center space-x-1 p-2 ${
                  post.isLiked
                    ? 'text-red-500 hover:text-red-600 hover:bg-red-50'
                    : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm">{formatNumber(post.likes)}</span>
              </Button>

              {/* ブックマーク */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onBookmark(post.id)}
                className={`p-2 ${
                  post.isBookmarked
                    ? 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                    : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
                }`}
              >
                <Bookmark className={`h-4 w-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
              </Button>

              {/* シェア */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onShare(post.id)}
                className="text-gray-600 hover:text-blue-500 hover:bg-blue-50 p-2"
              >
                <Share className="h-4 w-4" />
              </Button>
            </div>

            {/* 表示回数 */}
            {post.views > 0 && (
              <div className="text-sm text-gray-500 mt-2">
                {formatNumber(post.views)} 回表示
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}