/** Normal npm requires
------------------------------------------------------------------------------*/
var gulp = require('gulp');

/** gulp chunk imports
------------------------------------------------------------------------------*/
var styles = require('./chunks/styles')
  , clean = require('./chunks/clean');

/** globals (used inside the chunks)
------------------------------------------------------------------------------*/
GLOBAL.lr = require('tiny-lr-quiet')();

/** define the chunk tasks
------------------------------------------------------------------------------*/
gulp.task('cleanTmp', clean.tmp);
gulp.task('stylus', ['cleanTmp'], styles.stylus.serve);

/** define the gulp tasks
------------------------------------------------------------------------------*/
gulp.task('default', ['stylus']);