import React, { useEffect, useState } from 'react';
import { getWatchHistory } from '../utils/history';
import Videocard from '../components/Videocard';

const History = () => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    setHistory(getWatchHistory());
    const onStorage = () => setHistory(getWatchHistory());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <section className="w-full">
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-white/95 flex items-center gap-2">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 8v5l4 2"/><path stroke="currentColor" strokeWidth="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.07 6.07-1.41-1.41M6.34 6.34 4.93 4.93m12.73 0-1.41 1.41M6.34 17.66l-1.41 1.41"/></svg>
        Watch History
      </h2>
      {history.length === 0 ? (
        <div className="text-white/70 text-base sm:text-lg text-center py-16">No videos watched yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
          {history.map((video) => {
            const videoId = video.id.videoId || video.id;
            return <Videocard key={videoId} video={video} />;
          })}
        </div>
      )}
    </section>
  );
};

export default History;
