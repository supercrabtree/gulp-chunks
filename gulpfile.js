'use strict';

/** Normal npm requires
------------------------------------------------------------------------------*/
var gulp = require('gulp')
  , quietTinyLiveReload = require('tiny-lr-quiet');


/** Chunk imports
------------------------------------------------------------------------------*/
var js = require('./chunks/js')
  , clean = require('./chunks/clean')
  , styles = require('./chunks/styles');


/** Globals (used inside the chunks)
------------------------------------------------------------------------------*/
GLOBAL.lr = quietTinyLiveReload();


/** Chunks
------------------------------------------------------------------------------*/
gulp.task('gulpfile', js.gulpfile.serve);
gulp.task('cleanTmp', clean.tmp);
gulp.task('stylus', ['cleanTmp'], styles.stylus.serve);
gulp.task('clientjs', ['gulpfile'], js.client.serve);
gulp.task('serverjs', ['gulpfile'], js.server.serve);
gulp.task('startNode', [
  'gulpfile',
  'cleanTmp',
  'stylus',
  'clientjs',
  'serverjs'
], js.server.serve);


/** Gulp tasks
------------------------------------------------------------------------------*/
gulp.task('default', ['stylus', 'clientjs', 'serverjs']);