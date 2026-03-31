const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter',
      required: [true, 'chapterId is required'],
    },
    title: {
      type: String,
      required: [true, 'Video title is required'],
      trim: true,
      maxlength: [200, 'Video title must have less or equal than 200 characters'],
    },
    youtubeUrl: {
      type: String,
      required: [true, 'youtubeUrl is required'],
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

videoSchema.index({ chapterId: 1 });

module.exports = mongoose.model('Video', videoSchema);
