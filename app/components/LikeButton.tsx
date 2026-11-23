"use client"

import { useActionState, useEffect } from "react"
import { likeBlogAction } from "@/actions/blogs"
import { useNotification } from "@/app/components/NotificationContext"

// Like button component
export default function LikeButton({ blogId }: { blogId: number }) {
  const [state, formAction] = useActionState(likeBlogAction, { success: false })
  const { showNotification } = useNotification()

  useEffect(() => {
    if (state.success) {
      showNotification("blog liked")
    }
  }, [state, showNotification])

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={blogId} />
      <button type="submit" className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm">
        Like
      </button>
    </form>
  )
}