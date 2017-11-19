// Catches errors from the JWT middleware and generates a better error object. 

module.exports = function (error, req, res, next) {
    if (error && error.name === 'UnauthorizedError') {
        next({
            status:401,
            message: 'You are not authorized to perform that action.'
        });
    }

    next(error);
};