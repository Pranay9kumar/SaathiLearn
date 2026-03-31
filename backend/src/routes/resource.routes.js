const { Router } = require('express');
const resourceController = require('../controllers/resource.controller');

const router = Router();

router.get('/classes', resourceController.getClasses);
router.get('/subjects/:classId', resourceController.getSubjects);
router.get('/chapters/:subjectId', resourceController.getChapters);
router.get('/chapters/details/:chapterId', resourceController.getChapter);
router.get('/videos/:chapterId', resourceController.getVideos);
router.get('/youtube/search', resourceController.searchYouTube);

module.exports = router;
