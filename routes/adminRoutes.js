const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers')
const { isAuthenticated, isAdmin } = require('../controllers/authControllers')

// User Management Routes
router.post('/users/create', adminController.createUser);
router.put('/users/:userId/update', adminController.updateUser);
router.get('/users/:userId', adminController.getUserById);
router.get('/users', adminController.getAllUsers);
router.delete('/users/:userId', adminController.deleteUser);

// Department Management Routes
router.post('/departments/create', adminController.createDepartment);
router.put('/departments/:departmentId/update', adminController.updateDepartment);
router.get('/departments/:departmentId', adminController.getDepartmentById);

// Semester and Course Management Routes
router.post('/courses/create', adminController.createCourse);
router.put('/courses/:courseId/update', adminController.updateCourse);
router.get('/courses/:courseId', adminController.getCourseById);
router.delete('/courses/:courseId', adminController.deleteCourse);
router.post('/courses/:courseId/schedule/create', adminController.createSchedule);
router.put('/courses/:courseId/schedule/:scheduleId/update', adminController.updateSchedule);
router.delete('/courses/:courseId/schedule/:scheduleId/delete', adminController.deleteSchedule);

// Events & Announcements Routes
router.post('/announcements/create', adminController.createAnnouncement);
router.get('/announcements/:announcementId', adminController.getAnnouncements);

// Resource Allocation Routes
router.post('/resources/create', adminController.createResource);
router.get('/resources/:resourceId', adminController.getResources);

// Document Management Routes
router.post('/documents/upload', adminController.uploadDocument);
router.get('/documents/:documentId', adminController.getDocuments);

module.exports = router;




/*
// Administrator Routes for Courses
router.get('/admin/courses', isAuthenticated, isAdmin, adminController.getAllCourses);
router.post('/admin/courses', isAuthenticated, isAdmin, adminController.createCourse);
router.get('/admin/courses/:id', isAuthenticated, isAdmin, adminController.getCourseById);
router.put('/admin/courses/:id', isAuthenticated, isAdmin, adminController.updateCourse);
router.delete('/admin/courses/:id', isAuthenticated, isAdmin, adminController.deleteCourse);

// Administrator Routes for Instructors
router.get('/admin/instructors', isAuthenticated, isAdmin, adminController.getAllInstructors);
router.get('/admin/instructors/:id', isAuthenticated, isAdmin, adminController.getInstructorById);
router.put('/admin/instructors/:id', isAuthenticated, isAdmin, adminController.updateInstructor);
router.post('/admin/instructors/:courseId/:instructorId', isAdmin, adminController.enrollInstructorToCourse);  // Admin route to enroll an instructor to a course for teaching

// Administrator Routes for Students
router.get('/admin/students', isAuthenticated, isAdmin, adminController.getAllStudents);
router.get('/admin/students/:id', isAuthenticated, isAdmin, adminController.getStudentById);
router.put('/admin/students/:id', isAuthenticated, isAdmin, adminController.updateStudent);
router.delete('/admin/students/:id', isAuthenticated, isAdmin, adminController.deleteStudent);

module.exports = router;
*/







/*

//Define a route to get all courses
router.get('/', isAuthenticated, courseControllers.courseCatalog);

//Define a route to create a new course
router.get('/new', isAuthenticated, isAdmin, courseControllers.newCourse);

//Define a route to post new course
router.post('/', isAuthenticated, isAdmin, courseControllers.createCourse);

//Define a route to get a course by ID
router.get('/:id/details', isAuthenticated, courseControllers.getCourseDetails);

router.get('/:id/edit', isAuthenticated, isAdmin, courseControllers.editCourse);

//Define a route to update a course by ID
router.put('/:id/update', isAuthenticated, isAdmin, courseControllers.updateCourse);

//Define a route to delete a course by ID
router.get('/:id/delete', isAuthenticated, isAdmin, courseControllers.deleteCourse);





//Course enrollment route
router.get('/enroll/:id', courseControllers.courseEnrollment);

//Assignment route
router.get('/assignments/:id', courseControllers.viewAssignments);

//Gradebook route
router.get('/gradebook/:id', courseControllers.viewGradebook)


module.exports = router;

*/