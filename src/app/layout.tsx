import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Hannes Huslage - Portfolio',
  description: 'Full Stack Web Developer',
  keywords: ['web developer', 'full stack', 'react', 'next.js', 'typescript', 'terminal', 'portfolio'],
  authors: [{ name: 'Hannes Huslage' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hannes-huslage.de',
    title: 'Hannes Huslage - Portfolio',
    description: 'Full Stack Web Developer - Interactive Terminal Interface',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.className}>
        {children}
      </body>
    </html>
  )

}
