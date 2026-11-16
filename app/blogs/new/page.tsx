import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog } from "@/services/blogs";

async function createBlog(formData: FormData) {
  'use server'

  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const url = formData.get('url') as string

  addBlog({ title, author, url})

  revalidatePath('/blogs')
  redirect('/blogs')
}

export default function NewBlog() {
  return (
    <div>
      <h1>Create new blog</h1>
      <form action={createBlog}>
        <div>
          title: <input name="title" />
        </div>
        <div>
          author: <input name="author" />
        </div>
        <div>
          url: <input name="url" />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}