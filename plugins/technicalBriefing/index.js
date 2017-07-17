'use strict';

var https = require('https');
const request = require('request-promise');
var et = require("elementtree");
var test, test2, test3;
/**
 * The DavisWeather class is the core of the plugin and an
 * instance of DavisWeather is what will be loaded into Davis
 */
class TechnicalBriefing {

  /**
   * The main body of work is done in the constructor.
   */
  constructor(davis, options) {
    this.davis = davis;
    this.options = options;

    // This is where we declare our intents.
    this.intents = {
      // Our intent name
      technicalBriefing: {
        // A basic description of the intent
        usage: 'Get your technical briefing',

        // Phrases that will trigger our intent. Note that they will not
        // need to be matched exactly in order for the intent to run.
        phrases: [
          'morning technical briefing',
        ],

        // Lifecycle Events are friendly names for the steps that an intent
        // needs to take in order to run successfully. For instance, our intent
        // will need to gather data from the weather underground API, then will
        // need to respond to the user, so I have broken it up into those events.
        lifecycleEvents: [
          'gatherData',
          'respond',
        ],
      },
    };

    // Hooks give intents functionality.
    // They are called serially when an intent is run.
    // They are named using the 'intentName:lifecycleEvent'
    // Each hook is called with 2 arguments: the exchange object,
    // and a context object. The exchange object is the primary
    // interface between Davis, a user, and a plugin. The context
    // object holds any state carried over from previous exchanges.
    this.hooks = {
      'technicalBriefing:gatherData': (exchange, context) => {	     
	        
	var appmon_username = process.env.APPMON_USERNAME;
	var appmon_password = process.env.APPMON_PASSWORD;
	
	const opts = {
    		uri: 'https://dynatrace.demo.dynatrace.com:8021/rest/management/reports/create/Davis%20Test%20Technical?type=XML&format=XML+Export',
  		headers: {'Authorization': 'Basic ' + new Buffer(appmon_username + ':' + appmon_password).toString('base64')},
  		rejectUnauthorized: false
  	}
 
	const opts2 = {
    		uri: 'https://dynatrace.demo.dynatrace.com:8021/api/v2/alerts?systemprofile=easyTravel&state=Created&from=2017-07-17T00%3A00%3A01%2B00%3A00&to=2017-07-18T00%3A00%3A01%2B00%3A00',
  		headers: {'Authorization': 'Basic ' + new Buffer(appmon_username + ':' + appmon_password).toString('base64')},
  		rejectUnauthorized: false
  	}
	
	const opts3 = {
    		uri: 'https://dynatrace.demo.dynatrace.com:8021/api/v2/alerts?systemprofile=easyTravel&state=Created&from=2017-07-16T00%3A00%3A01%2B00%3A00&to=2017-07-17T00%3A00%3A01%2B00%3A00',
  		headers: {'Authorization': 'Basic ' + new Buffer(appmon_username + ':' + appmon_password).toString('base64')},
  		rejectUnauthorized: false
  	}	
	
	return request(opts)
    		.then(resp => {
		test = resp;})
	        .then(function() {
     			return request(opts2);
		})
	        .then(resp => {
		test2 = resp;})
	        .then(function() {
			return request(opts3);
		})
	      	.then(resp => {
		test3 = resp;})
    		
      },
      'technicalBriefing:respond': (exchange, context) => {    
 
	console.log('respond');  
	//console.log(test2);
	
	var obj;      
	obj = JSON.parse(test2);
	var alertsLen = Object.keys(obj.alerts).length;
	var alertsToday = alertsLen / 3;      
	console.log(alertsLen);  
	      
	var obj2;
	obj2 = JSON.parse(test3);
	var alertsLen2 = Object.keys(obj2.alerts).length;
	var alertsYest = alertsLen2 / 3;      
	console.log(alertsYest); 
	
	var alertTrend = alertsToday / alertsYest;
	      
	if(alertTrend > 1) {
		var alertChange = 'up';
	}
	else {
		var alertChange = 'down';
	}
	      
	var data, etree;
 
	data = test;
	etree = et.parse(data);
	
	var appMon0, appMon1, appMon2, appMon3, appMon4, appMon5, appMon6, appMon7, appMon8, appMon9, appMon10, appMon11, appMon12, appMon13;
	
	var appMon0 = etree.findall('./data/textandmeasure/textmeasurecontent')[0].text;     
	var appMon1 = etree.findall('./data/textandmeasure/textmeasurecontent')[1].text;
	
	//Login Failure Trend
	var loginFailureTrend = appMon1 / appMon0;
	      
	if(loginFailureTrend > 1) {
		var loginFailure = 'up';
	}
	else {
		var loginFailure = 'down';
	}	
	      
	var appMon2 = etree.findall('./data/textandmeasure/textmeasurecontent')[2].text;
	      var appMon2 = appMon2 / 1000;
	var appMon3 = etree.findall('./data/textandmeasure/textmeasurecontent')[3].text;
	      var appMon3 = appMon3 / 1000;
	
	// Login Response Trend      
	var loginResponseTrend = appMon2 / appMon3;
	
	if(loginResponseTrend > 1) {
		var loginResponse = 'up';
	}
	else {
		var loginResponse = 'down';
	}
	      
	var appMon4 = etree.findall('./data/textandmeasure/textmeasurecontent')[4].text;     
	var appMon5 = etree.findall('./data/textandmeasure/textmeasurecontent')[5].text;
	
	//Payment Failure Trend      
	var paymentFailureTrend = appMon5 / appMon4;      
	      
	if(paymentFailureTrend > 1) {
		var paymentFailure = 'up';
	}
	else {
		var paymentFailure = 'down';
	}        
	      
	var appMon6 = etree.findall('./data/textandmeasure/textmeasurecontent')[6].text;
	      var appMon6 = appMon6 / 1000;
	var appMon7 = etree.findall('./data/textandmeasure/textmeasurecontent')[7].text;
	      var appMon7 = appMon7 / 1000;
	      
	//Payment Response Trend      
	var paymentResponseTrend = appMon6 / appMon7;      
	      
	if(paymentResponseTrend > 1) {
		var paymentResponse = 'up';
	}
	else {
		var paymentResponse = 'down';
	}     
	      
	var appMon8 = etree.findall('./data/textandmeasure/textmeasurecontent')[8].text;
	var appMon9 = etree.findall('./data/textandmeasure/textmeasurecontent')[9].text;
	
	//Frustrated Trend      
	var frustratedTrend = appMon8 / appMon9;      
	      
	if(frustratedTrend > 1) {
		var frustrated = 'up';
	}
	else {
		var frustrated = 'down';
	}  	      
	      
	var appMon10 = etree.findall('./data/textandmeasure/textmeasurecontent')[10].text;
	var appMon11 = etree.findall('./data/textandmeasure/textmeasurecontent')[11].text;
	      var appMon11 = appMon11 / 1000;
	var appMon12 = etree.findall('./data/textandmeasure/textmeasurecontent')[12].text;
	var appMon13 = etree.findall('./data/textandmeasure/textmeasurecontent')[13].text;
	      var appMon13 = appMon13 / 1000;
	
	//Search Response Trend      
	var searchResponseTrend = appMon13 / appMon11;      
	      
	if(searchResponseTrend > 1) {
		var searchResponse = 'up';
	}
	else {
		var searchResponse = 'down';
	}    
	      
	//Search Failure Trend      
	var searchFailureTrend = appMon10 / appMon12;      
	      
	if(searchFailureTrend > 1) {
		var searchFailure = 'up';
	}
	else {
		var searchFailure = 'down';
	}          
	      
	let out = 'OK, here is your technical briefing. Today ';
	out += appMon8;
	out += ' percent of users were frustrated, ';
	out += frustrated;
	out += ' from ';      
	out += appMon9;
	out += ' percent yesterday and there were ';
	out += alertsToday;
	out += ' alerts yesterday, ';
	out += alertChange;
	out += ' from ';
	out += alertsYest;
	out += ' alerts yesterday. ';      
	out += ' Performance of your key transactions is as follows, login took '; 
	out += appMon2;      
	out += ' seconds ';
	out += loginResponse;
	out += ' from ';        
	out += appMon3;
	out += ' seconds yesterday. Today login has a failure rate of ';
	out += appMon1;
	out += ' percent ';
	out += loginFailure;
	out += ' from ';        
	out += appMon0;
	out += ' percent yesterday. Search is currently taking ';
	out += appMon13;
	out += ' seconds ';
	out += searchResponse;
	out += ' from ';        
	out += appMon11;
	out += ' seconds yesterday. So far today, search has had a ';
	out += appMon10;
	out += ' percent failure rate ';
	out += searchFailure;
	out += ' from ';        
	out += appMon12;
	out += ' percent yesterday. Finally, payments are currently taking ';
	out += appMon6;
	out += ' seconds ';
	out += paymentResponse;
	out += ' from ';        
	out += appMon7;    
	out += ' yesterday, and are failing ';
	out += appMon5;
	out += ' percent of the time ';
	out += paymentFailure;
	out += ' from ';        
	out += appMon4;
	out += ' percent yesterday.';      
	      
	var linkUrl = "https://dynatrace.demo.dynatrace.com:9911/index.jsp#dashboard;db=97e1a4f4-a524-4648-a4cd-beecc474c31a";
	this.davis.server.pushLinkToUser(exchange.user, linkUrl, true);      
	      
	exchange
          	.response(out) // respond to the user
          	.smartEnd() // end the conversation if appropriate
          	.skipFollowUp();	      
        
        
      },
    };
  }
}

// export the plugin so it can be used
module.exports = TechnicalBriefing;
