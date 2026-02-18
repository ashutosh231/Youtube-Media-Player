import React from 'react';
import { Link } from 'react-router-dom';

const Videocard = ({ video }) => {
  if (!video || !video.snippet) return null;
  // Use video.id.videoId for search results, video.id for trending/home
  const videoId = video.id.videoId || video.id;

  const publishedAt = video.snippet.publishedAt ? new Date(video.snippet.publishedAt) : null;
  const timeAgo = (() => {
    if (!publishedAt || Number.isNaN(publishedAt.getTime())) return '';
    const diffMs = Date.now() - publishedAt.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays < 1) return 'Today';
    if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks < 5) return `${diffWeeks} week${diffWeeks === 1 ? '' : 's'} ago`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `${diffMonths} month${diffMonths === 1 ? '' : 's'} ago`;
    const diffYears = Math.floor(diffDays / 365);
    return `${diffYears} year${diffYears === 1 ? '' : 's'} ago`;
  })();

  return (
    <Link
      to={`/watch/${videoId}`}
      className={[
        'group block rounded-2xl p-2 -m-2 transition',
        'hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-[var(--app-accent)]/60 focus-visible:ring-offset-0',
      ].join(' ')}
    >
      <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-white/5 border border-white/10">
        <img
          src={video.snippet.thumbnails?.high?.url || video.snippet.thumbnails?.medium?.url}
          alt={video.snippet.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="mt-3 flex gap-3">
        <div className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-[var(--app-accent)] to-[var(--app-accent-2)]/80 grid place-items-center text-white text-xs font-extrabold shadow">
          {(video.snippet.channelTitle?.trim()?.[0] || 'C').toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <h3
            className="text-sm sm:text-[15px] font-semibold leading-snug text-white/95 group-hover:text-white transition-colors line-clamp-2"
            title={video.snippet.title}
          >
            {video.snippet.title}
          </h3>
          <div className="mt-1 text-xs text-white/65 truncate">{video.snippet.channelTitle}</div>
          <div className="mt-1 text-xs text-white/50 truncate">
            {timeAgo ? <span>{timeAgo}</span> : <span> </span>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Videocard;