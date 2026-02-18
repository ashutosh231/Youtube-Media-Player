import React from 'react';

const ShimmerCard = () => {
  return (
    <div className="animate-pulse rounded-2xl p-2 -m-2">
      <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-white/5 border border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5" />
      </div>
      <div className="mt-3 flex gap-3">
        <div className="w-9 h-9 rounded-full bg-white/10 border border-white/10" />
        <div className="flex-1 min-w-0">
          <div className="h-4 bg-white/10 rounded-lg w-[92%] mb-2" />
          <div className="h-3 bg-white/10 rounded-lg w-[60%] mb-2" />
          <div className="h-3 bg-white/10 rounded-lg w-[40%]" />
        </div>
      </div>
    </div>
  );
};

export default ShimmerCard;