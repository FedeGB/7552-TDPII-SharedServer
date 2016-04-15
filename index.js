var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pg = require('pg');

// views is directory for all template files
app.set('views', __dirname + '/views');

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var router = require('./app/router')(app);

app.use(express.static(__dirname + '/public'));

app.use('/', router);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
