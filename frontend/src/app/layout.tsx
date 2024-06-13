'use client'

import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import { ApolloProvider } from '@apollo/client'
import './globals.css'
import createApolloClient from '@/lib/apolloClient'
import { AuthProvider } from '@/context/AuthContext'
import Loading from '@/components/Loading'

const inter = Inter({ subsets: ['latin'] })

const client = createApolloClient()

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoading(false)
    }
  }, [])

  const content = isLoading
    ? <Loading />
    : <ApolloProvider client={client}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ApolloProvider>

  return (
    <html lang='en'>
      <body className={inter.className}>
        {content}
      </body>
    </html>
  )
}
