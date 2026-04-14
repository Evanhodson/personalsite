// lib/data.js


import RedRising from '../content/books/red-rising.mdx';
import GoldenSon from '../content/books/golden-son.mdx';

export const books = [
  {
    slug: 'red-rising',
    title: 'Red Rising',
    author: 'Pierce Brown',
    genre: 'Fiction',
    rating: 8.4,
    gist: 'The start of something awesome.',
    Content: RedRising,
  },
  {
    slug: 'golden-son',
    title: 'Golden Son',
    author: 'Pierce Brown',
    genre: 'Fiction',
    rating: 7.1,
    gist: 'The middle of something awesome.',
    Content: GoldenSon,
  },
];


export const athletics = {
  // Swimming: Structured by distance and pool type
  swimming: [
    { event: '50 Free', scm: '24.53', lcm: '24.74', date: '2023-03' },
    { event: '100 Free', scm: '52.54', lcm: '55.8', date: '2023-03' },
    { event: '200 Free', scm: '1:53.89', lcm: '2:01.2', date: '2023-04' },
    { event: '400 Free', scm: '4:08.80', lcm: '4:22.1', date: '2023-04' },
    { event: '200 Fly', scm: '58.1', lcm: '2:14.55', date: '2023-05' },
  ],
  
  // Running: Standard distances
  running: [
    { dist: '400m', time: '1:05', date: '2025-03' },
    { dist: '1km', time: '3:18', date: '2026-04' },
    { dist: '5km', time: '18:47', date: '2023-10' },
    { dist: '10km', time: '39:09', date: '2025-10' },
    { dist: '21.1km', time: '2:01:59', date: '2024-08' },
    { dist: '42.2km', time: '4:36:06', date: '2024-08' },
    { dist: '100km', time: '19:39:55', date: '2024-06' },
  ],

  // Weights: Added 'note' for reps/sets or weight details
  lifting: [
    { exercise: 'Bench Press', pr: '245 lbs', note: '1 rep max', date: '2026-02' },
    { exercise: 'Squat', pr: '255 lbs', note: 'x3 reps', date: '2026-01' },
    { exercise: 'Pull Up (Weighted)', pr: '+70 lbs', note: 'x3 reps', date: '2026-03' },
    { exercise: 'Pull Up (Bodyweight)', pr: '24', note: 'Max reps', date: '2025-09' },
  ],
  
  // Existing fields
  
  events: [
    { name: 'Ironman Sweden', date: '2026-08-15', type: 'Race' },
  ],
 
};
