import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';

const Watch = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  useEffect(() => {
    async function fetchTrending() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&maxResults=16&key=${API_KEY}`
        );
        const data = await res.json();
        setVideos(data.items || []);
      } catch (err) {
        setVideos([]);
      }
      setLoading(false);
    }
    fetchTrending();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-white">Trending Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center h-40">
            <Loader />
          </div>
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
    </div>
  );
};

export default Watch;