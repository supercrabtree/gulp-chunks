'use strict';

var async = require('async')
  , gutil = require('gulp-util')
  , inquirer = require('inquirer')
  , childProcess = require('child_process')
  , shellscript = require('shellscript');


/** Shortcuts to color functions
------------------------------------------------------------------------------*/
var green = gutil.colors.green;
var red = gutil.colors.red;


/** Deploy
------------------------------------------------------------------------------*/
function run(cb) {
  console.log(green('\n✔ Build Success\n'));
  askToRunBuild(cb);
}

function askToRunBuild(cb) {
  inquirer.prompt([{
    type: 'confirm',
    default: false,
    name: 'runBuild',
    message: 'Would you like to run your build?'
  }], function (answers) {

    console.log();

    if (answers.runBuild) {
      runBuild();
    } else {
      cb();
      process.exit(0);
    }
  });
}

function runBuild() {

  process.chdir('./dist');
  process.env.NODE_ENV = 'production';

  spawnProcess('npm', ['install', '--production'], function (err) {
    if (err) {
      console.log(red('\n✖ npm install --production failed'));
      process.exit(1);
    }
    console.log(green('\n✔ npm install --production success\n'));
    spawnProcess('node', ['server.js']);
  });
}


/** Utility functions
------------------------------------------------------------------------------*/
function spawnProcess(cmd, args, exitCallback) {
  childProcess.spawn(cmd, args, {env: process.env, cwd: process.cwd(), stdio:'inherit'})
    .on('exit', exitCallback || function () {});
}


/** Exports
------------------------------------------------------------------------------*/
module.exports = {
  run: run
};