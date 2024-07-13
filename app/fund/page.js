'use client'
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const redirectDashboard = () => {
        setTimeout(1000);
        alert("Payment Successful");
        router.push("/dashboard");
    }
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-8">Enter Card Details</h2>
          
          {/* Amount */}
          <label className="block mb-4">
            Amount to Add
            <input
              type="text"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </label>
  
          {/* KYC and Verification */}
          <div className="flex justify-between mb-4 text-sm font-medium text-gray-600">
            <div className="flex items-center">
              <span>KYC Status</span>
              
            </div>
            {/* Replace 'text-green-500' with 'text-red-500' if KYC is not verified */}
            <span className="ml-2 text-green-500">Verified</span>
          </div>
  
     
        <label className="block mb-4">
            Card Number
            <input
                type="text"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="1234 5678 9101 1121"
                maxLength={16}
            />
        </label>

        {/* Expiry and CVV */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Expiry */}
            <label className="block flex-1 mb-2">
              Expiry Date
              <input
                type="text"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="MM/YY"
                maxLength={5}
              />
            </label>
            {/* CVV */}
            <label className="block flex-1 mb-2">
              CVV
              <input
                type="text"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="123"
                maxLength={3}
              />
            </label>
          </div>
  
          {/* Name on Card */}
          <label className="block mb-6">
            Name on Card
            <input
              type="text"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="John Doe"
            />
          </label>
  
          {/* Submit Button */}
          <button
            type="button"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition duration-200"
            onClick={redirectDashboard}
          >
            Pay Now
          </button>
        </div>
      </div>
    );
  }
  