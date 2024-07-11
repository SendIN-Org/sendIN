'use client';
import { useState, useEffect } from 'react';
import * as StellarSdk from '@stellar/stellar-sdk';
import * as bip39 from 'bip39';
import * as ed25519 from 'ed25519-hd-key';
import { auth, database } from "./firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { Horizon } from '@stellar/stellar-sdk';
import Link from 'next/link';
import { Button } from "@/components/ui/button"

export default function CreateWallet() {
  const [walletGenerated, setWalletGenerated] = useState(false);
  const [publicKey, setPublicKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchWalletData(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const googleAuth = new GoogleAuthProvider();
  
  const login = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuth);
      console.log(result);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
      setWalletGenerated(false);
      setPublicKey('');
      setSecretKey('');
      setMnemonic('');
      setBalance(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const fetchWalletData = async (userId) => {
    try {
      const walletRef = ref(database, `wallets/${userId}`);
      const snapshot = await get(walletRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setPublicKey(data.publicKey);
        setSecretKey(data.secretKey);
        setMnemonic(data.mnemonic);
        setWalletGenerated(true);
        fetchBalance(data.publicKey);
      }
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    }
  };

  const generateWallet = async () => {
    if (!user) {
      alert("Please login first to generate a wallet.");
      return;
    }

    try {
      const mnemonic = bip39.generateMnemonic(128);
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const derivationPath = "m/44'/148'/0'";
      const derivedKey = ed25519.derivePath(derivationPath, seed.toString('hex'));
      const keypair = StellarSdk.Keypair.fromRawEd25519Seed(derivedKey.key);
      const publicKey = keypair.publicKey();
      const secretKey = keypair.secret();

      setMnemonic(mnemonic);
      setPublicKey(publicKey);
      setSecretKey(secretKey);
      setWalletGenerated(true);

      // Store wallet data in Realtime Database
      const walletRef = ref(database, `wallets/${user.uid}`);
      await set(walletRef, {
        mnemonic,
        publicKey,
        secretKey
      });

      fetchBalance(publicKey);

    } catch (error) {
      console.error('Error generating Stellar wallet:', error);
    }
  };

  const fetchBalance = async (publicKey) => {
    try {
      const server = new Horizon.Server('https://horizon-testnet.stellar.org');
      const account = await server.loadAccount(publicKey);
      const balances = account.balances.map(balance => ({
        asset: balance.asset_type === 'native' ? 'XLM' : balance.asset_code,
        balance: balance.balance
      }));
      setBalance(balances);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const fundWallet = async () => {
    if (!publicKey) {
      alert("Please generate a wallet first.");
      return;
    }

    try {
      const response = await fetch(
        `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`
      );
      const responseJSON = await response.json();
      console.log("SUCCESS! You have a new account :)\n", responseJSON);
      alert("Wallet funded successfully!");
      fetchBalance(publicKey);
    } catch (error) {
      console.error("ERROR!", error);
      alert("Error funding wallet. Please try again.");
    }
  };

  return (
    <div className="text-center">
      {user ? (
        <>
          <h2 className="text-xl font-bold mt-4">Welcome, {user.displayName}</h2>
          <p className="mt-2">Email: {user.email}</p>
          <Button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={logout}
          >
            Logout
          </Button>
        </>
      ) : (
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={login}
        >
          Login with Google
        </Button>
      )}

      {user && (
        <Button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
          onClick={generateWallet}
        >
          {walletGenerated ? "Wallet Exists" : "Generate Wallet"}
        </Button>
      )}

      {user && walletGenerated && (
        <Button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
          onClick={fundWallet}
        >
          Fund Wallet
        </Button>
      )}

      {user && walletGenerated && (
        <Button
          className="bg-blue-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
        >
         <Link href="/transfer">Transfer</Link> 
        </Button>
      )}

      {walletGenerated && (
        <div className="mt-10">
          <p>Mnemonic: {mnemonic}</p>
          <p>Public Key: {publicKey}</p>
          <p>Secret Key: {secretKey}</p>
          {balance && (
            <div>
              <h3 className="text-lg font-bold mt-4">Balance:</h3>
              <ul>
                {balance.map((b, index) => (
                  <li key={index}>
                    {b.asset}: {b.balance}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
