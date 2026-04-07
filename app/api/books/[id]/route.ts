import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma-client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const book = await prisma.book.findUnique({
      where: { id },
    });
    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching book' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const data = await request.json();
    const book = await prisma.book.update({
      where: { id },
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
    return NextResponse.json({ error: 'Error updating book' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const book = await prisma.book.delete({
      where: { id },
    });
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting book' }, { status: 500 });
  }
}
