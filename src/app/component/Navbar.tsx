'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { FC, useEffect, useState } from 'react';

const Navbar: FC = () => {
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null; // Prevent hydration mismatch

  const handleSignIn = () => {
    window.location.href = "/signin";
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <svg className="h-8 w-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-800">InvoicePro</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <span className="text-gray-500">Loading...</span>
            ) : session?.user ? (
              <>
                <span className="text-gray-700">Hi, {session.user.name || session.user.email}</span>
                <button
                  className="px-4 py-2 text-red-600 font-medium rounded-lg hover:bg-red-50 transition duration-300"
                  onClick={handleSignOut}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="px-4 py-2 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition duration-300"
                  onClick={handleSignIn}
                >
                  Sign In
                </button>
                <button
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-md transition duration-300"
                  onClick={handleSignIn}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
