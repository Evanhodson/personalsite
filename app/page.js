// app/page.js
import Nav from '../components/Nav' // Fixed: Correct import
import Slideshow from '../components/Slideshow'
import Contact from '../components/Contact'
import { getYouTubeVideos } from '../lib/getVideos'
import { getSubstackPosts } from '../lib/getBlogs' // Add this line

export default async function Page() {
  const videoData = await getYouTubeVideos();
   // 2. Target the videos array inside the object to use slice
   const topVideos = (videoData.videos || []).slice(0, 3);
  const allPosts = await getSubstackPosts();
  const recentPosts = allPosts.slice(0, 3); // This picks the top 3 most recent posts from Substack
  return (
    <>
      <Nav />
      <section className="hero">
        <div className="hero-left">
          <h1 className="hero-intro">
            Hi I&apos;m <em>Evan.</em>
            <br />I do things.
          </h1>
          <div className="currently">
            <p className="currently-title">Currently...</p>
            <div className="cur-grid">
              <span className="cur-label">Where I am</span>
              <span className="cur-value">Vancouver</span>
              <span className="cur-label">What I am reading</span>
              <span className="cur-value">...nothing rn</span>
              <span className="cur-label">What I am doing</span>
              <span className="cur-value">Enjoying summer and free time</span>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <Slideshow />
        </div>
      </section>

      <section className="who">
        <h2 className="who-label">Who I am</h2>
        <p className="who-body">
        I&apos;m an explorer. A challenger. Someone who does things to test the limits of what&apos;s possible.

I like bringing people together. Through various events I find the connections and stories I can bring out of people to be inspiring.

I like to solve problems. Put my mind to test and figure out solutions in environments I&apos;m not used to.

I live for moments and memories. For making connections with the people around me, and to one day share those stories.
        </p>
        <p className="who-made"><a href='/people'>Who made me who I am?</a></p>
      </section>

      <section className="creative">
  <h2 className="creative-label">Creative</h2>
  <div className="creative-cols">
    
    {/* Vlogs Column - Stays the same */}
    <div className="col">
      <h3 className="col-head cool">Vlogs</h3>
      {topVideos.map((v) => (
        <a key={v.id} href={`/stories?type=videos&id=${v.id}&auto=videos`} className="col-item">
          {v.title}
        </a>
      ))}
    </div>

    {/* Blogs Column - UPDATED for Substack */}
    <div className="col">
      <h3 className="col-head warm">Blogs</h3>
      {recentPosts.map((post) => (
         <a 
           key={post.slug} 
           href={`/stories?type=written&slug=${post.slug}&auto=written`} // Point to your local page
           className="col-item"
           >
           {post.title}
          </a>
        ))}
    </div>

    {/* Other Column - Stays the same */}
    <div className="col">
      <h3 className="col-head green">Other</h3>
      <a href="https://www.instagram.com/hodson.events/" className="col-item" target="_blank" rel="noopener noreferrer">Hodson Events</a>
      <a href="https://www.youtube.com/@UBCsimplified" className="col-item" target="_blank" rel="noopener noreferrer">UBC Simplified</a>
      <a href="/athletics" className="col-item">Athletics</a>

    </div>
    
  </div>
</section>
      <Contact />
    </>
  );
}