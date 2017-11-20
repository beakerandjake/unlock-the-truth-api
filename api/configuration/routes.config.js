const errorHandler = require('api-error-handler');
const expressLimiter = require('express-limiter');
const redisClient = require('redis').createClient();
const questionTrackRoutes = require('../routes/question-track.routes');
const theTruthRoutes = require('../routes/the-truth.routes');
const userRoutes = require('../routes/user.routes');
const authErrorHandler = require('../middleware/auth-error.middleware');
const notFoundErrorHandler = require('../middleware/not-found.middleware');

// Configure our APIs routing. 

module.exports = function (app) {
    // Add our routes
    app.use('/api/questions', questionTrackRoutes);
    app.use('/api/thetruth', theTruthRoutes);
    app.use('/api/user', userRoutes);

    if (process.env.NODE_ENVIRONMENT === 'production') {
        // Put login route behind rate limiter.
        addRateLimiter(app, '/api/user');
    }

    // Auth error handling
    app.use(authErrorHandler);

    // Add 404 error handler. 
    app.use(notFoundErrorHandler);

    // Add error handler which returns JSON.
    app.use(errorHandler());
};

// Add rate limiter to specified route.  
function addRateLimiter(app, route) {
    // Create our rate limiter
    const rateLimiter = expressLimiter(app, redisClient);

    // Protect the login route behind rate limiter.
    rateLimiter({
        path: route,
        method: 'get',
        lookup: ['connection.remoteAddress'],
        // 150 requests per hour
        total: 150,
        expire: 1000 * 60 * 60
    });
}