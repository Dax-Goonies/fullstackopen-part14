import { NextResponse } from 'next/server'
import { getBlogs } from '@/services/blogs'

// Fetch all blogs
export const GET = async () => {
  const blogs = await getBlogs()
  return NextResponse.json(blogs)
}
