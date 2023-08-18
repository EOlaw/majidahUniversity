const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true,
    },
    submissionText: {
        type: String,
        required: true,
    },
    submissionDate: {
        type: Date,
        default: Date.now,
    },
    grade: {
        type: Number,
    },
});

const Submission = mongoose.model('Submission', submissionSchema);
module.exports = Submission;
