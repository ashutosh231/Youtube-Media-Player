import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
          <Link
            key={video.id.videoId}
            to={`/watch/${video.id.videoId}`}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-red-400 focus:ring-2 focus:ring-red-400"
            style={{ textDecoration: 'none' }}
          >
            <div className="relative w-full aspect-video bg-gray-200">
              <img
                src={video.snippet.thumbnails?.high?.url || video.snippet.thumbnails?.medium?.url}
                alt={video.snippet.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">Watch</span>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-base font-semibold mb-1 truncate text-gray-900 group-hover:text-red-600 transition-colors duration-200" title={video.snippet.title}>{video.snippet.title}</h3>
              <p className="text-xs text-gray-500 mb-2 truncate">{video.snippet.channelTitle}</p>
              <p className="text-xs text-gray-400 line-clamp-2">{video.snippet.description}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Search;
