'use client'

import { X, Heart, MessageCircle, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import type { Post, Comment, User } from '@/types/social'

interface CommentModalProps {
  isOpen: boolean
  onClose: () => void
  post: Post
  comments: Comment[]
  currentUser: User
  onAddComment: (postId: string, content: string) => void
  onLikeComment: (commentId: string) => void
  onReplyToComment: (commentId: string, content: string) => void
}

export function CommentModal({
  isOpen,
  onClose,
  post,
  comments,
  currentUser,
  onAddComment,
  onLikeComment,
  onReplyToComment
}: CommentModalProps) {
  const [commentText, setCommentText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')

  const handleSubmitComment = async () => {
    if (!commentText.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      await onAddComment(post.id, commentText)
      setCommentText('')
    } catch (error) {
      console.error('コメントの投稿に失敗しました:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitReply = async (commentId: string) => {
    if (!replyText.trim()) return

    try {
      await onReplyToComment(commentId, replyText)
      setReplyText('')
      setReplyingTo(null)
    } catch (error) {
      console.error('返信の投稿に失敗しました:', error)
    }
  }

  const formatTime = (timestamp: string) => {
    const now = new Date()
    const commentTime = new Date(timestamp)
    const diff = now.getTime() - commentTime.getTime()

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
      return commentTime.toLocaleDateString('ja-JP', {
        month: 'short',
        day: 'numeric'
      })
    }
  }

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`flex space-x-3 ${isReply ? 'ml-12 mt-2' : 'py-3'} ${!isReply ? 'border-b border-gray-100' : ''}`}>
      <Avatar className="w-10 h-10 flex-shrink-0">
        <AvatarImage src={comment.author.avatar} alt={comment.author.displayName} />
        <AvatarFallback>{comment.author.displayName[0]}</AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-medium text-sm">{comment.author.displayName}</span>
          {comment.author.verified && (
            <div className="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center">
              <span className="text-xs">✓</span>
            </div>
          )}
          <span className="text-gray-500 text-sm">@{comment.author.username}</span>
          <span className="text-gray-500">·</span>
          <span className="text-gray-500 text-sm">{formatTime(comment.createdAt)}</span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="w-6 h-6 p-0 ml-auto">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {currentUser.id === comment.author.id ? (
                <>
                  <DropdownMenuItem>コメントを編集</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">コメントを削除</DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem>@{comment.author.username}をフォロー</DropdownMenuItem>
                  <DropdownMenuItem>コメントを報告</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="text-gray-900 text-sm whitespace-pre-wrap break-words mb-2">
          {comment.content}
        </p>

        <div className="flex items-center space-x-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
            className="text-gray-600 hover:text-blue-500 p-1 h-auto"
          >
            <MessageCircle className="h-3 w-3 mr-1" />
            <span className="text-xs">{comment.replies?.length || 0}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLikeComment(comment.id)}
            className={`p-1 h-auto ${
              comment.isLiked
                ? 'text-red-500 hover:text-red-600'
                : 'text-gray-600 hover:text-red-500'
            }`}
          >
            <Heart className={`h-3 w-3 mr-1 ${comment.isLiked ? 'fill-current' : ''}`} />
            <span className="text-xs">{comment.likes}</span>
          </Button>
        </div>

        {/* 返信入力 */}
        {replyingTo === comment.id && (
          <div className="mt-3 flex space-x-2">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage src={currentUser.avatar} alt={currentUser.displayName} />
              <AvatarFallback>{currentUser.displayName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder={`@${comment.author.username}に返信...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="min-h-[60px] text-sm"
                rows={2}
              />
              <div className="flex justify-end space-x-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setReplyingTo(null)
                    setReplyText('')
                  }}
                >
                  キャンセル
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleSubmitReply(comment.id)}
                  disabled={!replyText.trim()}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  返信
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 返信一覧 */}
        {comment.replies && comment.replies.map((reply) => (
          <CommentItem key={reply.id} comment={reply} isReply />
        ))}
      </div>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="flex items-center justify-between">
            <span>コメント</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full max-h-[calc(80vh-80px)]">
          {/* 元の投稿 */}
          <div className="px-6 py-4 border-b bg-gray-50">
            <div className="flex space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={post.author.avatar} alt={post.author.displayName} />
                <AvatarFallback>{post.author.displayName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-bold">{post.author.displayName}</span>
                  {post.author.verified && (
                    <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                  )}
                  <span className="text-gray-500">@{post.author.username}</span>
                </div>
                <p className="text-gray-900 mb-2">{post.content}</p>
                {post.images && post.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {post.images.slice(0, 2).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`投稿画像 ${index + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
                <div className="text-sm text-gray-500">
                  {post.comments} 件のコメント
                </div>
              </div>
            </div>
          </div>

          {/* コメント入力 */}
          <div className="px-6 py-4 border-b">
            <div className="flex space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={currentUser.avatar} alt={currentUser.displayName} />
                <AvatarFallback>{currentUser.displayName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="コメントを追加..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="min-h-[80px] border-none resize-none focus-visible:ring-0"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <Button
                    onClick={handleSubmitComment}
                    disabled={!commentText.trim() || isSubmitting}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    {isSubmitting ? 'コメント中...' : 'コメント'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* コメント一覧 */}
          <ScrollArea className="flex-1">
            <div className="px-6">
              {comments.length === 0 ? (
                <div className="py-8 text-center">
                  <div className="text-gray-400 text-4xl mb-4">💬</div>
                  <p className="text-gray-600 mb-2">まだコメントはありません</p>
                  <p className="text-sm text-gray-500">最初にコメントしてみませんか？</p>
                </div>
              ) : (
                <div>
                  {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}