import Link from "next/link"
import { getUsers } from "@/services/users"

export const instant = false

// List of users page
const Users = async () => {
  const users = await getUsers()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <ul className="space-y-2">
        {users.length === 0 ? (
          <li className="border rounded p-3 hover:bg-gray-50">No user match your search</li>  
        ) : (
          users.map((user) => (
          <li key={user.id} className="border rounded p-3 hover:bg-gray-50">
            <Link href={`/users/${user.username}`}>{user.name}</Link>
          </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default Users