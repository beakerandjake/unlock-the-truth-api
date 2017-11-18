const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


// Configure passport for the API.  

module.exports = function (passport) {

    // Use local strategy, hitting our DB to validate the user.  

    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({
                username: username
            }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect username.'
                    });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                return done(null, user);
            });
        }
    ));

    // Configure Passport authenticated session persistence.

    passport.serializeUser(function (user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(function (id, cb) {
        User.findById(id)
            .then(user => {
                cb(null, user);
            })
            .catch(error => {
                return cb(error);
            });
    });

};