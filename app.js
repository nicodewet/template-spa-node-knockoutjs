var express = require('express');
var app = express();
var path = require('path');

// set static directories
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', function (req, res) {
    // tell express to serve static files from the special
    // node variable __dirname which contains the current
    // folder
    res.sendFile(path.join(__dirname+ '/public/pages/index.html'));
});

app.get("/api/todos", function(req, res) {
    res.status(200).json([
    { name: "Item 1 from server", complete: false },
    { name: "Item 2 from server", complete: false },
    { name: "Completed Item from server", complete: true }
    ]);
    res.end();
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});