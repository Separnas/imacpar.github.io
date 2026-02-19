
import './globals.css'
import type { Metadata } from 'next'
import { PWARegister } from './pwa-register'

export const metadata: Metadata = {
  title: 'Min Dag',
  description: 'Din personliga schemaläggare',
  manifest: '/manifest.json',
  themeColor: '#0ea5e9',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>
        {children}
        <PWARegister />
      </body>
    </html>
  )
}
