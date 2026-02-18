import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { addToWatchHistory } from '../utils/history';

const Watch = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  useEffect(() => {
    if (!id) {
      setVideo(null);
      setLoading(false);
      return;
    }
    async function fetchVideo() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${API_KEY}`
        );
        const data = await res.json();
        const vid = data.items && data.items[0] ? data.items[0] : null;
        setVideo(vid);
        if (vid) addToWatchHistory(vid);
      } catch (err) {
        setVideo(null);
      }
      setLoading(false);
    }
    fetchVideo();
  }, [id]);

  return (
    <div className="w-full min-h-[calc(100vh-200px)]">
      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader />
        </div>
      ) : video ? (
        <div className="w-full max-w-7xl mx-auto space-y-6">
          {/* Video Player Container */}
          <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl bg-black/40 backdrop-blur-sm border border-white/10">
            <div className="relative aspect-video w-full bg-gradient-to-br from-black/80 to-black/60">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
                title={video.snippet.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ minHeight: '400px' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Video Info Section */}
          <div className="space-y-4">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-white tracking-tight">
              {video.snippet.title}
            </h1>

            {/* Channel Info */}
            <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--app-accent)] to-[var(--app-accent-2)] flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {video.snippet.channelTitle?.charAt(0)?.toUpperCase() || 'C'}
                </div>
                <div>
                  <div className="font-semibold text-white/95">{video.snippet.channelTitle}</div>
                  <div className="text-xs faint">Channel</div>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-2 text-sm faint">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Published {new Date(video.snippet.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>

            {/* Description */}
            <div className="card p-5 sm:p-6 lg:p-8">
              <h3 className="text-lg font-bold mb-3 text-white/95">Description</h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-sm sm:text-base leading-relaxed text-white/80 whitespace-pre-wrap break-words">
                  {video.snippet.description || 'No description available.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
            <svg className="w-10 h-10 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white/90">Video not found</h2>
          <p className="text-sm faint max-w-md">The video you're looking for doesn't exist or has been removed.</p>
        </div>
      )}
    </div>
  );
};

export default Watch;