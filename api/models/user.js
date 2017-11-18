const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Represents a user, allows users to log into the website.  

const UserSchema = Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Does the provided password match the stored password?  
UserSchema.methods.validPassword = function (plainTextPassword) {
    // TODO hash  
    return plainTextPassword === this.password;
};

module.exports = mongoose.model('User', UserSchema);