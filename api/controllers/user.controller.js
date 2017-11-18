const _ = require('lodash');
const User = require('../models/user');

const passport = require('passport');

// TEMP METHOD, allow us to create a user. 
exports.createUser = function (request, response, next) {

    const username = request.body.username;
    const password = request.body.password;

    if (!username || !_.isString(username)) {
        next({
            status: 400,
            message: 'Username is required!'
        });
        return;
    }

    if (!password || !_.isString(password)) {
        next({
            status: 400,
            message: 'Password is required!'
        });
        return;
    }

    const newUser = new User({
        username: username,
        password: password
    });

    newUser.save()
        .then(() => {
            response.json({
                message: 'saved new user!',
            });
        })
        .catch(next);
};

exports.login = function (request, response, next) {
    passport.authenticate('local', function (err, user) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return next({
                status: 401,
                message: 'Username or password was incorrect'
            });
        }

        const jwt = user.generateJwt();

        response.json({
            token: jwt
        });

    })(request, response, next);
};