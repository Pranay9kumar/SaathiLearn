const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Subject name is required'],
      trim: true,
      maxlength: [100, 'Subject name must have less or equal than 100 characters'],
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: [true, 'classId is required'],
    },
  },
  {
    timestamps: true,
  }
);

subjectSchema.index({ classId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Subject', subjectSchema);
