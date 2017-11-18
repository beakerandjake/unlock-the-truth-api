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

// Expect this route to require user logged in. 
// If this method got invoked, the user is successfully logged in. 
exports.login = function (request, response, next) {
    response.sendStatus(200);
}

// Expect this route to require user logged in. 
// Clear the users login session. 
exports.logout = function (request, response, next) {
    request.logout();
    response.sendStatus(200);
}