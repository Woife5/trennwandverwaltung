var fs = require('fs');
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
})

app.listen(80, function () {
  console.log('Example app listening on port 3000!')
})