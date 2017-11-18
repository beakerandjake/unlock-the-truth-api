const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defines projections that are reused by various static helper methods. 
const projections = {
    currentQuestion: 'title body type number timeUnlocked',
    unlockedQuestion: 'title body answer failedAttempts timeUnlocked timeAnswered number'
};

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
QuestionSchema.statics.getLockedQuestionsVm = function () {
    return this.find({
            status: 'locked'
        }, 'title number')
        .sort({
            number: 'asc'
        });
};

// Helper method which returns all questions with a 'current' status. 
QuestionSchema.statics.getCurrentQuestionVm = function () {
    return this.findOne({
        status: 'current'
    }, projections.currentQuestion);
};

// Helper method which returns all questions with an 'unlocked' status. 
QuestionSchema.statics.getUnlockedQuestionsVm = function () {
    return this.find({
            status: 'unlocked'
        }, projections.unlockedQuestion)
        .sort({
            number: 'asc'
        });
};

// Helper method which returns the current question (if any). 
QuestionSchema.statics.getCurrentQuestionAndAnswer = function () {
    return this.findOne({
        status: 'current'
    }, 'answer failedAttempts');
};

// Helper method which returns the last unlocked question (if any).
QuestionSchema.statics.getLastUnlockedQuestionVm = function () {
    return this.findOne({
            status: 'unlocked'
        }, projections.unlockedQuestion)
        .sort({
            number: 'desc'
        });
};

module.exports = mongoose.model('Question', QuestionSchema);