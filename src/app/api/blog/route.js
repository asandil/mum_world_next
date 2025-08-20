// app/api/blog/route.js
import { getBlogPosts } from '@/lib/api/blog';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await getBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}