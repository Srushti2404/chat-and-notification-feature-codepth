import { Button } from '@mui/material'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from 'src/utils/firebase'

export default function Login() {
  const [SignInWithGoogle] = useSignInWithGoogle(auth)

  const handleSignInWithGoogle = () => {
    SignInWithGoogle() // Call the function to initiate Google Sign-In
  }

  return (
    <div className="app">
      <div className="login">
        <div className="login__background" />
        <div className="login__container">
          <img src="/logo.png" alt="Logo" />
          <div className="login__text">
            <h1>Sign in to Giggle</h1>
          </div>
          <Button onClick={handleSignInWithGoogle}>Sign in with Google</Button>
        </div>
      </div>
    </div>
  )
}
