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

export const metadata: Metadata = {
  title: 'Annie Nguyen | Software Developer',
  description: 'Fourth-year Computer Science student at UVA building thoughtful web, mobile, and full-stack digital experiences.',
  keywords: ['Software Developer', 'Web Developer', 'React', 'React Native', 'UVA', 'Computer Science', 'Portfolio'],
  authors: [{ name: 'Annie Nguyen' }],
  creator: 'Annie Nguyen',
  icons: {
    icon: '/icon.svg',
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
