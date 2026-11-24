'use server'

import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
import { auth } from '@/auth'
import { addToReadingList } from '@/services/readingList'
import { db } from '@/db'
import { readingList } from '@/db/schema'

// Add a blog to the reading list if registered and logged in
export const addToReadingListAction = async (
  prevState: { success: boolean },
  formData: FormData,
) => {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('You must be logged in')
  }

  const blogId = Number(formData.get('blogId'))
  await addToReadingList(Number(session.user.id), blogId)

  revalidatePath(`/blogs/${blogId}`)
  return { success: true }
}

// Mark a blog as "read" if registered and logged in
export const markAsReadAction = async (
  prevState: { success: boolean },
  formData: FormData,
) => {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('You must be logged in')
  }

  const id = Number(formData.get('id'))

  await db.update(readingList).set({ read: true }).where(eq(readingList.id, id))

  revalidatePath('/me')
  return { success: true }
}
