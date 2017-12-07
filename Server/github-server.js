//Initial code from http://scottksmith.com/blog/2014/05/02/building-restful-apis-with-node/

// Get the packages we need, using express package, documentation: https://www.npmjs.com/package/express-package
const express = require('express'); 
var github = require('octonode'); // Github api library from: https://github.com/pksunkara/octonod
var request = require('request');
const flJson = require('./flare.json');
var fetch = require('node-fetch');
var path = require('path');

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


// function modifyJson(body){ // Make functions to modify JSON data to work for graph
//   var formatStr = 'Login: ' + body.login
//   +'<br> ID: ' + body.id
//   +'<br> URL: ' + body.url
//   +'<br> Type: ' + body.type
//   +'<br> Name: ' + body.name
//   +'<br> Public Repos: ' + body.public_repos;
//   return formatStr;
// }

function jsonGraph(data){
  var str =new Array();

  var keys= Object.keys(data[0]);
  for(var i=0;i<data.length;i++){
    var tmp=data[i];
  for (var j=0 ;j<keys.length;j++){
      var test=tmp[keys[j]];
      //console.log(test);
      var tempdata = { id: 'facebook.'+tmp[keys[j]].toString().replace(/\./g, "*") , value : 0};
      str.push(tempdata);
  }
  //console.log(str);
}
  return str;
}

// http://localhost:3000/
app.get('/', (req, res)=> {
  //client.get('/users/donegaan', {}, function (err, status, body, headers) {
    //res.send(ghOrg.members(callback));
    //res.render('graph');
  //})
  //console.log(data.id);
    res.redirect('/home.html');
  //  var str = jsonGraph(data);

  //  res.render("/andrewgraph",data);
  // fetch('https://api.github.com/orgs/facebook') // Fetch to get Facebook information
  // .then(function(res) {
  //     return res.json();
  // }).then(function(json) {
  //     //var str = modifyJson(json);
  //     res.send(json);
  //  });
});


// Get the json file to populate the graph
app.get('/flare.json', (req, res)=> {
    res.send(flJson);
});

app.use(express.static('public'));
// Start the server
app.listen(port, ()=>{
  console.log('Listening to port ' + port);
});




var data = [
  {
    "login": "3rf",
    "id": 1242478,
    "avatar_url": "https://avatars1.githubusercontent.com/u/1242478?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/3rf",
    "html_url": "https://github.com/3rf",
    "followers_url": "https://api.github.com/users/3rf/followers",
    "following_url": "https://api.github.com/users/3rf/following{/other_user}",
    "gists_url": "https://api.github.com/users/3rf/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/3rf/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/3rf/subscriptions",
    "organizations_url": "https://api.github.com/users/3rf/orgs",
    "repos_url": "https://api.github.com/users/3rf/repos",
    "events_url": "https://api.github.com/users/3rf/events{/privacy}",
    "received_events_url": "https://api.github.com/users/3rf/received_events",
    "type": "User",
    "site_admin": false
  },
  {
    "login": "AJubatus",
    "id": 9111588,
    "avatar_url": "https://avatars2.githubusercontent.com/u/9111588?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/AJubatus",
    "html_url": "https://github.com/AJubatus",
    "followers_url": "https://api.github.com/users/AJubatus/followers",
    "following_url": "https://api.github.com/users/AJubatus/following{/other_user}",
    "gists_url": "https://api.github.com/users/AJubatus/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/AJubatus/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/AJubatus/subscriptions",
    "organizations_url": "https://api.github.com/users/AJubatus/orgs",
    "repos_url": "https://api.github.com/users/AJubatus/repos",
    "events_url": "https://api.github.com/users/AJubatus/events{/privacy}",
    "received_events_url": "https://api.github.com/users/AJubatus/received_events",
    "type": "User",
    "site_admin": false
  },
  {
    "login": "AWoloszyn",
    "id": 9043212,
    "avatar_url": "https://avatars1.githubusercontent.com/u/9043212?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/AWoloszyn",
    "html_url": "https://github.com/AWoloszyn",
    "followers_url": "https://api.github.com/users/AWoloszyn/followers",
    "following_url": "https://api.github.com/users/AWoloszyn/following{/other_user}",
    "gists_url": "https://api.github.com/users/AWoloszyn/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/AWoloszyn/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/AWoloszyn/subscriptions",
    "organizations_url": "https://api.github.com/users/AWoloszyn/orgs",
    "repos_url": "https://api.github.com/users/AWoloszyn/repos",
    "events_url": "https://api.github.com/users/AWoloszyn/events{/privacy}",
    "received_events_url": "https://api.github.com/users/AWoloszyn/received_events",
    "type": "User",
    "site_admin": false
  },
  {
    "login": "Addison-Huff",
    "id": 8195462,
    "avatar_url": "https://avatars1.githubusercontent.com/u/8195462?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/Addison-Huff",
    "html_url": "https://github.com/Addison-Huff",
    "followers_url": "https://api.github.com/users/Addison-Huff/followers",
    "following_url": "https://api.github.com/users/Addison-Huff/following{/other_user}",
    "gists_url": "https://api.github.com/users/Addison-Huff/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/Addison-Huff/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/Addison-Huff/subscriptions",
    "organizations_url": "https://api.github.com/users/Addison-Huff/orgs",
    "repos_url": "https://api.github.com/users/Addison-Huff/repos",
    "events_url": "https://api.github.com/users/Addison-Huff/events{/privacy}",
    "received_events_url": "https://api.github.com/users/Addison-Huff/received_events",
    "type": "User",
    "site_admin": false
  },
  {
    "login": "AgamAgarwal",
    "id": 4919246,
    "avatar_url": "https://avatars0.githubusercontent.com/u/4919246?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/AgamAgarwal",
    "html_url": "https://github.com/AgamAgarwal",
    "followers_url": "https://api.github.com/users/AgamAgarwal/followers",
    "following_url": "https://api.github.com/users/AgamAgarwal/following{/other_user}",
    "gists_url": "https://api.github.com/users/AgamAgarwal/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/AgamAgarwal/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/AgamAgarwal/subscriptions",
    "organizations_url": "https://api.github.com/users/AgamAgarwal/orgs",
    "repos_url": "https://api.github.com/users/AgamAgarwal/repos",
    "events_url": "https://api.github.com/users/AgamAgarwal/events{/privacy}",
    "received_events_url": "https://api.github.com/users/AgamAgarwal/received_events",
    "type": "User",
    "site_admin": false
  },
  {
    "login": "AlexeyKurakin",
    "id": 4902977,
    "avatar_url": "https://avatars1.githubusercontent.com/u/4902977?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/AlexeyKurakin",
    "html_url": "https://github.com/AlexeyKurakin",
    "followers_url": "https://api.github.com/users/AlexeyKurakin/followers",
    "following_url": "https://api.github.com/users/AlexeyKurakin/following{/other_user}",
    "gists_url": "https://api.github.com/users/AlexeyKurakin/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/AlexeyKurakin/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/AlexeyKurakin/subscriptions",
    "organizations_url": "https://api.github.com/users/AlexeyKurakin/orgs",
    "repos_url": "https://api.github.com/users/AlexeyKurakin/repos",
    "events_url": "https://api.github.com/users/AlexeyKurakin/events{/privacy}",
    "received_events_url": "https://api.github.com/users/AlexeyKurakin/received_events",
    "type": "User",
    "site_admin": false
  },
  {
    "login": "Alives",
    "id": 565994,
    "avatar_url": "https://avatars2.githubusercontent.com/u/565994?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/Alives",
    "html_url": "https://github.com/Alives",
    "followers_url": "https://api.github.com/users/Alives/followers",
    "following_url": "https://api.github.com/users/Alives/following{/other_user}",
    "gists_url": "https://api.github.com/users/Alives/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/Alives/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/Alives/subscriptions",
    "organizations_url": "https://api.github.com/users/Alives/orgs",
    "repos_url": "https://api.github.com/users/Alives/repos",
    "events_url": "https://api.github.com/users/Alives/events{/privacy}",
    "received_events_url": "https://api.github.com/users/Alives/received_events",
    "type": "User",
    "site_admin": false
  },
  {
    "login": "AnashOommen",
    "id": 4514952,
    "avatar_url": "https://avatars0.githubusercontent.com/u/4514952?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/AnashOommen",
    "html_url": "https://github.com/AnashOommen",
    "followers_url": "https://api.github.com/users/AnashOommen/followers",
    "following_url": "https://api.github.com/users/AnashOommen/following{/other_user}",
    "gists_url": "https://api.github.com/users/AnashOommen/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/AnashOommen/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/AnashOommen/subscriptions",
    "organizations_url": "https://api.github.com/users/AnashOommen/orgs",
    "repos_url": "https://api.github.com/users/AnashOommen/repos",
    "events_url": "https://api.github.com/users/AnashOommen/events{/privacy}",
    "received_events_url": "https://api.github.com/users/AnashOommen/received_events",
    "type": "User",
    "site_admin": false
  },
  {
    "login": "AndrewScull",
    "id": 2076497,
    "avatar_url": "https://avatars3.githubusercontent.com/u/2076497?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/AndrewScull",
    "html_url": "https://github.com/AndrewScull",
    "followers_url": "https://api.github.com/users/AndrewScull/followers",
    "following_url": "https://api.github.com/users/AndrewScull/following{/other_user}",
    "gists_url": "https://api.github.com/users/AndrewScull/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/AndrewScull/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/AndrewScull/subscriptions",
    "organizations_url": "https://api.github.com/users/AndrewScull/orgs",
    "repos_url": "https://api.github.com/users/AndrewScull/repos",
    "events_url": "https://api.github.com/users/AndrewScull/events{/privacy}",
    "received_events_url": "https://api.github.com/users/AndrewScull/received_events",
    "type": "User",
    "site_admin": false
  },
  {
    "login": "AnmAtAnm",
    "id": 9916202,
    "avatar_url": "https://avatars1.githubusercontent.com/u/9916202?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/AnmAtAnm",
    "html_url": "https://github.com/AnmAtAnm",
    "followers_url": "https://api.github.com/users/AnmAtAnm/followers",
    "following_url": "https://api.github.com/users/AnmAtAnm/following{/other_user}",
    "gists_url": "https://api.github.com/users/AnmAtAnm/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/AnmAtAnm/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/AnmAtAnm/subscriptions",
    "organizations_url": "https://api.github.com/users/AnmAtAnm/orgs",
    "repos_url": "https://api.github.com/users/AnmAtAnm/repos",
    "events_url": "https://api.github.com/users/AnmAtAnm/events{/privacy}",
    "received_events_url": "https://api.github.com/users/AnmAtAnm/received_events",
    "type": "User",
    "site_admin": false
  },
  {
    "login": "AquilesCanta",
    "id": 8539544,
    "avatar_url": "https://avatars1.githubusercontent.com/u/8539544?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/AquilesCanta",
    "html_url": "https://github.com/AquilesCanta",
    "followers_url": "https://api.github.com/users/AquilesCanta/followers",
    "following_url": "https://api.github.com/users/AquilesCanta/following{/other_user}",
    "gists_url": "https://api.github.com/users/AquilesCanta/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/AquilesCanta/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/AquilesCanta/subscriptions",
    "organizations_url": "https://api.github.com/users/AquilesCanta/orgs",
    "repos_url": "https://api.github.com/users/AquilesCanta/repos",
    "events_url": "https://api.github.com/users/AquilesCanta/events{/privacy}",
    "received_events_url": "https://api.github.com/users/AquilesCanta/received_events",
    "type": "User",
    "site_admin": false
  },
  {
    "login": "Artem-B",
    "id": 526795,
    "avatar_url": "https://avatars0.githubusercontent.com/u/526795?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/Artem-B",
    "html_url": "https://github.com/Artem-B",
    "followers_url": "https://api.github.com/users/Artem-B/followers",
    "following_url": "https://api.github.com/users/Artem-B/following{/other_user}",
    "gists_url": "https://api.github.com/users/Artem-B/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/Artem-B/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/Artem-B/subscriptions",
    "organizations_url": "https://api.github.com/users/Artem-B/orgs",
    "repos_url": "https://api.github.com/users/Artem-B/repos",
    "events_url": "https://api.github.com/users/Artem-B/events{/privacy}",
    "received_events_url": "https://api.github.com/users/Artem-B/received_events",
    "type": "User",
    "site_admin": false
  },
  {
    "login": "AthenaShi",
    "id": 1258476,
    "avatar_url": "https://avatars3.githubusercontent.com/u/1258476?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/AthenaShi",
    "html_url": "https://github.com/AthenaShi",
    "followers_url": "https://api.github.com/users/AthenaShi/followers",
    "following_url": "https://api.github.com/users/AthenaShi/following{/other_user}",
    "gists_url": "https://api.github.com/users/AthenaShi/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/AthenaShi/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/AthenaShi/subscriptions",
    "organizations_url": "https://api.github.com/users/AthenaShi/orgs",
    "repos_url": "https://api.github.com/users/AthenaShi/repos",
    "events_url": "https://api.github.com/users/AthenaShi/events{/privacy}",
    "received_events_url": "https://api.github.com/users/AthenaShi/received_events",
    "type": "User",
    "site_admin": false
  },
  {
    "login": "BSBandme",
    "id": 5126482,
    "avatar_url": "https://avatars0.githubusercontent.com/u/5126482?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/BSBandme",
    "html_url": "https://github.com/BSBandme",
    "followers_url": "https://api.github.com/users/BSBandme/followers",
    "following_url": "https://api.github.com/users/BSBandme/following{/other_user}",
    "gists_url": "https://api.github.com/users/BSBandme/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/BSBandme/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/BSBandme/subscriptions",
    "organizations_url": "https://api.github.com/users/BSBandme/orgs",
    "repos_url": "https://api.github.com/users/BSBandme/repos",
    "events_url": "https://api.github.com/users/BSBandme/events{/privacy}",
    "received_events_url": "https://api.github.com/users/BSBandme/received_events",
    "type": "User",
    "site_admin": false
  }
]