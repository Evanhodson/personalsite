export async function getYouTubeVideos() {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;
    const longFormPlaylistId = channelId ? channelId.replace(/^UC/, 'UULF') : '';
    
    let allVideos = [];
    let nextPageToken = '';
  
    try {
      // Loop until YouTube says there are no more pages
      do {
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${longFormPlaylistId}&part=snippet&maxResults=50${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
  
        const res = await fetch(url);
      if (!res.ok) {
        const errorData = await res.json();
        console.error("YouTube API Detailed Error:", JSON.stringify(errorData, null, 2));
        throw new Error('YouTube API failed');
      }
  
        const data = await res.json();
  
        // Add this batch of 50 to our master list
        const items = data.items || [];
        allVideos = [...allVideos, ...items];
  
        // Grab the token for the next 50 (if it exists)
        nextPageToken = data.nextPageToken;
  
      } while (nextPageToken);
  
      // Filter and format the final list
      const formattedVideos = allVideos
      .filter(item => item.snippet.resourceId && item.snippet.resourceId.videoId)
      .map(item => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        date: new Date(item.snippet.publishedAt).toLocaleDateString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric'
        }),
      }));
  
      return { videos: formattedVideos };
  
    } catch (error) {
      console.error("YouTube Fetch Error:", error);
      return { videos: [] };
    }
  }