import Link from 'next/link'
import { getBlogs } from '@/services/blogs'

export const instant = false

const Blogs = async ({ searchParams }: { searchParams: Promise<{ filter?: string }>}) => {
  const { filter } = await searchParams
  
  const blogs = [...getBlogs()]
    .filter((blog) => (filter ? blog.title.toLowerCase().includes(filter.toLocaleLowerCase()) : true))
    .sort((a, b) => b.likes - a.likes)

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