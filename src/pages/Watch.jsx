import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

const Watch = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  useEffect(() => {
    async function fetchVideo() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${API_KEY}`
        );
        const data = await res.json();
        setVideo(data.items && data.items[0] ? data.items[0] : null);
      } catch (err) {
        setVideo(null);
      }
      setLoading(false);
    }
    if (id) fetchVideo();
  }, [id]);

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-start py-8 px-0">
      {loading ? (
        <Loader />
      ) : video ? (
        <div className="w-full max-w-6xl flex flex-col items-center">
          <div className="aspect-video w-full bg-black mb-6">
            <iframe
              width="100%"
              height="700"
              src={`https://www.youtube.com/embed/${id}`}
              title={video.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              style={{ minHeight: '400px', background: '#000' }}
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-red-600 text-left w-full px-4">{video.snippet.title}</h2>
          <p className="text-lg text-gray-300 mb-2 text-left w-full px-4 font-semibold">{video.snippet.channelTitle}</p>
          <p className="text-base text-gray-400 mb-4 text-left w-full px-4 whitespace-pre-line">{video.snippet.description}</p>
        </div>
      ) : (
        <div className="text-center text-gray-500">Video not found.</div>
      )}
    </div>
  );
};

export default Watch;