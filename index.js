var express = require('express');
var app = express();
var path = __dirname + '/views';
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(app.get('views') + '/index.html');
});

app.get('/register', function (req, res) {
  res.sendFile(app.get('views') + '/register.html');
});

app.get('/users', function (req, res) {
  res.sendFile(app.get('views') + '/users.html');
});

// views is directory for all template files
app.set('views', __dirname + '/views');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


