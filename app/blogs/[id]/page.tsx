import { notFound } from "next/navigation"
import { getBlogById } from "@/services/blogs"
import LikeButton from "@/app/components/LikeButton"

export const instant = false

// Individual blog page
const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-700"><strong>Author: </strong>{blog.author}</p>
      <p className="text-gray-700">
        <strong>Url: </strong><a href={blog.url} className="text-blue-600 hover:underline">{blog.url}</a>
      </p>
      <p className="text-gray-700 mb-4"><strong>Likes: </strong>{blog.likes}</p>
      <LikeButton blogId={blog.id} />
    </div>
  )
}
export default BlogPage