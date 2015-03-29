'use strict';

var moviesController = require('./movies_controller');
var ioc = require('../../lib/ioc');
var controller = ioc.inject(moviesController);

module.exports = (function() {
    return [
        {
            method: 'GET',
            path: '/movies',
            config : {
                handler: controller.get,
                auth: 'jwt',
                bind: controller
            }
        }
    ];
}());
