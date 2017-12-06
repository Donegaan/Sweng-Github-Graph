//Initial code from http://scottksmith.com/blog/2014/05/02/building-restful-apis-with-node/

// Get the packages we need, using express package, documentation: https://www.npmjs.com/package/express-package
const express = require('express'); 
var github = require('octonode'); // Github api library from: https://github.com/pksunkara/octonod
var request = require('request');
const flJson = require('./flare.json');

var client = github.client();
client.requestDefaults['proxy'] = 'https://myproxy.com:1085'// For the request library


var ghOrg = client.org('facebook');
//ghOrg.info();

// Create our Express application
const app = express();

//View engine
app.set('view engine','ejs');
// Use environment defined port or 3000
var port = process.env.PORT || 3000;

function callback(err, data, headers) {
  console.log("error: " + err);
  console.log("data: " + data);
  console.log("headers:" + headers);
}

function jsonFormat(body){ // To display JSON data clearly
  //var str = JSON.stringify(body);
  var formatStr = 'Username: ' + body.login
  +'<br> ID: ' + body.id
  +'<br> URL: ' + body.url
  +'<br> Type: ' + body.type
  +'<br> Name: ' + body.name
  +'<br> Public Repos: ' + body.public_repos;
  return formatStr;
}

// Initial dummy route for testing
// http://localhost:3000/
app.get('/', (req, res)=> {
  //client.get('/users/donegaan', {}, function (err, status, body, headers) {
    // var str = jsonFormat(body);
    //res.send(body);
    res.send(ghOrg.members(callback));
    //console.log(body);
    //res.render('graph');
  //})
});
// Get the json file to populate the graph
app.get('/flare.json', (req, res)=> {
    res.send(flJson);
});
// Start the server
app.listen(port, ()=>{
  console.log('Listening to port ' + port);
});
