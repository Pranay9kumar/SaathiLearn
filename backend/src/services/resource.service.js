const ApiError = require('../utils/ApiError');
const ClassModel = require('../models/class.model');
const SubjectModel = require('../models/subject.model');
const ChapterModel = require('../models/chapter.model');
const VideoModel = require('../models/video.model');

const getClasses = async () => {
  return ClassModel.find().sort({ name: 1 });
};

const getSubjectsByClass = async (classId) => {
  if (!classId) throw new ApiError(400, 'classId is required');
  return SubjectModel.find({ classId }).sort({ name: 1 });
};

const getChaptersBySubject = async (subjectId) => {
  if (!subjectId) throw new ApiError(400, 'subjectId is required');
  return ChapterModel.find({ subjectId }).sort({ title: 1 });
};

const getChapterById = async (chapterId) => {
  if (!chapterId) throw new ApiError(400, 'chapterId is required');

  const chapter = await ChapterModel.findById(chapterId)
    .populate({ path: 'subjectId', select: 'name classId', populate: { path: 'classId', select: 'name' } });

  if (!chapter) {
    throw new ApiError(404, 'Chapter not found');
  }

  return chapter;
};

const getVideosByChapter = async (chapterId) => {
  if (!chapterId) throw new ApiError(400, 'chapterId is required');

  // top videos for the chapter
  return VideoModel.find({ chapterId }).sort({ createdAt: -1 });
};

module.exports = {
  getClasses,
  getSubjectsByClass,
  getChaptersBySubject,
  getChapterById,
  getVideosByChapter,
};
