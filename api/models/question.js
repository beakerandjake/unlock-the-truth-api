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
        enum: ['locked', 'unlocked', 'current'],
        default: 'locked'
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
        type: Date
    },
    // What time did the user successfully answer this question? 
    timeAnswered: {
        type: Date
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
    // The questions answer. TODO: if this becomes more complex, need to rethink how this works. 
    answer: {
        type: String,
        required: true
    }
});

// Helper method which returns all questions with a 'locked' status. 
QuestionSchema.statics.lockedQuestions = function () {
    return this.find({
        status: 'locked'
    }, 'title number');
};

// Helper method which returns all questions with a 'current' status. 
QuestionSchema.statics.currentQuestion = function () {
    return this.findOne({
        status: 'current'
    }, 'title body type number timeUnlocked');
};

// Helper method which returns all questions with an 'unlocked' status. 
QuestionSchema.statics.unlockedQuestions = function () {
    return this.find({
        status: 'unlocked'
    }, 'title body answer failedAttempts timeUnlocked timeAnswered number');
};

module.exports = mongoose.model('Question', QuestionSchema);