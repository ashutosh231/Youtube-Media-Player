import React, { useEffect, useState, useCallback } from 'react';
import Loader from '../components/Loader';
import Videocard from '../components/Videocard';
import ShimmerCard from '../components/ShimmerCard';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageToken, setPageToken] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  const fetchVideos = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&maxResults=12&key=${API_KEY}${pageToken ? `&pageToken=${pageToken}` : ''}`;
      const res = await fetch(url);
      const data = await res.json();
      setVideos(prev => [...prev, ...(data.items || [])]);
      setPageToken(data.nextPageToken || '');
      setHasMore(!!data.nextPageToken);
    } catch (err) {
      setHasMore(false);
    }
    setLoading(false);
  }, [API_KEY, loading, hasMore, pageToken]);

  useEffect(() => {
    if (videos.length === 0) fetchVideos();
    // eslint-disable-next-line
  }, []);

  const lastElementRef = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: fetchVideos,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
      {videos.map((video, idx) => {
        if (idx === videos.length - 1) {
          return <div ref={lastElementRef} key={video.id}><Videocard video={video} /></div>;
        }
        return <Videocard key={video.id} video={video} />;
      })}
      {loading && Array.from({ length: 9 }).map((_, idx) => <ShimmerCard key={"shimmer-"+idx} />)}
    </div>
  );
};

export default Home;