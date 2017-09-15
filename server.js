var http = require('http');
var https = require('https');
var request = require('request-promise');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');	
var app = express();

var port = 80;

//app.use('/static', express.static(__dirname + '/static'));

app.use('/static', express.static(path.join(__dirname, 'static')))

app.use(bodyParser.urlencoded({ extended: true }));	
require('./app/routes')(app, {});	
	
app.listen(port, () => {
  console.log('We are live on ' + port);
});	