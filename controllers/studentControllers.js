const User = require('../models/userModels')
const Course = require('../models/courseModels')
const Assignment = require('../models/assignmentModels')
const Submission = require('../models/submissionModels')
const Grade = require('../models/gradeModels')

//Student Enrollment in a Course
module.exports.enrollInCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const studentId = req.user._id;
        //Check if the student is already enrolled in the course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found. '})
        }
        const isEnrolled = course.student.includes(studentId)
        if (isEnrolled) {
            return res.status(404).json({ error: 'Student already enrolled in the course. '})
        }
        //Enroll the student in the course
        course.student.push(studentId);
        await course.save();
        res.status(200).json({ message: 'Successfully enrolled in the course. '})
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occured while enrolling in the course. '})
    }
}

//Submit Assignment
module.exports.submitAssignment = async (req, res, next) => {
    try {
        const { courseId, assignmentId } = req.params;
        const studentId = req.user._id;
        const { submissionText } = req.body;
        //Check if the assignment exists in the course
        const assignment = await Assignment.findById(assignmentId)
        if (!assignment || !assignment.course.equals(courseId)) {
            return res.status(404).json({ error: 'Assignment not found in the course. '})
        }
        //Save the student's assignment submission
        const newSubmission = new Submission({ student: studentId, assignment: assignmentId, submissionText})
        await newSubmission.save();
        res.status(200).json({ message: 'Assignment submitted successfully.' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occured while submitting the assignment.' })
    }
}

// View Grades
module.exports.viewGrades = async (req, res, next) => {
    try {
        const studentId = req.user._id;

        // Find all grades for the student
        const grades = await Grade.find({ student: studentId })
            .populate('course', 'title')
            .populate('assignment', 'title score');

        res.status(200).json(grades);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching grades.' });
    }
};