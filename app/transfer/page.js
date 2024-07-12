'use client';
import { useState, useEffect } from 'react';
import * as StellarSdk from '@stellar/stellar-sdk';
import { Horizon, Keypair, Networks, Operation, Asset, TransactionBuilder } from '@stellar/stellar-sdk';
import { auth, database } from "../utils/firebase";
import { ref, get, push, serverTimestamp } from "firebase/database";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Transfer() {
    const [amount, setAmount] = useState('');
    const [destinationEmail, setDestinationEmail] = useState('');
    const [status, setStatus] = useState('');
    const [secretKey, setSecretKey] = useState(null);
    const [remark, setRemark] = useState('');

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
                setSecretKey(data.secretKey);
            }
        } catch (error) {
            console.error('Error fetching wallet data:', error);
        }
    };

    const fetchDestinationPublicKey = async (email) => {
        try {
            const walletsRef = ref(database, 'wallets');
            const snapshot = await get(walletsRef);
            if (snapshot.exists()) {
                const wallets = snapshot.val();
                console.log(wallets);
                const wallet = Object.values(wallets).find(w => w.userEmail === email);
                if (wallet && wallet.publicKey) {
                    return wallet.publicKey;
                } else {
                    setStatus('User not found or has no public key.');
                    return null;
                }
            } else {
                setStatus('No wallets found in the database.');
                return null;
            }
        } catch (error) {
            console.error('Error fetching destination public key:', error);
            setStatus('Error fetching destination user. Please try again.');
            return null;
        }
    };

    const handleTransfer = async (e) => {
        e.preventDefault();
        setStatus('Processing...');

        if (!secretKey) {
            setStatus('Secret key not found. Please try again.');
            return;
        }

        const destinationPublicKey = await fetchDestinationPublicKey(destinationEmail);
        console.log(destinationPublicKey)
        if (!destinationPublicKey) {
            return; // Error message already set in fetchDestinationPublicKey
        }

        try {
            const sourceKeypair = Keypair.fromSecret(secretKey);
            const sourcePublicKey = sourceKeypair.publicKey();

            const server = new Horizon.Server('https://horizon-testnet.stellar.org');
            const account = await server.loadAccount(sourcePublicKey);

            const transaction = new TransactionBuilder(account, {
                fee: StellarSdk.BASE_FEE,
                networkPassphrase: Networks.TESTNET
            })
                .addOperation(Operation.payment({
                    destination: destinationPublicKey,
                    asset: Asset.native(),
                    amount: amount.toString()
                }))
                .setTimeout(180)
                .build();

            transaction.sign(sourceKeypair);

            const transactionResult = await server.submitTransaction(transaction);
            console.log(transactionResult);
            await uploadTransactionData(destinationEmail, amount, remark);
            setStatus('Transfer successful and data uploaded to Firebase');
            
        } catch (error) {
            console.error('Error:', error);
            setStatus('Transfer failed. Please try again.');
        }
    };

    const uploadTransactionData = async (recipient, amount, remark) => {
        try {
            const transactionsRef = ref(database, 'transactions');
            await push(transactionsRef, {
                recipient: recipient,
                amount: amount,
                remark: remark,
                timestamp: serverTimestamp()
            });
            console.log("Transaction data uploaded successfully");
        } catch (error) {
            console.error("Error uploading transaction data:", error);
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
              <label htmlFor="email" className="block mb-1">Recipient Email</label>
              <input
                type="email"
                id="email"
                value={destinationEmail}
                onChange={(e) => setDestinationEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="remark" className="block mb-1">Remark</label>
              <input
                type="text"
                id="remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Transfer
            </button>
          </form>
          {status && <p className="mt-4 text-center">{status}</p>}
        </div>
      );
    }
