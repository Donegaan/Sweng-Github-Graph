
 function getUserInfo(){
  
  var formatStr = "empty";  
  var user = document.getElementById('gitUser').value; // Get username from textbox
  fetch('/submit?users='+user)
    .then(function(res) {
      return res.json();
    })
    .then(function(json) {
    var body = json;
    console.log(body);
    formatStr = '<br> Login: ' + body.login
    +'<br> ID: ' + body.id
    +'<br> URL: ' + body.url
    +'<br> Type: ' + body.type
    +'<br> Name: ' + body.name
    +'<br> Public Repos: ' + body.public_repos;
    var x = document.getElementById('user-data');
    x.innerHTML=formatStr; 
    x.style.display='block';
  });
}


function homeClick(){ // Hide graph and show user name input
  document.getElementById('graph').style.display='none';
  document.getElementById('data-injection').style.display='block';
}


function getInfo(){
  document.getElementById('data-injection').style.display='none';
  document.getElementById('user-data').style.display='none';  
  var x = document.getElementById('graph'); // To stop graph duplication
  while(x.firstChild){
    x.removeChild(x.firstChild);
  }
    fetch('/displayGraph') // Fetch to get Facebook information
    .then(function(res) {
        return res.text();
    }).then(function(json) {
        console.log(json);
        displayGraph(JSON.parse(json));
    });
    document.getElementById('graph').style.display='block';
}

function displayGraph(data){
    var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    g = svg.append("g").attr("transform", "translate(40,0)");

    var tree = d3.cluster()
    .size([height, width - 400]);

    var stratify = d3.stratify()
        .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

    var root = stratify(data)
      .sort(function(a, b) { return (a.height - b.height) || a.id.localeCompare(b.id); });

    tree(root);

    var link = g.selectAll(".link")
      .data(root.descendants().slice(1))
        .enter().append("path")
      .attr("class", "link")
      .attr("d", function(d) {
        return "M" + d.y + "," + d.x
            + "C" + (d.parent.y + 100) + "," + d.x
            + " " + (d.parent.y + 100) + "," + d.parent.x
            + " " + d.parent.y + "," + d.parent.x;
      });

    var node = g.selectAll(".node")
      .data(root.descendants())
        .enter().append("g")
      .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

    node.append("circle")
      .attr("r", 2.5);

    node.append("text")
      .attr("dy", 3)
      .attr("x", function(d) { return d.children ? -8 : 8; })
      .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
      .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });
}

