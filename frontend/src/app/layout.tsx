'use client'

import { Inter } from 'next/font/google'
import { ApolloProvider } from '@apollo/client'
import './globals.css'
import createApolloClient from '@/lib/apolloClient'
import { AuthProvider } from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

const client = createApolloClient()

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ApolloProvider client={client}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ApolloProvider>
      </body>
    </html>
  )
}
