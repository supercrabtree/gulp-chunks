'use strict';

var gutil = require('gulp-util')
  , quietTinyLiveReload = require('tiny-lr-quiet');


function reload(file) {
  console.log([
    '[', gutil.colors.blue('LiveReload'), '] ',
    file && file.path
  ].join(''));
  file = file || {path: 'app/scripts/app.js'};
  lr.changed({body: {files: file.path}});
}


module.exports = {
  reload: reload,
  lr: quietTinyLiveReload()
};