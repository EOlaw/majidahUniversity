
//const instructorController = require('../controllers/instructorControllers');
//const { isAuthenticated, isInstructor } = require('../controllers/authControllers');


// routes/instructorRoutes.js

const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorControllers');

// Material Routes
router.post('/materials', instructorController.createMaterial);
// Implement routes for updating and managing materials as needed

// Syllabus Routes
router.post('/syllabi', instructorController.createSyllabus);
// Implement routes for updating and managing syllabi as needed

// Grade Criteria Routes
router.post('/grade-criteria', instructorController.createGradeCriteria);
// Implement routes for updating and managing grade criteria as needed

module.exports = router;





/*

// Middleware to check if the user is authenticated as an instructor
router.use(isAuthenticated, isInstructor);

// Route to teach a course
router.post('/teach/:courseId', instructorController.teachCourse);

// Route to assign an assignment to a course
router.post('/assign/:courseId', instructorController.assignAssignment);

// Route to view student submissions for a specific assignment in a course
router.get('/submissions/:courseId/:assignmentId', instructorController.viewSubmissions);

// Route to grade a student's submission for a specific assignment
router.post('/grade/:submissionId', instructorController.gradeStudent);

module.exports = router;

*/
