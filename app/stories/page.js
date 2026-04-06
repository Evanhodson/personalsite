'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Nav from '../../components/Nav'
import { videos } from '../../lib/data'

export function StoriesContent() {
  const [active, setActive] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [substackPosts, setSubstackPosts] = useState([]) 
  const [selectedBlog, setSelectedBlog] = useState(null) 
  const [loading, setLoading] = useState(false)

  const searchParams = useSearchParams()

  // Fetch Substack posts via Internal API
  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/blogs')
        const posts = await response.json()
        if (Array.isArray(posts)) {
          setSubstackPosts(posts)
        }
      } catch (err) {
        console.error("Error loading blogs:", err)
      } finally {
        setLoading(false)
      }
    }
    loadBlogs()
  }, [])

  useEffect(() => {
    const type = searchParams.get('type')
    const id = searchParams.get('id')
    const slug = searchParams.get('slug')

    if (type === 'videos' && id) {
      setActive('videos')
      const found = videos.find(v => v.id === id)
      if (found) setSelectedVideo(found)
    } else if (type === 'written' && slug) {
      setActive('written')
      const foundBlog = substackPosts.find(p => p.slug === slug)
      if (foundBlog) setSelectedBlog(foundBlog)
    }
  }, [searchParams, substackPosts])

  const handleBack = () => {
    if (selectedVideo) setSelectedVideo(null)
    else if (selectedBlog) setSelectedBlog(null)
    else setActive(null)
  }

  const displayList = active === 'videos' 
    ? (selectedVideo ? videos.filter(v => v.id !== selectedVideo.id) : videos)
    : (selectedBlog ? substackPosts.filter(p => p.slug !== selectedBlog.slug) : substackPosts)

  return (
    <div className="stories-container">
      <Nav />
      
      <main className={`stories-layout ${active ? 'is-active' : ''} ${selectedVideo || selectedBlog ? 'has-content' : ''}`}>
        
        <button 
          className={`back-btn ${active ? 'visible' : ''}`} 
          onClick={handleBack}
        >
          ←
        </button>

        {/* Header Toggle - Hidden when a specific blog/video is open */}
        <div className="header-container">
          <div className="button-group">
            <button 
              onClick={() => { setActive('videos'); setSelectedBlog(null); }}
              className={`story-btn ${active === 'videos' ? 'selected' : ''} ${active === 'written' ? 'hidden' : ''}`}
            >
              Videos
            </button>
            <button 
              onClick={() => { setActive('written'); setSelectedVideo(null); }}
              className={`story-btn ${active === 'written' ? 'selected' : ''} ${active === 'videos' ? 'hidden' : ''}`}
            >
              Written
            </button>
          </div>
        </div>

        <div className="view-content">
          {/* VIDEO VIEW */}
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

          {/* BLOG VIEW - The title is now INSIDE the blog section */}
          {selectedBlog && (
            <div className="blog-section">
              <div className="blog-header">
                <h1 className="blog-main-title">{selectedBlog.title}</h1>
                <p className="blog-date">{selectedBlog.date}</p>
              </div>
              <div 
                className="substack-embed-content"
                dangerouslySetInnerHTML={{ __html: selectedBlog.content }} 
              />
            </div>
          )}

          {/* List of Titles - Only shows if NO content is selected */}
          {active && !selectedVideo && !selectedBlog && (
            <div className="content-list">
              {loading && substackPosts.length === 0 ? (
                <p>Loading stories...</p>
              ) : (
                displayList.map((item, i) => (
                  <div 
                    key={i} 
                    className="list-item" 
                    onClick={() => {
                      if (active === 'videos') setSelectedVideo(item);
                      else setSelectedBlog(item);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="item-title-link">{item.title}</span>
                    <span className="item-date">{item.date}</span>
                  </div>
                ))
              )}
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