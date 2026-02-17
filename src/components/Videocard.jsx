import React from 'react';

const Videocard = ({ video }) => {
  if (!video || !video.snippet) return null;
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200">
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
  );
};

export default Videocard;