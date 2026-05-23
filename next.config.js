/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')();
const { execSync } = require('child_process');

let currentlyUpdatedAt = new Date().toISOString();
try {
  const out = execSync('git log -1 --format=%cI -- lib/currently.js').toString().trim();
  if (out) currentlyUpdatedAt = out;
} catch {}

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
  env: {
    CURRENTLY_UPDATED_AT: currentlyUpdatedAt,
  },
  images: {
    remotePatterns: [{ hostname: 'picsum.photos' }],
  },
});