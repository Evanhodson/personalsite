'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'


const slides = [
  { src: '/images/swim1.JPEG', alt: 'this is picture', caption: 'swam competitively for 14 years, learned how to wake up at any time' },
  { src: '/images/tedxtalk.jpg', alt: 'this is picture', caption: 'spoke at a tedx event about manhunt' },
  { src: '/images/hike.JPG', alt: 'this is picture', caption: 'went on many, many hikes' },
  { src: '/images/bike3.jpg', alt: 'this is picture', caption: 'biked 333km in one day with my dad and brother James' },
  { src: '/images/walk100.jpg', alt: 'this is picture', caption: 'walked 100km in 24 hours with my friend Michael' },
  { src: '/images/ubcsimp.JPG', alt: 'this is picture', caption: 'started a review channel to help students before exams' },
  { src: '/images/deca.jpg', alt: 'this is picture', caption: 'came 3rd in an worldwide business competition with Shawn' },
  { src: '/images/orange.jpg', alt: 'this is picture', caption: 'ran a orange eating contest at ubc\n(twice)' },
  { src: '/images/ubchunt.jpg', alt: 'this is picture', caption: 'ran a 350+ person manhunt game with Evan' },
  { src: '/images/storm2.JPG', alt: 'this is picture', caption: 'won ultra iron storm the wall and raced with my friends' },
  { src: '/images/texxmc.JPEG', alt: 'this is picture', caption: 'emceed a tedx event at ubc' },
]

export default function Slideshow() {
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const timeoutRef = useRef(null)

  const prev = () => setCurrent(i => (i - 1 + slides.length) % slides.length)
  const next = () => setCurrent(i => (i + 1) % slides.length)

  useEffect(() => {
    if (isHovered) return

    timeoutRef.current = setTimeout(() => {
      setCurrent(i => (i + 1) % slides.length)
    }, 4000)

    return () => clearTimeout(timeoutRef.current)
  }, [current, isHovered])

  return (
    <div className="slideshow-wrap">
      <p className="slide-eyebrow">Some things I&apos;ve done...</p>
 
      <div className="slide-box">
        <button className="slide-arr" onClick={prev} aria-label="Previous">‹</button>
 
        {/* # IMAGE STACK
            All images sit in the same position.
            Only the active one has opacity 1 — the rest are opacity 0.
            CSS transition handles the crossfade. No remounting, no flicker. */}
        <div className="slide-img-wrap">
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              className="slide-img-layer"
              style={{ opacity: i === current ? 1 : 0 }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                style={{ objectFit: 'cover' }}
                priority={i === 0}
                loading="eager"
              />
            </div>
          ))}
        </div>
 
        <button className="slide-arr" onClick={next} aria-label="Next">›</button>
      </div>
 
      <div className="slide-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`slide-dot${i === current ? ' active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
 
      {/* # CAPTION — only the active caption renders, min-height holds the space */}
      <div className="slide-caption-wrap">
        <p className="slide-caption active">
          {slides[current].caption}
        </p>
      </div>
    </div>
  )
}
 