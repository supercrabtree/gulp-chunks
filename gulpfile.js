'use strict';

/** Normal npm requires
------------------------------------------------------------------------------*/
var gulp = require('gulp')
  , gutil = require('gulp-util');


/** Define globals
------------------------------------------------------------------------------*/
GLOBAL.HTTP_HOST = 'localhost';
GLOBAL.HTTP_PORT = process.env.PORT = 9000;
GLOBAL.TEST_PATH = '/api/feed';
GLOBAL.LIVERELOAD_PORT = 35729;


/** Chunk imports
------------------------------------------------------------------------------*/
var js = require('./chunks/js')
  , open = require('./chunks/open') // jshint ignore:line
  , clean = require('./chunks/clean')
  , styles = require('./chunks/styles')
  , reloader = require('./chunks/reloader')
  , nodeServer = require('./chunks/node-server');

reloader.init();


/** Chunks
------------------------------------------------------------------------------*/
gulp.task('gulp', js.gulp.serve);
gulp.task('cleanTmp', clean.tmp);
gulp.task('stylus', ['cleanTmp'], styles.stylus.serve);
gulp.task('clientjs', ['gulp'], js.client.serve);
gulp.task('serverjs', ['gulp'], js.server.serve);
gulp.task('startNode', ['gulp', 'cleanTmp', 'stylus', 'clientjs', 'serverjs'], nodeServer.start);
gulp.task('openProject', ['startNode'], open.project);


/** Gulp tasks
------------------------------------------------------------------------------*/
gulp.task('default', ['serve']);
gulp.task('go', ['serve', 'openProject']);
gulp.task('serve', ['stylus', 'clientjs', 'serverjs', 'startNode', 'watch']);

gulp.task('watch', function () {

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