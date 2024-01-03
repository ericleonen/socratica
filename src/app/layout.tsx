import type { Metadata } from 'next'
import { Inter as ThemeFont } from 'next/font/google'
import './globals.css'
import { LayoutProps } from '@/types'
import ReduxProvider from './app/_components/ReduxProvider'
import ThemeProvider from '@/theme/ThemeProvider'

const font = ThemeFont({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] })

export const metadata: Metadata = {
  title: 'Socratica',
  description: 'Learn with questions',
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ReduxProvider>
          <ThemeProvider>
            <div className="h-screen w-screen">
              {children}
            </div>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
