require('dotenv').config();
const { createClient } = require("@libsql/client");

const client = createClient({
  url: process.env.DATABASE_URL,
});

const books = [
  { title: 'El Quijote', author: 'Miguel de Cervantes', genre: 'Novel', year: 1605, description: 'La historia de un caballero que se vuelve loco por leer libros de caballerías.' },
  { title: 'Cien años de soledad', author: 'Gabriel García Márquez', genre: 'Magical Realism', year: 1967, description: 'Un clásico de la literatura latinoamericana.' },
  { title: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949, description: 'Una visión aterradora del futuro totalitario.' },
  { title: 'El Gran Gatsby', author: 'F. Scott Fitzgerald', genre: 'Novel', year: 1925, description: 'La historia del misterioso millonario Jay Gatsby.' },
  { title: 'Orgullo y Prejuicio', author: 'Jane Austen', genre: 'Romance', year: 1813, description: 'Una novela de romance y crítica social.' },
  { title: 'Crimen y Castigo', author: 'Fiódor Dostoievski', genre: 'Novel', year: 1866, description: 'Un análisis profundo de la psicología humana.' },
  { title: 'Las Miserables', author: 'Victor Hugo', genre: 'Novel', year: 1862, description: 'La historia de redención de Jean Valjean.' },
  { title: 'Jane Eyre', author: 'Charlotte Brontë', genre: 'Gothic', year: 1847, description: 'La historia de una mujer independiente y fuerte.' },
  { title: 'Wuthering Heights', author: 'Emily Brontë', genre: 'Gothic', year: 1847, description: 'Un clásico de la literatura gótica inglesa.' },
  { title: 'El Viejo y el Mar', author: 'Ernest Hemingway', genre: 'Adventure', year: 1952, description: 'La lucha de un pescador contra la naturaleza.' },
  { title: 'Cumbres Borrascosas', author: 'Emily Brontë', genre: 'Gothic', year: 1847, description: 'Pasión y venganza en las moras inglesas.' },
  { title: 'El Proceso', author: 'Franz Kafka', genre: 'Existential', year: 1925, description: 'Una novela sobre la injusticia burocrática.' },
  { title: 'La Metamorfosis', author: 'Franz Kafka', genre: 'Surreal', year: 1915, description: 'La extraña transformación de Gregorio Samsa.' },
  { title: 'Por quién doblan las campanas', author: 'Ernest Hemingway', genre: 'War', year: 1940, description: 'La Guerra Civil Española a través de los ojos de un americano.' },
  { title: 'Drácula', author: 'Bram Stoker', genre: 'Horror', year: 1897, description: 'La clásica novela de terror sobre el conde Drácula.' },
  { title: 'Frankenstein', author: 'Mary Shelley', genre: 'Science Fiction', year: 1818, description: 'La historia del Doctor Frankenstein y su criatura.' },
  { title: 'El Conde de Montecristo', author: 'Alexandre Dumas', genre: 'Adventure', year: 1844, description: 'Una épica de venganza y redención.' },
  { title: 'Los Tres Mosqueteros', author: 'Alexandre Dumas', genre: 'Adventure', year: 1844, description: 'Las aventuras de D\'Artagnan y sus amigos.' },
  { title: 'Anna Karenina', author: 'León Tolstói', genre: 'Novel', year: 1877, description: 'Una novela sobre la vida y el amor en la Rusia imperial.' },
  { title: 'Guerra y Paz', author: 'León Tolstói', genre: 'Historical', year: 1869, description: 'Una epopeya histórica de la invasión napoleónica a Rusia.' },
  { title: 'La Piel de Zapa', author: 'Honoré de Balzac', genre: 'Fantasy', year: 1831, description: 'Una historia sobre el deseo y sus consecuencias.' },
  { title: 'El Misterio de Edwin Drood', author: 'Charles Dickens', genre: 'Mystery', year: 1870, description: 'Una novela de misterio nunca completada.' },
  { title: 'David Copperfield', author: 'Charles Dickens', genre: 'Novel', year: 1850, description: 'La historia autobiográfica de David Copperfield.' },
  { title: 'Gran Expectativas', author: 'Charles Dickens', genre: 'Novel', year: 1861, description: 'El viaje de Pip hacia la madurez.' },
  { title: 'Un Cuento de Navidad', author: 'Charles Dickens', genre: 'Fantasy', year: 1843, description: 'La redención de Ebenezer Scrooge en Navidad.' },
  { title: 'Moby Dick', author: 'Herman Melville', genre: 'Adventure', year: 1851, description: 'La obsesión del Capitán Ahab por la ballena blanca.' },
  { title: 'Las Aventuras de Huckleberry Finn', author: 'Mark Twain', genre: 'Adventure', year: 1884, description: 'Las aventuras de un chico y un hombre esclavo en el Misisipí.' },
  { title: 'Las Aventuras de Tom Sawyer', author: 'Mark Twain', genre: 'Adventure', year: 1876, description: 'Las travesuras de un chico en el sur de Estados Unidos.' },
  { title: 'El Príncipe y el Mendigo', author: 'Mark Twain', genre: 'Adventure', year: 1881, description: 'El intercambio de destinos entre un príncipe y un mendigo.' },
  { title: 'Robinson Crusoe', author: 'Daniel Defoe', genre: 'Adventure', year: 1719, description: 'La historia de un hombre naufragado en una isla.' },
  { title: 'Gulliver\'s Travels', author: 'Jonathan Swift', genre: 'Satire', year: 1726, description: 'Los viajes fantásticos de Lemuel Gulliver.' },
  { title: 'El Castillo', author: 'Franz Kafka', genre: 'Existential', year: 1926, description: 'Una novela sobre la alienación y la burocracia.' },
  { title: 'Lolita', author: 'Vladimir Nabokov', genre: 'Novel', year: 1955, description: 'Una novela controvertida sobre obsesión y pasión.' },
  { title: 'El Guardián entre el Centeno', author: 'J.D. Salinger', genre: 'Coming of Age', year: 1951, description: 'Las reflexiones de un adolescente desorientado.' },
  { title: 'Adiós a las Armas', author: 'Ernest Hemingway', genre: 'War', year: 1929, description: 'El amor y la guerra durante la Primera Guerra Mundial.' },
  { title: 'El Ruido y la Furia', author: 'William Faulkner', genre: 'Modernist', year: 1929, description: 'Una novela experimental sobre la decadencia del sur.' },
  { title: 'Mientras Agonizo', author: 'William Faulkner', genre: 'Modernist', year: 1930, description: 'La historia de una familia en el camino a enterrar a su matriarca.' },
  { title: 'La Carretera', author: 'Cormac McCarthy', genre: 'Post-Apocalyptic', year: 2006, description: 'Un viaje apocalíptico de un padre y su hijo.' },
  { title: 'No Es País para Viejos', author: 'Cormac McCarthy', genre: 'Crime', year: 2005, description: 'Un thriller ambientado en la frontera México-Texas.' },
  { title: 'El Nombre de la Rosa', author: 'Umberto Eco', genre: 'Mystery', year: 1980, description: 'Un misterio medieval en un monasterio.' },
  { title: 'Susurro en la Oscuridad', author: 'Stephen King', genre: 'Horror', year: 1990, description: 'Un clásico del terror psicológico.' },
  { title: 'El Resplandor', author: 'Stephen King', genre: 'Horror', year: 1977, description: 'El aislamiento y la locura en un hotel de montaña.' },
  { title: 'La Bruja de Blair', author: 'Daniel Myrick', genre: 'Horror', year: 1999, description: 'Un documental sobre desapariciones misteriosas.' },
  { title: 'El Código Da Vinci', author: 'Dan Brown', genre: 'Thriller', year: 2003, description: 'Un misterio que envuelve el Vaticano y la historia cristiana.' },
  { title: 'La Chica de la Red de Araña', author: 'Stieg Larsson', genre: 'Thriller', year: 2005, description: 'Un thriller de crimen y mistério sueco.' },
  { title: 'Harry Potter y la Piedra Filosofal', author: 'J.K. Rowling', genre: 'Fantasy', year: 1997, description: 'El comienzo de la saga del mago Harry Potter.' },
  { title: 'El Señor de los Anillos', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: 1954, description: 'Una epopeya de fantasía épica sobre la anillo del poder.' },
  { title: 'El Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: 1937, description: 'Las aventuras de un pequeño hobbit en la Tierra Media.' },
  { title: 'Crónicas de Narnia', author: 'C.S. Lewis', genre: 'Fantasy', year: 1950, description: 'Los viajes de niños a un mundo mágico.' },
  { title: 'Juego de Tronos', author: 'George R.R. Martin', genre: 'Fantasy', year: 1996, description: 'Una epopeya de poder, intriga y dragones.' },
];

async function main() {
  try {
    console.log("Insertando 50 libros en Turso...");
    
    for (const book of books) {
      const id = Math.random().toString(36).substr(2, 9);
      const now = new Date().toISOString();
      
      await client.execute({
        sql: `INSERT INTO books (id, title, author, genre, year, description, createdAt, updatedAt) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [id, book.title, book.author, book.genre, book.year, book.description, now, now],
      });
    }
    
    console.log("✓ 50 libros insertados correctamente en Turso");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
