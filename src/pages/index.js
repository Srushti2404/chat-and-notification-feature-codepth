import useAuthUser, { useAuthState } from 'src/hooks/useAuthUser'
import Login from 'src/components/Login'
import Sidebar from 'src/components/Sidebar'
import Chat from 'src/components/Chat'

export default function Home() {
  const user = useAuthUser()

  if (!user) return <Login />

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar user={user} />
        <Chat user={user} />
      </div>
    </div>
  )
}
