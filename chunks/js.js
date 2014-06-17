'use strict';

var gulp = require('gulp')
  , gutil = require('gulp-util')
  , ngmin = require('gulp-ngmin')
  , jshint = require('gulp-jshint')
  , gulpLR = require('gulp-livereload')
  , stylish = require('jshint-stylish')
  , plumber = require('gulp-plumber');

////////////////////////////////////////////////////////////////////////////////
/// TODO                                                                      //
/// 1. add jshint options in here, mash them together using lodash for        //
///    different options depending on browser/node and serve/build            //
////////////////////////////////////////////////////////////////////////////////


/** Client
------------------------------------------------------------------------------*/
function clientServe() {
  return gulp.src('app/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
    .on('error', err);
}

function clientBuild() {
  return gulp.src('app/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
    .on('error', errBuild)
    .pipe(ngmin())
    .pipe(gulp.dest('dist/public/scripts'));
}

function serverServe() {
  return gulp.src(['server/**/*.js', 'server.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
    .on('error', errBuild);
}

function serverBuild() {
  return gulp.src(['server/**/*.js', 'server.js'], {base: './'})
    .pipe(jshint('./server/.jshintrc'))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
    .on('error', errBuild)
    .pipe(gulp.dest('dist'));
}


/** Sass
------------------------------------------------------------------------------*/


/** Generic
------------------------------------------------------------------------------*/
function err() {
  /*jshint validthis:true */
  gutil.beep();
  this.emit('end');
}
function errBuild() {
  gutil.beep();
  console.log(gutil.colors.red('✖ Build Failed'));
  process.exit(1);
}


/** Exports
------------------------------------------------------------------------------*/
module.exports = {
  client: {
    serve: clientServe,
    build: clientBuild
  },
  server: {
    serve: serverServe,
    build: serverBuild
  }
};