'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function RestaurantMenuAdmin() {
  const { id } = useParams();
  const [menu, setMenu] = useState([]);
  const [form, setForm] = useState({ name:'', description:'', price:'' });
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/restaurants/${id}/menu`)
      .then(r => r.json())
      .then(setMenu);
  }, [id]);

  async function addItem(e) {
    e.preventDefault();
    await fetch(`/api/restaurants/${id}/menu`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ 
        name: form.name, 
        description: form.description, 
        price: parseFloat(form.price)
      })
    });
    setForm({ name:'', description:'', price:'' });
    setMenu(await (await fetch(`/api/restaurants/${id}/menu`)).json());
  }

  async function delItem(idx) {
    await fetch(`/api/restaurants/${id}/menu/${idx}`, { method:'DELETE' });
    setMenu(menu.filter((_,i)=>i!==idx));
  }

  return (
    <div className="p-8">
      <button onClick={()=>router.back()} className="underline">&larr; Back</button>
      <h1 className="text-2xl my-4">Manage Menu</h1>
      <form onSubmit={addItem} className="space-y-4 mb-6">
        <input 
          value={form.name} 
          onChange={e=>setForm({...form,name:e.target.value})}
          placeholder="Item name" className="input" required/>
        <textarea 
          value={form.description} onChange={e=>setForm({...form,description:e.target.value})}
          placeholder="Description" className="textarea"/>
        <input 
          value={form.price} onChange={e=>setForm({...form,price:e.target.value})}
          placeholder="Price (€)" className="input" required/>
        <button className="btn">Add Item</button>
      </form>

      <ul className="space-y-2">
        {menu.map((item, idx) => (
          <li key={idx} className="flex justify-between">
            <span>{item.name} — €{item.price.toFixed(2)}</span>
            <button onClick={()=>delItem(idx)} className="text-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
