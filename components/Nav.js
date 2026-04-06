'use client'

// # NAV — active link highlights automatically via usePathname

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/',         label: 'Home'    },
  { href: '/books',    label: 'Books'   },
  { href: '/people',   label: 'People'  },
  { href: '/stories',  label: 'Stories' },
]

export default function Nav() {
  const pathname = usePathname()
  return (
    <nav className="nav">
      <Link href="/" className="nav-logo">Evan Hodson</Link>
      <div className="nav-links">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`nav-link${pathname === href ? ' active' : ''}`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
