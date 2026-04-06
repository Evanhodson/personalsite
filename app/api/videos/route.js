export const revalidate = 3600; // Refreshes the cache every 1 hour

import { getYouTubeVideos } from '../../../lib/getVideos';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const videosData = await getYouTubeVideos();
    // Return just the videos array to keep your frontend logic simple
    return NextResponse.json(videosData.videos || []);
  } catch (error) {
    console.error("YouTube API Route Error:", error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}