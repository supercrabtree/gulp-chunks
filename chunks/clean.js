'use strict';

var gulp = require('gulp')
  , gutil = require('gulp-util')
  , rimraf = require('gulp-rimraf');


/** Tmp
------------------------------------------------------------------------------*/
function cleanTmp() {
  return gulp.src('.tmp/**/*', {read: false})
    .pipe(rimraf());
}


/** Exports
------------------------------------------------------------------------------*/
module.exports = {
  tmp: cleanTmp
};