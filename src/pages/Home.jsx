import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import Videocard from '../components/Videocard';
import ShimmerCard from '../components/ShimmerCard';
const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&maxResults=12&key=${API_KEY}`
        );
        const data = await res.json();
        setVideos(data.items || []);
      } catch (err) {
        setVideos([]);
      }
      setLoading(false);
    }
    fetchVideos();
  }, []);

  return (
    <div className="p-2 pl-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {loading ? (
        Array.from({ length: 8 }).map((_, idx) => <ShimmerCard key={idx} />)
      ) : (
        videos.map((video) => (
          <Videocard key={video.id} video={video} />
        ))
      )}
    </div>
  );
};

export default Home;