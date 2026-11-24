'use client'

import { useActionState } from 'react'
import { markAsReadAction } from '@/actions/readingList'

// Mark a blog as read button component
export default function MarkAsReadButton({ readingListId }: { readingListId: number }) {
  const [, formAction] = useActionState(markAsReadAction, { success: false })

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={readingListId} />
      <button
        type="submit"
        data-testid={`mark-read-${readingListId}`}
        className="bg-gray-600 hover:bg-gray-500 px-2 py-1 rounded text-xs text-white ml-2"
      >
        Mark as read
      </button>
    </form>
  )
}
