const User = require('../models/userModels');
const Course = require('../models/courseModels');
const Administrator = require('../models/adminModels');

// Administrator Routes for Courses
module.exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find()
    .populate('instructor', 'firstName lastName username email') // Populate instructor with user info (firstName, lastName, username, email)
    .populate('student', 'firstName lastName username email'); // Populate students with user info (firstName, lastName, username, email)
    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching courses.' });
  }
};

module.exports.createCourse = async (req, res, next) => {
    try {
      const { title, description, instructor } = req.body;
      const newCourse = new Course({ title, description, instructor });
      const savedCourse = await newCourse.save();
      res.status(201).json(savedCourse);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while creating the course.' });
    }
};
  
module.exports.getCourseById = async (req, res, next) => {
    try {
      const courseId = req.params.id;
      const course = await Course.findById(courseId).populate('instructor', 'username').populate('student', 'username');
      if (!course) {
        return res.status(404).json({ error: 'Course not found.' });
      }
      res.status(200).json(course);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching course details.' });
    }
};
  
module.exports.updateCourse = async (req, res, next) => {
    try {
      const courseId = req.params.id;
      const { title, description, instructor } = req.body;
      const updatedCourse = await Course.findByIdAndUpdate(courseId, { title, description, instructor }, { new: true });
      if (!updatedCourse) {
        return res.status(404).json({ error: 'Course not found.' });
      }
      res.status(200).json(updatedCourse);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while updating the course.' });
    }
};
  
module.exports.deleteCourse = async (req, res, next) => {
    try {
      const courseId = req.params.id;
      const deletedCourse = await Course.findByIdAndDelete(courseId);
      if (!deletedCourse) {
        return res.status(404).json({ error: 'Course not found.' });
      }
      res.status(200).json({ message: 'Course deleted successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while deleting the course.' });
    }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  
// Administrator Routes for Instructors
module.exports.getAllInstructors = async (req, res, next) => {
    try {
      const instructors = await User.find({ role: 'instructor' });
      res.status(200).json(instructors);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching instructors.' });
    }
};
  
module.exports.getInstructorById = async (req, res, next) => {
    try {
      const instructorId = req.params.id;
      const instructor = await User.findById(instructorId);
      if (!instructor || instructor.role !== 'instructor') {
        return res.status(404).json({ error: 'Instructor not found.' });
      }
      res.status(200).json(instructor);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching instructor details.' });
    }
};
  
module.exports.updateInstructor = async (req, res, next) => {
    try {
      const instructorId = req.params.id;
      // Update any instructor-specific fields here if needed
      const updatedInstructor = await User.findByIdAndUpdate(instructorId, req.body, { new: true }); // Find the instructor by their ID and update their data with the data from the request body
      if (!updatedInstructor || updatedInstructor.role !== 'instructor') {
        return res.status(404).json({ error: 'Instructor not found.' });
      }
      res.status(200).json(updatedInstructor);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while updating the instructor.' });
    }
};

module.exports.deleteInstructor = async (req, res, next) => {
  try {
    const instructorId = req.params.id;
    const deletedInstructor = await User.findByIdAndDelete(instructorId);
    if (!deletedInstructor || deletedInstructor.role !== 'instructor') {  // If the instructor is not found or their role is not 'instructor', send a 404 error
      return res.status(404).json({ error: 'Instructor not found.' });
    }
    res.status(200).json({ message: 'Instructor deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while deleting the instructor.' });
  }
};

module.exports.enrollInstructorToCourse = async (req, res, next) => {
  try {
    const { courseId, instructorId } = req.params;
    //Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found.' })
    }
    //Check if the instructor exists and has the role 'instructor'
    const instructor = await User.findById(instructorId);
    if (!instructor || instructor.role !== 'instructor') {
      return res.status(404).json({ error: 'Instructor not found.' })
    }
    //Enroll the instructor to the course for teaching
    if (!course.instructor.includes(instructorId)) {
      course.instructor.push(instructorId);
      await course.save();
    }
    res.status(200).json({ message: 'Instructor enrolled in the course for teaching.' })
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while enrolling the instructoor.'})
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Administrator Routes for Students
module.exports.getAllStudents = async (req, res, next) => {
    try {
      const students = await User.find({ role: 'student' });
      res.status(200).json(students);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching students.' });
    }
};
  
module.exports.getStudentById = async (req, res, next) => {
    try {
      const studentId = req.params.id;
      const student = await User.findById(studentId);
      if (!student || student.role !== 'student') {
        return res.status(404).json({ error: 'Student not found.' });
      }
      res.status(200).json(student);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching student details.' });
    }
};
  
module.exports.updateStudent = async (req, res, next) => {
    try {
      const studentId = req.params.id;
      // Update any student-specific fields here if needed
      const updatedStudent = await User.findByIdAndUpdate(studentId, req.body, { new: true });
      if (!updatedStudent || updatedStudent.role !== 'student') {
        return res.status(404).json({ error: 'Student not found.' });
      }
      res.status(200).json(updatedStudent);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while updating the student.' });
    }
};
  
module.exports.deleteStudent = async (req, res, next) => {
    try {
      const studentId = req.params.id;
      const deletedStudent = await User.findByIdAndDelete(studentId);
      if (!deletedStudent || deletedStudent.role !== 'student') {
        return res.status(404).json({ error: 'Student not found.' });
      }
      res.status(200).json({ message: 'Student deleted successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while deleting the student.' });
    }
};
  











/*

// Course CRUD - Read (Course catalog)
module.exports.courseCatalog = async (req, res) => {
    try {
        const courses = await Course.find();
        res.render('courseCatalog', { courses });
        //res.json(courses);
    } catch (err) {
        console.log('Error fetching course catalog: ', err)
        res.redirect('/user/dashboard');
    }
};
//Create a new course
module.exports.newCourse =  (req, res) => {
    res.render('newCourse')
}

//Course CRUD - Post a course
module.exports.createCourse = async (req, res) => {
    try {
        const { title, description, instructor } = req.body;
        // Check if all required fields are present
        if (!title || !description || !instructor) {
            return res.status(400).json({ message: 'Title, description, and instructor are required fields.' });
        }
        const newCourse = new Course({ title, description, instructor });
        await newCourse.save();
        res.redirect('/course')
        console.log(newCourse)
        //res.status(201).json(newCourse);
    } catch (err) {
        console.log('Error creating course: ', err);
        res.status(500).json({ message: 'Failed to create course' });
    }
}



// Course CRUD - Read (Individual course details)
module.exports.getCourseDetails = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.render('courseDetails', { course , isAuthenticated : true });
        //res.json(course);
    } catch (err) {
        console.log('Error fetching course details:', err);
        res.status(500).json({ message: 'Failed to fetch course details' })
    }
}

module.exports.editCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.render('updateCourse', { course })
    } catch (err) {
        console.log('Error fetching course details:', err);
        res.status(500).json({ message: 'Failed to fetch course details '})
    }
}


//Course CRUD - Update
module.exports.updateCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const { title, description, instructor } = req.body;
        const updatedCourse = await Course.findByIdAndUpdate(courseId, { title, description, instructor }, { new: true});
        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found'});
        }
        res.redirect('/course/' + courseId + '/details'); // Redirect to the updated course details page
        //res.json(updatedCourse)
    } catch (err) {
        console.log('Error updating course', err);
        res.status(500).json({ message: 'Failed to update course' })
    }
}

//Course CRUD - DELETE
module.exports.deleteCourse = async (req, res) => {
    try {
        //Check if the user is an administrator
        const courseId = req.params.id;
        const deletedCourse = await Course.findByIdAndDelete(courseId);
        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        console.log(`This movie is now deleted ${deletedCourse.title}`)
        res.redirect('/course/'); // Redirect to the course catalog page or any other appropriate page
        //res.json(deletedCourse);
    } catch (err) {
        console.log('Error deleting course:', err);
        res.status(500).json({ message: 'Failed to delete course' })
    }
}








//Course enrollment handler
module.exports.courseEnrollment = async (req, res) => {
    const courseId = req.paramas.id;
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            res.redirect('/course/catalog');
        } else {
            const user = req.user;
            user.enrolledCourses.push(course);
            await user.save();
            res.redirect('/user/dashboard')
        }
    } catch (err) {
        console.log('Error enrolling in a course: ', err);
        res.redirect('/course/catalog');
    }
}

//Assignment handler
module.exports.viewAssignments = (req, res) => {
    const courseId = req.params.id;
    //Fetch gradebook data for the given courseId
    //Render the gradebook page with the fetched data
    res.render('assignment', { courseId })
}


//Gradebook handler
module.exports.viewGradebook = (req, res) => {
    const courseId = req.params.id;
    //Fetch gradebook data for the given courseId
    //Render the gradebook page with the fetched data
    res.render('gradebook', { courseId })
}

*/