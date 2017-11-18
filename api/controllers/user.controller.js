const User = require('../models/user');

exports.createUser = function (request, response, next) {
    const newUser = new User({
        username:'test',
        password:'password'
    });

    newUser.save()
        .then(result => {
            response.json({
                message:'saved new user!',
                user: result
            });
        })
        .catch(next);
};
