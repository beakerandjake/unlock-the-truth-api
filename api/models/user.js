const crypto = require('crypto');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

// Represents a user, allows users to log into the website.  

const UserSchema = Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

// Create virtual property that controllers can set. 
// When this property is set, it will automatically generate the salt/hash 
UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.getSalt();
        this.hashedPassword = this.hashPassword(password);
    })
    .get(function () {
        return this._password;
    });

// Does the provided password match the stored password?  
UserSchema.methods.validPassword = function (plainTextPassword) {
    return this.hashPassword(plainTextPassword) === this.hashedPassword;
};

// Returns a salt which is used to hash the password. 
UserSchema.methods.getSalt = function () {
    return crypto
        .randomBytes(Math.ceil(64 / 2))
        .toString('hex')
        .slice(0, 64);
};

// Generate a hashed version of the password. Returns '' if failed.
UserSchema.methods.hashPassword = function (password) {
    if (!password) {
        return '';
    }
    try {
        return crypto
            .createHmac('sha512', this.salt)
            .update(password)
            .digest('hex');
    } catch (err) {
        return '';
    }
};

// Return a signed JWT that represents this user.
UserSchema.methods.generateJwt = function () {
    return jwt.sign({}, process.env.JWT_SECRET, {
        subject: this.username,
        expiresIn: '7d'
    });
};

module.exports = mongoose.model('User', UserSchema);