'use client';
import Nav from '../../components/Nav.js';
import BooksTable from '../../components/BooksTable.js';
import { books } from '../../lib/data.js';

// You were missing this function wrapper:
export default function BooksPage() {
  return (
    <div>
      <Nav />
      <main className="books-main">
        <div className="books-header">
          <h1 className="books-heading">books i've read</h1>
          <p className="books-sub"> I read books sometimes. Here are my thoughts about some I've read.</p>
        </div>
        <BooksTable books={books} />
      </main>
    </div>
  );
}