'use client'

'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Nav from '../../components/Nav'
import { videos, written } from '../../lib/data'

export function StoriesContent() {
  const [active, setActive] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)

  const searchParams = useSearchParams()

useEffect(() => {
  const type = searchParams.get('type')
  const id = searchParams.get('id')

  if (type === 'videos' && id) {
    setActive('videos')
    const found = videos.find(v => v.id === id)
    if (found) setSelectedVideo(found)
  }
}, [searchParams])

  // handleBack logic
  const handleBack = () => {
    if (selectedVideo) setSelectedVideo(null)
    else setActive(null)
  }

  // Filter list to hide the currently active video from the list below
  const displayList = active === 'videos' 
    ? (selectedVideo ? videos.filter(v => v.id !== selectedVideo.id) : videos)
    : written

  return (
    <div className="stories-container">
      <Nav />
      
      <main className={`stories-layout ${active ? 'is-active' : ''} ${selectedVideo ? 'has-video' : ''}`}>
        
        <button 
          className={`back-btn ${active ? 'visible' : ''}`} 
          onClick={handleBack}
        >
          ←
        </button>

        <div className="header-container">
          <div className="button-group">
            <button 
              onClick={() => setActive('videos')}
              className={`story-btn ${active === 'videos' ? 'selected' : ''} ${active === 'written' ? 'hidden' : ''}`}
            >
              Videos
            </button>
            <button 
              onClick={() => setActive('written')}
              className={`story-btn ${active === 'written' ? 'selected' : ''} ${active === 'videos' ? 'hidden' : ''}`}
            >
              Written
            </button>
          </div>
        </div>

        <div className="view-content">
          {/* Active Video Title & Player Section */}
          {selectedVideo && (
            <div className="video-section">
              <div className="video-header-above">
                <h3>{selectedVideo.title}</h3>
                <p>{selectedVideo.date}</p>
              </div>
              <div className="iframe-wrapper">
                <iframe
                   src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&mute=1&rel=0`}
                   allow="autoplay; encrypted-media"
                   allowFullScreen
                   frameBorder="0"
                 ></iframe>
              </div>
            </div>
          )}

          {/* List of Titles (appears below video or as the main list) */}
          {active && (
            <div className={`content-list ${selectedVideo ? 'sub-list' : ''}`}>
              {displayList.map((item, i) => (
                <div 
                  key={i} 
                  className="list-item" 
                  onClick={() => item.id && setSelectedVideo(item)}
                  style={{ cursor: item.id ? 'pointer' : 'default' }}
                >
                  <span className="item-title-link">{item.title}</span>
                  <span className="item-date">{item.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
export default function StoriesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StoriesContent />
    </Suspense>
  )
}