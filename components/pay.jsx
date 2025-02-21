/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/JHwkBrSlN4V
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/
"use client"

import { useState } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function pay() {
  const [isSellBuy, setIsSellBuy] = useState(true)
  const handleSwapSellBuy = () => {
    setIsSellBuy(!isSellBuy)
  }
  return (
    (<div
      className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <div
        className="flex flex-col items-center justify-center w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <div className="w-full p-4 bg-gray-200 rounded-lg">
          <div className="flex justify-between mb-4">
            <span>{isSellBuy ? "Sell" : "Buy"}</span>
            <div className="flex items-center space-x-2">
              <span>0</span>
              <Select>
                <SelectTrigger
                  id={isSellBuy ? "sell-token" : "buy-token"}
                  className="flex items-center space-x-1">
                  <EclipseIcon className="w-4 h-4" />
                  <SelectValue placeholder={isSellBuy ? "ETH" : "Select token"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eth">ETH</SelectItem>
                  <SelectItem value="btc">BTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div
            className="flex items-center justify-center mb-4"
            onClick={handleSwapSellBuy}>
            <ArrowDownIcon className="w-4 h-4 cursor-pointer" />
          </div>
          <div className="flex justify-between mb-4">
            <span>{isSellBuy ? "Buy" : "Sell"}</span>
            <div className="flex items-center space-x-2">
              <span>0</span>
              <Select>
                <SelectTrigger
                  id={isSellBuy ? "buy-token" : "sell-token"}
                  className="flex items-center space-x-1 bg-black text-white rounded-full px-2 py-1">
                  <SelectValue placeholder={isSellBuy ? "Select token" : "ETH"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eth">ETH</SelectItem>
                  <SelectItem value="btc">BTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full bg-black text-white">Connect wallet</Button>
        </div>
      </div>
    </div>)
  );
}

function ArrowDownIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>)
  );
}


function EclipseIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a7 7 0 1 0 10 10" />
    </svg>)
  );
}


function XIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>)
  );
}
