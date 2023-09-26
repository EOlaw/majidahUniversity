const mongoose = require('mongoose');
//const Assignment = require('./assignmentModels')
const Schema = mongoose.Schema;

const courseSchema = new Schema({

  courseCode: { type: Number, required: true },
  courseName: { type: String, required: true },
  instructors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  schedules: [{
    semester: String,
    startDate: Date,
    endDate: Date,
    sessions: [{ day: String, time: String }],
  }],
});

//Course Materials
const materialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
})
//Course Syllabus
const syllabusSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
});
//Course Grade
const gradeCriteriaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  criteria: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
});

const Course = mongoose.model('Course', courseSchema);
const Material = mongoose.model('Material', materialSchema);
const Syllabus = mongoose.model('Syllabus', syllabusSchema);
const GradeCriteria = mongoose.model('GradeCriteria', gradeCriteriaSchema);

module.exports = {
  Course,
  Material,
  Syllabus,
  GradeCriteria,
};

/*

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

*/



