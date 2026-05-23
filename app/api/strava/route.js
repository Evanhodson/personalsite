import { NextResponse } from 'next/server'

const ATHLETE_ID = 126476016

async function getAccessToken() {
  const res = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: process.env.STRAVA_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
    cache: 'no-store',
  })
  const data = await res.json()
  if (!data.access_token) {
    throw new Error(`Token exchange failed: ${data.message || data.error || JSON.stringify(data)}`)
  }
  return data.access_token
}

export async function GET() {
  // Sanity-check env vars are present
  if (!process.env.STRAVA_CLIENT_ID || !process.env.STRAVA_CLIENT_SECRET || !process.env.STRAVA_REFRESH_TOKEN) {
    console.error('Strava env vars missing', {
      hasClientId: !!process.env.STRAVA_CLIENT_ID,
      hasSecret: !!process.env.STRAVA_CLIENT_SECRET,
      hasRefresh: !!process.env.STRAVA_REFRESH_TOKEN,
    })
    return NextResponse.json({ error: 'Strava credentials not configured' }, { status: 500 })
  }

  try {
    const token = await getAccessToken()

    const [statsRes, activitiesRes] = await Promise.all([
      fetch(`https://www.strava.com/api/v3/athletes/${ATHLETE_ID}/stats`, {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 },
      }),
      fetch('https://www.strava.com/api/v3/athlete/activities?per_page=10', {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 },
      }),
    ])

    const [stats, activities] = await Promise.all([
      statsRes.json(),
      activitiesRes.json(),
    ])

    return NextResponse.json(
      { stats, activities },
      { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } }
    )
  } catch (err) {
    console.error('Strava API error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
