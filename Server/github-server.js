//Initial code from http://scottksmith.com/blog/2014/05/02/building-restful-apis-with-node/

// Get the packages we need, using express package, documentation: https://www.npmjs.com/package/express-package
//alert("Test alert"); // To test if I have lnked the html file and the javascript file correctly
const express = require('express'); 
var passport = require('passport'); // For the user authentication
var github = require('octonode'); // Github api library from: https://github.com/pksunkara/octonode
//var fs = require('fs'); // File system for serving html page




// {
//   username: 'donegaan',
//   password: 'password'
// });

var client = github.client('9238a976959a933e171c2d937fa017b85216d9e0'); // This is my access token, its email read only

// Create our Express application
const app = express();

//View engine
app.set('view engine','ejs');
// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
//var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000
app.get('/', (req, res)=> {
  client.get('/user', {}, function (err, status, body, headers) {
    res.send(JSON.stringify(body, null, 4));
    //res.render('homePage');
  });
});


// Register all our routes with /api
//app.use('', router);

// Start the server
app.listen(port, ()=>{
  console.log('Listening to port ' + port);
});
