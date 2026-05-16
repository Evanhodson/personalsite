'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Nav from '../../components/Nav'
export function StoriesContent() {
  const searchParams = useSearchParams()

  // Read URL params once so initial state is correct on first render —
  // this prevents the Videos/Written buttons from ever flashing on screen
  // when arriving from a direct link (home page vlogs/blogs).
  const initialType = searchParams.get('type')
  const initialId   = searchParams.get('id')

  const [active, setActive] = useState(
    initialType === 'videos' ? 'videos' : initialType === 'written' ? 'written' : null
  )
  // Pre-populate video with the id from the URL so the iframe loads immediately
  const [selectedVideo, setSelectedVideo] = useState(
    initialType === 'videos' && initialId ? { id: initialId, title: '', date: '' } : null
  )
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [liveVideos, setLiveVideos] = useState([])
  const [substackPosts, setSubstackPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true)
      try {
        const [blogRes, videoRes] = await Promise.all([
          fetch('/api/blogs'),
          fetch('/api/videos')
        ])

        const blogs = blogRes.ok ? await blogRes.json() : []
        const vids  = videoRes.ok ? await videoRes.json() : []

        const blogsArr = Array.isArray(blogs) ? blogs : []
        const vidsArr  = Array.isArray(vids)  ? vids  : []

        setSubstackPosts(blogsArr)
        setLiveVideos(vidsArr)

        // Once data is loaded, hydrate the pre-selected items with full data
        const type = searchParams.get('type')
        const id   = searchParams.get('id')
        const slug = searchParams.get('slug')

        if (type === 'videos' && id) {
          const found = vidsArr.find(v => v.id === id)
          if (found) setSelectedVideo(found)
        } else if (type === 'written' && slug) {
          const found = blogsArr.find(p => p.slug === slug)
          if (found) setSelectedBlog(found)
        }
      } catch (err) {
        console.error("Error loading content:", err)
      } finally {
        setLoading(false)
      }
    }
    loadContent()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleBack = () => {
    if (selectedVideo) setSelectedVideo(null)
    else if (selectedBlog) setSelectedBlog(null)
    else setActive(null)
  }

  const displayList = active === 'videos' 
  // Change 'videos' to 'liveVideos' here
  ? (selectedVideo ? liveVideos.filter(v => v.id !== selectedVideo.id) : liveVideos)
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
                   style={{ border: 0 }}
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

          {/* List of Titles - Shows as a sub-list when content is selected */}
{active && (
  <div className={`content-list ${selectedVideo || selectedBlog ? 'sub-list' : ''}`}>
    {loading && substackPosts.length === 0 && liveVideos.length === 0 ? (
      <p>Loading stories...</p>
    ) : (
      displayList.map((item, i) => (
        <div 
          key={i} 
          className="list-item" 
          onClick={() => {
            if (active === 'videos') setSelectedVideo(item);
            else setSelectedBlog(item);
            // Optional: scroll to top when a new video is clicked
            window.scrollTo({ top: 0, behavior: 'smooth' });
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