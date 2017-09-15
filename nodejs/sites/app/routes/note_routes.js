var request = require('request-promise');
var express = require('express');
const bodyParser = require('body-parser');

module.exports = function(app, db) {
	//GET OBJECT LEVEL RESULTS
	app.use(bodyParser.json());

	
	app.post('/getObjectResults', (req, res) => {
		
		//grab the variables from the incoming request
		var username = req.body.username;
		var pass = req.body.password;
		
		var monitorId = req.body.monitorId;
		var startTime = req.body.startTime;
		var endTime = req.body.endTime;
		
		var getToken = {
			uri: 'https://datafeed-api.dynatrace.com/publicapi/rest/v1.0/login?user=' + username + '&password=' + pass,
			rejectUnauthorized: false
		}
	
		//perform the getting of the token and then the getting of the data in a promise
		request(getToken)
			.then(function (resp) {
				token = 'bearer ' + resp;
		//get the json results data	
			var getData = {
				uri: 'https://datafeed-api.dynatrace.com/publicapi/rest/v1.0/testresults/' + monitorId + '?start=' + startTime + '&end=' + endTime + '&detailLevel=OBJECT',
				headers: {'Accept-Encoding': 'gzip,deflate', 'Accept': 'application/json', 'Authentication': token, 'Host': 'datafeed-api.dynatrace.com', 'Access-Control-Allow-Origin':'*'},
				rejectUnauthorized: false
			}
			
			return request(getData);
		})
		
		//return the results
		.then(function (resp2) {
			res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
			res.end(resp2);
			

		})
		
	});
	
	//GET ACTIVE TESTS
	app.get('/activeTests', (req, res) => {
		//grab the variables from the incoming request
		var username = "aemslie";
		var pass = "Dyn@trace1";

		var getToken = {
			uri: 'https://datafeed-api.dynatrace.com/publicapi/rest/v1.0/login?user=' + username + '&password=' + pass,
			rejectUnauthorized: false
		}		

		//perform the getting of the token and then the getting of the data in a promise
		request(getToken)
			.then(function (resp) {
				token = 'bearer ' + resp;
				
		//get the active test IDs	
			var getData = {
				uri: 'https://datafeed-api.dynatrace.com/publicapi/rest/v1.0/tests',
				headers: {'Accept-Encoding': 'gzip,deflate', 'Accept': 'application/json', 'Authentication': token, 'Host': 'datafeed-api.dynatrace.com', 'Access-Control-Allow-Origin':'*'},
				rejectUnauthorized: false
			}
			
			return request(getData);
		})
		
		//return the results
		.then(function (resp2) {
			res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
			res.end(resp2);
			

		})
		
	});
	
	//app.post('/getObjectResults', (req, res) => {
			
		
	//	console.log(req.body.username);
		
	//	res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
	//	res.end("test");
	//});
	
	app.options('/getObjectResults', (req, res) => {
			
		//var username = req.body.username;
		//console.log(username);
		
		res.writeHead(200, {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'content-type'});
		res.end("nice");
	});
};