'use client'

import { Calendar, MapPin, Link as LinkIcon, Edit, Settings, MoreHorizontal, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { User, Post } from '@/types/social'

import { PostCard } from './PostCard'

interface UserProfileProps {
  user: User
  posts: Post[]
  currentUserId?: string
  isFollowing?: boolean
  onFollow?: (userId: string) => void
  onUnfollow?: (userId: string) => void
  onLike: (postId: string) => void
  onRepost: (postId: string) => void
  onComment: (postId: string) => void
  onBookmark: (postId: string) => void
  onShare: (postId: string) => void
}

export function UserProfile({
  user,
  posts,
  currentUserId,
  isFollowing = false,
  onFollow,
  onUnfollow,
  onLike,
  onRepost,
  onComment,
  onBookmark,
  onShare
}: UserProfileProps) {
  const [activeTab, setActiveTab] = useState('posts')
  const [following, setFollowing] = useState(isFollowing)

  const isOwnProfile = currentUserId === user.id

  const handleFollow = async () => {
    if (following) {
      await onUnfollow?.(user.id)
      setFollowing(false)
    } else {
      await onFollow?.(user.id)
      setFollowing(true)
    }
  }

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long'
    })
  }

  // フィルタリングされた投稿
  const filteredPosts = posts.filter(post => {
    if (activeTab === 'posts') return post.author.id === user.id && post.type === 'post'
    if (activeTab === 'replies') return post.author.id === user.id && post.repliedTo
    if (activeTab === 'media') return post.author.id === user.id && post.images && post.images.length > 0
    if (activeTab === 'likes') return post.isLiked && post.author.id === user.id // 実際にはLiked postsを取得
    return true
  })

  return (
    <div className="max-w-2xl mx-auto bg-white min-h-screen border-x border-gray-200">
      {/* ヘッダー */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10">
        <div className="flex items-center px-4 py-3">
          <Button variant="ghost" size="sm" className="mr-4" asChild>
            <Link href="/community">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{user.displayName}</h1>
            <p className="text-sm text-gray-600">{user.postCount.toLocaleString()} 投稿</p>
          </div>
        </div>
      </div>

      {/* プロフィールヘッダー */}
      <div className="relative">
        {/* カバー画像 */}
        <div className="h-48 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* プロフィール情報 */}
        <div className="px-4 pb-4">
          {/* アバターとボタン */}
          <div className="flex justify-between items-start -mt-16 mb-4">
            <Avatar className="w-32 h-32 border-4 border-white bg-white">
              <AvatarImage src={user.avatar} alt={user.displayName} />
              <AvatarFallback className="text-2xl">{user.displayName[0]}</AvatarFallback>
            </Avatar>

            <div className="flex items-center space-x-2 mt-16">
              {isOwnProfile ? (
                <>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    プロフィール編集
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant={following ? "outline" : "default"}
                    size="sm"
                    onClick={handleFollow}
                    className={following ? "" : "bg-blue-500 hover:bg-blue-600 text-white"}
                  >
                    {following ? 'フォロー中' : 'フォロー'}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>@{user.username}をミュート</DropdownMenuItem>
                      <DropdownMenuItem>@{user.username}をブロック</DropdownMenuItem>
                      <DropdownMenuItem>@{user.username}を報告</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          </div>

          {/* ユーザー情報 */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-gray-900">{user.displayName}</h2>
                {user.verified && (
                  <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className="text-gray-600">@{user.username}</p>
            </div>

            {user.bio && (
              <p className="text-gray-900 whitespace-pre-wrap">{user.bio}</p>
            )}

            {/* メタ情報 */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              {user.location && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.website && (
                <div className="flex items-center">
                  <LinkIcon className="h-4 w-4 mr-1" />
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {user.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formatJoinDate(user.joinedAt)}に参加</span>
              </div>
            </div>

            {/* フォロー情報 */}
            <div className="flex items-center space-x-6 text-sm">
              <button className="hover:underline">
                <span className="font-bold text-gray-900">{user.followingCount.toLocaleString()}</span>
                <span className="text-gray-600 ml-1">フォロー中</span>
              </button>
              <button className="hover:underline">
                <span className="font-bold text-gray-900">{user.followerCount.toLocaleString()}</span>
                <span className="text-gray-600 ml-1">フォロワー</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* タブ */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start border-b bg-transparent p-0">
          <TabsTrigger
            value="posts"
            className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
          >
            投稿
          </TabsTrigger>
          <TabsTrigger
            value="replies"
            className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
          >
            返信
          </TabsTrigger>
          <TabsTrigger
            value="media"
            className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
          >
            メディア
          </TabsTrigger>
          {isOwnProfile && (
            <TabsTrigger
              value="likes"
              className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
            >
              いいね
            </TabsTrigger>
          )}
        </TabsList>

        {/* 投稿一覧 */}
        <TabsContent value={activeTab} className="mt-0">
          {filteredPosts.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {activeTab === 'posts' && '投稿がありません'}
                {activeTab === 'replies' && '返信がありません'}
                {activeTab === 'media' && 'メディア投稿がありません'}
                {activeTab === 'likes' && 'いいねした投稿がありません'}
              </h3>
              <p className="text-gray-600">
                {activeTab === 'posts' && `${isOwnProfile ? 'あなた' : user.displayName}の最初の投稿を楽しみに待っています！`}
                {activeTab === 'replies' && 'まだ誰にも返信していません'}
                {activeTab === 'media' && '画像や動画付きの投稿がありません'}
                {activeTab === 'likes' && 'まだ投稿にいいねしていません'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  currentUserId={currentUserId}
                  onLike={onLike}
                  onRepost={onRepost}
                  onComment={onComment}
                  onBookmark={onBookmark}
                  onShare={onShare}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}