'use client'

import { useState, useEffect } from 'react'

function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - new Date(timestamp)) / 1000)
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function UpdatedAt({ timestamp }) {
  const [label, setLabel] = useState(null)

  useEffect(() => {
    setLabel(timeAgo(timestamp))
    const id = setInterval(() => setLabel(timeAgo(timestamp)), 1000)
    return () => clearInterval(id)
  }, [timestamp])

  if (!label) return null
  return <p className="currently-updated">updated {label}</p>
}
