'use strict';

var https = require('https');
var xml2js = require('xml2js');
const request = require('request-promise');
//global.appMonTest = 'not changed';
//process.env.APPMONTEST = 'not channged';
var test = "ballsack";
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
	
	var appMon;
	var appmon_url = process.env.APPMON_URL;
	        
	var appmon_username = process.env.APPMON_USERNAME;
	var appmon_password = process.env.APPMON_PASSWORD;
	      
	const opts = {
    		uri: 'https://dynatrace.demo.dynatrace.com:8021/rest/management/reports/create/Davis%20Test?type=XML&format=XML+Export',
  		headers: {'Authorization': 'Basic ' + new Buffer(appmon_username + ':' + appmon_password).toString('base64')},
  		rejectUnauthorized: false
  	}
  	
	return request(opts)
    		.then(resp => {
      		test = resp.toString();
		//console.log(test);
    	})
	      
      },
      'test:respond': (exchange, context) => {    
	      
	//appMon = JSON.stringify(test);     
	     
	//console.log(test);
	
	var parser = new xml2js.Parser();
	var result = '';
	      
	parser.parseString(test, function (err, result) {
        	console.log(util.inspect(result, false, null));
        	console.log('Done');
    	});      
	      
	exchange
          	.response(test) // respond to the user
          	.smartEnd() // end the conversation if appropriate
          	.skipFollowUp();	      
        
        
      },
    };
  }
}

// export the plugin so it can be used
module.exports = Test;
