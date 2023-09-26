const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const instructorSchema = new Schema({

  
  /*
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coursesTaught: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  /*
  email: {
    type: String,
    required: true,
    unique: true,
    // You can add additional validation for email format, e.g., using regex
  },
  */
  // Username and password fields are automatically added by passport-local-mongoose
});

// Add passportLocalMongoose plugin to enable authentication features
instructorSchema.plugin(passportLocalMongoose);

const Instructor = mongoose.model('Instructor', instructorSchema);
module.exports = Instructor;
