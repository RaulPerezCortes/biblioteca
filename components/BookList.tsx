'use client';

import { useState } from 'react';

import { useBooks } from '../lib/useBooks';

import BookItem from './BookItem';

const normalizeText = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

export default function BookList() {

  const { books, deleteBook, loading } = useBooks();

  const [search, setSearch] = useState('');

  const normalizedSearch = normalizeText(search);

  const filteredBooks = books.filter(book =>
    normalizeText(book.title).includes(normalizedSearch) ||
    normalizeText(book.author).includes(normalizedSearch)
  );

  if (loading) {

    return <p className="p-4">Cargando libros...</p>;

  }

  return (

    <div className="p-4">

      <input

        type="text"

        placeholder="Buscar por título o autor"

        value={search}

        onChange={(e) => setSearch(e.target.value)}

        className="w-full p-2 border mb-4"

      />

      {filteredBooks.length === 0 ? (

        <p>No se encontraron libros.</p>

      ) : (

        <div>

          <p className="mb-2 text-sm text-gray-600">{filteredBooks.length} libros encontrados</p>

          {filteredBooks.map(book => (

            <BookItem key={book.id} book={book} onDelete={deleteBook} />

          ))}

        </div>

      )}

    </div>

  );

}