import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

// Connect to Neon DB via the environment viariable
export const db = drizzle(process.env.DATABASE_URL!, { schema })
