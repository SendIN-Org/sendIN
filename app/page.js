"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from 'next/link';

export default function Component() {
  const [transferAmountA, setTransferAmountA] = useState(250);
  const [transferAmountB, setTransferAmountB] = useState(15000);

  return (
    <div>
      <section className="flex flex-col lg:flex-row w-full items-center justify-between px-4 md:px-6 py-12 lg:py-24 bg-white">
        <div className="w-full lg:w-1/2 pr-8 flex items-center justify-center lg:justify-start ml-12">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="max-w-2xl">
              <h1 className="mt-10 text-6xl font-bold tracking-tight mb-6 leading-tight text-gray-800">
                Effortlessly send <br />
                money from the <br />
                <span className="text-blue-600">US to India</span>
                <br />
                in{" "}
                <span className="border-b-2 border-blue-500">minutes</span>.
              </h1>
            </div>
            <p className="text-gray-600 text-xl leading-relaxed mt-4 max-w-xl">
              Fast, secure, and seamless with
              <span className="font-semibold text-blue-600"> sendIN</span> on
              Stellar.
            </p>
            <Link
              href="#"
              className="inline-flex mt-6 h-12 items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-lg font-bold text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              prefetch={false}
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center my-20 lg:my-0">
          <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-lg">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-2">Transfer</h3>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
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
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
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
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-3 rounded-md transition duration-200">
                Send Money
              </Button>
            </div>
            
          </div>
          
        </div>
        
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-[250px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#0e0b0f"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,144C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
       
      </section>
      

      {/* Spacer to ensure the second section appears after scrolling */}
      <div className="h-32 bg-white"></div>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <CreditCardIcon className="h-8 w-8 text-blue-600" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Secure Payments</h3>
                <p className="text-gray-600">
                  Accept payments securely with our PCI-compliant platform.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <WalletIcon className="h-8 w-8 text-blue-600" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Seamless Integration</h3>
                <p className="text-gray-600">
                  Integrate our payment gateway with your existing systems.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <InfoIcon className="h-8 w-8 text-blue-600" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Detailed Reporting</h3>
                <p className="text-gray-600">
                  Track your payments and sales with our robust reporting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}




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

//extra
function CreditCardIcon(props) {
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
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}


function InfoIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}


function WalletIcon(props) {
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
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  )
}