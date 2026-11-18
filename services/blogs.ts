import { db } from "@/db"
import { blogs } from "@/db/schema"
import { eq, desc } from "drizzle-orm"

// Get all the blogs ordered by likes
export const getBlogs = async () => {
  return db.select().from(blogs).orderBy(desc(blogs.likes))
}

// Add a new blog
export const addBlog = async (blog: { title: string, author: string, url: string }) => {
  const result = await db.insert(blogs).values(blog).returning()
  return result[0]
}

// Get a specific blog by its id
export const getBlogById = async (id: number) => {
  const result = await db.select().from(blogs).where(eq(blogs.id, id))
  return result[0]
}

// Update the number of likes for a blog
export const likeBlog = async (id: number) => {
  const [blog] = await db.select().from(blogs).where(eq(blogs.id, id))
  if (!blog) return
  await db.update(blogs).set({ likes: blog.likes +1 }).where(eq(blogs.id, id))
}