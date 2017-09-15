var request = require('request-promise');
var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');

module.exports = function(app, db) {
	//GET OBJECT LEVEL RESULTS
	app.use(bodyParser.json());

	app.get('/', (req, res) => {
		//res.sendFile('/index.html');
		
		res.sendFile(path.join(__dirname + '/index.html'));
		//res.writeHead(200, {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'content-type'});
		//res.end("nice");
	});
	
	app.get('/getObjectResults', (req, res) => {
		
		res.writeHead(200, {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'content-type'});
		res.end("nice");
	});
};