const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TheTruthSchema = Schema({
    // The main content of the truth displayed to the user. 
    body: {
        type: String,
        required: true
    }
});

// Helper method which returns the truth to the user. 
TheTruthSchema.statics.getTheTruth = function() {
    return this.findOne({}, 'body');
};

module.exports = mongoose.model('TheTruth', TheTruthSchema);