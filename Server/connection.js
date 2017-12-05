const mongoose = require('mongoose');

// Connect to mongodb for database for github data
mongoose.connect('mongodb://localhost/swengtestDB');

mongoose.Connection.once('open', function(){
    console.log('Connection made');
}).on('error', function(){
    console.log('Connection error',error);
});
