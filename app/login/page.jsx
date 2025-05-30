'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl mb-6">Admin Sign In</h1>
      <button
        onClick={() => signIn('credentials')}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Sign in with username/password
      </button>
    </div>
  );
}
