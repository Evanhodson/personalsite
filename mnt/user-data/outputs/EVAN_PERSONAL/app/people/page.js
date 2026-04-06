// # PEOPLE PAGE
// Add people who've shaped you. Keep notes honest, not biographical.

import Nav from '../../components/Nav'
import Contact from '../../components/Contact'

export const metadata = { title: 'People — Evan' }

const people = [
  {
    name: 'Name placeholder',
    meta: 'What they do · How you know them',
    note: 'A sentence or two about what this person means to you or what they taught you.',
  },
  {
    name: 'Name placeholder',
    meta: 'What they do · How you know them',
    note: 'A sentence or two about what this person means to you or what they taught you.',
  },
  {
    name: 'Name placeholder',
    meta: 'What they do · How you know them',
    note: 'A sentence or two about what this person means to you or what they taught you.',
  },
]

export default function People() {
  return (
    <>
      <Nav />

      <header className="page-header">
        <h1 className="page-title">People</h1>
        <p className="page-sub">People who&apos;ve shaped how I see the world.</p>
      </header>

      <section className="page-content">
        {people.map((p, i) => (
          <div key={i}>
            <h2 className="item-title">{p.name}</h2>
            <p className="item-meta">{p.meta}</p>
            <p className="item-note">{p.note}</p>
          </div>
        ))}
      </section>

      <Contact />
    </>
  )
}
