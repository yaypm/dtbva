'use strict';

const rp = require('request-promise');
const API_KEY = 'your_api_key';
var http = require('http');

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
          'Get the part started',
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
		host: '109.146.232.4',
		port: '1234',
		path: '/api/-ZjRIsxWqs4znP13UdaVwkYHg0eH3VsJwfrrjF7s/lights/2/state',
		method: 'PUT',
		headers: {
			'Content-Type': 'text/plain;charset=UTF-8'
		}
	};

	// Set up the request
	var post_req = http.request(post_options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('Response: ' + chunk);
		});
	});

	
	var post_data = '{"on":true, "sat":254, "bri":254,"hue":5000}';
	
	// post the data
	post_req.write(post_data);
	post_req.end();	  
	
	function lightsRed() {
		var post_data = '{"on":true, "sat":254, "bri":254,"hue":5000}';
		post_req.write(post_data);
		post_req.end();
	}
	
	function lightsOff() {
		var post_data = '{"on":false}';
		post_req.write(post_data);
		post_req.end();
	}
	
	setTimeout(lightsOff, 500);
	setTimeout(lightsRed, 500);
	setTimeout(lightsOff, 500);
	setTimeout(lightsRed, 500);
	setTimeout(lightsOff, 500);
	setTimeout(lightsRed, 500);
	
	},
		
	'defconOne:respond': (exchange, context) => {
    const resp = 'Yes sir!';
	var linkUrl = "https://youtu.be/2a4gyJsY0mc?t=43";
	this.davis.server.pushLinkToUser(exchange.user, linkUrl, true);
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
