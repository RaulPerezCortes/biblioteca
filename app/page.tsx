import Link from 'next/link';

import BookList from '../components/BookList';

export default function Home() {

  return (

    <div>

      <h1 className="text-2xl font-bold p-4">Mi Biblioteca Personal</h1>

      <Link href="/add" className="bg-green-500 text-white p-2 rounded m-4 inline-block">Agregar Libro</Link>

      <BookList />

    </div>

  );

}
