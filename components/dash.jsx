/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/UY44MpACwLe
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

export function dash() {
  return (
    (<div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">sendIN</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="px-6 py-3">
              Manage Account
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <img
                    src="/placeholder.svg"
                    width={36}
                    height={36}
                    alt="User Avatar"
                    className="rounded-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>John Doe</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-muted/40 p-6">
        <Card className="bg-background p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Account Balance</h2>
              <p className="text-4xl font-bold">$5,432.00</p>
            </div>
            <div className="flex gap-4">
              <Button className="px-6 py-3">Fund Account</Button>
              <Button variant="outline" className="px-6 py-3">
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
    </div>)
  );
}
