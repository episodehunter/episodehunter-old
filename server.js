global.include = function(file) {
    return require(__dirname + '/' + file);
};

require('./src/appstart/ioc');

var Hapi = require('hapi');
var sections = require('./src/sections');
var plugins = require('./src/lib/plugins');
var server = new Hapi.Server();

server.connection({ port: 3000 });

plugins.register(server);
sections.registerRouts(server);

server.start(() => {
    console.log('Server running at:', server.info.uri);
});
