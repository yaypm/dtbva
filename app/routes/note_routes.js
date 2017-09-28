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
		console.log('cloud_bill is ' + cloud_bill + '');
		console.log('speed_market is ' + speed_market + '');
		console.log('company_name is ' + company_name + '');
		console.log('study_period is ' + study_period + '');
		console.log('dynatrace_cost is ' + dynatrace_cost + '');
		console.log('competitive_analysis is ' + competitive_analysis + '');
		
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }

			var collection = db.collection('option');
			
			collection.update({'_id':userId},{$set:{'it_downtime':it_downtime,'employee_productivity':employee_productivity,'incident_frequency':incident_frequency,'service_desk':service_desk,'sla_compliance':sla_compliance,'cloud_bill':cloud_bill,'speed_market':speed_market,'company_name':company_name,'study_period':study_period,'dynatrace_cost':dynatrace_cost,'competitive_analysis':competitive_analysis}});
		});
	
		res.writeHead(200, {'Access-Control-Allow-Headers':'content-type'});
		res.end("success!");
	});
	
	app.post('/insertExpectedBenefits', (req, res) => {
		var userId = req.body.userId;
		var dec_rev_incidents = req.body.dec_rev_incidents;
		var reduce_mttr = req.body.reduce_mttr;
		var increase_employee_prod = req.body.increase_employee_prod;
		var decrease_user_incidents = req.body.decrease_user_incidents;
		var reduce_incident_resolve = req.body.reduce_incident_resolve;
		var reduce_service_desk = req.body.reduce_service_desk;
		var reduce_sla_penalties = req.body.reduce_sla_penalties;
		var reduce_cloud_bill = req.body.reduce_cloud_bill;
		var increase_time_market = req.body.increase_time_market;
		
		console.log('dec_rev_incidents is ' + dec_rev_incidents + '');
		console.log('reduce_mttr is ' + reduce_mttr + '');
		console.log('increase_employee_prod is ' + increase_employee_prod + '');
		console.log('decrease_user_incidents is ' + decrease_user_incidents + '');
		console.log('reduce_incident_resolve is ' + reduce_incident_resolve + '');
		console.log('reduce_service_desk is ' + reduce_service_desk + '');
		console.log('reduce_sla_penalties is ' + reduce_sla_penalties + '');
		console.log('reduce_cloud_bill is ' + reduce_cloud_bill + '');
		console.log('increase_time_market is ' + increase_time_market + '');
		
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }
			
			var collection = db.collection('expected_benefits');
			
			var fullJson = {'_id':userId,'dec_rev_incidents':dec_rev_incidents,'reduce_mttr':reduce_mttr,'increase_employee_prod':increase_employee_prod,'decrease_user_incidents':decrease_user_incidents,'reduce_incident_resolve':reduce_incident_resolve,'reduce_service_desk':reduce_service_desk,'reduce_sla_penalties':reduce_sla_penalties,'reduce_cloud_bill':reduce_cloud_bill,'increase_time_market':increase_time_market};
			
			collection.find({_id:userId}).toArray(function(err, items) { 
		
				if(items[0] != undefined) {
					collection.update({'_id':userId},{$set:{'dec_rev_incidents':dec_rev_incidents,'reduce_mttr':reduce_mttr,'increase_employee_prod':increase_employee_prod,'decrease_user_incidents':decrease_user_incidents,'reduce_incident_resolve':reduce_incident_resolve,'reduce_service_desk':reduce_service_desk,'reduce_sla_penalties':reduce_sla_penalties,'reduce_cloud_bill':reduce_cloud_bill,'increase_time_market':increase_time_market}});							
				} 
				
				else {
					collection.insert(fullJson, {w:1}, function(err, result) { if(err!=null){console.log(err);}     console.log(result);    });								
				}
			});
			
		});
		
		res.writeHead(200, {'Access-Control-Allow-Headers':'content-type'});
		res.end("success!");
	});

	app.get('/getExpectedBenefits', (req, res) => {	
		var userId = req.header('userId');
		console.log(userId);
		
		var resp = "test";
		
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }

			var collection = db.collection('expected_benefits');
			var results = collection.find({_id:userId}).toArray(function(err, items) {
				var resp = JSON.stringify(items[0]);
				console.log(JSON.stringify(resp));
				res.writeHead(200, {'Access-Control-Allow-Headers':'content-type'});
				res.end(resp);
			});
		});
	});	

	app.post('/insertGeneralDetails', (req, res) => {
		var userId = req.body.userId;
		var bus_days = req.body.bus_days;
		var hours_day = req.body.hours_day;
		var avg_salary = req.body.avg_salary;
		var svc_desk_cost = req.body.svc_desk_cost;
		var rev_growth = req.body.rev_growth;
		var confidence = req.body.confidence;
		
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }
			
			var collection = db.collection('general');
			
			var fullJson = {'_id':userId,'bus_days':bus_days,'hours_day':hours_day,'avg_salary':avg_salary,'svc_desk_cost':svc_desk_cost,'rev_growth':rev_growth,'confidence':confidence};
			
			collection.find({_id:userId}).toArray(function(err, items) { 
		
				if(items[0] != undefined) {
					collection.update({'_id':userId},{$set:{'bus_days':bus_days,'hours_day':hours_day,'avg_salary':avg_salary,'svc_desk_cost':svc_desk_cost,'rev_growth':rev_growth,'confidence':confidence}});							
				} 
				
				else {
					collection.insert(fullJson, {w:1}, function(err, result) { if(err!=null){console.log(err);}     console.log(result);    });								
				}
			});
			
		});
		
		res.writeHead(200, {'Access-Control-Allow-Headers':'content-type'});
		res.end("success!");
	});	
	
	app.get('/getGeneralDetails', (req, res) => {	
		var userId = req.header('userId');
		console.log(userId);
		
		var resp = "test";
		
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }

			var collection = db.collection('general');
			var results = collection.find({_id:userId}).toArray(function(err, items) {
				var resp = JSON.stringify(items[0]);
				console.log(JSON.stringify(resp));
				res.writeHead(200, {'Access-Control-Allow-Headers':'content-type'});
				res.end(resp);
			});
		});
	});		

	app.post('/addApplication', (req, res) => {
		var userId = req.body.userId;
		var application_id = req.body.application_id;
		var application_name = req.body.application_name;
		var application_desc = req.body.application_desc;
		
		console.log('application_id is ' + application_id + '');
		console.log('application_name is ' + application_name + '');
		console.log('application_desc is ' + application_desc + '');	

		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }
			
			var collection = db.collection('applications');
			
			var fullJson = {'_id':application_id,'userId':userId,'application_name':application_name, 'application_desc': application_desc};
					
			collection.insert(fullJson, {w:1}, function(err, result) { if(err!=null){console.log(err);}     console.log(result);    });										
		});
		
		res.writeHead(200, {'Access-Control-Allow-Headers':'content-type'});
		res.end("success!");
	});	
	
	app.post('/deleteApplication', (req, res) => {
		var application_id = req.body.application_id;
		
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }
			
			var collection = db.collection('applications');
			
			collection.deleteOne( { _id: application_id } );			
		});
		
		res.writeHead(200, {'Access-Control-Allow-Headers':'content-type'});
		res.end("success!");
	});	

	app.get('/getApplications', (req, res) => {	
		var userId = req.header('userId');
		console.log(userId);
		
		var jsonStr = '{"application":[]}';
		var obj = JSON.parse(jsonStr);
		
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }

			var collection = db.collection('applications');
			var results = collection.find({'userId':userId}).toArray(function(err, items) {
				
				for(i=0; i < items.length; i++) {
					obj['application'].push({'id': items[i]._id, 'application_name':items[i].application_name, 'application_desc':items[i].application_desc})
				}
				
				console.log(obj.application[0].id);
				resp = JSON.stringify(obj);
				console.log(resp);
				res.writeHead(200, {'Access-Control-Allow-Headers':'content-type'});
				res.end(resp);
			});
		});
	});	

	app.post('/insertProductCosts', (req, res) => {
		var userId = req.body._id;
		var obj = req.body;
		
		console.log(userId);
		
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }
			
			var collection = db.collection('product_cost');
			
			collection.find({_id:userId}).toArray(function(err, items) { 
		
				if(items[0] != undefined) {
					console.log(obj.costs.length);
					for(i=0;i<obj.costs.length;i++) {
						var query = {};
						query["costs." + i + ".license_fees"] = obj.costs[i].license_fees;						
						query["costs." + i + ".maintenance"] = obj.costs[i].maintenance;	
						query["costs." + i + ".hardware"] = obj.costs[i].hardware;	
						query["costs." + i + ".implementation"] = obj.costs[i].implementation;	
						query["costs." + i + ".training"] = obj.costs[i].training;							
						
						collection.update({'_id':userId},{$set: query  });	
					}
					
				} 
				
				else {
					console.log("else");
					collection.insert(req.body, {w:1}, function(err, result) { if(err!=null){console.log(err);}     console.log(result);    });								
				}
			});			
													
		});
		
		res.writeHead(200, {'Access-Control-Allow-Headers':'content-type'});
		res.end("success!");
	});	
	
	app.get('/getProductCosts', (req, res) => {	
		var userId = req.header('userId');
		var noYears = req.header('noYears');
		console.log(noYears);
		
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }

			var collection = db.collection('product_cost');
			var results = collection.find({'_id':userId}).toArray(function(err, items) {
				//console.log(items);

				resp=JSON.stringify(items);
				console.log(resp);
				res.writeHead(200, {'Access-Control-Allow-Headers':'content-type'});
				res.end(resp);
			});
		});
	});		
};