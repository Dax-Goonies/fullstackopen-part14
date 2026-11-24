'use client'

import { SessionProvider } from 'next-auth/react'

// Session wrapper component
export default function AuthSessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <SessionProvider>{children}</SessionProvider>
}
