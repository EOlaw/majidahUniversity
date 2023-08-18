const express = require('express');
const router = express.Router();

//const Course = require('../models/courseModels'); // Replace with the correct path to the course model
const courseController = require('../controllers/course')

router.get('/admin/courses', courseController.renderAdminCourse);

// Administrator Routes
router.post('/admin/courses', courseController.adminCoursePost);



/*

router.put('/admin/courses/:id', async (req, res, next) => {
  // Handle updating course details by course ID
});

// Instructor Routes
router.get('/instructor/courses', async (req, res, next) => {
  // Fetch courses assigned to the instructor from the database and display them
});

router.get('/instructor/courses/:id', async (req, res, next) => {
  // Fetch course details by course ID and display them to the instructor
});

router.post('/instructor/courses/:id/assignments', async (req, res, next) => {
  // Handle assigning a new assignment to the course identified by course ID
});

router.post('/instructor/courses/:id/grades', async (req, res, next) => {
  // Handle posting grades for students in the course identified by course ID
});

// Student Routes
router.get('/student/courses', async (req, res, next) => {
  // Fetch courses the student is enrolled in and display them
});

router.get('/student/courses/:id', async (req, res, next) => {
  // Fetch course details by course ID and display them to the student
});

router.post('/student/courses/:id/assignments/:assignmentId', async (req, res, next) => {
  // Handle student assignment submissions for the specific course and assignment
});

*/

module.exports = router;
