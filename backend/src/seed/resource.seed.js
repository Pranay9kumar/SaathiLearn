const mongoose = require('mongoose');
const ClassModel = require('../models/class.model');
const SubjectModel = require('../models/subject.model');
const ChapterModel = require('../models/chapter.model');
const VideoModel = require('../models/video.model');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lumino';

const seed = async () => {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  console.log('Connected to MongoDB for seeding');

  await VideoModel.deleteMany({});
  await ChapterModel.deleteMany({});
  await SubjectModel.deleteMany({});
  await ClassModel.deleteMany({});

  const classes = [];
  for (let i = 1; i <= 12; i += 1) {
    classes.push({ name: `Class ${i}` });
  }
  const createdClasses = await ClassModel.insertMany(classes);

  const class8 = createdClasses.find((c) => c.name === 'Class 8');
  const class9 = createdClasses.find((c) => c.name === 'Class 9');

  const subjects = [
    { classId: class8._id, name: 'Science' },
    { classId: class8._id, name: 'Mathematics' },
    { classId: class9._id, name: 'Science' },
    { classId: class9._id, name: 'Mathematics' },
  ];

  const createdSubjects = await SubjectModel.insertMany(subjects);

  const sci8 = createdSubjects.find((s) => s.name === 'Science' && s.classId.equals(class8._id));
  const math8 = createdSubjects.find((s) => s.name === 'Mathematics' && s.classId.equals(class8._id));

  const chapters = [
    { subjectId: sci8._id, title: 'Force and Pressure', pdfUrl: 'https://firebasestorage.googleapis.com/v0/b/.../ncert/class_8/Science/Force_and_Pressure.pdf' },
    { subjectId: sci8._id, title: 'Friction', pdfUrl: 'https://firebasestorage.googleapis.com/v0/b/.../ncert/class_8/Science/Friction.pdf' },
    { subjectId: math8._id, title: 'Rational Numbers', pdfUrl: 'https://firebasestorage.googleapis.com/v0/b/.../ncert/class_8/Mathematics/Rational_Numbers.pdf' },
  ];

  const createdChapters = await ChapterModel.insertMany(chapters);

  const videos = [
    { chapterId: createdChapters[0]._id, title: 'Force and Pressure NCERT Class 8', youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE1', thumbnail: 'https://i.ytimg.com/vi/EXAMPLE1/hqdefault.jpg' },
    { chapterId: createdChapters[0]._id, title: 'Understanding Pressure', youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE2', thumbnail: 'https://i.ytimg.com/vi/EXAMPLE2/hqdefault.jpg' },
    { chapterId: createdChapters[2]._id, title: 'Rational Numbers Explained', youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE3', thumbnail: 'https://i.ytimg.com/vi/EXAMPLE3/hqdefault.jpg' },
  ];

  await VideoModel.insertMany(videos);

  console.log('Seed data inserted successfully');
  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((error) => {
  console.error('Seeding failed', error);
  mongoose.disconnect();
  process.exit(1);
});
