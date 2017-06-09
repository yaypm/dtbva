'use strict';

const rp = require('request-promise');
var http = require('http');
const API_KEY = 'your_api_key';

/**
 * The DavisWeather class is the core of the plugin and an
 * instance of DavisWeather is what will be loaded into Davis
 */
class defconOne {

  /**
   * The main body of work is done in the constructor.
   */
  constructor(davis, options) {
    this.davis = davis;
    this.options = options;

    // This is where we declare our intents.
    this.intents = {
      // Our intent name
      defconOne: {
        // A basic description of the intent
        usage: 'Get to defcon one',

        // Phrases that will trigger our intent. Note that they will not
        // need to be matched exactly in order for the intent to run.
        phrases: [
          'Take us to defcon one',
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
      'defconOne:gatherData': (exchange, context) => {
	  
	    var post_options = {
		host: 'ec2-52-31-139-235.eu-west-1.compute.amazonaws.com',
		port: '80',
		path: '/',
		method: 'POST',
		headers: {
			'Content-Type': 'text/html'
		}
	};

	// Set up the request
	var post_req = http.request(post_options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('Response: ' + chunk);
		});
	});

	// post the data
	post_req.write(post_data);
	post_req.end();	  
		  		  
	},
		
	'defconOne:respond': (exchange, context) => {
    const resp = 'Aye aye sir';

		exchange
			.response(resp) // respond to the user
			//.setTarget('performFollowup');   
			.skipFollowUp();
			//return this.davis.pluginManager.run(exchange, 'performFollowup');
			//.smartEnd(); // end the conversation if appropriate
		},
	};
  }
}

// export the plugin so it can be used
module.exports = defconOne;
