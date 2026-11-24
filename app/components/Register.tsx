'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { registerUser } from '@/actions/users'
import { useNotification } from './NotificationContext'

type FormState = {
  errors: {
    username?: string
    name?: string
    password?: string
    passwordConfirm?: string
  }
  values: { username: string; name: string }
  success: boolean
}

const initialState: FormState = {
  errors: {},
  values: { username: '', name: '' },
  success: false,
}

// Registration form component
export default function RegisterForm() {
  const [state, formAction] = useActionState<FormState, FormData>(
    registerUser,
    initialState,
  )
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification('registration successful')
      router.push('/login')
    }
  }, [state, showNotification, router])

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form action={formAction}>
        <div className="mb-4">
          <label>
            Username
            <input
              type="text"
              name="username"
              defaultValue={state.values.username}
              required
              className="border rounded px-3 py-2 w-full"
            />
          </label>
          {state.errors.username && (
            <p data-testid="username-error" className="text-red-600 text-sm mt-1">{state.errors.username}</p>
          )}
        </div>
        <div className="mb-4">
          <label>
            Name
            <input
              type="text"
              name="name"
              defaultValue={state.values.name}
              required
              className="border rounded px-3 py-2 w-full"
            />
          </label>
          {state.errors.name && (
            <p data-testid="name-error" style={{ color: 'red' }}>{state.errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label>
            Password
            <input
              type="password"
              name="password"
              required
              className="border rounded px-3 py-2 w-full"
            />
          </label>
          {state.errors.password && (
            <p data-testid="password-error" style={{ color: 'red' }}>{state.errors.password}</p>
          )}
        </div>
        <div className="mb-4">
          <label>
            Confirm Password
            <input
              type="password"
              name="passwordConfirm"
              required
              className="border rounded px-3 py-2 w-full"
            />
          </label>
          {state.errors.passwordConfirm && (
            <p data-testid="passwordConfirm-error" style={{ color: 'red' }}>{state.errors.passwordConfirm}</p>
          )}
        </div>
        <button
          type="submit"
          data-testid="register-button"
          className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm"
        >
          Register
        </button>
      </form>
    </div>
  )
}
