// app/page.jsx
export const dynamic = 'force-dynamic';    // ensure we don’t prerender this at build

import Link from 'next/link';
import { connectDb } from '../lib/db';
import { Restaurant } from '../models/Restaurant';

export default async function Home() {
  // 1. Connect to MongoDB
  await connectDb();

  // 2. Pull all restaurants
  const restaurants = await Restaurant.find().lean();

  return (
    <main className="p-8">
      <h1 className="text-3xl mb-4">Berlin Eats</h1>

      {restaurants.length === 0 ? (
        <p className="text-gray-500">No restaurants yet—check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((r) => (
            <div key={r._id} className="border rounded-lg shadow hover:shadow-lg transition p-4">
              <img
                src={r.image}
                alt={r.name}
                className="h-40 w-full object-cover rounded"
              />
              <h2 className="text-xl font-semibold mt-2">{r.name}</h2>
              <p className="text-gray-600">{r.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* If you ever want a link to /login in the footer */}
      {/* <div className="mt-8 text-center">
        <Link href="/login" className="underline text-blue-600">
          Admin Login
        </Link>
      </div> */}
    </main>
  );
}
