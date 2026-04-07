'use client';

import { useState, useEffect } from 'react';
import { Book } from './types';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/books');
      const data = await response.json();

      if (!response.ok) {
        console.error('Error fetching books:', data);
        setBooks([]);
        return;
      }

      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (book: Omit<Book, 'id'>) => {
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });
      const newBook = await response.json();
      setBooks([newBook, ...books]);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const deleteBook = async (id: string) => {
    try {
      await fetch(`/api/books/${id}`, { method: 'DELETE' });
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return { books, addBook, deleteBook, loading };
}