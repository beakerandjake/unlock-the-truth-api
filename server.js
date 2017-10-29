const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const questionTrackRoutes = require('./api/routes/question-track.routes');

// Add helmet middleware. 
app.use(helmet());

// Add cors middleware. 
app.use(cors());

// Add JSON body parser middleware. 
app.use(bodyParser.json());

// Add the routing for the question track. 
questionTrackRoutes(app);

// Start the server
app.listen(port, function(){
    console.log(`Listening on port ${port}.`);
});