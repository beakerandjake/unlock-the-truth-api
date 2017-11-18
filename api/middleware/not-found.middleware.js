var statuses = require('statuses');

// Middleware that handles 404 not found. 
module.exports = function (req, res) {
    res.status(404).send(statuses[404]);
};