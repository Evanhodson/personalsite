'use client';
import { useState, useEffect } from 'react';
import Nav from '../../components/Nav.js';
import { athletics } from '../../lib/data.js';

// ── Strava formatting helpers ──────────────────────────────────────────────
function metersToMiles(m) { return (m / 1609.34).toFixed(1) }
function metersToYards(m) { return Math.round(m * 1.09361).toLocaleString() }
function secondsToHM(s) {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}
function runPace(distM, timeS) {
  const secPerMile = timeS / (distM / 1609.34)
  const min = Math.floor(secPerMile / 60)
  const sec = Math.round(secPerMile % 60)
  return `${min}:${String(sec).padStart(2, '0')}/mi`
}
function swimPace(distM, timeS) {
  const yards = distM * 1.09361
  const secPer100 = timeS / (yards / 100)
  const min = Math.floor(secPer100 / 60)
  const sec = Math.round(secPer100 % 60)
  return `${min}:${String(sec).padStart(2, '0')}/100yd`
}
function rideSpeed(distM, timeS) {
  return `${((distM / 1609.34) / (timeS / 3600)).toFixed(1)} mph`
}
function activityDate(iso) {
  const d = new Date(iso)
  return `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}-${String(d.getFullYear()).slice(2)}`
}
function sportLabel(type) {
  const map = {
    Run: 'RUN', TrailRun: 'TRAIL', VirtualRun: 'RUN',
    Swim: 'SWIM', OpenWaterSwim: 'OW_SWIM',
    Ride: 'RIDE', VirtualRide: 'V_RIDE', GravelRide: 'GRAVEL',
    Walk: 'WALK', Hike: 'HIKE',
    WeightTraining: 'LIFT', Workout: 'WKT', Yoga: 'YOGA',
  }
  return map[type] || type.toUpperCase().slice(0, 6)
}
function activityDist(act) {
  if (!act.distance) return '—'
  const t = act.sport_type || act.type
  return t.toLowerCase().includes('swim')
    ? `${metersToYards(act.distance)} yd`
    : `${metersToMiles(act.distance)} mi`
}
function activityPace(act) {
  if (!act.distance || !act.moving_time) return '—'
  const t = act.sport_type || act.type
  if (t.toLowerCase().includes('run')) return runPace(act.distance, act.moving_time)
  if (t.toLowerCase().includes('swim')) return swimPace(act.distance, act.moving_time)
  if (t.toLowerCase().includes('ride')) return rideSpeed(act.distance, act.moving_time)
  return secondsToHM(act.moving_time)
}

export default function AthleticsPage() {
  const [daysUntil, setDaysUntil] = useState(0);
  const [strava, setStrava]       = useState(null);
  const [stravaErr, setStravaErr] = useState(false);

  useEffect(() => {
    const raceDate = new Date(athletics.events[0].date);
    const now = new Date();
    setDaysUntil(Math.ceil((raceDate - now) / (1000 * 60 * 60 * 24)));
  }, []);

  useEffect(() => {
    fetch('/api/strava')
      .then(r => r.json())
      .then(data => {
        if (data.error) setStravaErr(true)
        else setStrava(data)
      })
      .catch(() => setStravaErr(true))
  }, []);

  return (
    <div className="athletics-wrapper athletics-page">
      <div className="nav-dark-fix">
        <Nav />
      </div>

      <main className="athletics-main">
        <header className="page-header">
          <h1>ATHLETICS DATA</h1>
          <div className="countdown-ribbon">
            T-MINUS: {daysUntil} days until ironman 2026
          </div>
        </header>

        {/* Swimming */}
        <section className="data-section">
          <h2>[01] SWIMMING_PR</h2>
          <table className="pr-table">
            <thead>
              <tr>
                <th>EVENT</th>
                <th>SCM</th>
                <th>DATE</th>
                <th>LCM</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {athletics.swimming.map((s, i) => (
                <tr key={i}>
                  <td>{s.event}</td>
                  <td className="accent">{s.scm}</td>
                  <td className="dim">{s.scmDate}</td>
                  <td className="accent">{s.lcm}</td>
                  <td className="dim">{s.lcmDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Running */}
        <section className="data-section">
          <h2>[02] RUNNING_PR</h2>
          <table className="pr-table">
            <thead>
              <tr>
                <th>DISTANCE</th>
                <th>TIME</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {athletics.running.map((r, i) => (
                <tr key={i}>
                  <td>{r.dist}</td>
                  <td className="accent">{r.time}</td>
                  <td className="dim">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Strength */}
        <section className="data-section">
          <h2>[03] STRENGTH</h2>
          <table className="pr-table">
            <thead>
              <tr>
                <th>EXERCISE</th>
                <th>LOAD</th>
                <th>SPEC</th>
              </tr>
            </thead>
            <tbody>
              {athletics.lifting.map((l, i) => (
                <tr key={i}>
                  <td>{l.exercise}</td>
                  <td className="accent">{l.pr}</td>
                  <td className="dim">{l.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Strava YTD — only show when data is available */}
        {strava && !stravaErr && (
          <section className="data-section">
            <h2>[04] YTD_TOTALS</h2>
            <table className="pr-table">
              <thead>
                <tr>
                  <th>SPORT</th>
                  <th>ACTIVITIES</th>
                  <th>DISTANCE</th>
                  <th>TIME</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>RUN</td>
                  <td className="accent">{strava.stats.ytd_run_totals?.count ?? '—'}</td>
                  <td className="accent">{strava.stats.ytd_run_totals?.distance ? `${metersToMiles(strava.stats.ytd_run_totals.distance)} mi` : '—'}</td>
                  <td className="dim">{strava.stats.ytd_run_totals?.moving_time ? secondsToHM(strava.stats.ytd_run_totals.moving_time) : '—'}</td>
                </tr>
                <tr>
                  <td>SWIM</td>
                  <td className="accent">{strava.stats.ytd_swim_totals?.count ?? '—'}</td>
                  <td className="accent">{strava.stats.ytd_swim_totals?.distance ? `${metersToYards(strava.stats.ytd_swim_totals.distance)} yd` : '—'}</td>
                  <td className="dim">{strava.stats.ytd_swim_totals?.moving_time ? secondsToHM(strava.stats.ytd_swim_totals.moving_time) : '—'}</td>
                </tr>
                <tr>
                  <td>RIDE</td>
                  <td className="accent">{strava.stats.ytd_ride_totals?.count ?? '—'}</td>
                  <td className="accent">{strava.stats.ytd_ride_totals?.distance ? `${metersToMiles(strava.stats.ytd_ride_totals.distance)} mi` : '—'}</td>
                  <td className="dim">{strava.stats.ytd_ride_totals?.moving_time ? secondsToHM(strava.stats.ytd_ride_totals.moving_time) : '—'}</td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        {/* Strava Recent Activity — only show when data is available */}
        {strava && !stravaErr && Array.isArray(strava.activities) && strava.activities.length > 0 && (
          <section className="data-section">
            <h2>[05] RECENT_ACTIVITY</h2>
            <table className="pr-table">
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>TYPE</th>
                  <th>NAME</th>
                  <th>DIST</th>
                  <th>PACE / SPEED</th>
                </tr>
              </thead>
              <tbody>
                {strava.activities.map((act, i) => (
                  <tr key={i}>
                    <td className="dim">{activityDate(act.start_date_local)}</td>
                    <td className="accent">{sportLabel(act.sport_type || act.type)}</td>
                    <td>{act.name}</td>
                    <td>{activityDist(act)}</td>
                    <td className="dim">{activityPace(act)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

      </main>

      <style jsx global>{`
        body {
          background-color: #0a0a0a !important;
          margin: 0;
          padding: 0;
        }
      `}</style>

      <style jsx>{`
        .athletics-wrapper {
          background: #0d0d0d;
          min-height: 100vh;
          color: #f0f0f0;
          font-family: 'JetBrains Mono', monospace;
        }

        .nav-dark-fix :global(nav) {
          background: #0a0a0a !important;
          color: #fff !important;
          border-bottom: 1px solid #1a1a1a;
        }

        .athletics-main { max-width: 850px; margin: 0 auto; padding: 4rem 2rem; }

        .page-header h1 { font-size: 0.8rem; color: #555; letter-spacing: 3px; margin-bottom: 1rem; }

        .countdown-ribbon {
          border-left: 4px solid #52ff94;
          padding: 1rem;
          font-size: 1.2rem;
          font-weight: 800;
          margin-bottom: 3rem;
          background: rgba(82, 255, 148, 0.05);
          color: #fff;
        }

        .data-section { margin-bottom: 4rem; }

        h2 {
          font-size: 0.85rem;
          color: #9ca3af;
          margin-bottom: 1.5rem;
          letter-spacing: 2px;
          border-left: 2px solid #52ff94;
          padding-left: 10px;
        }

        .pr-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }

        th {
          text-align: left;
          color: #f3f4f6;
          font-size: 0.75rem;
          text-transform: uppercase;
          padding-bottom: 12px;
          border-bottom: 1px solid #374151;
        }

        td {
          padding: 14px 0;
          border-bottom: 1px solid #1f2937;
          color: #ffffff;
        }

        .accent {
          color: #008031;
          font-weight: 600;
        }

        .dim {
          color: #6b7280;
          font-size: 0.8rem;
          padding-right: 1.5rem;
        }
      `}</style>
    </div>
  );
}
