'use client'

import { useState } from 'react'

export default function Contact() {
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus]   = useState('idle') // 'idle' | 'sending' | 'sent' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="contact">
      <h2 className="contact-heading">Send me a message : </h2>
      <p className="contact-sub"> Questions, thoughts, anything</p>

      {status === 'sent' ? (
        <p className="contact-sub">Sent — I&apos;ll get back to you soon.</p>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Name</label>
            <input
              className="form-input"
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              className="form-input"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <textarea
            className="form-input"
            id="msg"
            placeholder="What's on your mind?"
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
          />

          {status === 'error' && (
            <p className="contact-sub" style={{ color: 'red' }}>Something went wrong. Try again.</p>
          )}

          <button
            className="form-submit"
            type="submit"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending…' : 'Send →'}
          </button>
        </form>
      )}
    </section>
  )
}
