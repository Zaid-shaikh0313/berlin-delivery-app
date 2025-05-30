// app/page.jsx
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { connectDb } from '../lib/db';
import { Restaurant } from '../models/Restaurant';

export default async function Home() {
  await connectDb();
  const restaurants = await Restaurant.find().lean();

  return (
    <main className="p-8">
      <h1 className="text-3xl mb-4">Berlin Eats</h1>
      {restaurants.length === 0 ? (
        <p>No restaurants yet—check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((r) => (
            <div key={r._id} className="border p-4 rounded shadow">
              <img src={r.image} alt={r.name} className="h-40 w-full object-cover rounded" />
              <h2 className="mt-2 text-xl">{r.name}</h2>
              <p className="text-gray-600">{r.description}</p>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8 text-center">
        <Link href="/admin">
          <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Admin
          </button>
        </Link>
      </div>
    </main>
  );
}
