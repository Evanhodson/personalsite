'use client';
import { useState } from 'react';

export default function BooksTable({ books }) {
  const [expanded, setExpanded] = useState(null);
  const toggle = (slug) => setExpanded(prev => prev === slug ? null : slug);

  return (
    <table className="books-table">
      <thead>
        <tr className="books-thead-row">
          <th className="books-th books-th--num">#</th>
          <th className="books-th">title</th>
          <th className="books-th books-th--hide">author</th>
          <th className="books-th books-th--hide">genre</th>
          <th className="books-th books-th--rating">rating</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, i) => (
          <>
            <tr
              key={book.slug}
              className={`books-row${expanded === book.slug ? ' books-row--open' : ''}`}
              onClick={() => toggle(book.slug)}
            >
              <td className="books-td books-td--num">{i + 1}</td>
              <td className="books-td books-td--title">
                <span className="books-title-text">{book.title}</span>
                <span className="books-gist">{book.gist}</span>
              </td>
              <td className="books-td books-th--hide">{book.author}</td>
              <td className="books-td books-th--hide books-td--genre">{book.genre}</td>
              <td className="books-td books-td--rating">
                {book.rating}<span className="books-rating-denom">/10</span>
              </td>
            </tr>
            {expanded === book.slug && book.Content && (
              <tr key={`${book.slug}-exp`} className="books-expanded-row">
                <td colSpan={5} className="books-expanded-td">
                  <div className="books-expanded-inner books-mdx">
                    <div className="books-expanded-meta">
                      <span>{book.author}</span>
                      <span className="books-dot">·</span>
                      <span>{book.genre}</span>
                      <span className="books-dot">·</span>
                      <span>{book.rating}/10</span>
                    </div>
                    <book.Content />
                  </div>
                </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  );
}