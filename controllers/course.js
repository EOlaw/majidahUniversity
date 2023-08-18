
const Course = require('../models/courseModels');
const User = require('../models/userModels')

// Administrator Routes
module.exports.adminCoursePost =  async (req, res) => {
  try {
    // Check if the user is an administrator
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden. Only administrators can create courses.' });
    }

    const { title, description } = req.body;
    const newCourse = new Course({ title, description, instructor: req.user._id });
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while creating the course.' });
  }
}

module.exports.renderAdminCourse =  async (req, res) => {
  try {
    // Check if the user is an administrator
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden. Only administrators can view all courses.' });
    }

    const courses = await Course.find().populate('instructor', 'username');
    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching courses.' });
  }
}

/*

router.put('/admin/courses/:id', async (req, res, next) => {
  try {
    // Check if the user is an administrator
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden. Only administrators can edit courses.' });
    }

    const courseId = req.params.id;
    const { title, description } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(courseId, { title, description }, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    res.status(200).json(updatedCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while updating the course.' });
  }
});

// Instructor Routes
router.get('/instructor/courses', async (req, res, next) => {
  try {
    // Check if the user is an instructor
    if (req.user.role !== 'instructor') {
      return res.status(403).json({ error: 'Forbidden. Only instructors can view their assigned courses.' });
    }

    const courses = await Course.find({ instructor: req.user._id }).populate('instructor', 'username');
    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching instructor courses.' });
  }
});

router.get('/instructor/courses/:id', async (req, res, next) => {
  try {
    // Check if the user is an instructor
    if (req.user.role !== 'instructor') {
      return res.status(403).json({ error: 'Forbidden. Only instructors can view course details.' });
    }

    const courseId = req.params.id;
    const course = await Course.findById(courseId).populate('instructor', 'username');
    if (!course) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    res.status(200).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching course details.' });
  }
});

// More instructor routes for assigning assignments and posting grades can be added here.

// Student Routes
router.get('/student/courses', async (req, res, next) => {
  try {
    // Check if the user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ error: 'Forbidden. Only students can view enrolled courses.' });
    }

    // Assuming students are stored in the "users" collection with a reference to the "coursesTaken" field in the user model
    const courses = await Course.find({ _id: { $in: req.user.coursesTaken } }).populate('instructor', 'username');
    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching student courses.' });
  }
});

router.get('/student/courses/:id', async (req, res, next) => {
  try {
    // Check if the user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ error: 'Forbidden. Only students can view course details.' });
    }

    const courseId = req.params.id;
    // Assuming students are stored in the "users" collection with a reference to the "coursesTaken" field in the user model
    const enrolledCourses = req.user.coursesTaken.map(course => course.toString());
    if (!enrolledCourses.includes(courseId)) {
      return res.status(403).json({ error: 'Forbidden. You are not enrolled in this course.' });
    }

    const course = await Course.findById(courseId).populate('instructor', 'username');
    if (!course) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    res.status(200).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching course details.' });
  }
});

// More student routes for submitting assignments can be added here.

*/