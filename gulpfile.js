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
  , copy = require('./chunks/copy')
  , clean = require('./chunks/clean')
  , build = require('./chunks/build')
  , heroku = require('./chunks/heroku')
  , styles = require('./chunks/styles')
  , reloader = require('./chunks/reloader')
  , nodeServer = require('./chunks/node-server');

reloader.init();


/** Chunks
------------------------------------------------------------------------------*/
gulp.task('gulp', js.gulp.serve);
gulp.task('clean:tmp', clean.tmp);
gulp.task('stylus', ['clean:tmp'], styles.stylus.serve);
gulp.task('clientjs', ['gulp'], js.client.serve);
gulp.task('serverjs', ['gulp'], js.server.serve);
gulp.task('startNode', ['gulp', 'stylus', 'clientjs', 'serverjs'], nodeServer.start);
gulp.task('openProject', ['startNode'], open.project);

gulp.task('clean:dist', clean.dist);
gulp.task('gulp:build', js.gulp.build);
gulp.task('stylus:build', ['clean:dist'], styles.stylus.build);
gulp.task('clientjs:build', ['clean:dist', 'gulp:build'], js.client.build);
gulp.task('serverjs:build', ['clean:dist', 'gulp:build'], js.server.build);
gulp.task('copy:views', ['clean:dist'], copy.views);
gulp.task('copy:styles', ['clean:dist'], copy.styles);
gulp.task('copy:images', ['clean:dist'], copy.images);
gulp.task('copy:favicon', ['clean:dist'], copy.favicon);
gulp.task('copy:heroku', ['clean:dist'], copy.heroku);
gulp.task('copy:bowerComponents', ['clean:dist'], copy.bowerComponents);


/** Gulp serve/watch/reload
------------------------------------------------------------------------------*/
gulp.task('default', ['serve']);
gulp.task('go', ['serve', 'openProject']);
gulp.task('serve', ['clean:tmp', 'stylus', 'clientjs', 'serverjs', 'startNode', 'watch']);

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


/** Gulp build
 ** build core is used by deploy also, that's why build and buildCore
------------------------------------------------------------------------------*/
gulp.task('buildCore', ['gulp:build', 'clean:dist', 'serverjs:build', 'stylus:build', 'clientjs:build', 'copy:bowerComponents', 'copy:heroku', 'copy:favicon', 'copy:images', 'copy:styles', 'copy:views']);
gulp.task('build', ['buildCore'], build.run);


/** Gulp deploy
------------------------------------------------------------------------------*/
gulp.task('deploy', ['buildCore'], heroku.deploy);