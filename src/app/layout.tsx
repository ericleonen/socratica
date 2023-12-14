import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LayoutType } from '@/types'
import ReduxProvider from './app/_components/ReduxProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Socratica',
  description: 'Learn with questions',
};

export default function RootLayout({ children }: LayoutType) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <div className="h-screen w-screen">
            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  )
}
