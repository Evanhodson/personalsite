'use client'

// # CONTACT — reused at the bottom of every page

export default function Contact() {
  return (
    <section className="contact">
      <h2 className="contact-heading">Send me a message : </h2>
      <p className="contact-sub"> Questions, thoughts, anything</p>

      <form className="contact-form" onSubmit={e => e.preventDefault()}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Name</label>
          <input className="form-input" id="name" type="text" placeholder="Your name" />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input className="form-input" id="email" type="email" placeholder="you@example.com" />
        </div>

        <textarea
          className="form-input"
          id="msg"
          placeholder="What's on your mind?"
        />

        <button className="form-submit" type="submit">Send →</button>
      </form>
    </section>
  )
}
