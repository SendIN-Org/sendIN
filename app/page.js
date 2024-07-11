'use client';
import { useState } from 'react';
import * as StellarSdk from '@stellar/stellar-sdk';
import * as bip39 from 'bip39';
import * as ed25519 from 'ed25519-hd-key';
import {auth} from "./firebase"
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";

export default function CreateWallet() {
  const [walletGenerated, setWalletGenerated] = useState(false);
  const [publicKey, setPublicKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [mnemonic, setMnemonic] = useState('');

  const googleAuth = new GoogleAuthProvider();
  const login = async () => {
    const result = await signInWithPopup(auth, googleAuth);
    console.log(result);
  }

  const logout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  const generateWallet = async () => {
    try {
      // Generate a 24-word mnemonic
      const mnemonic = bip39.generateMnemonic(128);
      setMnemonic(mnemonic);

      // Derive the seed from the mnemonic
      const seed = await bip39.mnemonicToSeed(mnemonic);

      // Derive the Stellar keypair
      const derivationPath = "m/44'/148'/0'";
      const derivedKey = ed25519.derivePath(derivationPath, seed.toString('hex'));

      const keypair = StellarSdk.Keypair.fromRawEd25519Seed(derivedKey.key);
      const publicKey = keypair.publicKey();
      const secretKey = keypair.secret();

      setPublicKey(publicKey);
      setSecretKey(secretKey);
      setWalletGenerated(true);
    } catch (error) {
      console.error('Error generating Stellar wallet:', error);
    }
  };

  return (
    <div className="text-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10"
        onClick={generateWallet}
      >
        Generate Wallet
      </button>
      <br />
      <button
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10'
      onClick={login}>
        Login
      </button>
      <br />
      <button
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10'
      onClick={logout}>
        Logout
      </button>
      
      {walletGenerated && (
        <div className="mt-10">
          <p>Mnemonic: {mnemonic}</p>
          <p>Public Key: {publicKey}</p>
          <p>Secret Key: {secretKey}</p>
        </div>
      )}
    </div>
  );
}