'use client'
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { auth } from './utils/firebase';
import { signOut, signInWithPopup, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image'

const Header = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    router.push('/login');
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="bg-primary text-primary-foreground py-4 px-6">
      <div className="flex items-center justify-between">
        <img src="https://cdn.discordapp.com/attachments/1185000784941817937/1261664346463932416/Stellar_Logo_1.png?ex=6693c7fc&is=6692767c&hm=4ff992341c1fa75e3d2938f5cd4064b2db63a3939637b73b0879a32f6be0bd18&" alt="sendIN" className="w-12 h-12" />
        <h1 className="text-2xl font-bold">sendIN</h1>
        <div className="flex items-center gap-4">
          {!user ? (
            <Button variant="outline" className="px-6 py-3 text-black" onClick={login}>
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <img
                    src={user.photoURL || '/default-avatar.png'}
                    width={36}
                    height={36}
                    alt="User"
                    className="rounded-full text-black"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.displayName || "User"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

