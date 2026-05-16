import type { Metadata } from 'next'
import './globals.css'
import { LenisProvider } from '@/lib/lenis'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress'

export const metadata: Metadata = {
  title: 'Createch Architects — Architecture & Interiors, Nairobi',
  description:
    'Createch Architects is a premium architecture and interior design practice based in Nairobi, Kenya. We design the places Africa lives in.',
  keywords: [
    'architects nairobi',
    'interior design kenya',
    'architecture firm africa',
    'createch architects',
    'residential architecture nairobi',
    'commercial architecture kenya',
  ],
  openGraph: {
    title: 'Createch Architects — Architecture & Interiors',
    description: 'We design the places Africa lives in.',
    type: 'website',
    locale: 'en_KE',
    siteName: 'Createch Architects',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Createch Architects',
    description: 'We design the places Africa lives in.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink antialiased">
        <LenisProvider>
          <ScrollProgress />
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
