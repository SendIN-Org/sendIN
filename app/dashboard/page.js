'use client'
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import useAuth from '../hooks/useAuth';
import { useRouter } from "next/navigation";
import { Horizon } from "@stellar/stellar-sdk";
import { ref, get, query, orderByChild, equalTo, limitToLast } from "firebase/database";
import { database } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import Link from "next/link";

export default function Dashboard() {
  const { loading, authenticated } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);
  const [publicKey, setPublicKey] = useState('');
  const [xlmPriceUSD, setXlmPriceUSD] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchWalletData(currentUser.uid);
        fetchTransactions(currentUser.uid);
      } else {
        setTransactions([]);
      }
    });

    fetchXLMPrice();

    return () => unsubscribe();
  }, []);

  const fetchXLMPrice = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=usd');
      const data = await response.json();
      setXlmPriceUSD(data.stellar.usd);
      console.log('XLM price:', data.stellar.usd);
    } catch (error) {
      console.error('Error fetching XLM price:', error);
    }
  };

  const fetchWalletData = async (userId) => {
    try {
      const snapshot = await get(ref(database, `wallets/${userId}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        setPublicKey(data.publicKey);
        fetchBalance(data.publicKey);
      } else {
        console.log('No wallet data found for this user');
      }
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    }
  }

  const fetchBalance = async (publicKey) => {
    try {
      const server = new Horizon.Server('https://horizon-testnet.stellar.org');
      const account = await server.loadAccount(publicKey);
      const balances = account.balances.map(balance => ({
        asset: balance.asset_type === 'native' ? 'XLM' : balance.asset_code,
        balance: balance.balance
      }));
      console.log('Balances:', balances);
      setBalance(balances);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const transferRedirect = () => {
    router.push('/transfer');
  }

  const fetchTransactions = async (userId) => {
    const transactionsRef = ref(database, 'transactions');
    const transactionsQuery = query(
      transactionsRef,
      orderByChild('sender'),
      equalTo(userId),
      limitToLast(10) // Limit to last 10 transactions, adjust as needed
    );

    try {
      const snapshot = await get(transactionsQuery);
      if (snapshot.exists()) {
        const transactionsData = Object.entries(snapshot.val()).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setTransactions(transactionsData.reverse()); // Reverse to show newest first
      } else {
        console.log('No transactions found for this user');
        setTransactions([]);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return null;
  }

  const xlmBalance = balance?.find(b => b.asset === 'XLM')?.balance || '0';

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
      if (response.status === 400) {
        // alert("You already funded your wallet before.");
        return;
      }
      else {
        console.log("SUCCESS! You have a new account :)\n", responseJSON);
        alert("Wallet funded successfully!");
      }
      fetchBalance(publicKey);
    } catch (error) {
      console.error("ERROR!", error);
      alert("Error funding wallet. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 bg-muted/40 p-6">
        <Card className="bg-background p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Account Balance</h2>
              <p className="text-4xl font-bold">{xlmPriceUSD && (
                <p className="text-2xl text-gray-600">
                  ${(parseFloat(xlmBalance) * xlmPriceUSD).toFixed(2)} USD
                </p>
              )}</p>

            </div>
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                <Link href="/fund">
                <Button
                  className="px-6 py-5"
                  variant="outline"
                  onClick={fundWallet}
                >
                  Add Money
                </Button>
                </Link>
                {/* <button
                  onClick={fundWallet}
                  className="text-xs text-blue-500 mt-1 hover:underline focus:outline-none"
                >
                  or fund on testnet
                </button> */}
              </div>
              
              <Button
                variant="outline"
                className="px-6 py-5"
                onClick={transferRedirect}
              >
                Transfer Money
              </Button>
              <Link href="/withdraw">
              <Button
                  className="px-6 py-5"
                  variant="outline"
                >
                  Withdraw Money
                </Button>
                </Link>
            </div>
          </div>
        </Card>
        <div className="mt-6">
          <Card className="bg-background p-6 mt-6">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>To</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.recipient}</TableCell>
                      <TableCell>{transaction.amount} USD</TableCell>
                      <TableCell>{formatDate(transaction.timestamp)}</TableCell>
                      <TableCell>{transaction.remark}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
