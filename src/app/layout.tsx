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
  title: 'Hardik Sachdeva — Developer · ML Engineer · Aspiring Entrepreneur',
  description:
    'CSE student at Delhi Technological University. Specializing in full-stack MERN systems, end-to-end Machine Learning pipelines , and Innovative Solutions.',
  keywords: ['Hardik Sachdeva', 'full-stack developer', 'React', 'Node.js', 'portfolio', 'hackathon', 'Next.js', 'DTU', 'machine learning', 'MERN'],
  authors: [{ name: 'Hardik Sachdeva' }],
  openGraph: {
  title: 'Hardik Sachdeva — Developer · ML Engineer · Aspiring Entrepreneur',
  description:
    'CSE student at Delhi Technological University. Specializing in full-stack MERN systems, end-to-end Machine Learning pipelines , and Innovative Solutions.',
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
