const mongoose = require('mongoose');

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Class name is required'],
      trim: true,
      unique: true,
      maxlength: [50, 'Class name must have less or equal than 50 characters'],
    },
  },
  {
    timestamps: true,
  }
);

classSchema.index({ name: 1 });

module.exports = mongoose.model('Class', classSchema);
