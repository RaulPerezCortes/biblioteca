import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma-client';

export async function GET(request: NextRequest) {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching books' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const book = await prisma.book.create({
      data: {
        title: data.title,
        author: data.author,
        genre: data.genre,
        year: data.year,
        description: data.description,
      },
    });
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating book' }, { status: 500 });
  }
}
