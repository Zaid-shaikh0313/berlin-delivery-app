'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  // form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [list, setList] = useState([]);

  // fetch restaurant list once signed-in
  useEffect(() => {
    if (session) {
      fetch('/api/restaurants')
        .then(r => r.json())
        .then(setList);
    }
  }, [session]);

  if (loading) return <p className="p-8">Loading…</p>;

  if (!session) {
    // show login form
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <form
          onSubmit={async e => {
            e.preventDefault();
            await signIn('credentials', {
              redirect: false,
              username: e.target.username.value,
              password: e.target.password.value
            });
          }}
          className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4"
        >
          <h1 className="text-2xl text-center">Admin Login</h1>
          <div>
            <label className="block text-sm">Username</label>
            <input name="username" className="mt-1 w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="block text-sm">Password</label>
            <input type="password" name="password" className="mt-1 w-full border p-2 rounded" required />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            Sign In
          </button>
        </form>
      </div>
    );
  }

  // signed-in: show admin UI
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">Admin Portal</h1>
        <button
          onClick={() => signOut()}
          className="text-red-600 hover:underline"
        >
          Sign out
        </button>
      </div>

      <form
        onSubmit={async e => {
          e.preventDefault();
          const form = new FormData();
          form.append('name', name);
          form.append('description', description);
          form.append('image', imageFile);
          await fetch('/api/restaurants', { method: 'POST', body: form });
          setName('');
          setDescription('');
          setImageFile(null);
          setList(await fetch('/api/restaurants').then(r => r.json()));
        }}
        className="space-y-4 mb-8 bg-white p-6 rounded shadow"
      >
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          onChange={e => setImageFile(e.target.files[0])}
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Add Restaurant
        </button>
      </form>

      <ul className="space-y-4">
        {list.map(r => (
          <li key={r._id} className="flex items-center space-x-4">
            <img src={r.image} className="h-12 w-12 rounded" />
            <span className="flex-grow">{r.name}</span>
            <button
              onClick={async () => {
                await fetch(`/api/restaurants/${r._id}`, { method: 'DELETE' });
                setList(list.filter(x => x._id !== r._id));
              }}
              className="text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
