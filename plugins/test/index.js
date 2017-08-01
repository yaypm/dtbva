'use strict';

var https = require('https');
const request = require('request-promise');
var et = require("elementtree");
var test = '';
/**
 * The DavisWeather class is the core of the plugin and an
 * instance of DavisWeather is what will be loaded into Davis
 */
class test {

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
      'test:gatherData': (exchange, context) => {	     
	      
      },
      'test:respond': (exchange, context) => {    
 
	out = "asd";
	 
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
module.exports = test;
