'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch('/api/restaurants').then(r => r.json()).then(setList);
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    const form = new FormData();
    form.append('name', name);
    form.append('description', description);
    form.append('image', imageFile);
    await fetch('/api/restaurants', { method: 'POST', body: form });
    setName(''); setDescription(''); setImageFile(null);
    setList(await fetch('/api/restaurants').then(r => r.json()));
  }

  async function handleDelete(id) {
    await fetch(`/api/restaurants/${id}`, { method: 'DELETE' });
    setList(list.filter(r => r._id !== id));
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Admin Portal</h1>
      <form onSubmit={handleAdd} className="space-y-4 mb-8">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="input" />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="textarea" />
        <input type="file" onChange={e => setImageFile(e.target.files[0])} />
        <button type="submit" className="btn">Add Restaurant</button>
      </form>
      <ul className="space-y-4">
        {list.map(r => (
          <li key={r._id} className="flex items-center space-x-4">
            <img src={r.image} alt="" className="h-12 w-12 rounded" />
            <span>{r.name}</span>
            <button onClick={() => handleDelete(r._id)} className="text-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
