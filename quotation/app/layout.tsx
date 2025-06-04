import type { Metadata } from 'next'
import './globals.css'

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Legrand Quotation Tool - Sagarawat Electricals',
  description: 'Quotation tool for Legrand products by Sagarawat Electricals',
  icons: {
    icon: '/favicon.ico'
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Legrand Quotation Tool',
    description: 'Generate quotations for Legrand products',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
