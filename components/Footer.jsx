// components/Footer.jsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-4 text-center text-sm text-gray-500 border-t mt-auto">
      © 2025 Berlin Eats —{' '}
      <Link href="/login">
        <a className="underline hover:text-gray-700">Admin Login</a>
      </Link>
    </footer>
  );
}
