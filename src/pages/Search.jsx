import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

const Search = () => {
  const { query } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  useEffect(() => {
    async function fetchSearch() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=16&q=${encodeURIComponent(query)}&key=${API_KEY}`
        );
        const data = await res.json();
        setVideos(data.items || []);
      } catch (err) {
        setVideos([]);
      }
      setLoading(false);
    }
    if (query) fetchSearch();
  }, [query]);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {loading ? (
        <div className="col-span-full flex justify-center items-center h-40">
          <Loader />
        </div>
      ) : (
        videos.map((video) => (
          <div key={video.id.videoId} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200">
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

export default Search;
