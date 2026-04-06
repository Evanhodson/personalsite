// # STORIES PAGE
// Add your stories below. href links to individual story pages when you build them.

import Nav from '../../components/Nav'
import Contact from '../../components/Contact'

export const metadata = { title: 'Stories — Evan' }

const stories = [
  {
    title: 'Story title placeholder',
    meta: 'Month Year',
    excerpt: 'A short excerpt or teaser — one or two sentences to pull the reader in.',
    href: '#',
  },
  {
    title: 'Story title placeholder',
    meta: 'Month Year',
    excerpt: 'A short excerpt or teaser — one or two sentences to pull the reader in.',
    href: '#',
  },
  {
    title: 'Story title placeholder',
    meta: 'Month Year',
    excerpt: 'A short excerpt or teaser — one or two sentences to pull the reader in.',
    href: '#',
  },
]

export default function Stories() {
  return (
    <>
      <Nav />

      <header className="page-header">
        <h1 className="page-title">Stories</h1>
        <p className="page-sub">Things that happened. Worth writing down.</p>
      </header>

      <section className="page-content">
        {stories.map((s, i) => (
          <div key={i}>
            <h2 className="item-title">{s.title}</h2>
            <p className="item-meta">{s.meta}</p>
            <p className="item-note">{s.excerpt}</p>
            <a href={s.href} className="read-link">Read →</a>
          </div>
        ))}
      </section>

      <Contact />
    </>
  )
}
