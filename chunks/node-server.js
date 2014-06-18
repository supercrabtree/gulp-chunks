'use strict';

/* global HTTP_HOST: false */
/* global HTTP_PORT: false */
/* global TEST_PATH: false */

var nodemon = require('nodemon')
  , http = require('http')
  , gutil = require('gulp-util')
  , reloader = require('./reloader');


/** Start server
------------------------------------------------------------------------------*/
function start(callback) {
  // looks in the folder of the main gulpfile
  nodemon('server.js --watch server --watch server.js --ignore node_modules/')
    .on('restart', onRestart)
    .on('log', onLog)
    .on('start', onStart);

  waitForNode(callback);
}


/** Callbacks
------------------------------------------------------------------------------*/
function onLog(log) {
  console.log([
    gutil.colors.white('['),
    gutil.colors.yellow('nodemon'),
    gutil.colors.white('] '),
    log.message
  ].join(''));
}

function onRestart(files) {
  waitForNode(reloader.reload, [{path: files[0]}]);
}

function onStart() {
  console.log([
    '[', gutil.colors.yellow('nodemon'), ']',
    ' waiting for route ',
    gutil.colors.cyan(TEST_PATH),
    ' to return successfully'
  ].join(''));
}

function waitForNode(callback, params) {
  setTimeout(function () {
    checkIfReady(callback, params);
  }, 100);
}

function checkIfReady(callback, params) {
  http.get({
    host: HTTP_HOST,
    port: HTTP_PORT,
    path: TEST_PATH
  }, function () {
    callback.apply(callback, params);
  }).on('error', function () {
    waitForNode(callback, params);
  });
}


/** Exports
------------------------------------------------------------------------------*/
module.exports = {
  start: start
};