'use client'

import { useActionState, useEffect } from 'react'
import { addToReadingListAction } from '@/actions/readingList'
import { useNotification } from '@/app/components/NotificationContext'

// Add a blog to reading list button component if registered and logged in and not the creator
export default function AddToReadingListButton({ blogId }: { blogId: number }) {
  const [state, formAction] = useActionState(addToReadingListAction, {
    success: false,
  })
  const { showNotification } = useNotification()

  useEffect(() => {
    if (state.success) {
      showNotification('added to reading list')
    }
  }, [state, showNotification])

  return (
    <form action={formAction}>
      <input type="hidden" name="blogId" value={blogId} />
      <button
        type="submit"
        data-testid="add-to-reading-list-button"
        className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm text-white"
      >
        Add to reading list
      </button>
    </form>
  )
}
