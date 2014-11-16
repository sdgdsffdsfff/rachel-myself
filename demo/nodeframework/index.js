/*
index.js是整个模块的出口，这样就可以通过require('nodeframework').App和require('nodeframework').static访问了
*/
// exports.App = require('./lib/Appv1');

// exports.App = require('./lib/Appv2');

// exports.App = require('./lib/Appv3');

exports.App = require('./lib/Appv4');

exports.static = require('./lib/static');

exports.query = require('./lib/query');

exports.post = require('./lib/post');