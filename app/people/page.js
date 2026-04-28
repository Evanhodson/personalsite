'use client';

import { useState, useRef, useEffect } from 'react';
import Nav from '../../components/Nav';
import Contact from '../../components/Contact';

/* ============================================================
   PEOPLE DATA — add / edit entries here.
   Each person needs:
     name   : string
     role   : short descriptor shown under name
     photo  : path inside /public (e.g. "/images/mum.jpg")
              or any URL — swap the placeholders below.
     bio    : paragraph shown when expanded (any length is fine)
   ============================================================ */
const people = [
  {
    name: 'Jordan Lee',
    role: 'Best friend',
    photo: 'https://picsum.photos/seed/jordan/400/533',
    bio: "Jordan is the person who showed me that adventure doesn't need a plan. We met during frosh week when he convinced me to jump into Wreck Beach at midnight. Since then he's been the voice in my head that says 'yes' before I finish asking the question. Every good story I have from the last three years has Jordan somewhere in the background making it happen.",
  },
  {
    name: 'Maya Patel',
    role: 'Mentor & friend',
    photo: 'https://picsum.photos/seed/maya/400/533',
    bio: "Maya sat next to me in COMM 292 and quietly rewrote everything I thought I knew about leadership. She leads by noticing — she notices what people need, what rooms feel like, what's unsaid. She pushed me to start running events and was in the front row at every single one of them. I've learned more from watching how she moves through a room than from any class I've taken. She has this rare quality where she makes people feel genuinely seen, and I think about that a lot when I'm running my own events.",
  },
  {
    name: 'Daniel Park',
    role: 'Childhood friend',
    photo: 'https://picsum.photos/seed/daniel/400/533',
    bio: "Daniel and I have been friends since we were eight years old building Lego sets on his basement floor. He is the most consistently kind person I have ever met — never loud about it, just quietly reliable. No matter how much changes between us, every conversation picks up exactly where the last one left off.",
  },
  {
    name: 'Sarah Chen',
    role: 'Teammate & confidante',
    photo: 'https://picsum.photos/seed/sarah/400/533',
    bio: "Sarah taught me the difference between being competitive and being excellent. We trained together for two seasons and she pushed me harder than any coach ever has — not through pressure, but through example. Watching her approach every practice like it mattered changed the way I show up to everything.",
  },
  {
    name: 'Thomas Hodson',
    role: 'Dad',
    photo: 'https://picsum.photos/seed/thomas/400/533',
    bio: "My dad gave me curiosity before he gave me anything else. He is the reason I believe in doing things properly, in showing up on time, and in being someone people can count on. He also taught me that it's okay to laugh at yourself. Every time I'm in a difficult room, I think about how he carries himself — with quiet confidence and real warmth.",
  },
  {
    name: 'Claire Hodson',
    role: 'Mum',
    photo: 'https://picsum.photos/seed/claire/400/533',
    bio: "My mum is where my empathy comes from. She has an extraordinary ability to make every person she talks to feel like the most important person in the room. She modelled what it looks like to care genuinely and consistently, and I spend a lot of my time trying to live up to that. Growing up watching her I absorbed something I couldn't name until much later — that showing up for people, really showing up, is the most meaningful thing you can do.",
  },
];

/* ============================================================
   PERSON CARD
   ============================================================ */

// 3 lines × 1.8 line-height × 13px font-size
const PREVIEW_HEIGHT = Math.round(13 * 1.8 * 3);

function PersonCard({ person, index }) {
  const [open, setOpen] = useState(false);
  const bioRef = useRef(null);
  const [fullHeight, setFullHeight] = useState(PREVIEW_HEIGHT);

  // Measure the real rendered height once fonts have settled
  useEffect(() => {
    if (bioRef.current) {
      setFullHeight(bioRef.current.scrollHeight);
    }
  }, []);

  return (
    <article
      className="person-card"
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      <div className="person-photo-wrap">
        <img
          src={person.photo}
          alt={person.name}
          className="person-photo"
          loading="lazy"
        />
      </div>

      <div className="person-info">
        <p className="person-name">{person.name}</p>
        <p className="person-role">{person.role}</p>

        {/* Single element — height transitions between preview px and real px.
            No mounting/unmounting means no flash. */}
        <div
          className="person-bio-wrap"
          style={{ height: open ? fullHeight : PREVIEW_HEIGHT }}
        >
          <p ref={bioRef} className="person-bio">{person.bio}</p>
        </div>

        <button
          className={`person-toggle ${open ? 'person-toggle-open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? 'Show less' : 'Read more'}
        >
          {open ? '−' : '...'}
        </button>
      </div>
    </article>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function PeoplePage() {
  return (
    <>
      <Nav />

      <main className="people-main page-enter">
        <header className="people-header">
          <h1 className="people-heading">The People</h1>
          <p className="people-quote">
            &ldquo;You are the average of the five people<br />you spend the most time with.&rdquo;
          </p>
          <p className="people-sub">These are the ones who built me.</p>
        </header>

        <section className="people-grid">
          {people.map((person, i) => (
            <PersonCard key={person.name} person={person} index={i} />
          ))}
        </section>
      </main>

      <Contact />
    </>
  );
}