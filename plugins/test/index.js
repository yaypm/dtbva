'use strict';

var https = require('https');
const request = require('request-promise');
var et = require("elementtree");
var test = '';
/**
 * The DavisWeather class is the core of the plugin and an
 * instance of DavisWeather is what will be loaded into Davis
 */
class Test {

  /**
   * The main body of work is done in the constructor.
   */
  constructor(davis, options) {
    this.davis = davis;
    this.options = options;

    // This is where we declare our intents.
    this.intents = {
      // Our intent name
      test: {
        // A basic description of the intent
        usage: 'End the show',

        // Phrases that will trigger our intent. Note that they will not
        // need to be matched exactly in order for the intent to run.
        phrases: [
          'talk to me',
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
      'test:gatherData': (exchange, context) => {	     
	        
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
      'test:respond': (exchange, context) => {    
 
	var data, etree;
 
	data = test;
	etree = et.parse(data);
	
	var appMon0, appMon1, appMon2;
	
	var appMon0 = etree.findall('./data/textandmeasure/textmeasurecontent')[0].text;     
	var appMon1 = etree.findall('./data/textandmeasure/textmeasurecontent')[1].text;
	var appMon2 = etree.findall('./data/textandmeasure/textmeasurecontent')[2].text;
	
	let out = 'In the past 30 minutes there have been ';
	out += appMon1;
	out += ' with a conversion rate of ';
	out += appMon0;
	out += ' making a total revenue of ';
	out += appMon2;
	      
	exchange
          	.response(out) // respond to the user
          	.smartEnd() // end the conversation if appropriate
          	.skipFollowUp();	      
        
        
      },
    };
  }
}

// export the plugin so it can be used
module.exports = Test;
