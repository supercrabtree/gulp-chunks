'use strict';

var gulp = require('gulp')
  , gutil = require('gulp-util')
  , stylus = require('gulp-stylus')
  , plumber = require('gulp-plumber')
  , gulpLr = require('gulp-livereload')
  , prefix = require('gulp-autoprefixer')
  , reloader = require('./reloader');


////////////////////////////////////////////////////////////////////////////////
/// TODO                                                                      //
/// 1. add SASS build scripts                                                 //
////////////////////////////////////////////////////////////////////////////////


/** Stylus
------------------------------------------------------------------------------*/
function stylusServe() {
  return gulp.src('app/styles/main.styl')
    .pipe(plumber())
    .pipe(stylus())
    .on('error', stylusErr)
    .pipe(prefix('last 2 versions'))
    .pipe(gulp.dest('.tmp/styles'))
    .on('error', err)
    .pipe(gulpLr(reloader.lr))
    .on('end', function () {
      console.log('[' + gutil.colors.blue('LiveReload') + '] injecting new styles');
    });
}

function stylusBuild() {

}

function stylusErr(err) {
  /*jshint validthis:true */
  var splitErr = err.message.match(/(.*?)([0-9]*)(?:\n)((?:.+\n)+)(?:\n)((?:.+\n)+)/);
  var file = splitErr[1];
  var line = splitErr[2];
  var location = splitErr[3];
  var theErr = splitErr[4];

  console.log('\n', gutil.colors.cyan(file) + gutil.colors.red(line));
  console.log(location);
  console.log(gutil.colors.red(theErr));
  gutil.beep();
  this.emit('end');
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


/** Exports
------------------------------------------------------------------------------*/
module.exports = {
  stylus: {
    serve: stylusServe,
    build: stylusBuild
  }
};