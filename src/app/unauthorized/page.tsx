// src/app/unauthorized/page.tsx
'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function UnauthorizedPage() {
  useEffect(() => {
    // Optional: Log unauthorized access attempt
    console.warn('Unauthorized access attempt');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-16 w-16 mx-auto text-red-500 mb-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Unauthorized Access</h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to access this page.
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            href="/dashboard" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Go to Dashboard
          </Link>
          <Link 
            href="/login" 
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}