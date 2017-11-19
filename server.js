const envConfig = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passportConfig = require('./api/configuration/passport.config');
const expressConfig = require('./api/configuration/express.config');
const routeConfig = require('./api/configuration/routes.config.js');

const port = process.env.PORT || 3000;
const app = express();

passportConfig();
expressConfig(app);
routeConfig(app);

connect()
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);

// Run our express app. 
function listen() {
    app.listen(port);
    console.log(`Listening on port ${port}.`);
}

// Connect to our DB. 
function connect() {
    const options = {
        useMongoClient: true
    };
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGODB_URI, options);
    return mongoose.connection;
}