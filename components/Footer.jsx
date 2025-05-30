'use client';

import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();
  return (
    <footer className="w-full py-4 text-center text-sm text-gray-500 border-t mt-auto">
      © 2025 Berlin Eats —{' '}
      <button
        onClick={() => router.push('/login')}
        className="underline hover:text-gray-700"
      >
        Admin
      </button>
    </footer>
  );
}
