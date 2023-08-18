const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentControllers');
const { isAuthenticated, isStudent } = require('../controllers/authControllers');

// Middleware to check if the user is authenticated (logged in)
router.use(isAuthenticated, isStudent);

// Route to enroll in a course
router.post('/enroll/:courseId', studentController.enrollInCourse);

// Route to submit an assignment for a specific course
router.post('/submit/:courseId/:assignmentId', studentController.submitAssignment);

// Route to view grades for the logged-in student
router.get('/grades', studentController.viewGrades);

module.exports = router;
