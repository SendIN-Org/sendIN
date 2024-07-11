'use client';
import { useState, useEffect } from 'react';
import * as StellarSdk from '@stellar/stellar-sdk';
import { Horizon, Keypair, Networks, Operation, Asset, TransactionBuilder } from '@stellar/stellar-sdk';
import { auth, database } from "../firebase"; // Ensure Firebase is correctly configured and imported
import { ref, get } from "firebase/database";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Transfer() {
    const [amount, setAmount] = useState('');
    const [destinationAddress, setDestinationAddress] = useState('');
    const [status, setStatus] = useState('');
    const [secretKey, setSecretKey] = useState(null); // State to store the secret key

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                fetchWalletData(currentUser.uid);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchWalletData = async (userId) => {
        try {
            const walletRef = ref(database, `wallets/${userId}`);
            const snapshot = await get(walletRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                setSecretKey(data.secretKey); // Set the secret key from the fetched data
            }
        } catch (error) {
            console.error('Error fetching wallet data:', error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            console.log('User logged out successfully');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };


    const handleTransfer = async (e) => {
        e.preventDefault();
        setStatus('Processing...');

        if (!secretKey) {
            setStatus('Secret key not found. Please try again.');
            return;
        }

        try {
            const sourceKeypair = Keypair.fromSecret(secretKey);
            const sourcePublicKey = sourceKeypair.publicKey();

            // Configure StellarSDK to use the test network
            const server = new Horizon.Server('https://horizon-testnet.stellar.org');
            const account = await server.loadAccount(sourcePublicKey);

            const transaction = new TransactionBuilder(account, {
                fee: StellarSdk.BASE_FEE,
                networkPassphrase: Networks.TESTNET
            })
                .addOperation(Operation.payment({
                    destination: destinationAddress,
                    asset: Asset.native(),
                    amount: amount.toString()
                }))
                .setTimeout(180)
                .build();

            transaction.sign(sourceKeypair);

            const transactionResult = await server.submitTransaction(transaction);
            console.log(transactionResult);
            setStatus('Transfer successful!');
        } catch (error) {
            console.error('Error:', error);
            setStatus('Transfer failed. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold text-center mb-6">Transfer</h1>
            <form onSubmit={handleTransfer} className="space-y-4">
                <div>
                    <label htmlFor="amount" className="block mb-1">Amount (XLM)</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block mb-1">Destination Address</label>
                    <input
                        type="text"
                        id="address"
                        value={destinationAddress}
                        onChange={(e) => setDestinationAddress(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Transfer
                </button>
            </form>
            {status && <p className="mt-4 text-center">{status}</p>}
            <div className="mt-4 text-center">
                <button
                    onClick={logout}
                    className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
