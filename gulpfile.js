'use strict';

const gulp = require('gulp');
const spawn = require('child_process').spawn;

let node;

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('server', () => {
  if (node) node.kill();
  node = spawn('node', ['--debug', 'index.js'], { stdio: 'inherit' });
  node.on('close', (code) => {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

/**
 * $ gulp
 * description: start the development environment
 */
gulp.task('default', ['server'], () => {
  gulp.watch(['./index.js', './plugins/**/*.js'], ['server']);
});

// clean up if an error goes unhandled.
process.on('exit', () => {
  if (node) node.kill();
});
