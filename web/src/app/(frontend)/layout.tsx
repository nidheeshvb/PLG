import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'

import { Footer } from '@/components/layout/Footer/Footer'
import { Header } from '@/components/layout/Header/Header'
import { SkipLink } from '@/components/layout/SkipLink/SkipLink'
import { CustomCursor } from '@/components/ui/CustomCursor/CustomCursor'
import { RevealObserver } from '@/components/ui/RevealObserver'
import { getSiteSettings } from '@/lib/payload'

import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'PLG Acachet', template: '%s | PLG Acachet' },
  openGraph: { type: 'website', siteName: 'PLG Acachet', images: ['/brand/og-image.jpg'] },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  themeColor: '#010202',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default async function FrontendLayout({ children }: { children: ReactNode }) {
  const settings = await getSiteSettings()
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SkipLink />
        <Header links={settings.headerLinks ?? []} mobileNote={settings.mobileMenuNote} />
        <main id="top" tabIndex={-1}>
          {children}
        </main>
        <Footer settings={settings} />
        <CustomCursor />
        <RevealObserver />
      </body>
    </html>
  )
}
