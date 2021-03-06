var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var wss = require('./websockets-server');
var mime = require('mime');

mime.define({
  'text/css': ['css', 'cs', 'x-sfml'],
  'application/x-my-type': ['x-mt', 'x-mtt'],
});

var handleError = function(err, res) {
  res.writeHead(404);
  res.end();
};

var server = http.createServer(function(req, res) {
  console.log('Responding to a request.');

  var filePath = extract(req.url);
  var fileType = mime.lookup(filePath);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      res.setHeader('Content-Type', fileType);
      res.end(data);
    }
  });
});
server.listen(3000);
