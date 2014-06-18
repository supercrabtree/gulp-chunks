'use strict';

var gulp = require('gulp')
  , gutil = require('gulp-util')
  , rimraf = require('gulp-rimraf');


/** Clean functions
------------------------------------------------------------------------------*/
function cleanTmp() {
  return gulp.src('.tmp/**/*', {read: false})
    .pipe(rimraf());
}

function cleanDist() {
  return gulp.src([
    'dist/*',
    '!dist/.git',
    '!dist/.gitignore',
    '!dist/node_modules/**/*.*'
  ], {read: false}).pipe(rimraf());
}


/** Exports
------------------------------------------------------------------------------*/
module.exports = {
  tmp: cleanTmp
};