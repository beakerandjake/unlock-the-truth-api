const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = Schema({
    number: {
        type: Number,
        required: true,
        get: v => Math.round(v),
        set: v => Math.round(v),
        min: 1
    },
    status: {
        type: String,
        required: true,
        enum: ['Locked', 'Unlocked', 'Current'],
        default: 'Locked'
    },
});

module.exports = mongoose.model('Question', QuestionSchema);