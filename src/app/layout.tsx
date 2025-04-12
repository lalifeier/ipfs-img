import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'IPFS 文件上传 - FileDrop',
  description: '使用 FileDrop 安全便捷地上传您的文件到 IPFS 网络。享受快速、安全和去中心化的文件存储体验。',
  keywords: [
    'IPFS',
    '文件上传',
    '去中心化存储',
    '安全文件存储',
    'FileDrop',
    '区块链存储',
    '文件分享',
    '匿名上传',
  ],
  openGraph: {
    title: 'IPFS 文件上传 - FileDrop',
    description: '使用 FileDrop 安全便捷地上传您的文件到 IPFS 网络。享受快速、安全和去中心化的文件存储体验。',
    url: 'https://your-filedrop-domain.com',
    siteName: 'FileDrop',
    images: [
      {
        url: 'https://your-filedrop-domain.com/og.jpg', // 替换为您的 OpenGraph 图片 URL
        width: 1200,
        height: 630,
        alt: 'FileDrop - IPFS 文件上传',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IPFS 文件上传 - FileDrop',
    description: '使用 FileDrop 安全便捷地上传您的文件到 IPFS 网络。享受快速、安全和去中心化的文件存储体验。',
    images: ['https://your-filedrop-domain.com/twitter.jpg'], // 替换为您的 Twitter 图片 URL
  },
  verification: {
    google: 'google', // 替换为您的 Google 站点验证代码
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

