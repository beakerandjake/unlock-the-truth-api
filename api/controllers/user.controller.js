const User = require('../models/user');

exports.createUser = function (request, response, next) {
    const newUser = new User({
        username: 'test',
        password: 'password'
    });

    newUser.save()
        .then(result => {
            response.json({
                message: 'saved new user!',
                user: result
            });
        })
        .catch(next);
};

// Expect this route to be protected by passport, if this method gets invoked,
// it means the user successfully logged in.
exports.login = function (request, response, next) {
    response.sendStatus(200);
}

exports.logout = function (request, response, next) {
    response.json("Great job!");
}