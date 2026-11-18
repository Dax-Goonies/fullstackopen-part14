import { notFound } from "next/navigation";
import { getBlogById } from "@/services/blogs";
import { likeBlogAction } from "@/actions/blogs";

export const instant = false

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>Author: {blog.author}</p>
      <p>Url: {blog.url}</p>
      <p>Likes: {blog.likes}</p>
      <form action={likeBlogAction}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">like</button>
      </form>
    </div>
  )
}

export default BlogPage