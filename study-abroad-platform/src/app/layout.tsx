import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Poppins } from "next/font/google";
import "./globals.css";

import { AuthProvider } from '@/components/auth/AuthProvider'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { FloatingActionButton } from '@/components/ui/floating-action-button'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-sans-jp",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "StudyAbroad - あなたにピッタリの留学先を見つける",
    template: "%s | StudyAbroad"
  },
  description: "200校以上の提携校から、予算・期間・目的に合わせて最適な留学先をご提案。見積から申込みまで、すべてオンラインで完結できる留学プラットフォーム。安心・安全サポートで、初心者の方でも安心して留学体験ができます。",
  keywords: [
    "留学", "語学留学", "海外留学", "留学費用", "留学相談", "留学エージェント",
    "カナダ留学", "オーストラリア留学", "アメリカ留学", "イギリス留学",
    "短期留学", "長期留学", "ホームステイ", "語学学校", "留学サポート"
  ],
  authors: [{ name: "StudyAbroad" }],
  creator: "StudyAbroad",
  publisher: "StudyAbroad",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://studyabroad-platform.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "StudyAbroad - あなたにピッタリの留学先を見つける",
    description: "200校以上の提携校から最適な留学先をご提案。安心・安全サポートで初心者でも安心の留学体験。",
    url: "https://studyabroad-platform.com",
    siteName: "StudyAbroad",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "StudyAbroad - 留学プラットフォーム",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StudyAbroad - あなたにピッタリの留学先を見つける",
    description: "200校以上の提携校から最適な留学先をご提案",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "StudyAbroad",
              "description": "200校以上の提携校から、予算・期間・目的に合わせて最適な留学先をご提案する留学プラットフォーム",
              "url": "https://studyabroad-platform.com",
              "logo": "https://studyabroad-platform.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+81-120-123-456",
                "contactType": "customer service",
                "availableLanguage": "Japanese"
              },
              "sameAs": [
                "https://twitter.com/studyabroad",
                "https://facebook.com/studyabroad",
                "https://instagram.com/studyabroad"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "JP",
                "addressRegion": "東京都",
                "postalCode": "100-0001",
                "streetAddress": "千代田区千代田1-1-1"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${notoSansJP.variable} ${poppins.variable} font-sans antialiased`}>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">
              {children}
            </div>
            <Footer />
            <FloatingActionButton />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
