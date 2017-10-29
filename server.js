const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const questionTrackRoutes = require('./api/routes/question-track.routes');

// Configure the application to use cors. 
app.use(cors());

// Configure the application to use the JSON body parser middleware. 
app.use(bodyParser.json());

// Add the routing for the question track. 
questionTrackRoutes(app);

// Start the server
app.listen(port, function(){
    console.log(`Listening on port ${port}.`);
});