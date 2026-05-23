'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Nav from '../../components/Nav'
import { photos } from '../../lib/photos'

const WIP = true

export default function PhotosPage() {
  const [lightbox, setLightbox] = useState(null)

  const prev = () => setLightbox(i => (i - 1 + photos.length) % photos.length)
  const next = () => setLightbox(i => (i + 1) % photos.length)

  // Lock body scroll while lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  // Keyboard nav
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape')      setLightbox(null)
      if (e.key === 'ArrowLeft')   setLightbox(i => i !== null ? (i - 1 + photos.length) % photos.length : null)
      if (e.key === 'ArrowRight')  setLightbox(i => i !== null ? (i + 1) % photos.length : null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {/* Lightbox is outside page-enter to avoid transform breaking position:fixed */}
      <div className="page-enter">
        <Nav />
        <main className="photos-main">
          <div className="photos-header">
            <h1 className="photos-heading">Photos</h1>
          </div>

          {WIP ? (
            <p className="photos-wip">work in progress</p>
          ) : photos.length === 0 ? (
            <p className="photos-empty">No photos yet.</p>
          ) : (
            <div className="photos-grid">
              {photos.map((photo, i) => (
                <div
                  key={i}
                  className="photo-item"
                  onClick={() => setLightbox(i)}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={800}
                    height={600}
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    priority={i < 4}
                    className="photo-img photo-img--loading"
                    onLoad={e => e.currentTarget.classList.remove('photo-img--loading')}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  {photo.caption && (
                    <p className="photo-caption">{photo.caption}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Lightbox */}
      {lightbox !== null && !WIP && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>×</button>
          <button className="lightbox-prev" onClick={e => { e.stopPropagation(); prev() }}>‹</button>
          <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()}>
            <Image
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <button className="lightbox-next" onClick={e => { e.stopPropagation(); next() }}>›</button>
          {photos[lightbox].caption && (
            <p className="lightbox-caption">{photos[lightbox].caption}</p>
          )}
        </div>
      )}
    </>
  )
}
