'use strict';

var gulp = require('gulp');


/** Copy functions
------------------------------------------------------------------------------*/
function bowerComponents() {
  return gulp.src('app/bower_components/**/*.*')
    .pipe(gulp.dest('dist/public/bower_components'));
}

function heroku() {
  return gulp.src(['Procfile', 'package.json'])
    .pipe(gulp.dest('dist'));
}

function images() {
  return gulp.src('app/images/**/*.*')
    .pipe(gulp.dest('dist/public/images'));
}

function styles() {
  return gulp.src('app/styles/**/*.css')
    .pipe(gulp.dest('dist/public/styles'));
}

function favicon() {
  return gulp.src('app/favicon.ico')
    .pipe(gulp.dest('dist/public/'));
}

function views() {
  return gulp.src('app/views/**/*.html')
    .pipe(gulp.dest('dist/views'));
}


/** Exports
------------------------------------------------------------------------------*/
module.exports = {
  heroku: heroku,
  images: images,
  styles: styles,
  favicon: favicon,
  views: views
};