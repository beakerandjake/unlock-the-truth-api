const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = Schema({
    // What number is this question in the question-track?
    number: {
        type: Number,
        required: true,
        get: v => Math.round(v),
        set: v => Math.round(v),
        min: 1
    },
    // Tracks the state of the question
    status: {
        type: String,
        required: true,
        enum: ['Locked', 'Unlocked', 'Current'],
        default: 'Locked'
    },
    // The title of the question.
    title: {
        type: String,
        required: true
    },
    // The main content of the question displayed to the user. 
    body: {
        type: String,
        required: true
    },
    // What time did the user unlock this question? 
    timeUnlocked: {
        type: Date,
        required: true
    },
    // What time did the user successfully answer this question? 
    timeAnswered: {
        type: Date,
        required: true
    },
    // The number of times the user tried to answer this question
    failedAttempts: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    // What type of question is this? TODO: if this becomes more complex need to rethink this. 
    type: {
        type: String,
        required: true,
        enum: ['text', 'manual'],
        default: 'text'
    },

});

module.exports = mongoose.model('Question', QuestionSchema);