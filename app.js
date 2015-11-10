var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// set static directories
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', function (req, res) {
    // tell express to serve static files from the special
    // node variable __dirname which contains the current
    // folder
    res.sendFile(path.join(__dirname+ '/public/pages/index.html'));
});

app.get("/api/todos", function(req, res) {
    res.status(200).json([
    { id: 1, name: "Item 1 from server", complete: false },
    { id: 2, name: "Item 2 from server", complete: false },
    { id: 3, name: "Completed Item from server", complete: true }
    ]);
    res.end();
});

app.put("/api/todos/:todoId", function(req, res) {
    console.log(req.params.todoId + ": " + JSON.stringify(req.body, null, 4));
    res.status(200);
    res.end();
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});