'use strict';

/* global HTTP_HOST: false */
/* global HTTP_PORT: false */

var openURL = require('open');


/** Open project
------------------------------------------------------------------------------*/
function openProject() {
  openURL('http://' + HTTP_HOST + ':' + HTTP_PORT);
}


/** Exports
------------------------------------------------------------------------------*/
module.exports = {
  project: openProject
};