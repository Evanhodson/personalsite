import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// npm install gray-matter
const BOOKS_DIR = path.join(process.cwd(), 'content/books');

export function getAllBooks() {
  const files = fs.readdirSync(BOOKS_DIR).filter(f => f.endsWith('.mdx'));

  return files.map((filename) => {
    const raw = fs.readFileSync(path.join(BOOKS_DIR, filename), 'utf8');
    const { data } = matter(raw);
    return {
      slug: filename.replace('.mdx', ''),
      ...data,
    };
  });
}