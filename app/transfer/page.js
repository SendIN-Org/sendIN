'use client';
import { useState, useEffect } from 'react';
import * as StellarSdk from '@stellar/stellar-sdk';
import { Horizon, Keypair, Networks, Operation, Asset, TransactionBuilder } from '@stellar/stellar-sdk';
import { auth, database } from "../utils/firebase";
import { ref, get, push, serverTimestamp } from "firebase/database";
import { onAuthStateChanged, signOut } from "firebase/auth";
import useAuth from '../hooks/useAuth';


export default function Transfer() {
    const [amount, setAmount] = useState('');
    const [destinationEmail, setDestinationEmail] = useState('');
    const [status, setStatus] = useState('');
    const [secretKey, setSecretKey] = useState(null);
    const [remark, setRemark] = useState('');
    const [amountUSD, setAmountUSD] = useState('');
    const [amountXLM, setAmountXLM] = useState('');
    const [exchangeRate, setExchangeRate] = useState(null);
    const { loading, authenticated } = useAuth();

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
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                fetchWalletData(currentUser.uid);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchExchangeRate = async () => {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=usd');
            const data = await response.json();
            setExchangeRate(data.stellar.usd);
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
        }
    };

    
    useEffect(() => {
        fetchExchangeRate();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (!authenticated) {
        return null;
      }

    
    const handleUSDAmountChange = (e) => {
        const usdAmount = e.target.value;
        setAmountUSD(usdAmount);
        if (exchangeRate && usdAmount !== '') {
            const xlmAmount = (parseFloat(usdAmount) / exchangeRate).toFixed(7);
            setAmountXLM(xlmAmount);
        } else {
            setAmountXLM('');
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

        if (!amountXLM || isNaN(parseFloat(amountXLM)) || parseFloat(amountXLM) <= 0) {
            setStatus('Invalid amount. Please enter a valid USD amount.');
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
                    amount: amountXLM.toString()
                }))
                .setTimeout(180)
                .build();

            transaction.sign(sourceKeypair);

            const transactionResult = await server.submitTransaction(transaction);
            console.log(transactionResult);
            await uploadTransactionData(destinationEmail, amount, remark);
            setStatus('Transfer was successful!');

        } catch (error) {
            console.error('Error:', error);
            setStatus('Transfer failed. Please try again.');
        }
    };

    const uploadTransactionData = async (recipient, amount, remark) => {
        try {
            const transactionsRef = ref(database, 'transactions');
            await push(transactionsRef, {
                sender: auth.currentUser.uid,  // Add this line
                recipient: recipient,
                amount: amountUSD,
                remark: remark,
                timestamp: serverTimestamp()
            });
            console.log("Transaction data uploaded successfully");
        } catch (error) {
            console.error("Error uploading transaction data:", error);
        }
    };

    return (
        <div className="w-full flex items-center justify-center my-20">
          <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Transfer Money</h1>
            <form onSubmit={handleTransfer} className="space-y-6">
              <div>
                <h3 className="text-base font-medium mb-2">Amount (USD)</h3>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    id="amount"
                    value={amountUSD}
                    onChange={handleUSDAmountChange}
                    className="w-full pl-8 pr-3 py-4 text-xl font-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <h3 className="text-base font-medium mb-2">Recipient Email</h3>
                <input
                  type="email"
                  id="email"
                  value={destinationEmail}
                  onChange={(e) => setDestinationEmail(e.target.value)}
                  className="w-full px-3 py-4 text-xl font-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <h3 className="text-base font-medium mb-2">Remark</h3>
                <input
                  type="text"
                  id="remark"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  className="w-full px-3 py-4 text-xl font-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-6 rounded-3xl transition duration-200"
              >
                Transfer
              </button>
            </form>
            {status && <p className="mt-4 text-center">{status}</p>}
          </div>
        </div>
      );
    }
