'use server'

import { revalidatePath } from "next/cache"
import { likeBlog } from "@/services/blogs"

export const likeBlogAction = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await likeBlog(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}