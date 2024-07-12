'use client'
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import useAuth from '../hooks/useAuth';
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { loading, authenticated } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  if (!authenticated) {
    return null; // Return null if the user is not authenticated (they will be redirected)
  }
  const transferRedirect = () => {
    router.push('/transfer');
  }

  const fetchBalance = async (publicKey) => {
    try {
      const server = new Horizon.Server('https://horizon-testnet.stellar.org');
      const account = await server.loadAccount(publicKey);
      const balances = account.balances.map(balance => ({
        asset: balance.asset_type === 'native' ? 'XLM' : balance.asset_code,
        balance: balance.balance
      }));
      console.log(balances);
      setBalance(balances);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };


  return (
    <div className="flex flex-col h-screen">
   
      <main className="flex-1 bg-muted/40 p-6">
        <Card className="bg-background p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Account Balance</h2>
              <p className="text-4xl font-bold">$5,432.00</p>
            </div>
            <div className="flex gap-4">
              <Button className="px-6 py-5" onClick={fetchBalance('GCT762A4YMCKODMSKH4HGL4UHCQAGXFVC2ARRMM2RHQZYZV74JYUY322')}>Fund Account</Button>
              <Button variant="outline" className="px-6 py-5" onClick={transferRedirect}>
                Transfer Money
              </Button>
            </div>
          </div>
        </Card>
        <div className="mt-6">
          <Card className="bg-background p-6">
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
                  <TableRow>
                    <TableCell>John Doe</TableCell>
                    <TableCell>$100.00</TableCell>
                    <TableCell>2023-04-15 10:30 AM</TableCell>
                    <TableCell>Rent Payment</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell>$50.00</TableCell>
                    <TableCell>2023-04-12 3:45 PM</TableCell>
                    <TableCell>Groceries</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bob Johnson</TableCell>
                    <TableCell>$75.00</TableCell>
                    <TableCell>2023-04-10 9:20 AM</TableCell>
                    <TableCell>Utility Bill</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sarah Lee</TableCell>
                    <TableCell>$200.00</TableCell>
                    <TableCell>2023-04-08 2:15 PM</TableCell>
                    <TableCell>Car Payment</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mike Brown</TableCell>
                    <TableCell>$25.00</TableCell>
                    <TableCell>2023-04-05 11:00 AM</TableCell>
                    <TableCell>Subscription</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
