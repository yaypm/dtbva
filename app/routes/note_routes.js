var request = require('request-promise');
var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;

module.exports = function(app, db) {

	app.use(bodyParser.json());

	app.get('/', (req, res) => {
		
		res.sendFile(path.join(__dirname + '/index.html'));

	});
	
	app.get('/getOptions', (req, res) => {	
		var userId = req.header('userId');
		console.log(userId);
		
		var resp = "test";
		
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }

			var collection = db.collection('option');
			var results = collection.find({_id:userId}).toArray(function(err, items) {
				var resp = JSON.stringify(items[0]);
				console.log(JSON.stringify(resp));
				res.writeHead(200, {'Access-Control-Allow-Headers':'content-type'});
				res.end(resp);
			});
		});
	});
	
	app.post('/insertOptions', (req, res) => {
		var userId = req.body.userId;
		var it_downtime = req.body.it_downtime;
		var employee_productivity = req.body.employee_productivity;
		var incident_frequency = req.body.incident_frequency;
		var service_desk = req.body.service_desk;
		var sla_compliance = req.body.sla_compliance;
		var revenue_channels = req.body.revenue_channels;
		var cloud_bill = req.body.cloud_bill;
		var speed_market = req.body.speed_market;
		
		var company_name = req.body.company_name;
		var study_period = req.body.study_period;
		var dynatrace_cost = req.body.dynatrace_cost;
		var competitive_analysis = req.body.competitive_analysis;
		
		console.log('it_downtime is ' + it_downtime + '');
		console.log('employee_productivity is ' + employee_productivity + '');
		console.log('incident_frequency is ' + incident_frequency + '');
		console.log('service_desk is ' + service_desk + '');
		console.log('sla_compliance is ' + sla_compliance + '');
		console.log('revenue_channels is ' + revenue_channels + '');
		console.log('cloud_bill is ' + cloud_bill + '');
		console.log('speed_market is ' + speed_market + '');
		console.log('company_name is ' + company_name + '');
		console.log('study_period is ' + study_period + '');
		console.log('dynatrace_cost is ' + dynatrace_cost + '');
		console.log('competitive_analysis is ' + competitive_analysis + '');
		
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }

			var collection = db.collection('option');
			
			collection.update({'_id':userId},{$set:{'it_downtime':it_downtime,'employee_productivity':employee_productivity,'incident_frequency':incident_frequency,'service_desk':service_desk,'sla_compliance':sla_compliance,'revenue_channels':revenue_channels,'cloud_bill':cloud_bill,'speed_market':speed_market,'company_name':company_name,'study_period':study_period,'dynatrace_cost':dynatrace_cost,'competitive_analysis':competitive_analysis}});
		});
	
		res.writeHead(200, {'Access-Control-Allow-Headers':'content-type'});
		res.end("success!");
	});
};