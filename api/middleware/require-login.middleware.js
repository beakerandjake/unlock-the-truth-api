// Middleware which requires rejects any request which doesn't contain a user. 
module.exports = function (request, response, next) {
    if (request.user) {
        // Allow the request to continue if we have a user object.
        next();
    } else {
        // Return a 401 if we don't have a user. 
        next({
            status: 401,
            message: 'You must be logged in to perform this action!'
        });
    }
};