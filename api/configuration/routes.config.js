const errorHandler = require('api-error-handler');
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

    if (process.env.NODE_ENV === 'production') {
        // Put login route behind rate limiter.
        addRateLimiter(app, '/api/user/login');
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
    const expressLimiter = require('express-limiter');
    const redisClient = require('redis').createClient({
        url: process.env.REDISTOGO_URL
    });

    // Create our rate limiter
    const rateLimiter = expressLimiter(app, redisClient);

    // Protect the route behind the limiter. 
    rateLimiter({
        path: route,
        method: 'all',
        lookup: ['connection.remoteAddress'],
        // 150 requests per hour
        total: 5,
        expire: 1000 * 60 * 60,
        onRateLimited: function (req, res, next) {
            next({
                message: 'Rate limit exceeded',
                status: 429
            });
        }
    });
}