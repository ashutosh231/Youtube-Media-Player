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
          <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200">
            <img
              src={video.snippet.thumbnails?.medium?.url}
              alt={video.snippet.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-3">
              <h3 className="text-md font-semibold mb-1 truncate" title={video.snippet.title}>{video.snippet.title}</h3>
              <p className="text-xs text-gray-500 mb-2">{video.snippet.channelTitle}</p>
              <p className="text-xs text-gray-400 truncate">{video.snippet.description}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;