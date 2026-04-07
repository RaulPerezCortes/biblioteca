import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentación - Biblioteca',
  description: 'Documentación completa de la aplicación de biblioteca personal.',
};

export default function DocPage() {
  const filePath = path.join(process.cwd(), 'doc', 'README.md');
  const content = fs.readFileSync(filePath, 'utf8');

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="mb-6">
          <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Volver a la Biblioteca
          </a>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Documentación de la Biblioteca</h1>
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}