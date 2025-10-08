'use client'

import {
  Search, Calendar, User, Clock, ArrowRight, TrendingUp, MessageSquare,
  Users, BookOpen, Sparkles, Eye
} from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'

import { PostCard } from '@/components/social/PostCard'
import { PostComposer } from '@/components/social/PostComposer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { LoadingCard } from '@/components/ui/loading'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Post, User as SocialUser } from '@/types/social'

// Blog Post Interface
interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  category: string
  tags: string[]
  readTime: number
  views: number
  featured: boolean
  image: string
  slug: string
}

// Mock data for blog posts
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: '2024年最新！カナダ留学のメリットとデメリット完全ガイド',
    excerpt: 'カナダ留学を検討している方必見！治安の良さ、多文化環境、ワーキングホリデー制度など、カナダ留学の魅力と注意点を詳しく解説します。',
    content: '',
    author: '山田留学カウンセラー',
    publishedAt: '2024-09-20',
    category: '国別情報',
    tags: ['カナダ', '語学留学', 'ワーキングホリデー'],
    readTime: 8,
    views: 1245,
    featured: true,
    image: '/images/blog/canada-study.jpg',
    slug: 'canada-study-abroad-guide-2024'
  },
  {
    id: '2',
    title: 'IELTS 7.0を3ヶ月で取得した勉強法を公開！',
    excerpt: '留学に必要なIELTSスコア。効率的な学習方法と実際に7.0を取得した体験談をもとに、短期間でスコアアップするコツをお伝えします。',
    content: '',
    author: '田中英語講師',
    publishedAt: '2024-09-18',
    category: '語学・テスト',
    tags: ['IELTS', '英語学習', 'スコアアップ'],
    readTime: 12,
    views: 892,
    featured: true,
    image: '/images/blog/ielts-study.jpg',
    slug: 'ielts-7-study-method'
  },
  {
    id: '3',
    title: 'オーストラリア留学で失敗しないための準備チェックリスト',
    excerpt: 'オーストラリア留学を成功させるために必要な準備を徹底解説。ビザ申請から生活用品まで、現地で困らないための完全チェックリストです。',
    content: '',
    author: '佐藤留学アドバイザー',
    publishedAt: '2024-09-15',
    category: '留学準備',
    tags: ['オーストラリア', '準備', 'チェックリスト'],
    readTime: 10,
    views: 654,
    featured: false,
    image: '/images/blog/australia-prep.jpg',
    slug: 'australia-study-preparation'
  }
]

// Mock data for social users
const mockCurrentUser: SocialUser = {
  id: '1',
  username: 'study_abroad_jp',
  displayName: '留学太郎',
  avatar: '/avatars/user1.jpg',
  bio: '🇨🇦カナダ留学中の大学生です！日々の体験をシェアしています✨',
  verified: false,
  followerCount: 156,
  followingCount: 89,
  postCount: 47,
  location: 'Toronto, Canada',
  website: 'https://mystudyabroad.blog',
  joinedAt: '2024-03-15'
}

const mockSocialUsers: SocialUser[] = [
  {
    id: '2',
    username: 'aussie_life',
    displayName: 'オーストラリア留学ガール',
    avatar: '/avatars/user2.jpg',
    bio: '🇦🇺シドニーで語学留学中！美味しいカフェ情報も発信中☕️',
    verified: true,
    followerCount: 2341,
    followingCount: 456,
    postCount: 234,
    location: 'Sydney, Australia',
    joinedAt: '2023-11-02'
  }
]

// Mock data for social posts
const mockSocialPosts: Post[] = [
  {
    id: '1',
    content: '今日はトロント大学のキャンパスツアーに参加しました！🏛️\\n\\n建物がどれも歴史的で美しくて、本当に感動しました。特に図書館の蔵書数に圧倒されました📚\\n\\n#トロント大学 #カナダ留学 #キャンパスライフ',
    images: ['/images/social/toronto-campus-1.jpg', '/images/social/toronto-campus-2.jpg'],
    author: mockCurrentUser,
    createdAt: '2024-09-25T10:30:00Z',
    likes: 42,
    comments: 8,
    reposts: 6,
    views: 234,
    isLiked: false,
    isReposted: false,
    isBookmarked: false,
    tags: ['#トロント大学', '#カナダ留学', '#キャンパスライフ'],
    location: 'University of Toronto',
    type: 'post',
    privacy: 'public'
  },
  {
    id: '2',
    content: 'シドニーのボンダイビーチでサーフィンレッスンを受けました🏄\\n\\nオーストラリアに来て初めてのサーフィン！最初は全然立てなかったけど、最後には少し滑れるようになりました💪\\n\\n留学って語学だけじゃなく、新しいことに挑戦できるのが最高ですね！',
    images: ['/images/social/bondi-beach-1.jpg'],
    author: mockSocialUsers[0],
    createdAt: '2024-09-25T08:15:00Z',
    likes: 156,
    comments: 23,
    reposts: 18,
    views: 567,
    isLiked: true,
    isReposted: false,
    isBookmarked: true,
    tags: ['#ボンダイビーチ', '#サーフィン', '#オーストラリア留学'],
    location: 'Bondi Beach, Sydney',
    type: 'post',
    privacy: 'public'
  }
]

const categories = ['国別情報', '語学・テスト', '留学準備', 'ビザ情報', '体験談', '生活情報']
const popularTags = ['カナダ', 'オーストラリア', 'IELTS', 'TOEFL', '語学留学', 'ワーキングホリデー']

function CommunityContent() {
  const searchParams = useSearchParams()

  // States
  const [activeTab, setActiveTab] = useState('timeline')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Blog states
  const [filteredBlogPosts, setFilteredBlogPosts] = useState<BlogPost[]>(mockBlogPosts)

  // Social states
  const [socialPosts, setSocialPosts] = useState<Post[]>(mockSocialPosts)
  const [sharedContent, setSharedContent] = useState<{ content: string; images: string[]; fromBlog: boolean; blogPost?: BlogPost } | null>(null)

  useEffect(() => {
    // Handle shared content from other pages
    if (searchParams.get('share') === 'blog') {
      const storedContent = localStorage.getItem('socialShare')
      if (storedContent) {
        try {
          const content = JSON.parse(storedContent)
          if (content.fromBlog) {
            setSharedContent(content)
            localStorage.removeItem('socialShare')
            setActiveTab('create') // Switch to create tab when sharing from blog
          }
        } catch (error) {
          console.error('Error parsing shared content:', error)
        }
      }
    }

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000)
  }, [searchParams])

  // Filter blog posts
  useEffect(() => {
    let filtered = mockBlogPosts

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter((post: BlogPost) => post.category === selectedCategory)
    }

    if (selectedTag) {
      filtered = filtered.filter((post: BlogPost) => post.tags.includes(selectedTag))
    }

    setFilteredBlogPosts(filtered)
  }, [searchTerm, selectedCategory, selectedTag])

  // Blog functions
  const shareToSocial = (post: BlogPost) => {
    const shareText = `📝 "${post.title}"

${post.excerpt.substring(0, 100)}...

#留学ブログ #${post.category.replace(/・/g, '')} ${post.tags.map(tag => `#${tag}`).join(' ')}

詳細は留学コミュニティページでご確認ください`

    setSharedContent({
      content: shareText,
      images: [],
      fromBlog: true,
      blogPost: post
    })

    setActiveTab('create')
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setSelectedTag('')
  }

  // Social functions
  const handlePost = async (content: string, images: File[], privacy: 'public' | 'followers' | 'private', location?: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      content,
      images: images.map(img => URL.createObjectURL(img)),
      author: mockCurrentUser,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      reposts: 0,
      views: 0,
      isLiked: false,
      isReposted: false,
      isBookmarked: false,
      tags: content.match(/#[\w\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]+/g) || [],
      location,
      type: 'post',
      privacy,
      blogPostRef: sharedContent?.fromBlog && sharedContent?.blogPost ? {
        slug: sharedContent.blogPost.slug,
        title: sharedContent.blogPost.title
      } : undefined
    }

    setSocialPosts(prev => [newPost, ...prev])

    if (sharedContent) {
      setSharedContent(null)
    }

    setActiveTab('timeline')
  }

  const handleLike = async (postId: string) => {
    setSocialPosts(prev => prev.map(post =>
      post.id === postId
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ))
  }

  const handleRepost = async (postId: string) => {
    setSocialPosts(prev => prev.map(post =>
      post.id === postId
        ? { ...post, isReposted: !post.isReposted, reposts: post.isReposted ? post.reposts - 1 : post.reposts + 1 }
        : post
    ))
  }

  const handleComment = async (postId: string) => {
    alert(`コメント機能は実装予定です。投稿ID: ${postId}`)
  }

  const handleBookmark = async (postId: string) => {
    setSocialPosts(prev => prev.map(post =>
      post.id === postId
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ))
  }

  const handleShare = async (postId: string) => {
    if (navigator.share) {
      await navigator.share({
        title: '留学コミュニティ',
        text: '面白い投稿を見つけました！',
        url: `${window.location.origin}/community/post/${postId}`
      })
    } else {
      await navigator.clipboard.writeText(`${window.location.origin}/community/post/${postId}`)
      alert('リンクをコピーしました！')
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-4 py-6">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                留学コミュニティ
              </h1>
              <p className="text-gray-600">ブログ記事と留学生の体験談、全てここで見つかる</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
                <TabsTrigger value="timeline" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  タイムライン
                </TabsTrigger>
                <TabsTrigger value="blog" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  ブログ記事
                </TabsTrigger>
                <TabsTrigger value="social" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  SNS投稿
                </TabsTrigger>
                <TabsTrigger value="create" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  投稿作成
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Main Content */}
          <div className="flex-1 lg:max-w-4xl">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {/* Timeline - Mixed Content */}
              <TabsContent value="timeline" className="mt-0">
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                    最新のコンテンツ
                  </h2>

                  <div className="space-y-6">
                    {/* Featured Blog Posts */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-700">📝 注目のブログ記事</h3>
                      <div className="grid gap-4">
                        {mockBlogPosts.filter(post => post.featured).slice(0, 2).map((post) => (
                          <Card key={post.id} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <img
                                  src={post.image}
                                  alt={post.title}
                                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                                />
                                <div className="flex-1">
                                  <div className="flex items-start justify-between mb-2">
                                    <Badge variant="secondary" className="mb-2">
                                      {post.category}
                                    </Badge>
                                  </div>
                                  <h4 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">
                                    {post.title}
                                  </h4>
                                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {post.excerpt}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center text-xs text-gray-500 gap-4">
                                      <span className="flex items-center gap-1">
                                        <User className="h-3 w-3" />
                                        {post.author}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {post.readTime}分
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Eye className="h-3 w-3" />
                                        {post.views.toLocaleString()}
                                      </span>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => shareToSocial(post)}
                                      className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                                    >
                                      💬 シェア
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Recent Social Posts */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-700">💬 最新の投稿</h3>
                      <div className="space-y-4">
                        {socialPosts.slice(0, 3).map((post) => (
                          <PostCard
                            key={post.id}
                            post={post}
                            currentUserId={mockCurrentUser.id}
                            onLike={handleLike}
                            onRepost={handleRepost}
                            onComment={handleComment}
                            onBookmark={handleBookmark}
                            onShare={handleShare}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Blog Posts Tab */}
              <TabsContent value="blog" className="mt-0">
                <div className="p-4">
                  {/* Search and Filter */}
                  <div className="mb-6">
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="ブログ記事を検索..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="md:w-48">
                          <SelectValue placeholder="カテゴリーで絞込み" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">すべてのカテゴリー</SelectItem>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {(searchTerm || selectedCategory || selectedTag) && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">フィルター:</span>
                        {searchTerm && (
                          <Badge variant="secondary">検索: {searchTerm}</Badge>
                        )}
                        {selectedCategory && selectedCategory !== 'all' && (
                          <Badge variant="secondary">カテゴリー: {selectedCategory}</Badge>
                        )}
                        {selectedTag && (
                          <Badge variant="secondary">タグ: {selectedTag}</Badge>
                        )}
                        <Button variant="ghost" size="sm" onClick={clearFilters}>
                          リセット
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Blog Posts Grid */}
                  {isLoading ? (
                    <div className="grid gap-6">
                      {[...Array(3)].map((_, i) => (
                        <LoadingCard key={i} />
                      ))}
                    </div>
                  ) : filteredBlogPosts.length > 0 ? (
                    <div className="space-y-6">
                      {filteredBlogPosts.map((post) => (
                        <Card key={post.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex gap-6">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                              />
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-3">
                                  <Badge variant={post.featured ? "default" : "secondary"}>
                                    {post.category}
                                  </Badge>
                                  {post.featured && (
                                    <Badge className="bg-yellow-100 text-yellow-800">
                                      注目記事
                                    </Badge>
                                  )}
                                </div>
                                <h3 className="font-bold text-xl mb-3 text-gray-900">
                                  {post.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                  {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-sm text-gray-500 gap-4">
                                    <span className="flex items-center gap-1">
                                      <User className="h-4 w-4" />
                                      {post.author}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Calendar className="h-4 w-4" />
                                      {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      {post.readTime}分
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Eye className="h-4 w-4" />
                                      {post.views.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm" disabled>
                                      記事を読む
                                      <ArrowRight className="h-3 w-3 ml-1" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => shareToSocial(post)}
                                      className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                                    >
                                      💬 シェア
                                    </Button>
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-3">
                                  {post.tags.map((tag) => (
                                    <button
                                      key={tag}
                                      onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                                      className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                                        selectedTag === tag
                                          ? 'bg-blue-500 text-white border-blue-500'
                                          : 'bg-white hover:bg-gray-50 border-gray-300'
                                      }`}
                                    >
                                      {tag}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-400 text-6xl mb-4">📝</div>
                      <h3 className="text-xl font-medium text-gray-600 mb-2">
                        記事が見つかりませんでした
                      </h3>
                      <p className="text-gray-500 mb-4">
                        検索条件を変更して再度お試しください
                      </p>
                      <Button onClick={clearFilters}>検索条件をリセット</Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Social Posts Tab */}
              <TabsContent value="social" className="mt-0">
                <div className="p-4">
                  <div className="space-y-4">
                    {socialPosts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        currentUserId={mockCurrentUser.id}
                        onLike={handleLike}
                        onRepost={handleRepost}
                        onComment={handleComment}
                        onBookmark={handleBookmark}
                        onShare={handleShare}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Create Post Tab */}
              <TabsContent value="create" className="mt-0">
                <div className="p-4">
                  <PostComposer
                    user={mockCurrentUser}
                    onPost={handlePost}
                    initialContent={sharedContent?.content}
                    fromBlog={sharedContent?.fromBlog}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 p-4 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">クイックアクション</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setActiveTab('create')}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    投稿を作成
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setActiveTab('blog')}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    ブログ記事を見る
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setActiveTab('social')}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    SNS投稿を見る
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">人気タグ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                      className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                        selectedTag === tag
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white hover:bg-gray-50 border-gray-300'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">コミュニティ統計</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>ブログ記事数</span>
                    <span className="font-semibold">{mockBlogPosts.length}件</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SNS投稿数</span>
                    <span className="font-semibold">{socialPosts.length}件</span>
                  </div>
                  <div className="flex justify-between">
                    <span>アクティブユーザー</span>
                    <span className="font-semibold">156人</span>
                  </div>
                  <div className="flex justify-between">
                    <span>今月の新規投稿</span>
                    <span className="font-semibold text-green-600">+23</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function CommunityPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CommunityContent />
    </Suspense>
  )
}