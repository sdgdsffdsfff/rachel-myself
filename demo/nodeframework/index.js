/*
index.js是整个模块的出口，这样就可以通过require('nodeframework').App和require('nodeframework').static访问了
*/
exports.App = require('./lib/App');
exports.static = require('./lib/static');