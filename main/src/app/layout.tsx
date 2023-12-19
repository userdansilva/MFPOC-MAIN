import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'POC MF - Main',
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => (
  <html lang="pt-BR">
    <body className={inter.className}>
      {children}
    </body>
  </html>
)

export default RootLayout;

/** types */
type RootLayoutProps = {
  children: React.ReactNode;
}
