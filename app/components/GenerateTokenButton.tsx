'use client'

import { generateToken } from '@/actions/users'

// Generate token button component
export default function GenerateTokenButton() {
  return (
    <form action={generateToken}>
      <button
        type="submit"
        data-testid="generate-token-button"
        className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm text-white mt-2"
      >
        Generate new token
      </button>
    </form>
  )
}
