# Documentación del proyecto Biblioteca

## 1. Resumen general

Este proyecto es una aplicación web de gestión de libros personales llamada **Biblioteca**. Está construida con **Next.js**, **TypeScript** y utiliza **Prisma** para interactuar con una base de datos remota en **Turso**. La aplicación ofrece:

- Añadir libros con título, autor, género, año y descripción
- Ver una colección de libros
- Buscar libros por título o autor sin tener en cuenta tildes
- Eliminar libros
- Persistencia de datos en una base de datos remota
- Despliegue en **Vercel** desde un repositorio de **GitHub**

## 2. Estructura principal del proyecto

```
app/
  page.tsx
  add/page.tsx
  api/
    books/route.ts
    books/[id]/route.ts
    init/route.ts
components/
  AddBookForm.tsx
  BookItem.tsx
  BookList.tsx
lib/
  prisma-client.ts
  types.ts
  useBooks.ts
prisma/
  schema.prisma
  migrations/
.doc/README.md
package.json
.env
```

## 3. Tecnologías utilizadas

- **Next.js 16 App Router**: para manejar páginas y rutas del servidor.
- **TypeScript**: tipado estático que mejora la calidad del código.
- **Tailwind CSS**: para estilos rápidos y responsivos.
- **Prisma**: ORM para acceso seguro a la base de datos.
- **Turso**: base de datos remota SQL compatible con LibSQL.
- **Vercel**: plataforma de despliegue para frontend y funciones serverless.
- **GitHub**: control de versiones y conexión al repositorio.

## 4. Cómo se conecta todo

### 4.1 Frontend

El frontend usa la carpeta `app/` de Next.js y una arquitectura de componentes React:

- `app/page.tsx`: página principal que muestra la lista de libros.
- `app/add/page.tsx`: página para agregar un libro.
- `components/BookList.tsx`: componente que muestra la lista de libros y controla la búsqueda.
- `components/AddBookForm.tsx`: formulario para crear libros.
- `components/BookItem.tsx`: tarjeta de cada libro con botón para eliminar.

### 4.2 Estado y búsqueda

La lógica de datos del cliente vive en `lib/useBooks.ts`:

- `fetchBooks()` carga `/api/books`
- `addBook()` crea un libro con `/api/books` (POST)
- `deleteBook()` elimina un libro con `/api/books/[id]` (DELETE)
- La búsqueda se normaliza para ignorar mayúsculas y tildes usando `String.prototype.normalize('NFD')` y eliminación de diacríticos.

### 4.3 Backend y API

Las rutas de la API se definen en `app/api/`:

- `app/api/books/route.ts`
  - `GET /api/books`: devuelve todos los libros
  - `POST /api/books`: crea un nuevo libro
- `app/api/books/[id]/route.ts`
  - `DELETE /api/books/:id`: elimina un libro por su ID
- `app/api/init/route.ts`
  - `POST /api/init`: inicializa la base de datos con datos de ejemplo si el conteo es 0

Estas rutas usan `lib/prisma-client.ts` para acceder a la base de datos.

## 5. Base de datos y Prisma

### 5.1 Prisma

El esquema Prisma está en `prisma/schema.prisma` y define el modelo `Book`:

- `id`: identificador UUID/Texto
- `title`, `author`, `genre`, `description`
- `year`: año del libro
- `createdAt` y `updatedAt`

### 5.2 Cliente Prisma

`lib/prisma-client.ts` exporta una instancia de Prisma configurada con el adaptador `@prisma/adapter-libsql` y la URL del entorno:

- En producción usa `process.env.DATABASE_URL`
- En desarrollo cae a `file:./dev.db` si no existe la variable

### 5.3 Turso

La base de datos remota se configura usando una URL `libsql://...` almacenada en `.env`.

Se creó una base de datos Turso remota y se configuró en Vercel como variable de entorno.

## 6. Despliegue en Vercel

La app se desplegó en Vercel y se vincula con el repositorio de GitHub. Vercel ejecuta el build de Next.js y deploya tanto la interfaz como las funciones de serverless para las APIs.

### 6.1 Variables de entorno en Vercel

- `DATABASE_URL`: necesaria para la conexión a Turso en producción

### 6.2 URLs del despliegue

- Producción actual: `https://biblioteca-lime-three.vercel.app`

## 7. Repositorio y GitHub

El proyecto está enlazado con el repositorio de GitHub:

- `git@github.com:RaulPerezCortes/biblioteca.git`

Se usó SSH para autenticación segura con GitHub.

## 8. Flujo de datos completo

1. El usuario abre la página `/` en el navegador.
2. `BookList` carga libros desde `/api/books`.
3. `/api/books` consulta la base de datos con Prisma y devuelve los registros.
4. Si se agrega un libro, `AddBookForm` envía un POST a `/api/books`.
5. Si se elimina, se llama a `DELETE /api/books/:id`.
6. En producción, Prisma apunta a Turso usando `DATABASE_URL`.

## 9. Archivos clave y sus roles

- `app/page.tsx`: página principal
- `app/add/page.tsx`: página de creación
- `app/api/books/route.ts`: API de list/crear libros
- `app/api/books/[id]/route.ts`: API de eliminar libro
- `app/api/init/route.ts`: API de inicialización de datos
- `components/BookList.tsx`: lista y búsqueda
- `components/AddBookForm.tsx`: formulario de nuevo libro
- `components/BookItem.tsx`: visualización de un libro
- `lib/useBooks.ts`: lógica de datos del cliente
- `lib/prisma-client.ts`: conexión Prisma/Turso
- `prisma/schema.prisma`: modelo de datos
- `populate-turso.js`: script para insertar libros de ejemplo en Turso

## 10. Cómo ejecutar el proyecto localmente

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Crear un archivo `.env` con:
   ```env
   DATABASE_URL="libsql://..."
   ```
3. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abrir [http://localhost:3000](http://localhost:3000)

## 11. Notas adicionales

- La búsqueda de libros ahora ignora tildes y mayúsculas.
- La inicialización de la base de datos con `/api/init` existe para poblar datos, pero no se dispara automáticamente en cada carga en producción.
- El deploy en Vercel usa configuración de variables seguras y sirve la aplicación como página estática y rutas API dinámicas.

## 12. Futuras mejoras sugeridas

- Añadir autenticación de usuario
- Validación de formularios más robusta
- Paginación de la lista de libros
- Etiquetas, categorías o favoritos
- Mejor manejo de errores en la UI
