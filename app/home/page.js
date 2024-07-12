"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [transferAmountA, setTransferAmountA] = useState(250)
  const [transferAmountB, setTransferAmountB] = useState(15000)

  return (
    <div className="flex w-full items-center justify-between px-4 md:px-6">
      <div className="w-1/2 pr-8 flex items-center justify-center">
        <div className="flex flex-col items-center text-center">
        <div className="max-w-2xl">
  <h1 className="text-6xl font-bold tracking-tight mb-6 leading-tight text-gray-800 text-left">
    Effortlessly send <br />
    money from the <br />
    <span className="text-blue-600">US to India</span><br />
    in <span className="border-b-2 border-blue-500">minutes</span>.
  </h1>
</div>

          <p className="text-gray-600 text-xl leading-relaxed mt-4 max-w-xl">
            Fast, secure, and seamless with 
            <span className="font-semibold text-blue-600"> sendIN</span> on Stellar.
          </p>
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center my-20">
        <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-lg">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-2">Transfer</h3>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={transferAmountA}
                  onChange={(e) => setTransferAmountA(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 text-2xl font-bold rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Receive</h3>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  value={transferAmountB}
                  onChange={(e) => setTransferAmountB(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 text-2xl font-bold rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-medium">Fast and Secure</h4>
                  <p className="text-gray-600">&lt; 10 minutes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-medium">Low Fees</h4>
                  <p className="text-gray-600">Only 0.5%</p>
                </div>
              </div>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition duration-200">
              Send Money
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ... (rest of the code remains unchanged)


function CheckIcon(props) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function ChevronDownIcon(props) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}


function ChevronUpIcon(props) {
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
      <path d="m18 15-6-6-6 6" />
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