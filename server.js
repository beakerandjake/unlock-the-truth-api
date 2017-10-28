const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', function(request, response){
    response.send('Hello world!');
});

app.listen(port, function(){
    console.log('Listening on port 3000.');
});