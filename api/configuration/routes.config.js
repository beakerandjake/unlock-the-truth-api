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

    // Auth error handling
    app.use(authErrorHandler);

    // Add 404 error handler. 
    app.use(notFoundErrorHandler);

    // Add error handler which returns JSON.
    app.use(errorHandler());
};