const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['STUDENT', 'MENTOR', 'ADMIN'],
      default: 'STUDENT',
    },
    class: {
      type: Number,
      min: 1,
      max: 12,
      default: null,
    },
    subjects: {
      type: [String],
      default: [],
    },
    activities: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
