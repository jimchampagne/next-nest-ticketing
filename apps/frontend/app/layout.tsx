import type { Metadata } from 'next'
import { Raleway, Poppins } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'

const RalewayFont = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const PoppinsFont = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'NextTicket',
  description: 'Linear-Style project management app in Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${RalewayFont.variable} ${PoppinsFont.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
