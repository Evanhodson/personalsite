// # BOOKS PAGE
// Add your books to the array below. Duplicate items as needed.

import Nav from '../../components/Nav'
import Contact from '../../components/Contact'

export const metadata = { title: 'Books — Evan' }

const books = [
  {
    title: 'Book title placeholder',
    meta: 'Author · Year',
    note: 'A short note on why this one stuck with you — keep it honest and personal.',
  },
  {
    title: 'Book title placeholder',
    meta: 'Author · Year',
    note: 'A short note on why this one stuck with you — keep it honest and personal.',
  },
  {
    title: 'Book title placeholder',
    meta: 'Author · Year',
    note: 'A short note on why this one stuck with you — keep it honest and personal.',
  },
]

export default function Books() {
  return (
    <>
      <Nav />

      <header className="page-header">
        <h1 className="page-title">Books</h1>
        <p className="page-sub">Things I&apos;ve read. Things I keep coming back to.</p>
      </header>

      <section className="page-content">
        {books.map((b, i) => (
          <div key={i}>
            <h2 className="item-title">{b.title}</h2>
            <p className="item-meta">{b.meta}</p>
            <p className="item-note">{b.note}</p>
          </div>
        ))}
      </section>

      <Contact />
    </>
  )
}
