const axios = require('axios');
const ApiError = require('../utils/ApiError');

const searchYouTubeVideos = async (query) => {
  if (!query || typeof query !== 'string') {
    throw new ApiError(400, 'query is required and must be a string');
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new ApiError(500, 'YOUTUBE_API_KEY is not configured');
  }

  const url = 'https://www.googleapis.com/youtube/v3/search';

  const params = {
    key: apiKey,
    q: query,
    part: 'snippet',
    type: 'video',
    maxResults: 5,
    videoEmbeddable: 'true',
    safeSearch: 'moderate',
  };

  try {
    const response = await axios.get(url, { params });
    const results = (response.data.items || []).map((item) => ({
      title: item.snippet.title,
      videoId: item.id.videoId,
      thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url || null,
    }));

    return results;
  } catch (error) {
    const errMsg = error.response?.data?.error?.message || error.message || 'YouTube API error';
    throw new ApiError(502, `YouTube API request failed: ${errMsg}`);
  }
};

module.exports = { searchYouTubeVideos };
