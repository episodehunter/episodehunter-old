/* @flow */

var Hapi = require('hapi');
var sections = require('./build/sections');
var plugins = require('./build/lib/plugins');
var server = new Hapi.Server();

server.connection({ port: 5000, routes: {cors: true }});

plugins.register(server);
sections.registerRouts(server);

server.start(function() {
    console.log('Server running at:', server.info.uri);
});
