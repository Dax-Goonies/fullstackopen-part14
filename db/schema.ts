import { pgTable, integer, serial, text } from "drizzle-orm/pg-core"

// SCHEMA: Blog data structure
export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  url: text('url').notNull(),
  likes: integer('likes').notNull().default(0),
})