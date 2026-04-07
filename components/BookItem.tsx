'use client';

import { Book } from '../lib/types';

interface BookItemProps {

  book: Book;

  onDelete: (id: string) => void;

}

export default function BookItem({ book, onDelete }: BookItemProps) {

  return (

    <div className="border p-4 mb-2 rounded">

      <h3 className="text-lg font-bold">{book.title}</h3>

      <p>Author: {book.author}</p>

      <p>Genre: {book.genre}</p>

      <p>Year: {book.year}</p>

      {book.description && <p>Description: {book.description}</p>}

      <button

        onClick={() => onDelete(book.id)}

        className="mt-2 bg-red-500 text-white p-1 rounded"

      >

        Delete

      </button>

    </div>

  );

}