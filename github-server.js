//Initial code from http://scottksmith.com/blog/2014/05/02/building-restful-apis-with-node/

// Get the packages we need, using express package, documentation: https://www.npmjs.com/package/express-package
//alert("Test alert"); // To test if I have lnked the html file and the javascript file correctly
var express = require('express'); 
var passport = require('passport'); // For the user authentication
var fs = require('fs'); // File system for serving html page

// Create our Express application
var app = express();

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000
router.get('', function(req, res) {
  res.writeHead(200, {'Content-Type' :'text/html'});
  var readStream = fs.createReadStream(__dirname+'/github-info.html'); // Display html file on webpage
  readStream.pipe(res);
});

// Register all our routes with /api
app.use('', router);

// Start the server
app.listen(port);
console.log('Starting localhost on port ' + port);