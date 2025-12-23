import type { Metadata, Viewport } from 'next'
import { Hind_Siliguri, Playfair_Display } from 'next/font/google'
import './globals.css'

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-bangla',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#db2777',
}

export const metadata: Metadata = {
  title: 'Sweet Delights BD | বাংলাদেশের সেরা কেক শপ',
  description: 'Premium cakes for all occasions - Birthday, Wedding, Anniversary & Custom Cakes. Order online and get delivery across Bangladesh. বিশেষ উপলক্ষে বিশেষ কেক।',
  manifest: '/manifest.json',
  keywords: ['cake', 'bangladesh', 'birthday cake', 'wedding cake', 'কেক', 'বাংলাদেশ', 'জন্মদিনের কেক'],
  authors: [{ name: 'Sweet Delights BD' }],
  openGraph: {
    title: 'Sweet Delights BD | Premium Cakes',
    description: 'বাংলাদেশের সেরা কেক শপ - Order premium cakes online',
    type: 'website',
    locale: 'bn_BD',
  },
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${playfair.variable}`}>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${hindSiliguri.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
