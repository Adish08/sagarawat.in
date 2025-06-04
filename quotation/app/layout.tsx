import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Legrand Quotation Tool - Sagarawat Electricals',
  description: 'Quotation tool for Legrand products by Sagarawat Electricals',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
