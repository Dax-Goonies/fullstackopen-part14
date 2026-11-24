'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import NavLink from './NavLink'
import { useNotification } from './NotificationContext'

// Navigation bar component
export default function NavBar() {
  const { data: session } = useSession()
  const { showNotification } = useNotification()
  const router = useRouter()

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
      <NavLink href="/">home</NavLink>
      <div className="flex items-center gap-4">
        <NavLink href="/blogs">blogs</NavLink>
        <NavLink href="/users">users</NavLink>
        {session ? (
          <>
            <NavLink href="/blogs/new">create new blog</NavLink>
            <NavLink href="/me">me</NavLink>
            <button
              onClick={async () => {
                await signOut({ redirect: false })
                showNotification('logged out')
                router.push('/')
              }}
              className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm"
            >
              logout
            </button>
          </>
        ) : (
          <>
            <NavLink href="/login">login</NavLink>
            <NavLink href="/register">register</NavLink>
          </>
        )}
      </div>
    </nav>
  )
}
