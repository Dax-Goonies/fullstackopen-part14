"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBlog } from "@/actions/blogs"
import { useNotification } from "./NotificationContext"

type FormState = {
  errors: { title?: string; author?: string; url?: string }
  values: { title: string; author: string; url: string }
  success: boolean
}

const initialState: FormState = {
  errors: {},
  values: { title: '', author: '', url: '' },
  success: false,
}

// Blog form component
export default function BlogForm() {
  const [state, formAction] = useActionState<FormState, FormData>(createBlog, initialState)
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("blog created")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create new blog</h1>
      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Title</label>
          <input
            name="title"
            defaultValue={state.values.title}
            className="border rounded px-3 py-2 w-full"
          />
          {state.errors.title && <p className="text-red-600 text-sm">{state.errors.title}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Author</label>
          <input
            name="author"
            defaultValue={state.values.author}
            className="border rounded px-3 py-2 w-full"
          />
          {state.errors.author && <p className="text-red-600 text-sm">{state.errors.author}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Url</label>
          <input
            name="url"
            defaultValue={state.values.url}
            className="border rounded px-3 py-2 w-full"
          />
          {state.errors.url && <p className="text-red-600 text-sm">{state.errors.url}</p>}
        </div>
        <button
          type="submit"
          className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm text-white w-fit"
        >
          Create
        </button>
      </form>
    </div>
  )
}