'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Nav from '../../components/Nav.js';
import { athletics } from '../../lib/data.js';

export default function AthleticsPage() {
  const [daysUntil, setDaysUntil] = useState(0);

  useEffect(() => {
    const raceDate = new Date(athletics.events[0].date);
    const now = new Date();
    const diff = Math.ceil((raceDate - now) / (1000 * 60 * 60 * 24));
    setDaysUntil(diff);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="athletics-wrapper"
    >
      {/* Container for the Nav to ensure it blends */}
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

        {/* Swimming Section */}
        <section className="data-section">
          <h2>[01] SWIMMING_PR</h2>
          <table className="pr-table">
            <thead>
              <tr>
                <th>EVENT</th>
                <th>SCM</th>
                <th>LCM</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {athletics.swimming.map((s, i) => (
                <tr key={i}>
                  <td>{s.event}</td>
                  <td className="accent">{s.scm}</td>
                  <td className="accent">{s.lcm}</td>
                  <td className="dim">{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Running Section */}
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

        {/* Lifting Section */}
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
          background: #0a0a0a; /* Slightly softer than pure black */
          min-height: 100vh;
          color: #e0e0e0;
          font-family: 'JetBrains Mono', monospace;
        }
        
        /* Forces the Nav to play nice with the dark theme */
        .nav-dark-fix :global(nav) {
          background: #0a0a0a !important;
          color: #fff !important;
          border-bottom: 1px solid #1a1a1a;
        }

        .athletics-main { max-width: 850px; margin: 0 auto; padding: 4rem 2rem; }
        
        .page-header h1 { font-size: 0.8rem; color: #555; letter-spacing: 3px; margin-bottom: 1rem; }
        
        /* Toned down Green: Using an Emerald/Forest shade */
        .accent { color: #4ade80; } 
        .countdown-ribbon { 
          border-left: 3px solid #4ade80; 
          padding-left: 1rem; 
          font-size: 1.1rem; 
          font-weight: bold;
          margin-bottom: 3rem;
        }

        .data-section { margin-bottom: 4rem; }
        h2 { font-size: 0.75rem; color: #444; margin-bottom: 1.5rem; letter-spacing: 1px; }

        .pr-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
        th { text-align: left; color: #333; font-size: 0.7rem; padding-bottom: 10px; border-bottom: 1px solidrgb(171, 160, 160); }
        td { padding: 12px 0; border-bottom: 1px solid #111; }
        
        .dim { color: #666; font-size: 0.8rem; }

        .footer-grid { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 4rem; 
          margin-top: 4rem; 
          padding-top: 2rem; 
          border-top: 1px solid #1a1a1a; 
        }
        
        h3 { font-size: 0.7rem; color: #444; margin-bottom: 1rem; }
        .skill-item { margin-bottom: 10px; font-size: 0.8rem; }
        .bar-bg { height: 2px; background: #1a1a1a; width: 100%; margin-top: 4px; }
        .bar-fill { height: 100%; background: #4ade80; opacity: 0.7; }

        /* Toned down Green: Using a brighter, clearer Emerald */
.accent { color: #52ff94; text-shadow: 0 0 10px rgba(82, 255, 148, 0.2); } 

.countdown-ribbon { 
  border-left: 4px solid #52ff94; 
  padding: 1rem; 
  font-size: 1.2rem; 
  font-weight: 800;
  margin-bottom: 3rem;
  background: rgba(82, 255, 148, 0.05); /* Subtle glow background */
  color: #fff; /* Crisp white text for the actual countdown */
}

/* Base text color for the whole page */
.athletics-wrapper {
  background: #0d0d0d;
  min-height: 100vh;
  color: #f0f0f0; /* Brighter white for general text */
  font-family: 'JetBrains Mono', monospace;
}

/* Fixing the "Too Dark" gray */
.dim { color: #9ca3af; font-size: 0.8rem; } /* Medium slate gray instead of dark gray */
h2 { font-size: 0.8rem; color: #6b7280; margin-bottom: 1.5rem; letter-spacing: 2px; }
h3 { font-size: 0.75rem; color: #9ca3af; margin-bottom: 1rem; }
th { text-align: left; color: #4b5563; font-size: 0.7rem; padding-bottom: 10px; border-bottom: 1px solid #1f2937; }

/* Section Headers: [01] SWIMMING_PR */
h2 { 
  font-size: 0.85rem; 
  color: #9ca3af; /* Light Slate Gray - much more visible */
  margin-bottom: 1.5rem; 
  letter-spacing: 2px;
  border-left: 2px solid #52ff94;
  padding-left: 10px;
}

/* Table Headers: EVENT, SCM, LCM */
th { 
  text-align: left; 
  color: #f3f4f6; /* Near White */
  font-size: 0.75rem; 
  text-transform: uppercase;
  padding-bottom: 12px; 
  border-bottom: 1px solid #374151; 
}

/* Table Rows: Event names (e.g., 50 Free) */
td { 
  padding: 14px 0; 
  border-bottom: 1px solid #1f2937; 
  color: #ffffff; /* Pure white for the labels */
}

/* The PB Times */
.accent { 
  color: #008031; 
  font-weight: 600;
}

/* The Dates */
.dim { 
  color: #6b7280; /* Visible gray */
  font-size: 0.8rem; 
}
      `}</style>
    </motion.div>
  );
}