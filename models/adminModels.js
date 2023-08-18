const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  departments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
  classSchedules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClassSchedule' }],
  resources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
});

const Administrator = mongoose.model('Administrator', adminSchema);

module.exports = Administrator;
