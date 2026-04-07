'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

export default function AddBookForm() {

  const router = useRouter();

  const [form, setForm] = useState({

    title: '',

    author: '',

    genre: '',

    year: '',

    description: '',

  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await fetch('/api/books', {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({

          title: form.title,

          author: form.author,

          genre: form.genre,

          year: parseInt(form.year),

          description: form.description || undefined,

        }),

      });

      if (response.ok) {

        router.push('/');

      }

    } catch (error) {

      console.error('Error adding book:', error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">

      <div className="mb-4">

        <label className="block text-sm font-medium">Título</label>

        <input

          type="text"

          value={form.title}

          onChange={(e) => setForm({ ...form, title: e.target.value })}

          required

          className="w-full p-2 border"

        />

      </div>

      <div className="mb-4">

        <label className="block text-sm font-medium">Autor</label>

        <input

          type="text"

          value={form.author}

          onChange={(e) => setForm({ ...form, author: e.target.value })}

          required

          className="w-full p-2 border"

        />

      </div>

      <div className="mb-4">

        <label className="block text-sm font-medium">Género</label>

        <input

          type="text"

          value={form.genre}

          onChange={(e) => setForm({ ...form, genre: e.target.value })}

          required

          className="w-full p-2 border"

        />

      </div>

      <div className="mb-4">

        <label className="block text-sm font-medium">Año</label>

        <input

          type="number"

          value={form.year}

          onChange={(e) => setForm({ ...form, year: e.target.value })}

          required

          className="w-full p-2 border"

        />

      </div>

      <div className="mb-4">

        <label className="block text-sm font-medium">Descripción</label>

        <textarea

          value={form.description}

          onChange={(e) => setForm({ ...form, description: e.target.value })}

          className="w-full p-2 border"

        />

      </div>

      <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded disabled:opacity-50">

        {loading ? 'Agregando...' : 'Agregar Libro'}

      </button>

    </form>

  );

}