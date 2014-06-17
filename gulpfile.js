'use strict';

/** Normal npm requires
------------------------------------------------------------------------------*/
var gulp = require('gulp');


/** Chunk imports
------------------------------------------------------------------------------*/
var js = require('./chunks/js')
  , styles = require('./chunks/styles')
  , clean = require('./chunks/clean');


/** Globals (used inside the chunks)
------------------------------------------------------------------------------*/
GLOBAL.lr = require('tiny-lr-quiet')();


/** Chunks
------------------------------------------------------------------------------*/
gulp.task('cleanTmp', clean.tmp);
gulp.task('stylus', ['cleanTmp'], styles.stylus.serve);
gulp.task('clientjs', js.client.serve);
gulp.task('serverjs', js.server.serve);


/** Gulp tasks
------------------------------------------------------------------------------*/
gulp.task('default', ['stylus', 'clientjs', 'serverjs']);