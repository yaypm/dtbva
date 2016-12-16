#!/usr/bin/env node

'use strict';

const BbPromise = require('bluebird');

(() => BbPromise.resolve().then(() => {
  // require here so that if anything goes wrong during require,
  // it will be caught.
  const Davis = require('@dynatrace/davis'); // eslint-disable-line global-require

  const davis = new Davis({
    logLevel: 'debug',
    // userPlugins: ['./davisWeather'], // uncomment this line to load the davisWeather plugin
  });

  return davis.run();
}))();
