const catchAsync = require('../utils/catchAsync');
const resourceService = require('../services/resource.service');

const getClasses = catchAsync(async (req, res) => {
  const classes = await resourceService.getClasses();
  res.status(200).json({ success: true, data: classes });
});

const getSubjects = catchAsync(async (req, res) => {
  const { classId } = req.params;
  const subjects = await resourceService.getSubjectsByClass(classId);
  res.status(200).json({ success: true, data: subjects });
});

const getChapters = catchAsync(async (req, res) => {
  const { subjectId } = req.params;
  const chapters = await resourceService.getChaptersBySubject(subjectId);
  res.status(200).json({ success: true, data: chapters });
});

const getChapter = catchAsync(async (req, res) => {
  const { chapterId } = req.params;
  const chapter = await resourceService.getChapterById(chapterId);
  res.status(200).json({ success: true, data: chapter });
});

const youtubeService = require('../services/youtube.service');

const getVideos = catchAsync(async (req, res) => {
  const { chapterId } = req.params;
  const videos = await resourceService.getVideosByChapter(chapterId);
  res.status(200).json({ success: true, data: videos });
});

const searchYouTube = catchAsync(async (req, res) => {
  const query = req.query.q;
  const results = await youtubeService.searchYouTubeVideos(query);
  res.status(200).json({ success: true, data: results });
});

module.exports = {
  getClasses,
  getSubjects,
  getChapters,
  getChapter,
  getVideos,
  searchYouTube,
};
