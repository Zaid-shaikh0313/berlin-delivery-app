'use client';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { calculateDeliveryFee } from '../../utils/deliveryFee';

export default function CartPage() {
  const { cart, clear } = useCart();
  const [zip, setZip] = useState('');
  const [fee, setFee] = useState(0);

  const subtotal = cart.reduce((sum, i) => sum + i.price, 0);
  const total = subtotal + fee;

  async function calcFee() {
    const restId = cart[0]?.restId;
    if (!restId) return;
    const res = await fetch(`/api/delivery-fee?zip=${zip}&restId=${restId}`);
    const data = await res.json();
    setFee(data.fee);
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl mb-4">Your Cart</h1>
      {cart.length === 0
        ? <p>Your cart is empty.</p>
        : (
          <>
            <ul className="space-y-2 mb-4">
              {cart.map((i, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{i.name}</span>
                  <span>€{i.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <div className="mb-4">
              <label>Enter your ZIP to calc delivery fee:</label>
              <input
                value={zip}
                onChange={e => setZip(e.target.value)}
                className="ml-2 border p-1 rounded"
              />
              <button onClick={calcFee} className="ml-2 btn-sm">Calc Fee</button>
            </div>

            <p>Subtotal: €{subtotal.toFixed(2)}</p>
            <p>Delivery: €{fee.toFixed(2)}</p>
            <p className="font-bold">Total: €{total.toFixed(2)}</p>

            <button onClick={clear} className="mt-4 btn-red">Clear Cart</button>
          </>
        )}
    </main>
  );
}
