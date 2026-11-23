import { notFound } from "next/navigation"
import Link from "next/link"
import { getUserByUsername } from "@/services/users"

export const instant = false

// Individual user page
const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params
  const user = await getUserByUsername(username)

  if (!user) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
      <ul className="flex flex-col gap-2">
        {user.blogs.length === 0 ? (
          <li className="text-gray-600">No blogs yet.</li>
        ) : (
          user.blogs.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blogs/${blog.id}`} className="text-blue-600 hover:underline">
                {blog.title}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default UserPage