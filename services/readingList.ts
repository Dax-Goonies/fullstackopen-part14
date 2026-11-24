import { db } from '@/db'
import { readingList } from '@/db/schema'
import { and, eq } from 'drizzle-orm'

// Check whethere a blog is in the user reading list
export const isInReadingList = async (userId: number, blogId: number) => {
  const result = await db
    .select()
    .from(readingList)
    .where(and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)))
  return result.length > 0
}

// Add a blog to the user reading list
export const addToReadingList = async (userId: number, blogId: number) => {
  await db.insert(readingList).values({ userId, blogId })
}

// Fetch the blogs in the user reading list
export const getReadingList = async (userId: number) => {
  return db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: { blog: true },
  })
}
