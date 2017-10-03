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
		console.log(userId + " is getting options");
		
		//var resp = "test";
		
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }

			var collection = db.collection('option');
			var results = collection.find({_id:userId}).toArray(function(err, items) {
				var resp = JSON.stringify(items[0]);
				
				console.log(userId + " received options");
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
		
		console.log(userId + " is inserting options");
		
		//console.log('it_downtime is ' + it_downtime + '');
		//console.log('employee_productivity is ' + employee_productivity + '');
		//console.log('incident_frequency is ' + incident_frequency + '');
		//console.log('service_desk is ' + service_desk + '');
		//console.log('sla_compliance is ' + sla_compliance + '');
		//console.log('cloud_bill is ' + cloud_bill + '');
		//console.log('speed_market is ' + speed_market + '');
		//console.log('company_name is ' + company_name + '');
		//console.log('study_period is ' + study_period + '');
		//console.log('dynatrace_cost is ' + dynatrace_cost + '');
		//console.log('competitive_analysis is ' + competitive_analysis + '');
		
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }

			var collection = db.collection('option');
			
			collection.update({'_id':userId},{$set:{'it_downtime':it_downtime,'employee_productivity':employee_productivity,'incident_frequency':incident_frequency,'service_desk':service_desk,'sla_compliance':sla_compliance,'cloud_bill':cloud_bill,'speed_market':speed_market,'company_name':company_name,'study_period':study_period,'dynatrace_cost':dynatrace_cost,'competitive_analysis':competitive_analysis}});
		});
		console.log(userId + " inserted options");
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
		
		console.log(userId + " is inserting expected benefits");
		
		//console.log('dec_rev_incidents is ' + dec_rev_incidents + '');
		//console.log('reduce_mttr is ' + reduce_mttr + '');
		//console.log('increase_employee_prod is ' + increase_employee_prod + '');
		//console.log('decrease_user_incidents is ' + decrease_user_incidents + '');
		//console.log('reduce_incident_resolve is ' + reduce_incident_resolve + '');
		//console.log('reduce_service_desk is ' + reduce_service_desk + '');
		//console.log('reduce_sla_penalties is ' + reduce_sla_penalties + '');
		//console.log('reduce_cloud_bill is ' + reduce_cloud_bill + '');
		//console.log('increase_time_market is ' + increase_time_market + '');
		
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }
			
			var collection = db.collection('expected_benefits');
			
			var fullJson = {'_id':userId,'dec_rev_incidents':dec_rev_incidents,'reduce_mttr':reduce_mttr,'increase_employee_prod':increase_employee_prod,'decrease_user_incidents':decrease_user_incidents,'reduce_incident_resolve':reduce_incident_resolve,'reduce_service_desk':reduce_service_desk,'reduce_sla_penalties':reduce_sla_penalties,'reduce_cloud_bill':reduce_cloud_bill,'increase_time_market':increase_time_market};
			
			collection.find({_id:userId}).toArray(function(err, items) { 
		
				if(items[0] != undefined) {
					collection.update({'_id':userId},{$set:{'dec_rev_incidents':dec_rev_incidents,'reduce_mttr':reduce_mttr,'increase_employee_prod':increase_employee_prod,'decrease_user_incidents':decrease_user_incidents,'reduce_incident_resolve':reduce_incident_resolve,'reduce_service_desk':reduce_service_desk,'reduce_sla_penalties':reduce_sla_penalties,'reduce_cloud_bill':reduce_cloud_bill,'increase_time_market':increase_time_market}});		
					console.log(userId + " updated expected benefits");
				} 
				
				else {
					collection.insert(fullJson, {w:1}, function(err, result) { if(err!=null){console.log(err);}     console.log(userId + " inserted fresh expected benefits");    });								
				}
			});
			
		});
		
		res.writeHead(200, {'Access-Control-Allow-Headers':'content-type'});
		res.end("success!");
	});

	app.get('/getExpectedBenefits', (req, res) => {	
		var userId = req.header('userId');
		console.log(userId + " is getting expected benefits");
		
		var resp = "test";
		
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }

			var collection = db.collection('expected_benefits');
			var results = collection.find({_id:userId}).toArray(function(err, items) {
				var resp = JSON.stringify(items[0]);
				console.log(userId + " retrieved expected benefits");
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
		
		console.log(userId + " is inserting general details");
		
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }
			
			var collection = db.collection('general');
			
			var fullJson = {'_id':userId,'bus_days':bus_days,'hours_day':hours_day,'avg_salary':avg_salary,'svc_desk_cost':svc_desk_cost,'rev_growth':rev_growth,'confidence':confidence};
			
			collection.find({_id:userId}).toArray(function(err, items) { 
		
				if(items[0] != undefined) {
					collection.update({'_id':userId},{$set:{'bus_days':bus_days,'hours_day':hours_day,'avg_salary':avg_salary,'svc_desk_cost':svc_desk_cost,'rev_growth':rev_growth,'confidence':confidence}});		
					console.log(userId + " updated general details");		
				} 
				
				else {
					collection.insert(fullJson, {w:1}, function(err, result) { if(err!=null){console.log(err);}     console.log(userId + " inserted new general details");   });								
				}
			});
			
		});
		
		res.writeHead(200, {'Access-Control-Allow-Headers':'content-type'});
		res.end("success!");
	});	
	
	app.get('/getGeneralDetails', (req, res) => {	
		var userId = req.header('userId');
		console.log(userId + " is getting general details");
		
		//var resp = "test";
		
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }

			var collection = db.collection('general');
			var results = collection.find({_id:userId}).toArray(function(err, items) {
				var resp = JSON.stringify(items[0]);
				console.log(userId + " retrieved general details");
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
		
		console.log(userId + " is adding an application");	

		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }
			
			var collection = db.collection('applications');
			
			var fullJson = {'_id':application_id,'userId':userId,'application_name':application_name, 'application_desc': application_desc};
					
			collection.insert(fullJson, {w:1}, function(err, result) { if(err!=null){console.log(err);}     console.log(userId + " inserted an application");    });										
		});
		
		res.writeHead(200, {'Access-Control-Allow-Headers':'content-type'});
		res.end("success!");
	});	
	
	app.post('/deleteApplication', (req, res) => {
		var application_id = req.body.application_id;
		
		console.log(userId + " is deleting an application");
		
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }
			
			var collection = db.collection('applications');
			
			collection.deleteOne( { _id: application_id } );
				
			console.log(userId + " deleted an application");	
		});
		
		res.writeHead(200, {'Access-Control-Allow-Headers':'content-type'});
		res.end("success!");
	});	

	app.get('/getApplications', (req, res) => {	
		var userId = req.header('userId');
		console.log(userId + " is getting applications");
		
		var jsonStr = '{"application":[]}';
		var obj = JSON.parse(jsonStr);
		
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }

			var collection = db.collection('applications');
			var results = collection.find({'userId':userId}).toArray(function(err, items) {
				
				for(i=0; i < items.length; i++) {
					obj['application'].push({'id': items[i]._id, 'application_name':items[i].application_name, 'application_desc':items[i].application_desc})
				}
				
				console.log(userId + " retrieved applications");
				resp = JSON.stringify(obj);
				
				res.writeHead(200, {'Access-Control-Allow-Headers':'content-type'});
				res.end(resp);
			});
		});
	});	

	app.post('/insertProductCosts', (req, res) => {
		var userId = req.body._id;
		var obj = req.body;
		
		console.log(userId + " is inserting product costs");
		
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }
			
			var collection = db.collection('product_cost');
			
			collection.find({_id:userId}).toArray(function(err, items) { 
		
				if(items[0] != undefined) {
					
					for(i=0;i<obj.costs.length;i++) {
						var query = {};
						query["costs." + i + ".license_fees"] = obj.costs[i].license_fees;						
						query["costs." + i + ".maintenance"] = obj.costs[i].maintenance;	
						query["costs." + i + ".hardware"] = obj.costs[i].hardware;	
						query["costs." + i + ".implementation"] = obj.costs[i].implementation;	
						query["costs." + i + ".training"] = obj.costs[i].training;							
						
						collection.update({'_id':userId},{$set: query  });	
					}
					
					console.log(userId + " updated product costs");
				} 
				
				else {
					
					collection.insert(req.body, {w:1}, function(err, result) { if(err!=null){console.log(err);}     console.log(userId + " inserted new product costs");   });								
				}
			});			
													
		});
		
		res.writeHead(200, {'Access-Control-Allow-Headers':'content-type'});
		res.end("success!");
	});	
	
	app.get('/getProductCosts', (req, res) => {	
		var userId = req.header('userId');
		var noYears = req.header('noYears');
		
		console.log(userId + " is getting product costs");
		
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }

			var collection = db.collection('product_cost');
			var results = collection.find({'_id':userId}).toArray(function(err, items) {
				//console.log(items);

				console.log(userId + " retrieved product costs");
				resp=JSON.stringify(items);
				
				res.writeHead(200, {'Access-Control-Allow-Headers':'content-type'});
				res.end(resp);
			});
		});
	});	

	app.post('/insertApplicationDetails', (req, res) => {
		var userId = req.body._id;
		var obj = req.body;
		
		console.log(userId + " is inserting application details");
		
		
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }
			
			var collection = db.collection('application_details');
			
			collection.find({_id:userId}).toArray(function(err, items) { 
				
				if(items[0] != undefined) {
					//console.log(items);
					
					var query = {};
					
					var keys = Object.keys(items[0]);
					
					for(i=1;i<keys.length;i++) {
					
						
						query[keys[i]] = {};
						query[keys[i]].avgusers = obj[keys[i]].avgusers;
						query[keys[i]].peakusers = obj[keys[i]].peakusers;
						query[keys[i]].intext = obj[keys[i]].intext;
						query[keys[i]].downtimecost = obj[keys[i]].downtimecost;
						query[keys[i]].impactemployeeprod = obj[keys[i]].impactemployeeprod;
						query[keys[i]].impactcompet = obj[keys[i]].impactcompet;
						query[keys[i]].incidentsmonth = obj[keys[i]].incidentsmonth;
						query[keys[i]].userimpactpercent = obj[keys[i]].userimpactpercent;
						query[keys[i]].currentmttr = obj[keys[i]].currentmttr;
						query[keys[i]].bustranperday = obj[keys[i]].bustranperday;
						query[keys[i]].hourlyrevbususer = obj[keys[i]].hourlyrevbususer;
						query[keys[i]].avgbustrantime = obj[keys[i]].avgbustrantime;
						query[keys[i]].userimpactpercentppl = obj[keys[i]].userimpactpercentppl;
						query[keys[i]].svcdeskpermonth = obj[keys[i]].svcdeskpermonth;
						query[keys[i]].currentincidentsmonth = obj[keys[i]].currentincidentsmonth;
						query[keys[i]].staffhoursincident = obj[keys[i]].staffhoursincident;
						query[keys[i]].staffissueresolve = obj[keys[i]].staffissueresolve;
						query[keys[i]].potentialmonthlypenalties = obj[keys[i]].potentialmonthlypenalties;
						query[keys[i]].currentsla = obj[keys[i]].currentsla;
						query[keys[i]].slareporthours = obj[keys[i]].slareporthours;
						
											
					}
					
					
					collection.update({'_id':userId},{$set: query  });			
						
						
					console.log(userId + " updated application details");
					
				} 
				
				else {
					
					collection.insert(req.body, {w:1}, function(err, result) { if(err!=null){console.log(err);}     console.log(userId + " inserted new application details");    });								
				}
			});			
													
		});
		
		res.writeHead(200, {'Access-Control-Allow-Headers':'content-type'});
		res.end("success!");
	});	

	app.get('/getApplicationDetails', (req, res) => {	
		var userId = req.header('userId');
		
		console.log(userId + " is getting application details");
		
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }

			var collection = db.collection('application_details');
			var results = collection.find({'_id':userId}).toArray(function(err, items) {

				console.log(userId + " retrieved application details");
				resp=JSON.stringify(items);
				res.writeHead(200, {'Access-Control-Allow-Headers':'content-type'});
				res.end(resp);
			});
		});
	});	

	app.get('/createUser', (req, res) => {	
		var userId = req.header('userId');
		var newEmail = req.header('emailAddress');
		
		console.log(userId + " is being created");
		MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
			if(err) { return console.dir(err); }

			//create user
			var collection = db.collection('user');
			var fullJson = ({'_id':userId,'email':newEmail});			
			collection.insert(fullJson, {w:1}, function(err, result) { if(err!=null){console.log(err);}     console.log(userId + " inserted new user table");    });
			
			//create expected benefits
			var collection = db.collection('expected_benefits');
			var fullJson = {'_id':userId,'dec_rev_incidents':'','reduce_mttr':'','increase_employee_prod':'','decrease_user_incidents':'','reduce_incident_resolve':'','reduce_service_desk':'','reduce_sla_penalties':'','reduce_cloud_bill':'','increase_time_market':''};
			collection.insert(fullJson, {w:1}, function(err, result) { if(err!=null){console.log(err);}     console.log(userId + " inserted new expected benefits table");    });
			
			//create general
			var collection = db.collection('general');
			var fullJson = {'_id':userId,'bus_days':'','hours_day':'','avg_salary':'','svc_desk_cost':'','rev_growth':'','confidence':'70'};
			collection.insert(fullJson, {w:1}, function(err, result) { if(err!=null){console.log(err);}     console.log(userId + " inserted new general table");    });
			
			//create options
			var collection = db.collection('option');
			var fullJson = {'_id':userId,'it_downtime':true,'employee_productivity':true,'incident_frequency':true,'service_desk':true,'sla_compliance':true,'cloud_bill':true,'speed_market':true,'company_name':'','study_period':3,'dynatrace_cost':true,'competitive_analysis':true};
			collection.insert(fullJson, {w:1}, function(err, result) { if(err!=null){console.log(err);}     console.log(userId + " inserted new options table");    });
			
			
			console.log(userId + " was created");
				//resp=JSON.stringify(items);
				res.writeHead(200, {'Access-Control-Allow-Headers':'content-type'});
				res.end("success!");
			});
		});
			
};