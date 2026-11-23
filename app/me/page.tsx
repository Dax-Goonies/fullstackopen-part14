import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { getUserById } from "@/services/users"
import GenerateTokenButton from "@/app/components/GenerateTokenButton"

export const instant = false

// Me page displaying user info and API token
const MePage = async () => {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/")
  }

  const user = await getUserById(Number(session.user.id))

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <p className="text-gray-700"><strong>Name: </strong>{user?.name}</p>
      <p className="text-gray-700 mb-4"><strong>Username: </strong>{user?.username}</p>

      <h2 className="text-lg font-semibold mb-2">API Token</h2>
      {user?.token ? (
        <p className="font-mono bg-gray-200 text-gray-900 p-2 rounded break-all">
          {user.token}
        </p>
      ) : (
        <p className="text-gray-600">No token has been generated yet.</p>
      )}

      <GenerateTokenButton />
    </div>
  )
}

export default MePage