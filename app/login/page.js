'use client';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { auth, database } from "../utils/firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from 'next/navigation'

export default function Login() {

  const googleAuth = new GoogleAuthProvider();
  const router = useRouter()

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuth);
      console.log(result);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }


  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center bg-background text-foreground">
        <div className="max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="text-muted-foreground">Sign in to your account to continue.</p>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="text-center">
            <Button
              variant="outline"
              className="w-full text-black"
              onClick={login}
            >
              <ChromeIcon className="mr-2 h-4 w-4" />
              Login with Google
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-primary text-primary-foreground">
        <div className="max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">sendIN</h1>
            <p className="text-muted-foreground">Create an account to get started.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChromeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}