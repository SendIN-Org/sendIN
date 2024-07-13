'use client';
import { useState, useEffect } from 'react';
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
import { ref, get, set } from "firebase/database";
import * as bip39 from 'bip39';
import * as ed25519 from 'ed25519-hd-key';
import * as StellarSdk from '@stellar/stellar-sdk';


export default function Login() {
  const googleAuth = new GoogleAuthProvider();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuth);
      console.log(result);

      // Check if the user already has a wallet
      const walletExists = await checkWalletExists(result.user.uid);

      if (!walletExists) {
        // If it's the first time, generate a wallet
        await generateWallet(result.user);
      } else {
        // If not the first time, fetch and log wallet details
        await fetchWalletData(result.user.uid);
      }

      router.push('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  const checkWalletExists = async (userId) => {
    const walletRef = ref(database, `wallets/${userId}`);
    const snapshot = await get(walletRef);
    return snapshot.exists();
  }

  const generateWallet = async (user) => {
    try {
      const mnemonic = bip39.generateMnemonic(128);
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const derivationPath = "m/44'/148'/0'";
      const derivedKey = ed25519.derivePath(derivationPath, seed.toString('hex'));
      const keypair = StellarSdk.Keypair.fromRawEd25519Seed(derivedKey.key);
      const publicKey = keypair.publicKey();
      const secretKey = keypair.secret();

      // Store wallet data in Realtime Database
      const walletRef = ref(database, `wallets/${user.uid}`);
      await set(walletRef, {
        userEmail: user.email,
        mnemonic,
        publicKey,
        secretKey
      });

      console.log('New wallet generated and stored for user:', user.email);
    } catch (error) {
      console.error('Error generating Stellar wallet:', error);
    }
  };

  const fetchWalletData = async (userId) => {
    try {
      const walletRef = ref(database, `wallets/${userId}`);
      const snapshot = await get(walletRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log('Existing wallet details:', data);
      }
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    }
  };

  return (
    <div className="grid grid-cols-2 min-h-screen">
       <div className="flex items-center justify-center bg-blue-600 text-white relative overflow-hidden">
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
    <rect width="800" height="600" fill="#2563eb" /> {/* Use a single color instead of a gradient */}
    
    <circle cx="400" cy="300" r="250" fill="none" stroke="#60a5fa" strokeWidth="40" opacity="0.3" />
    <circle cx="400" cy="300" r="200" fill="none" stroke="#93c5fd" strokeWidth="60" opacity="0.4" />

    <path d="M-100,200 Q200,100 400,200 T900,200" fill="none" stroke="#bfdbfe" strokeWidth="20" opacity="0.3" />
    <path d="M-100,400 Q200,300 400,400 T900,400" fill="none" stroke="#dbeafe" strokeWidth="20" opacity="0.3" />

    <g transform="translate(400, 300)">
      <circle cx="0" cy="0" r="100" fill="#fbbf24" opacity="0.8" />
      <text x="0" y="15" fontFamily="Arial" fontSize="120" fill="#fff" textAnchor="middle" dominantBaseline="middle">$</text>
    </g>

    <g transform="translate(150, 150) rotate(-15)">
      <rect x="-30" y="-45" width="60" height="90" rx="10" fill="#34d399" opacity="0.8" />
      <text x="0" y="0" fontFamily="Arial" fontSize="50" fill="#fff" textAnchor="middle" dominantBaseline="middle">$</text>
    </g>

    <g transform="translate(650, 450) rotate(15)">
      <rect x="-30" y="-45" width="60" height="90" rx="10" fill="#34d399" opacity="0.8" />
      <text x="0" y="0" fontFamily="Arial" fontSize="50" fill="#fff" textAnchor="middle" dominantBaseline="middle">$</text>
    </g>
  </svg>
</div>

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
              <Input id="password" placeholder="********" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="text-center">
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-3 text-muted-foreground">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
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

