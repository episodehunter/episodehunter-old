/* @flow */
'use strict';

var path = require('path');
var routePrefix = '_router';
var exports = module.exports;

/**
 * Register all sections routes
 * @param {exports.Server} server
 */
exports.registerRouts = function(server: hapiServer) {
    var sections = ['movies', 'auth'];

    sections.forEach(function(section) {
        try {
            var route = require(path.join(__dirname, section, section + routePrefix));
            server.route(route);
        } catch(error) {
            console.error('Unable to load routs for ' + section);
            throw error;
        }

    });
};
