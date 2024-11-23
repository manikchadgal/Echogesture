var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  // Read the 'index.html' file
  fs.readFile('index.html', function(err, data) {
    if (err) {
      // If there's an error, respond with a 500 Internal Server Error
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('Internal Server Error');
      console.error('Error reading file:', err);
      return;
    }
    // If successful, respond with the contents of the file
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(8080);
