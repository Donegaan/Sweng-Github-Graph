//Initial code from http://scottksmith.com/blog/2014/05/02/building-restful-apis-with-node/

// Get the packages we need, using express package, documentation: https://www.npmjs.com/package/express-package
const express = require('express'); 
var github = require('octonode'); // Github api library from: https://github.com/pksunkara/octonod
var request = require('request');
var fetch = require('node-fetch');
var path = require('path');

var client = github.client();

// Create our Express application
const app = express();

//View engine
app.set('view engine','ejs');
// Use environment defined port or 3000
var port = process.env.PORT || 3000;




function jsonFormat(data){  // Function to modify JSON data to work for graph
  var keys= Object.keys(data[0]);
  var nodes=keys.map(k=>({id: 'facebook.'+k,value:""})); // Add facebook. to every key
  nodes.push({id:'facebook', values:""}); // Root

  for(var i=0;i<data.length;i++){
    var tmp=data[i]; //JSON Data such as login
    for (var j=0 ;j<keys.length;j++){
      if(tmp[keys[j]]!=null){
        var tempdata = { id: 'facebook.'+keys[j]+'.'+tmp[keys[j]].toString().replace(/\./g, "*") , value : ((j*i)+j)};//Data for each key
        nodes.push(tempdata);
      }
    }
  } 
  return nodes;
}

// http://localhost:3000/
app.get('/', (req, res)=> {
  res.sendfile('./public/home.html');
});

app.get('/submit', (req,res)=>{
  var user= req.query.users;
  client.get('/users/'+user, {}, function (err, status, body, headers) {
    res.send(body);
  });
});

var options ={
  url : 'https://api.github.com/orgs/facebook/members',
  headers : {'user-agent':'request'}
};

app.get('/displayGraph', (req, res)=> { // Display the JSON data through the graph
  //res.send(JSON.stringify(jsonFormat(data1)));
  request(options, function (error,response,body) {
    var data = JSON.parse(body);
    data = JSON.stringify(jsonFormat(data));
    res.send(data);
  });
});

app.use(express.static('public'));
// Start the server
app.listen(port, ()=>{
  console.log('Listening to port ' + port);
});

