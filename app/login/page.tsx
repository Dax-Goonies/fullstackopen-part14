'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useNotification } from '@/app/components/NotificationContext'

// Login form page
export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const { showNotification } = useNotification()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid username or password')
    } else {
      showNotification('logged in')
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && (
        <p data-testid="error-message" className="text-red-600 mb-4">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">
            Username
            <input
              type="text"
              name="username"
              data-testid="username-input"
              required
              className="border rounded px-3 py-2 w-full"
            />
          </label>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">
            Password
            <input
              type="password"
              name="password"
              data-testid="password-input"
              required
              className="border rounded px-3 py-2 w-full"
            />
          </label>
        </div>
        <button
          type="submit"
          data-testid="login-button"
          className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm text-white w-fit"
        >
          Login
        </button>
      </form>
    </div>
  )
}