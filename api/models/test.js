const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestSchema = Schema({
    first_name: {
        type: String,
        required: true,
        max: 100
    },
    last_name: {
        type: String,
        required: true,
        max: 100
    }
});

module.exports = mongoose.model('Test', TestScheme);