"use client"

import { useSession, signOut } from "next-auth/react"
import { useNotification } from "./NotificationContext"
import { useRouter } from "next/navigation"
import NavLink from "./NavLink"

// Navigation bar component
export default function NavBar() {
  const { data: session } = useSession()
  const { showNotification } = useNotification()
  const router = useRouter()

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
      <NavLink href="/">Home</NavLink>
      <div className="flex items-center gap-4">
        <NavLink href="/blogs">Blogs</NavLink>
        <NavLink href="/users">Users</NavLink>
        {session ? (
          <>
            <NavLink href="/blogs/new">New blog</NavLink>
            <NavLink href="/me">Me</NavLink>
            <button
              onClick={async () => {
                await signOut({ redirect: false })
                showNotification("logged out")
                router.push("/")
              }}
              className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink href="/login">Login</NavLink>
            <NavLink href="/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  )
}