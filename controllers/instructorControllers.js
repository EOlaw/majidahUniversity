const { Material, Syllabus, GradeCriteria } = require('../models/courseModels')

module.exports = {
    createMaterial: async (req, res, next) => {
        try {
            const { title, content, courseId } = req.body;
            const material = new Material({ title, content, courseId });
            const savedMaterial = await material.save();
            res.status(201).json(savedMaterial);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Error creating material.' })
        }
    },
    //Create Syllabus
    createSyllabus: async (req, res, next) => {
        try {
            const { title, content, courseId } = req.body;
            const syllabus = new Syllabus({ title, content, courseId });
            const savedSyllabus = await syllabus.save();
            res.status(201).json(savedSyllabus)
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Error creating syllabus.' })
        }
    },
    //Create Grade Criteria
    createGradeCriteria: async (req, res, next) => {
        try {
            const { title, content, courseId } = req.body;
            const gradeCriteria = new GradeCriteria({ title, content, courseId });
            const savedGradeCriteria = await gradeCriteria.save();
            res.status(201).json(savedGradeCriteria)
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Error creating grade criteria.' })
        }
    }
}



















/*


const Course = require('../models/courseModels');
const Assignment = require('../models/assignmentModels')
const Submission = require('../models/submissionModels')
const Grade = require('../models/gradeModels')

//Instructor Teach a Course
module.exports.teachCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const instructorId = req.user._id;
        //Check if the instructor is assigned to teach the course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        //If instructor is assigned to teach the course
        const isAssigned = course.instructor.includes(instructorId);
        if (!isAssigned) {
            return res.status(404).json({ error: 'You are not assigned to teach the course' })
        }

        // Do any necessary actions related to teaching the course
        // For example: preparing course materials, lectures, etc.
        res.status(200).json({ message: 'You are now teaching the course.' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occured while teaching the course.'})
    }
}

//Instructor Assign Assignment to a Course
module.exports.assignAssignment = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const instructorId = req.user._id;
        // Get assignment details from the request body
        const { title, description, deadline } = req.body;
        //Check if the instructor is assigned to teach the course
        const course = await Course.findById(courseId);
        if (!course || !course.instructor.includes(instructorId)) {
            return res.status(403).json({ error: 'You are not assigned to teach this course.' })
        }
        //Create and save the assignment
        const newAssignment = new Assignment({ title, description, course: courseId, courseName: course.title, deadline });
        await newAssignment.save();
        console.log(newAssignment)
        res.status(201).json(newAssignment)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occured while assigning the assignment.' })
    }
}

// Instructor View Student Submissions for an Assignment
module.exports.viewSubmissions = async (req, res, next) => {
    try {
        const { courseId, assignmentId } = req.params;
        const instructorId = req.user._id;

        // Check if the instructor is assigned to teach the course
        const course = await Course.findById(courseId);
        if (!course || !course.instructor.includes(instructorId)) {
            return res.status(403).json({ error: 'You are not assigned to teach this course.' });
        }

        // Check if the assignment exists in the course
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment || !assignment.course.equals(courseId)) {
            return res.status(404).json({ error: 'Assignment not found in this course.' });
        }

        // Fetch all submissions for the assignment
        const submissions = await Submission.find({ assignment: assignmentId })
            .populate('student', 'firstName lastName username email');

        res.status(200).json(submissions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching student submissions.' });
    }
};

// Instructor Grade Student for an Assignment
module.exports.gradeStudent = async (req, res, next) => {
    try {
        const { submissionId } = req.params;
        const instructorId = req.user._id;
        const { score } = req.body;

        // Check if the instructor is assigned to teach the course
        const submission = await Submission.findById(submissionId).populate('assignment');
        if (!submission || !submission.assignment.course.instructor.includes(instructorId)) {
            return res.status(403).json({ error: 'You are not assigned to teach this course.' });
        }

        // Update the score for the student's submission
        const updatedSubmission = await Submission.findByIdAndUpdate(
            submissionId,
            { score },
            { new: true }
        );

        // Save the grade for the student
        const newGrade = new Grade({
            student: updatedSubmission.student,
            course: updatedSubmission.assignment.course,
            assignment: updatedSubmission.assignment,
            score: updatedSubmission.score,
        });
        await newGrade.save();

        res.status(200).json({ message: 'Student graded successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while grading the student.' });
    }


};

*/