// Utility for watch history using localStorage and cookies fallback
export function getWatchHistory() {
  try {
    const data = localStorage.getItem('watchHistory');
    if (data) return JSON.parse(data);
  } catch {}
  // fallback to cookies
  const match = document.cookie.match(/(?:^|; )watchHistory=([^;]*)/);
  if (match) {
    try {
      return JSON.parse(decodeURIComponent(match[1]));
    } catch {}
  }
  return [];
}

export function addToWatchHistory(video) {
  if (!video) return;
  let history = getWatchHistory();
  // Remove if already exists (by id)
  history = history.filter(v => (v.id.videoId || v.id) !== (video.id.videoId || video.id));
  // Add to front
  history.unshift(video);
  // Limit to 50
  history = history.slice(0, 50);
  try {
    localStorage.setItem('watchHistory', JSON.stringify(history));
  } catch {
    // fallback to cookies
    document.cookie = `watchHistory=${encodeURIComponent(JSON.stringify(history))}; path=/; max-age=31536000`;
  }
}
