'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart')) || []; }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const handler = e => {
      const { id, item } = e.detail;
      setCart(prev => [...prev, { restId: id, ...item }]);
    };
    window.addEventListener('add-to-cart', handler);
    return () => window.removeEventListener('add-to-cart', handler);
  }, []);

  const clear = () => setCart([]);
  return (
    <CartContext.Provider value={{ cart, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
