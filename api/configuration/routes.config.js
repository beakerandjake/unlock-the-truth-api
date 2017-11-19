const questionTrackRoutes = require('../routes/question-track.routes');
const theTruthRoutes = require('../routes/the-truth.routes');
const userRoutes = require('../routes/user.routes');
const authErrorHandler = require('../middleware/auth-error.middleware');
const notFoundErrorHandler = require('../middleware/not-found.middleware');
const errorHandler = require('api-error-handler');

// Configure our APIs routing. 

module.exports = function (app) {
    // Add our routes
    app.use('/questions', questionTrackRoutes);
    app.use('/thetruth', theTruthRoutes);
    app.use('/user', userRoutes);

    // Auth error handling
    app.use(authErrorHandler);

    // Add 404 error handler. 
    app.use(notFoundErrorHandler);

    // Add error handler which returns JSON.
    app.use(errorHandler());
};