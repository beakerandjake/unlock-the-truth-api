const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TheTruthSchema = Schema({
    // The main content of the truth displayed to the user. 
    body: {
        type: String,
        required: true
    },
    // What time did the user unlock this question? 
    timeUnlocked: {
        type: Date
    }
});

module.exports = mongoose.model('TheTruth', TheTruthSchema);