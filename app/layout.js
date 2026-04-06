// # ROOT LAYOUT — wraps every page, imports global CSS

import '../styles/globals.css'

export const metadata = {
  title: 'Evan',
  description: "Hi I'm Evan. I do things.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
