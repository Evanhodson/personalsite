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
  swimming: [
    { event: '50 Free',  scm: '24.53',   scmDate: '12-01-2023', lcm: '24.74',   lcmDate: '03-02-2024' },
    { event: '100 Free', scm: '52.54',   scmDate: '12-02-2023', lcm: '53.85',   lcmDate: '03-02-2024' },
    { event: '200 Free', scm: '1:56.98', scmDate: '12-03-2023', lcm: '2:00.11', lcmDate: '02-29-2024' },
    { event: '400 Free', scm: '4:08.80', scmDate: '11-30-2023', lcm: '4:21.67', lcmDate: '07-07-2024' },
    { event: '200 Fly',  scm: '2:14.88', scmDate: '12-01-2023', lcm: '2:14.55', lcmDate: '01-22-2023' },
  ],

  running: [
    { dist: '400m',   time: '1:05',     date: '03-2025' },
    { dist: '1km',    time: '3:18',     date: '04-2026' },
    { dist: '5km',    time: '18:47',    date: '10-2023' },
    { dist: '10km',   time: '39:09',    date: '10-2025' },
    { dist: '21.1km', time: '1:59:37',  date: '05-2026' },
    { dist: '42.2km', time: '4:36:06',  date: '08-2024' },
    { dist: '100km',  time: '19:39:55', date: '06-2024' },
  ],

  lifting: [
    { exercise: 'Bench Press',          pr: '245 lbs', note: '1 rep max', date: '02-2026' },
    { exercise: 'Squat',                pr: '255 lbs', note: 'x3 reps',   date: '01-2026' },
    { exercise: 'Pull Up (Weighted)',   pr: '+70 lbs', note: 'x3 reps',   date: '03-2026' },
    { exercise: 'Pull Up (Bodyweight)', pr: '24',      note: 'Max reps',  date: '09-2025' },
  ],
  
  // Existing fields
  
  events: [
    { name: 'Ironman Sweden', date: '2026-08-15', type: 'Race' },
  ],
 
};
