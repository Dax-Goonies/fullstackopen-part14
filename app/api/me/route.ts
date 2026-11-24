import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

// Fetch the user information if registered and logged in
export const GET = async (req: NextRequest) => {
  const authorization = req.headers.get('authorization')

  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return NextResponse.json(
      { error: 'Missing or invalid authorization header' },
      { status: 401 },
    )
  }

  const token = authorization.substring(7)

  const result = await db.select().from(users).where(eq(users.token, token))
  const user = result[0]

  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  return NextResponse.json({
    id: user.id,
    username: user.username,
    name: user.name,
  })
}
