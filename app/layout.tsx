import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Fonts and metadata are centralized here so every portfolio section shares one document configuration.
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Annie Nguyen | Software Developer',
  description: 'Fourth-year Computer Science student at UVA building thoughtful web, mobile, and full-stack digital experiences.',
  keywords: ['Software Developer', 'Web Developer', 'React', 'React Native', 'UVA', 'Computer Science', 'Portfolio'],
  authors: [{ name: 'Annie Nguyen' }],
  creator: 'Annie Nguyen',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Annie Nguyen | Software Developer',
    description: 'A responsive portfolio featuring web, mobile, data, and full-stack projects.',
    url: '/',
    siteName: 'Annie Nguyen Portfolio',
    images: [
      {
        url: '/portfolio-preview.png',
        width: 1200,
        height: 630,
        alt: "Preview of Annie Nguyen's portfolio website",
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Annie Nguyen | Software Developer',
    description: 'A responsive portfolio featuring web, mobile, data, and full-stack projects.',
    images: ['/portfolio-preview.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#f8f5f2',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
