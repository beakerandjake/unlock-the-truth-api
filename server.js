const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const questionTrackRoutes = require('./api/routes/question-track.routes');

// Add the routing for the question track. 
questionTrackRoutes(app);

// Start the server
app.listen(port, function(){
    console.log(`Listening on port ${port}.`);
});