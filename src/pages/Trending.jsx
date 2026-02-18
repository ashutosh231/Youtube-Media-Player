import React, { useCallback, useEffect, useState } from 'react';
import Videocard from '../components/Videocard';
import ShimmerCard from '../components/ShimmerCard';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const Trending = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageToken, setPageToken] = useState('');
  const [hasMore, setHasMore] = useState(true);

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  const fetchTrending = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&maxResults=12&key=${API_KEY}${
        pageToken ? `&pageToken=${pageToken}` : ''
      }`;
      const res = await fetch(url);
      const data = await res.json();
      setVideos((prev) => [...prev, ...(data.items || [])]);
      setPageToken(data.nextPageToken || '');
      setHasMore(!!data.nextPageToken);
    } catch {
      setHasMore(false);
    }
    setLoading(false);
  }, [API_KEY, hasMore, loading, pageToken]);

  useEffect(() => {
    if (videos.length === 0) fetchTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lastElementRef = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: fetchTrending,
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white/95">
            Trending
          </h1>
          <p className="text-sm faint">Most popular videos right now</p>
        </div>
        <div className="text-xs text-white/55">Region: US</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
        {videos.map((video, idx) => {
          if (idx === videos.length - 1) {
            return (
              <div ref={lastElementRef} key={video.id}>
                <Videocard video={video} />
              </div>
            );
          }
          return <Videocard key={video.id} video={video} />;
        })}

        {loading && Array.from({ length: 9 }).map((_, idx) => <ShimmerCard key={`trend-shimmer-${idx}`} />)}
      </div>
    </div>
  );
};

export default Trending;

