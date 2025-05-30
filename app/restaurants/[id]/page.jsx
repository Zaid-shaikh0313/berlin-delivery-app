export const dynamic = 'force-dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { connectDb } from '../../../lib/db';
import { Restaurant } from '../../../models/Restaurant';

export default async function RestaurantPage({ params }) {
  await connectDb();
  const rest = await Restaurant.findById(params.id).lean();
  if (!rest) return <p>Not found</p>;

  return (
    <main className="p-8">
      <div className="flex items-center mb-6">
        <Image src={rest.image} alt={rest.name} width={100} height={100} className="rounded"/>
        <div className="ml-4">
          <h1 className="text-2xl">{rest.name}</h1>
          <p className="text-gray-600">{rest.address}</p>
        </div>
      </div>

      <h2 className="text-xl mb-4">Menu</h2>
      <ul className="space-y-4">
        {rest.menu.map((item, i) => (
          <li key={i} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-500">{item.description}</p>
            </div>
            <button
              onClick={() => window.dispatchEvent(
                new CustomEvent('add-to-cart', { detail: { id: rest._id, item } })
              )}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              + €{item.price.toFixed(2)}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Link href="/cart">
          <a className="btn">View Cart 🛒</a>
        </Link>
      </div>
    </main>
  );
}
