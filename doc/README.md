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

## 3. Tecnologías utilizadas y por qué

- **Next.js 16 App Router**: Elegido por su capacidad para renderizar páginas del lado del servidor (SSR) y cliente, APIs serverless integradas, y App Router que simplifica el enrutamiento. Permite una experiencia de desarrollo rápida con TypeScript y optimizaciones automáticas de rendimiento. Se usa porque facilita la construcción de aplicaciones full-stack en un solo framework, reduciendo la complejidad de manejar frontend y backend separados.

- **TypeScript**: Proporciona tipado estático que previene errores en tiempo de desarrollo y mejora la mantenibilidad del código. Se utiliza para asegurar que los datos fluyan correctamente entre componentes y APIs, especialmente importante en una app con base de datos.

- **Tailwind CSS**: Framework de CSS utilitario que permite estilos rápidos y consistentes sin escribir CSS personalizado. Se elige por su velocidad de desarrollo, responsividad integrada y compatibilidad con Next.js, permitiendo un diseño moderno y profesional sin overhead.

- **Prisma**: ORM (Object-Relational Mapping) que genera consultas SQL seguras y tipadas. Se usa porque abstrae la complejidad de SQL, previene inyecciones SQL, y proporciona una API intuitiva para interactuar con la base de datos desde JavaScript/TypeScript.

- **Turso**: Base de datos SQL remota compatible con SQLite (usando LibSQL). Elegida por su simplicidad de configuración, bajo costo, y compatibilidad con Prisma. A diferencia de bases de datos tradicionales, permite despliegues rápidos sin gestión de servidores, ideal para aplicaciones pequeñas como esta biblioteca personal.

- **Vercel**: Plataforma de despliegue que integra perfectamente con Next.js, ofreciendo despliegues automáticos desde GitHub, funciones serverless para APIs, y variables de entorno seguras. Se utiliza porque simplifica el proceso de despliegue, maneja escalabilidad automáticamente, y proporciona dominios gratuitos.

- **GitHub**: Plataforma de control de versiones que permite colaboración y backups seguros del código. Se usa para versionar el proyecto, conectar con Vercel para despliegues automáticos, y mantener un historial de cambios.

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

Las rutas de la API se definen en `app/api/` usando el sistema de rutas de Next.js App Router. Cada ruta es una función serverless que se ejecuta en Vercel. Estas APIs actúan como intermediario entre el frontend y la base de datos, proporcionando endpoints RESTful para operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

- `app/api/books/route.ts`
  - **GET /api/books**: Devuelve una lista JSON de todos los libros en la base de datos. Se utiliza para cargar la colección completa de libros en la página principal. Ordena los libros por fecha de creación descendente para mostrar los más recientes primero.
  - **POST /api/books**: Recibe datos JSON de un nuevo libro y lo inserta en la base de datos. Se usa cuando el usuario envía el formulario de agregar libro. Valida que los campos requeridos estén presentes antes de guardar.

- `app/api/books/[id]/route.ts`
  - **DELETE /api/books/:id**: Elimina el libro con el ID especificado de la base de datos. Se utiliza cuando el usuario hace clic en el botón "Eliminar" de un libro. Incluye manejo de errores si el libro no existe.

- `app/api/init/route.ts`
  - **POST /api/init**: Verifica si la base de datos está vacía y, si lo está, inserta 50 libros de ejemplo usando datos de un archivo JSON. Se creó inicialmente para poblar la base de datos durante el desarrollo, pero se mantiene por si se necesita reinicializar. En producción, no se llama automáticamente para evitar sobrescribir datos reales.

Estas rutas usan `lib/prisma-client.ts` para acceder a la base de datos de forma segura y tipada. El uso de APIs serverless permite que el backend escale automáticamente sin gestión de servidores.

## 5. Base de datos y Prisma

### 5.1 Prisma

Prisma es el ORM elegido porque genera código TypeScript seguro que previene errores de SQL y proporciona autocompletado. El esquema en `prisma/schema.prisma` define el modelo `Book` con campos apropiados para una biblioteca:

- `id`: Identificador único generado automáticamente (UUID en Turso)
- `title`, `author`, `genre`, `description`: Campos de texto para información del libro
- `year`: Número entero para el año de publicación
- `createdAt` y `updatedAt`: Timestamps automáticos para seguimiento de cambios

### 5.2 Cliente Prisma

`lib/prisma-client.ts` configura Prisma con el adaptador LibSQL para Turso. Este archivo es crucial porque:

- Crea una instancia singleton de Prisma para evitar conexiones múltiples
- Usa `DATABASE_URL` del entorno para apuntar a la base de datos correcta
- En desarrollo, cae a un archivo local si no hay URL configurada
- Maneja la conexión de forma asíncrona y segura

### 5.3 Turso

Turso se elige sobre otras bases de datos por:

- **Simplicidad**: No requiere configuración de servidores o clusters
- **Compatibilidad**: Usa LibSQL, un fork de SQLite, compatible con Prisma
- **Rendimiento**: Optimizado para lecturas/escrituras rápidas
- **Costo**: Gratuito para uso personal con límites generosos
- **Escalabilidad**: Maneja múltiples conexiones sin problemas en Vercel

La base de datos se creó remotamente y se conecta vía URL segura almacenada en variables de entorno.

## 6. Despliegue en Vercel

Vercel se utiliza porque ofrece integración perfecta con Next.js, permitiendo despliegues automáticos desde GitHub. Cuando se hace push al repositorio, Vercel:

1. **Construye la aplicación**: Ejecuta `npm run build` que genera páginas estáticas y funciones serverless
2. **Despliega las APIs**: Convierte las rutas `app/api/` en funciones Lambda serverless
3. **Sirve el frontend**: Hospeda las páginas React con optimizaciones de rendimiento
4. **Maneja variables de entorno**: Almacena `DATABASE_URL` de forma segura

### 6.1 Variables de entorno en Vercel

- `DATABASE_URL`: URL de conexión a Turso, crítica para que las APIs funcionen en producción. Sin ella, las consultas fallan.

### 6.2 URLs del despliegue

- Producción actual: `https://biblioteca-lime-three.vercel.app`
- La página `/doc` está disponible en `https://biblioteca-lime-three.vercel.app/doc`

### 6.3 Por qué Vercel

- **Despliegue automático**: Cada push a `main` actualiza la producción
- **Serverless**: APIs se escalan automáticamente sin gestión
- **CDN global**: Contenido se sirve desde edge locations cercanas
- **Integración GitHub**: Vinculación directa con el repositorio

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
