import Link from 'next/link'
import { getBlogs } from '@/services/blogs'

export const instant = false

// List of blogs page
const Blogs = async ({ searchParams }: { searchParams: Promise<{ filter?: string }>}) => {
  const { filter } = await searchParams
  
  const allBlogs = await getBlogs()

  const blogs = allBlogs.filter((blog) =>
    filter ? blog.title.toLowerCase().includes(filter.toLowerCase()) : true
  )

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>

      <form action="/blogs" className="flex gap-2 mb-4">
        <input
          type="text"
          name="filter"
          defaultValue={filter}
          className="border rounded px-3 py-2 flex-1"
          placeholder="search by title"
        />
        <button
          type="submit"
          className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm text-white"
        >
          Search
        </button>
      </form>

      <ul className="space-y-2">
        {blogs.length === 0 ? (
          <li className="text-gray-600">No blogs match your search</li>
        ) : (
          blogs.map((blog) => (
            <li key={blog.id} className="border rounded p-3 hover:bg-gray-50">
              <Link href={`/blogs/${blog.id}`} className="text-blue-600 hover:underline">
                {blog.title}
              </Link>{" "}
              by {blog.author}
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default Blogs