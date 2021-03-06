'use strict';

/* global LIVERELOAD_PORT: false */

var gutil = require('gulp-util')
  , quietTinyLiveReload = require('tiny-lr-quiet');

var lr = quietTinyLiveReload();

function init() {
  lr.listen(LIVERELOAD_PORT);
}

function reload(file) {
  console.log([
    '[', gutil.colors.blue('LiveReload'), '] ',
    file && file.path
  ].join(''));

  file = file || {path: 'app/scripts/app.js'};
  lr.changed({body: {files: file.path}});
}

/** Exports
------------------------------------------------------------------------------*/
module.exports = {
  init: init,
  reload: reload,
  lr: lr
};