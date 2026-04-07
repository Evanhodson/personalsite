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
    <div className="slideshow-wrap" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <p className="slide-eyebrow">Some things I&apos;ve done...</p>
      <div className="slide-box">
        <button className="slide-arr" onClick={prev} aria-label="Previous">‹</button>
        <div className="slide-img-wrap" style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image 
            src={slides[current].src} 
            alt={slides[current].alt} 
            fill
            style={{ objectFit: 'cover' }}
            className="slide-img"
            priority={true} 
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
        <button className="slide-arr" onClick={next} aria-label="Next">›</button>
      </div>

      <div className="slide-dots">
        {slides.map((_, i) => (
          <button key={i} className={`slide-dot${i === current ? ' active' : ''}`} onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>

      <p className="slide-caption" style={{ transition: 'opacity 0.5s ease-in-out' }}>{slides[current].caption}</p>
    </div>
  )
}
