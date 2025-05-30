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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {restaurants.map(r => (
          <div key={r._id} className="border p-4 rounded-lg shadow">
            <img src={r.image} alt={r.name} className="h-40 w-full object-cover rounded" />
            <h2 className="text-xl mt-2">{r.name}</h2>
            <p className="text-gray-600">{r.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
