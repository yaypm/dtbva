'use strict';

var https = require('https');
const request = require('request-promise');
var et = require("elementtree");
var test = '';
var test2 = '';
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
  	
	return request(opts)
    		.then(resp => {
		test = resp;
    	})
	      
	const opts2 = {
    		uri: 'https://localhost:8021/api/v2/alerts?systemprofile=easyTravel&state=Created&from=2017-07-16T00%3A00%3A01%2B00%3A00&to=2017-07-17T00%3A00%3A01%2B00%3A00',
  		headers: {'Authorization': 'Basic ' + new Buffer(appmon_username + ':' + appmon_password).toString('base64')},
  		rejectUnauthorized: false
  	}
  	
	return request(opts2)
    		.then(resp => {
		test2 = resp;
    	})
	      console.log('balls');
      },
      'technicalBriefing:respond': (exchange, context) => {    
 
	var data, etree;
 
	data = test;
	etree = et.parse(data);
	
	var appMon0, appMon1, appMon2, appMon3, appMon4, appMon5, appMon6, appMon7, appMon8, appMon9, appMon10, appMon11, appMon12, appMon13;
	
	var appMon0 = etree.findall('./data/textandmeasure/textmeasurecontent')[0].text;     
	var appMon1 = etree.findall('./data/textandmeasure/textmeasurecontent')[1].text;
	var appMon2 = etree.findall('./data/textandmeasure/textmeasurecontent')[2].text;
	      var appMon2 = appMon2 / 1000;
	var appMon3 = etree.findall('./data/textandmeasure/textmeasurecontent')[3].text;
	      var appMon3 = appMon3 / 1000;
	var appMon4 = etree.findall('./data/textandmeasure/textmeasurecontent')[4].text;     
	var appMon5 = etree.findall('./data/textandmeasure/textmeasurecontent')[5].text;
	var appMon6 = etree.findall('./data/textandmeasure/textmeasurecontent')[6].text;
	      var appMon6 = appMon6 / 1000;
	var appMon7 = etree.findall('./data/textandmeasure/textmeasurecontent')[7].text;
	      var appMon7 = appMon7 / 1000;
	var appMon8 = etree.findall('./data/textandmeasure/textmeasurecontent')[8].text;
	var appMon9 = etree.findall('./data/textandmeasure/textmeasurecontent')[9].text;
	var appMon10 = etree.findall('./data/textandmeasure/textmeasurecontent')[10].text;
	var appMon11 = etree.findall('./data/textandmeasure/textmeasurecontent')[11].text;
	      var appMon11 = appMon11 / 1000;
	var appMon12 = etree.findall('./data/textandmeasure/textmeasurecontent')[12].text;
	var appMon13 = etree.findall('./data/textandmeasure/textmeasurecontent')[13].text;
	      var appMon13 = appMon13 / 1000;
	      
	let out = 'OK here is your technical briefing. Today, ';
	out += appMon8;
	out += ' percent of users were frustrated, compared to ';
	out += appMon9;
	out += ' percent yesterday. Performance of your key transactions is as follows, login took '; 
	out += appMon2;      
	out += ' seconds, up from ';
	out += appMon3;
	out += ' seconds yesterday. Today login has a failure rate of ';
	out += appMon1;
	out += ' percent, compared to ';
	out += appMon0;
	out += ' percent yesterday. Search is currently taking ';
	out += appMon13;
	out += ' seconds, up from ';
	out += appMon11;
	out += ' seconds yesterday. So far today, search has had a ';
	out += appMon10;
	out += ' percent failure rate, down from ';
	out += appMon12;
	out += ' percent yesterday. Finally, payments are currently taking ';
	out += appMon6;
	out += ' seconds, up from ';      
	out += appMon7;    
	out += ' yesterday, and are failing ';
	out += appMon5;
	out += ' percent of the time, compared to ';
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
