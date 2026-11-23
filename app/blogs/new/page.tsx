import { redirect } from "next/navigation"
import { auth } from "@/auth"
import BlogForm from "@/app/components/BlogForm"

export const instant = false

// Create a new blog page
export default async function NewBlog() {
  const session = await auth()
  if (!session?.user) {
    redirect("/")
  }

  return (
    <div>
      <BlogForm />
    </div>
  )
}