import { notFound } from 'next/navigation'
import { auth } from '@/auth'
import AddToReadingListButton from '@/app/components/AddToReadingListButton'
import LikeButton from '@/app/components/LikeButton'
import { getBlogById } from '@/services/blogs'
import { isInReadingList } from '@/services/readingList'

export const instant = false

// Individual blog page
const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  const session = await auth()
  const userId = session?.user?.id ? Number(session.user.id) : null
  const isOwner = userId === blog.userId
  const alreadyInList = userId ? await isInReadingList(userId, blog.id) : false

  return (
    <div data-testid="blog-detail" className="max-w-2xl mx-auto p-6">
      <h1 data-testid="blog-title" className="text-2xl font-bold mb-4">{blog.title}</h1>
      <p data-testid="blog-author" className="text-gray-700">
        <strong>author: </strong>
        {blog.author}
      </p>
      <p className="text-gray-700">
        <strong>url: </strong>
        <a href={blog.url} className="text-blue-600 hover:underline">
          {blog.url}
        </a>
      </p>
      <p className="text-gray-700 mb-4">
        <strong>likes: </strong>
        <span>{blog.likes} likes</span>
      </p>
      <div className="flex gap-2">
        <LikeButton blogId={blog.id} />
        {userId && !isOwner && !alreadyInList && (
          <AddToReadingListButton data-testid="add-to-reading-list-button" blogId={blog.id} />
        )}
      </div>
    </div>
  )
}
export default BlogPage
