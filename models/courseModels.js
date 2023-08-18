const mongoose = require('mongoose');
const Assignment = require('./assignmentModels')
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  courseCode: {
    type: Number,
  },
  instructor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  student: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  allowedRole: {
    type: String,
    enum: ['instructor', 'admin'],
    required: true,
    default: 'instructor',
  },
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;



