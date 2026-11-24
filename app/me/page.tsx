import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import { getUserById } from '@/services/users'
import { getReadingList } from '@/services/readingList'
import GenerateTokenButton from '@/app/components/GenerateTokenButton'
import MarkAsReadButton from '../components/MarkAsReadButton'

export const instant = false

// Me page displaying user info, reading list, and API token
const MePage = async () => {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/login')
  }

  const userId = Number(session.user.id)
  const user = await getUserById(userId)

  const readingListEntries = await getReadingList(userId)
  const unread = readingListEntries.filter((entry) => !entry.read)
  const read = readingListEntries.filter((entry) => entry.read)
  const isEmpty = readingListEntries.length === 0

  return (
    <div data-testid="user-profile" className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <p data-testid="user-name" className="text-gray-700">
        <strong>name: </strong>
        {user?.name}
      </p>
      <p data-testid="user-username" className="text-gray-700 mb-4">
        <strong>username: </strong>
        {user?.username}
      </p>

      <hr className="my-4" />

      <div data-testid="reading-list-section">
        <h2 className="text-lg font-semibold mb-2">Reading List</h2>

        {isEmpty && (
          <p data-testid="empty-reading-list" className="text-gray-600 mb-4">
            Your reading list is empty.
          </p>
        )}

        <div data-testid="unread-section">
          <h3 className="text-lg font-semibold mb-2">Unread ({unread.length})</h3>
          {unread.length === 0 ? (
            <p data-testid="no-unread-blogs" className="text-gray-600 mb-4">
              Nothing unread.
            </p>
          ) : (
            <ul className="flex flex-col gap-2 mb-4">
              {unread.map((entry) => (
                <li key={entry.id} className="flex items-center justify-between">
                  <Link href={`/blogs/${entry.blog.id}`} className="text-blue-600 hover:underline">
                    {entry.blog.title}
                  </Link>
                  <MarkAsReadButton readingListId={entry.id} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Read ({read.length})</h3>
          {read.length === 0 ? (
            <p className="text-gray-600 mb-4">Nothing read yet.</p>
          ) : (
            <ul className="flex flex-col gap-2 mb-4">
              {read.map((entry) => (
                <li key={entry.id}>
                  <Link href={`/blogs/${entry.blog.id}`} className="text-blue-600 hover:underline">
                    {entry.blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <hr className="my-4" />

      <div data-testid="api-token-section">
        <h2 className="text-lg font-semibold mb-2">API Token</h2>
        {user?.token ? (
          <div data-testid="token-display" className="font-mono bg-gray-200 text-gray-900 p-2 rounded break-all">
            <span data-testid="api-token">{user.token}</span>
          </div>
        ) : (
          <p data-testid="no-token-message" className="text-gray-600">
            No token has been generated yet.
          </p>
        )}
        <GenerateTokenButton />
      </div>
    </div>
  )
}

export default MePage