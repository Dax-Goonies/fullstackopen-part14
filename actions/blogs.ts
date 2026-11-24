'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { addBlog, likeBlog } from '@/services/blogs'

// Like a blog, triggers a notification
export const likeBlogAction = async (
  prevSate: { success: boolean },
  formData: FormData,
) => {
  const id = Number(formData.get('id'))
  await likeBlog(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath('/blogs')
  return { success: true }
}

type FormState = {
  errors: { title?: string; author?: string; url?: string }
  values: { title: string; author: string; url: string }
  success: boolean
}

// Create a new blog only if registered and logged in
export const createBlog = async (prevState: FormState, formData: FormData) => {
  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const url = formData.get('url') as string

  const errors: FormState['errors'] = {}

  if (!title || title.length < 5) {
    errors.title = 'Title must be at least 5 characters'
  }
  if (!author || author.length < 5) {
    errors.author = 'Author must be at least 5 characters'
  }
  if (!url || url.length < 5) {
    errors.url = 'Url must be at least 5 characters'
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url }, success: false }
  }

  const session = await auth()
  if (!session?.user?.id) {
    return {
      errors: { title: 'You must be logged in to create a blog' },
      values: { title, author, url },
      success: false,
    }
  }

  await addBlog({ title, author, url }, Number(session.user.id))

  revalidatePath('/blogs')
  return {
    errors: {},
    values: { title: '', author: '', url: '' },
    success: true,
  }
}
