// app/page.jsx
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('/api/restaurants')
      .then(r => r.json())
      .then(setRestaurants);
  }, []);

  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    r.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main>
      {/* Hero banner */}
      <div className="relative w-full h-64">
        <Image
          src="/images/hero-banner.png"
          alt="Berlin Eats hero banner"
          fill
          className="object-cover"
          priority
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold drop-shadow-lg">
          Berlin Eats
        </h1>
      </div>

      <div className="p-8">
        <h2 className="text-3xl mb-4">Our Restaurants</h2>
        <div className="mb-4">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search restaurants..."
            className="input"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-gray-500">No restaurants found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r) => (
              <Link key={r._id} href={`/restaurants/${r._id}`}>
                <div className="border p-4 rounded shadow hover:shadow-lg transition cursor-pointer">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="h-40 w-full object-cover rounded"
                  />
                  <h3 className="mt-2 text-xl font-medium">{r.name}</h3>
                  <p className="text-gray-600">{r.description}</p>
                </div>
              </Link>
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
      </div>
    </main>
  );
}
