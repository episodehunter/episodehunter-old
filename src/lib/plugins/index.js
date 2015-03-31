/* @flow */
'use strict';

var registerJWT = require('./jwt');

module.exports = {
    register: function(server: hapiServer) {
        registerJWT(server);
    }
};
