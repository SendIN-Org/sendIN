import React from 'react';

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="24px"
    height="24px"
    className="w-6 h-6 mr-2"
  >
    <path fill="#4285F4" d="M24 9.5c3.38 0 6.24 1.17 8.31 3.09l6.16-6.16C34.14 3.02 29.52 1 24 1 14.64 1 7 6.48 3.55 14.08l7.21 5.6C12.55 15.17 17.86 9.5 24 9.5z"/>
    <path fill="#34A853" d="M24 46c6.02 0 11.2-2.06 14.97-5.59l-7.17-5.6c-2.03 1.4-4.67 2.21-7.8 2.21-5.97 0-11.04-4.06-12.84-9.6l-7.14 5.51C8.27 41.34 15.64 46 24 46z"/>
    <path fill="#FBBC05" d="M44.98 20H24v8.44h11.82C34.55 33.58 29.81 37 24 37c-6.14 0-11.36-4.19-13.21-9.71l-7.21 5.61C7 38.78 14.64 44 24 44c7.58 0 14.03-3.16 18.4-8.25l-7.17-5.6C31.24 33.84 27.66 35 24 35c-4.9 0-9.17-2.82-11.08-6.96L44.98 20z"/>
    <path fill="#EA4335" d="M9.18 25.67c-.49-1.45-.77-2.98-.77-4.57s.28-3.12.77-4.57l-7.22-5.61C.97 14.34 0 19.02 0 24s.97 9.66 2.96 13.47l7.22-5.61z"/>
  </svg>
);

export default function Login() {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="p-10 flex justify-center items-center">
        {/* Left side content */}
        <form className="max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Login
          </button>
          {/* Horizontal line */}
          <hr className="my-6 border-gray-300" />
          {/* Sign up with Google button */}
          <button
            type="button"
            className="bg-transparent border-gray-300 border hover:bg-gray-200 text-customPurple font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center"
          >
            <GoogleIcon />
            Sign up with Google
          </button>
        </form>
      </div>
      <div className="bg-black text-white flex justify-center items-center">
        {/* Right side content with black background */}
        <h2 className="text-3xl font-bold text-center">Welcome Back!</h2>
      </div>
    </div>
  );
}
