'use strict';

var https = require('https');
const request = require('request-promise');
var et = require("elementtree");
var test = '';
/**
 * The DavisWeather class is the core of the plugin and an
 * instance of DavisWeather is what will be loaded into Davis
 */
class BusinessBriefing {

  /**
   * The main body of work is done in the constructor.
   */
  constructor(davis, options) {
    this.davis = davis;
    this.options = options;

    // This is where we declare our intents.
    this.intents = {
      // Our intent name
      businessBriefing: {
        // A basic description of the intent
        usage: 'Get your business briefing',

        // Phrases that will trigger our intent. Note that they will not
        // need to be matched exactly in order for the intent to run.
        phrases: [
          'morning business briefing',
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
      'businessBriefing:gatherData': (exchange, context) => {	     
	        
	var appmon_username = process.env.APPMON_USERNAME;
	var appmon_password = process.env.APPMON_PASSWORD;
	      
	const opts = {
    		uri: 'https://dynatrace.demo.dynatrace.com:8021/rest/management/reports/create/Davis%20Test?type=XML&format=XML+Export',
  		headers: {'Authorization': 'Basic ' + new Buffer(appmon_username + ':' + appmon_password).toString('base64')},
  		rejectUnauthorized: false
  	}
  	
	return request(opts)
    		.then(resp => {
		test = resp;
    	})
	      
      },
      'businessBriefing:respond': (exchange, context) => {    
 
	var data, etree;
 
	data = test;
	etree = et.parse(data);
	
	var appMon0, appMon1, appMon2;
	
	var appMon0 = etree.findall('./data/textandmeasure/textmeasurecontent')[0].text;     
	var appMon1 = etree.findall('./data/textandmeasure/textmeasurecontent')[1].text;
	var appMon2 = etree.findall('./data/textandmeasure/textmeasurecontent')[2].text;
	var appMon3 = etree.findall('./data/textandmeasure/textmeasurecontent')[3].text;
	
	var seconds = Math.floor(appMon3 / 1000);

	if(seconds > 60) {
		var minutes = Math.floor(seconds / 60);
	
		if(minutes > 1) {
			text = " minutes"
		}
		
		else {
			text = " minute"
		}
	
		var andSeconds = seconds - 60 * minutes;
		var speech = "who typically spent " + minutes + text + " and " + andSeconds + " seconds on the site.";
	}

	else {
		var speech = "who typically spent " + seconds + " seconds on the site.";
	}
  
	      
	let out = 'In the past hour there have been ';
	out += appMon1;
	out += ' users, ';
	out += speech;
	out += ' Overall conversion rate was '; 
	out += appMon0;      
	out += ' percent, resulting in a total revenue of ';
	out += appMon2;
	out += ' pounds';
	 
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
module.exports = BusinessBriefing;
