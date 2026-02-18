import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import Videocard from '../components/Videocard';
import ShimmerCard from '../components/ShimmerCard';

const Search = () => {
  const { query } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageToken, setPageToken] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  const fetchSearch = useCallback(async () => {
    if (loading || !hasMore || !query) return;
    setLoading(true);
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=16&q=${encodeURIComponent(query)}&key=${API_KEY}${pageToken ? `&pageToken=${pageToken}` : ''}`;
      const res = await fetch(url);
      const data = await res.json();
      setVideos(prev => [...prev, ...(data.items || [])]);
      setPageToken(data.nextPageToken || '');
      setHasMore(!!data.nextPageToken);
    } catch (err) {
      setHasMore(false);
    }
    setLoading(false);
  }, [API_KEY, loading, hasMore, pageToken, query]);

  useEffect(() => {
    setVideos([]);
    setPageToken('');
    setHasMore(true);
  }, [query]);

  useEffect(() => {
    if (videos.length === 0 && query) fetchSearch();
    // eslint-disable-next-line
  }, [query]);

  const lastElementRef = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: fetchSearch,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
      {videos.map((video, idx) => {
        const videoId = video.id.videoId || video.id;
        if (idx === videos.length - 1) {
          return (
            <div ref={lastElementRef} key={videoId}>
              <Videocard video={video} />
            </div>
          );
        }
        return <Videocard key={videoId} video={video} />;
      })}
      {loading && Array.from({ length: 9 }).map((_, idx) => <ShimmerCard key={"search-shimmer-"+idx} />)}
      {!loading && videos.length === 0 && query && (
        <div className="col-span-full flex flex-col items-center justify-center min-h-[40vh] text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 grid place-items-center">
            <svg className="w-7 h-7 text-white/45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
          </div>
          <div className="text-lg font-bold text-white/90">No results</div>
          <div className="text-sm faint">Try a different search term.</div>
        </div>
      )}
    </div>
  );
};

export default Search;
