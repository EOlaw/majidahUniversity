const mongoose = require('mongoose');
const Schema =  mongoose.Schema

const gradeSchema = new Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    score: { type: Number, required: true}
})

const Grade = mongoose.model('Grade', gradeSchema)
module.exports = Grade;