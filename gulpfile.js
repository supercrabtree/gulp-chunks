'use strict';

/** Normal npm requires
------------------------------------------------------------------------------*/
var gulp = require('gulp')
  , gutil = require('gulp-util');



/** Chunk imports
------------------------------------------------------------------------------*/
var js = require('./chunks/js')
  , clean = require('./chunks/clean')
  , nodeServer = require('./chunks/node-server')
  , styles = require('./chunks/styles')
  , reloader = require('./chunks/reloader');


/** Chunks
------------------------------------------------------------------------------*/
gulp.task('gulp', js.gulp.serve);
gulp.task('cleanTmp', clean.tmp);
gulp.task('stylus', ['cleanTmp'], styles.stylus.serve);
gulp.task('clientjs', ['gulp'], js.client.serve);
gulp.task('serverjs', ['gulp'], js.server.serve);
gulp.task('startNode', ['gulp', 'cleanTmp', 'stylus', 'clientjs', 'serverjs'], nodeServer.start);


/** Gulp tasks
------------------------------------------------------------------------------*/
gulp.task('default', ['stylus', 'clientjs', 'serverjs', 'startNode', 'watch']);

gulp.task('watch', ['stylus', 'serverjs', 'clientjs'], function () {

  gulp.watch([
    'app/views/**/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*.*'
  ], reloader.reload);

  gulp.watch('app/styles/**/*.styl', ['stylus']);
  gulp.watch('app/scripts/**/*.js', ['clientjs']);
  gulp.watch(['server/**/*.js', 'server.js'], ['serverjs']);

  gulp.watch(['gulpfile.js', 'chunks/**/*'], js.gulp.changed);
});