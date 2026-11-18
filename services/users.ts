import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

// Fetch all the users
export const getUsers = async () => {
  return db.select().from(users)
}

// Find a user by its id
export const getUserById = async (id: number) => {
  const result = await db.select().from(users).where(eq(users.id, id))
  return result[0]
}