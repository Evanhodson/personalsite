# Evan Personal Site

## Setup

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Structure

```
EVAN_PERSONAL/
├── app/
│   ├── layout.js          root shell — imports global CSS
│   ├── page.js            homepage
│   ├── books/page.js      books page
│   ├── people/page.js     people page
│   └── stories/page.js    stories page
├── components/
│   ├── Nav.js             navigation (auto active-link)
│   ├── Slideshow.js       hero slideshow
│   └── Contact.js         contact form (used on every page)
├── public/images/         drop photos here
├── styles/globals.css     ALL styles — tokens, layout, components
├── next.config.js
└── package.json
```

## Common edits

| What to change          | File                         | What to look for            |
|-------------------------|------------------------------|-----------------------------|
| Name / tagline          | `app/page.js`                | hero-intro                  |
| Currently block         | `app/page.js`                | cur-line spans              |
| Slideshow images/captions | `components/Slideshow.js`  | slides array at the top     |
| Who I am text           | `app/page.js`                | who-body paragraph          |
| Blog / Vlog / Other     | `app/page.js`                | blogs / vlogs / other arrays|
| Books list              | `app/books/page.js`          | books array                 |
| People list             | `app/people/page.js`         | people array                |
| Stories list            | `app/stories/page.js`        | stories array               |
| Colours                 | `styles/globals.css`         | :root tokens at the top     |
| Fonts                   | `styles/globals.css`         | @import + --font-serif/sans |
