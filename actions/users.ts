"use server"

import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

type FormState = {
  errors: { username?: string, name?: string, password?: string, passwordConfirm?: string }
  values: { username: string, name: string }
  success: boolean
}

// Register a new user
export const registerUser = async (prevState: FormState, formData: FormData) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string

  const errors: FormState['errors'] = {}

  if (!username || username.length < 4) {
    errors.username = 'Username must be at least 4 characters'
  }
  if (!name) {
    errors.name = 'Name is required'
  }
  if (!password || password.length < 4) {
    errors.password = 'Password must be at least 4 characters'
  }
  if (password !== passwordConfirm) {
    errors.passwordConfirm = 'Passwords do not match'
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name }, success: false }
  }

  const existing = await db.select().from(users).where(eq(users.username, username))
  if (existing.length > 0) {
    return {
      errors: { username: 'username already taken' },
      values: { username, name },
      success: false,
    }
  }

  const passwordHash = await bcrypt.hash(password, 10)
  await db.insert(users).values({ username, name, passwordHash })

  return { errors: {}, values: { username: '', name: '' }, success: true }
}

// Generates an API token for a logged in user
export const generateToken = async () => {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error('You must be logged in')
  } 

  const token = crypto.randomUUID()

  await db.update(users).set({ token }).where(eq(users.id, Number(session.user.id)))

  revalidatePath('/me')
}