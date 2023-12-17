import type { Metadata } from 'next'
import { Inter as ThemeFont } from 'next/font/google'
import './globals.css'
import { LayoutProps } from '@/types'
import ReduxProvider from './app/_components/ReduxProvider'

const font = ThemeFont({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Socratica',
  description: 'Learn with questions',
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ReduxProvider>
          <div className="h-screen w-screen">
            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  )
}
