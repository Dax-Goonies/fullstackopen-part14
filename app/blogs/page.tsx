import Link from 'next/link'
import { getBlogs } from '@/services/blogs'

export const instant = false

const Blogs = async ({ searchParams }: { searchParams: Promise<{ filter?: string }>}) => {
  const { filter } = await searchParams
  
  const allBlogs = await getBlogs()
  const blogs = allBlogs.filter((blog) =>
    filter ? blog.title.toLowerCase().includes(filter.toLowerCase()) : true
  )

  return (
    <div>
      <h1>Blogs</h1>

      <form action="/blogs">
        <input type="text" name="filter" defaultValue={filter} />
        <button type="submit">search</button>
      </form>

      <ul>
        {blogs.length === 0 ? (
          <li>No blogs match your search</li>  
        ) : (
          blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
          </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default Blogs