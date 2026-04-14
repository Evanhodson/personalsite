/** @type {import('next').NextConfig} */
const nextConfig = {}
const withMDX = require('@next/mdx')();

module.exports = nextConfig


module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
});