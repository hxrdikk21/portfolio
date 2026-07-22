import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import SmoothScroller from '@/components/SmoothScroller'
import AnimatedBackground from '@/components/AnimatedBackground'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Hardik Sachdeva — Frontend · Full-Stack · ML Developer',
  description:
    'Portfolio of Hardik Sachdeva — CS&E student at DTU, full-stack MERN developer, and 2× hackathon champion (Google × AIMS-DTU). Specialising in next-level frontend UI/UX, robust MERN systems, and end-to-end ML pipelines.',
  keywords: ['Hardik Sachdeva', 'full-stack developer', 'React', 'Node.js', 'portfolio', 'hackathon', 'Next.js', 'DTU', 'machine learning', 'MERN'],
  authors: [{ name: 'Hardik Sachdeva' }],
  openGraph: {
    title: 'Hardik Sachdeva — Frontend · Full-Stack · ML Developer',
    description:
      'CS&E student at DTU specialising in next-level frontend UI/UX, robust full-stack MERN systems, and end-to-end ML pipelines. 2× hackathon champion.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Animated canvas background — fixed, under all content */}
        <AnimatedBackground />
        <SmoothScroller>
          <Navbar />
          {children}
        </SmoothScroller>
      </body>
    </html>
  )
}
