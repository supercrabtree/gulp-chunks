'use strict';

var gulp = require('gulp')
  , gutil = require('gulp-util')
  , ngmin = require('gulp-ngmin')
  , jshint = require('gulp-jshint')
  , gulpLR = require('gulp-livereload')
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
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .on('error', err);
}

function clientBuild() {
  return gulp.src('app/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .on('error', errBuild)
    .pipe(ngmin())
    .pipe(gulp.dest('dist/public/scripts'));
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
  }
};