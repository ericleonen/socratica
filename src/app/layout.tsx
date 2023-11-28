import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LayoutType } from '@/types'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Socratica',
  description: 'Learn with questions',
}

export default function RootLayout({ children }: LayoutType) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
