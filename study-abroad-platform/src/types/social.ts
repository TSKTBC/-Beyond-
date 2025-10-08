export interface User {
  id: string
  username: string
  displayName: string
  avatar: string
  bio?: string
  verified: boolean
  followerCount: number
  followingCount: number
  postCount: number
  location?: string
  website?: string
  joinedAt: string
}

export interface Post {
  id: string
  content: string
  images?: string[]
  video?: string
  author: User
  createdAt: string
  updatedAt?: string
  likes: number
  comments: number
  reposts: number
  views: number
  isLiked: boolean
  isReposted: boolean
  isBookmarked: boolean
  tags: string[]
  location?: string
  repliedTo?: Post
  type: 'post' | 'repost' | 'reply'
  privacy: 'public' | 'followers' | 'private'
  blogPostRef?: {
    slug: string
    title: string
  }
}

export interface Comment {
  id: string
  content: string
  author: User
  postId: string
  createdAt: string
  likes: number
  isLiked: boolean
  replies: Comment[]
  repliedTo?: string
}

export interface Follow {
  id: string
  followerId: string
  followingId: string
  createdAt: string
}

export interface Like {
  id: string
  userId: string
  postId: string
  createdAt: string
}

export interface Notification {
  id: string
  type: 'like' | 'comment' | 'follow' | 'repost' | 'mention'
  fromUser: User
  toUserId: string
  postId?: string
  createdAt: string
  read: boolean
  message: string
}