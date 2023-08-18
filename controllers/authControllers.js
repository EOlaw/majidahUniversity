// Import the necessary modules
const User = require('../models/userModels');
const passport = require('passport')

//Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}
//Middleware to check if user is student
function isStudent (req, res, next) {
    if (req.user.role == 'student') {
        return next();
    }
    res.status(403).json({ error: 'Forbidden. Only Students can view course details.' })
}
//Middleware to check if user is instructor
function isInstructor (req, res, next) {
    if (req.user.role == 'instructor') {
        return next();
    }
    res.status(403).json({ error: 'Forbidden. Only Instructors can view course details.' })
}
//Middleware to check if user is Admin
function isAdmin (req, res, next) {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    // Retrieve the user from the database
    User.findById(req.user._id)
        .then((user) => {
            if (user.isAdmin || user.role == 'admin') {
                next();
            } else {
                res.status(403).send('Forbidden. Only administrator can access this route.')
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error')
        });
    } else {
        res.redirect('/login')
    }
};


module.exports = { isAuthenticated, isAdmin, isStudent, isInstructor }