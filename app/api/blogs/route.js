// This path assumes: app/api/blogs/route.js
// Going up 3 levels: blogs -> api -> app -> (now you are in the root)
import { getSubstackPosts } from '../../../lib/getBlogs'; 
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await getSubstackPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}