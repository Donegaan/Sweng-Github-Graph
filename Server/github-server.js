//Initial code from http://scottksmith.com/blog/2014/05/02/building-restful-apis-with-node/

// Get the packages we need, using express package, documentation: https://www.npmjs.com/package/express-package
const express = require('express'); 
var github = require('octonode'); // Github api library from: https://github.com/pksunkara/octonod
var request = require('request');
var fetch = require('node-fetch');
var path = require('path');

var client = github.client();
// client.requestDefaults['proxy'] = 'https://myproxy.com:1085'// For the request library


// var ghOrg = client.org('facebook');
//ghOrg.info();

// Create our Express application
const app = express();

//View engine
app.set('view engine','ejs');
// Use environment defined port or 3000
var port = process.env.PORT || 3000;



function modifyJson(body){ // Make functions to modify JSON data to work for graph
  var formatStr = 'Login: ' + body.login
  +'<br> ID: ' + body.id
  +'<br> URL: ' + body.url
  +'<br> Type: ' + body.type
  +'<br> Name: ' + body.name
  +'<br> Public Repos: ' + body.public_repos;
  return formatStr;
}

function jsonFormat(data){
  //console.log(data);
  var keys= Object.keys(data[0]);
  //console.log(keys);
  var nodes=keys.map(k=>({id: 'facebook.'+k,value:""})); // Add facebook. to every key
  //console.log(nodes);
  nodes.push({id:'facebook', values:""}); // Root
  //console.log(nodes);
  for(var i=0;i<data.length;i++){
    var tmp=data[i]; //JSON Data such as login
    //console.log(tmp);
    for (var j=0 ;j<keys.length;j++){
      //console.log(keys[j]);
      var tempdata = { id: 'facebook.'+keys[j]+'.'+tmp[keys[j]].toString().replace(/\./g, "*") , value : ((j*i)+j)};//Data for each key
      //console.log(tempdata);
      nodes.push(tempdata);
    }
  } 
  return nodes;
}

// http://localhost:3000/
app.get('/', (req, res)=> {
  res.redirect('/home.html');
});

// app.get('/home.html', (req,res)=>{
//   client.get('/users/donegaan', {}, function (err, status, body, headers) {
//     //console.log(body);
//     var str = modifyJson(body);
//     res.send(str);
//   });
// });

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
    //console.log(data);
  });
});

app.use(express.static('public'));
// Start the server
app.listen(port, ()=>{
  console.log('Listening to port ' + port);
});




var data1 = [
  {
    "login": "aaronabramov",
    "id": 940133,
    "avatar_url": "https://avatars3.githubusercontent.com/u/940133?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/aaronabramov",
    "html_url": "https://github.com/aaronabramov",
    "followers_url": "https://api.github.com/users/aaronabramov/followers",
    "following_url": "https://api.github.com/users/aaronabramov/following{/other_user}",
    "gists_url": "https://api.github.com/users/aaronabramov/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/aaronabramov/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/aaronabramov/subscriptions",
    "organizations_url": "https://api.github.com/users/aaronabramov/orgs",
    "repos_url": "https://api.github.com/users/aaronabramov/repos",
    "events_url": "https://api.github.com/users/aaronabramov/events{/privacy}",
    "received_events_url": "https://api.github.com/users/aaronabramov/received_events",
    "type": "User",
    "site_admin": false
  }
]