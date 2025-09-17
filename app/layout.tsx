import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/navbar'
import { ClerkProvider } from '@clerk/nextjs'
import { QueryProvider } from '@/lib/providers/query-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Minterly',
  description: 'A Web3 Event Management Platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryProvider>
      <ClerkProvider
        appearance={{
          variables: {
            colorPrimary: '#8b5cf6',
            colorBackground: '#171717',
            colorInputBackground: '#262626',
            colorInputText: '#ffffff',
            colorText: '#ffffff',
            colorTextSecondary: '#a3a3a3',
            colorNeutral: '#ffffff',
            borderRadius: '0.5rem',
          },
          elements: {
            formButtonPrimary:
              'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white border-none transition-all duration-200',
            card: 'bg-neutral-900/95 backdrop-blur-sm border border-white/10 shadow-2xl',
            headerTitle: 'text-white font-light text-2xl',
            headerSubtitle: 'text-gray-400',
            socialButtonsBlockButton:
              'bg-neutral-800 border border-white/20 text-white hover:bg-neutral-700 hover:border-white/30 transition-all duration-200',
            formFieldInput:
              'bg-neutral-800 border border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20',
            formFieldLabel: 'text-gray-300 font-medium',
            identityPreviewText: 'text-white',
            identityPreviewEditButton: 'text-cyan-400 hover:text-cyan-300',
            dividerLine: 'bg-white/10',
            dividerText: 'text-gray-400',
            footerActionText: 'text-gray-400',
            footerActionLink: 'text-cyan-400 hover:text-cyan-300',
            formFieldInputShowPasswordButton: 'text-gray-400 hover:text-white',
            alertText: 'text-red-400',
            formFieldErrorText: 'text-red-400',
          },
        }}
      >
        <html lang='en' className='dark'>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-6xl mx-auto`}
          >
            <NavBar />
            {children}
          </body>
        </html>
      </ClerkProvider>
    </QueryProvider>
  )
}
